import { error, json, parseJson, readSession, syncSharedState } from "./_lib/store.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return error("Metodo non consentito.", 405);
    }

    const session = readSession(request);
    if (!session) {
      return error("Sessione non valida.", 401);
    }

    const body = await parseJson(request);

    try {
      const payload = await syncSharedState(session, body.state, body.currentPatientId || null);
      return json(payload);
    } catch (caught) {
      return error(caught instanceof Error ? caught.message : "Sincronizzazione non riuscita.", 400);
    }
  }
};
