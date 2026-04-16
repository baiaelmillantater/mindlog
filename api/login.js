import { error, json, loginPatient, loginTherapist, parseJson } from "./_lib/store.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return error("Metodo non consentito.", 405);
    }

    const body = await parseJson(request);
    const role = String(body.role || "");
    const username = String(body.username || "");
    const password = String(body.password || "");

    if (!username || !password || !role) {
      return error("Credenziali incomplete.", 400);
    }

    const result = role === "psicologo"
      ? await loginTherapist(username, password)
      : await loginPatient(username, password);

    if (!result) {
      return error("Credenziali non corrette.", 401);
    }

    return json({
      token: result.token,
      ...result.payload
    });
  }
};
