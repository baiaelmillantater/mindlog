#!/usr/bin/env python3
import json
import os
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor


BASE_URL = os.environ.get("MINDLOG_BASE_URL", "https://mindlog-sandy.vercel.app").rstrip("/")
ADMIN_USERNAME = os.environ.get("MINDLOG_ADMIN_USERNAME", "martina")
ADMIN_PASSWORD = os.environ.get("MINDLOG_ADMIN_PASSWORD", "1234")


def request_json(path, method="GET", data=None, token=None):
    body = None if data is None else json.dumps(data).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}{path}", data=body, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=40) as response:
            return response.getcode(), json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        payload = error.read().decode("utf-8")
        try:
            parsed = json.loads(payload)
        except json.JSONDecodeError:
            parsed = {"error": payload or str(error)}
        return error.code, parsed


def ensure(condition, message):
    if not condition:
        raise AssertionError(message)


def main():
    suffix = str(int(time.time()))
    username = f"test_{suffix}"
    password = "test1234"
    report = {"base_url": BASE_URL, "username_test": username}

    status, health = request_json("/api/health")
    ensure(status == 200 and health.get("ok"), "Health check non riuscito.")
    report["health"] = health

    status, therapist_login = request_json("/api/login", method="POST", data={
        "role": "psicologo",
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    })
    ensure(status == 200 and therapist_login.get("token"), "Login psicologo non riuscito.")
    therapist_token = therapist_login["token"]
    report["patients_before"] = len(therapist_login["state"].get("patients", []))

    status, created = request_json("/api/patients", method="POST", token=therapist_token, data={
        "name": "Paziente Test Automatico",
        "username": username,
        "password": password
    })
    ensure(status == 200, f"Creazione paziente non riuscita: {created}")
    patient = next((item for item in created["state"]["patients"] if item["username"] == username), None)
    ensure(patient, "Il paziente creato non compare nell'archivio.")
    patient_id = patient["id"]
    report["patient_id"] = patient_id

    status, patient_login = request_json("/api/login", method="POST", data={
        "role": "paziente",
        "username": username,
        "password": password
    })
    ensure(status == 200 and patient_login.get("token"), "Login paziente non riuscito.")
    patient_token = patient_login["token"]

    patient_state = patient_login["state"]
    patient_record = patient_state["patients"][0]
    patient_record["tasks"].insert(0, {
        "id": f"task-test-{suffix}",
        "title": "Task di test remoto",
        "completed": False,
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    })

    status, sync_patient = request_json("/api/sync", method="POST", token=patient_token, data={
        "currentPatientId": patient_id,
        "state": patient_state
    })
    ensure(status == 200, f"Sync paziente non riuscita: {sync_patient}")

    status, therapist_session = request_json("/api/session", token=therapist_token)
    ensure(status == 200, "Sessione psicologo non disponibile.")
    refreshed_patient = next((item for item in therapist_session["state"]["patients"] if item["id"] == patient_id), None)
    ensure(refreshed_patient, "Il paziente creato non è più visibile allo psicologo.")
    ensure(any(task["title"] == "Task di test remoto" for task in refreshed_patient.get("tasks", [])), "La modifica paziente non è arrivata allo psicologo.")

    payload = {
        "currentPatientId": therapist_session.get("currentPatientId"),
        "state": therapist_session["state"]
    }

    def run_parallel_sync(_):
        status_code, data = request_json("/api/sync", method="POST", token=therapist_token, data=payload)
        ensure(status_code == 200, f"Sync concorrente fallita: {data}")
        return data.get("currentPatientId")

    with ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(run_parallel_sync, range(3)))
    ensure(all(result is not None for result in results), "Una delle sync concorrenti non ha restituito un paziente attivo.")

    status, deleted = request_json("/api/patients", method="DELETE", token=therapist_token, data={"id": patient_id})
    ensure(status == 200, f"Eliminazione paziente non riuscita: {deleted}")

    status, deleted_session = request_json("/api/session", token=patient_token)
    ensure(status == 401, f"La sessione del paziente eliminato dovrebbe risultare non valida: {deleted_session}")

    report["patients_after"] = len(deleted["state"].get("patients", []))
    report["parallel_sync"] = "ok"
    report["revoca_sessione"] = "ok"
    report["result"] = "ok"
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(json.dumps({"result": "error", "message": str(error)}, ensure_ascii=False, indent=2))
        sys.exit(1)
