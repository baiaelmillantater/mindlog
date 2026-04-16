import { createPatientPayload, createTherapistPayload, error, json, loadRemoteState, readSession } from "./_lib/store.js";

export default {
  async fetch(request) {
    const session = readSession(request);
    if (!session) {
      return error("Sessione non valida.", 401);
    }

    const { state } = await loadRemoteState();
    const payload = session.role === "therapist"
      ? createTherapistPayload(state)
      : createPatientPayload(state, session.patientId);

    return json(payload);
  }
};
