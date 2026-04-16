import { createOrUpdatePatient, deletePatient, error, json, parseJson, readSession } from "./_lib/store.js";

export default {
  async fetch(request) {
    const session = readSession(request);
    if (!session || session.role !== "therapist") {
      return error("Accesso non autorizzato.", 401);
    }

    const body = await parseJson(request);

    try {
      if (request.method === "POST") {
        return json(await createOrUpdatePatient(body));
      }
      if (request.method === "PUT") {
        return json(await createOrUpdatePatient(body));
      }
      if (request.method === "DELETE") {
        return json(await deletePatient(String(body.id || "")));
      }
      return error("Metodo non consentito.", 405);
    } catch (caught) {
      return error(caught instanceof Error ? caught.message : "Operazione non riuscita.", 400);
    }
  }
};
