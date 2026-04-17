import crypto from "node:crypto";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

const TIP_CATEGORIES = [
  "Tutti", "Respirazione", "Grounding", "Meditazione", "Messaggio dello psicologo", "Video", "Immagine", "Testo", "Audio"
];

const DEFAULT_TIPS = [
  {
    id: "tip-1",
    title: "Respirazione 4-7-8 per la sera",
    category: "Respirazione",
    type: "Testo",
    description: "Una pratica breve per rallentare il corpo quando senti che la giornata è ancora addosso.",
    content: "Siediti comodo. Inspira dal naso per 4 secondi, trattieni per 7, poi espira lentamente per 8. Ripeti 4 cicli senza cercare la perfezione."
  },
  {
    id: "tip-2",
    title: "Grounding visivo in tre minuti",
    category: "Grounding",
    type: "Video",
    description: "Un esercizio semplice per tornare al presente osservando con calma ciò che ti circonda.",
    content: "Guarda cinque dettagli intorno a te, nomina colori e forme, poi passa a tre suoni presenti nello spazio in cui sei."
  },
  {
    id: "tip-3",
    title: "Messaggio dello psicologo",
    category: "Messaggio dello psicologo",
    type: "Testo",
    description: "Un promemoria da rileggere nei giorni in cui senti più peso o autocritica.",
    content: "Se oggi ti sembra tutto più faticoso, prova a chiederti non cosa dovresti fare meglio, ma di cosa avresti bisogno in questo momento."
  },
  {
    id: "tip-4",
    title: "Meditazione breve di atterraggio",
    category: "Meditazione",
    type: "Audio",
    description: "Una guida morbida per passare da uno stato di allerta a una presenza più stabile.",
    content: "Porta attenzione al contatto del corpo con la sedia, segui tre respiri lenti e lascia che ogni espirazione ti riporti più qui."
  },
  {
    id: "tip-5",
    title: "Immagine guida del respiro",
    category: "Immagine",
    type: "Immagine",
    description: "Una traccia visiva semplice da usare come ancora nei momenti di agitazione.",
    content: "Immagina un cerchio che si espande mentre inspiri e si restringe mentre espiri, lasciando che il ritmo si faccia via via più morbido."
  }
];

const DEFAULT_QUESTIONS = [
  {
    id: "question-1",
    text: "Quanto ti sei sentito presente nelle attività di oggi?",
    type: "scala",
    options: [],
    active: true
  },
  {
    id: "question-2",
    text: "Hai notato un momento in cui sei riuscito a parlarti con maggiore gentilezza?",
    type: "textarea",
    options: [],
    active: true
  }
];

const GAME_LIBRARY = [
  { id: "cognitive-restructuring", title: "Ristrutturazione Cognitiva", category: "CBT" },
  { id: "leaves-stream", title: "Foglie sul Ruscello", category: "Mindfulness" },
  { id: "body-scan", title: "Body Scan Animato", category: "Mindfulness" },
  { id: "cognitive-defusion", title: "Defusione Cognitiva", category: "CBT" },
  { id: "opposite-action", title: "Opposite Action", category: "Regolazione" },
  { id: "tipp", title: "Skill TIPP", category: "Regolazione" },
  { id: "breathing-studio", title: "Esercizi di Respirazione", category: "Respirazione" },
  { id: "graded-exposure", title: "Esposizione Graduale", category: "Esposizione" },
  { id: "pmr", title: "Rilassamento Muscolare Progressivo", category: "PMR" },
  { id: "guided-imagery", title: "Visualizzazione Guidata", category: "Mindfulness" }
];

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS
  });
}

export function error(message, status = 400) {
  return json({ error: message }, status);
}

function env(name, fallback = "") {
  const value = process.env[name];
  return value && String(value).trim() ? String(value).trim() : fallback;
}

function nowIso() {
  return new Date().toISOString();
}

function randomId(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizePassword(value) {
  return String(value || "").trim();
}

function isValidUsername(value) {
  return /^[a-z0-9._-]{3,30}$/.test(String(value || "").trim());
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const normalized = normalizePassword(password);
  const derived = crypto.scryptSync(normalized, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, expected] = String(passwordHash || "").split(":");
  if (!salt || !expected) return false;
  const derived = crypto.scryptSync(normalizePassword(password), salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(derived), Buffer.from(expected));
}

function getEncryptionKey() {
  const secret = env("MINDLOG_SECRET_KEY");
  if (!secret) {
    throw new Error("MINDLOG_SECRET_KEY mancante");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

function encryptPayload(payload) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

function decryptPayload(payload) {
  const raw = Buffer.from(String(payload || ""), "base64");
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const encrypted = raw.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function signToken(payload) {
  const secret = env("MINDLOG_SESSION_SECRET");
  if (!secret) {
    throw new Error("MINDLOG_SESSION_SECRET mancante");
  }
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  const secret = env("MINDLOG_SESSION_SECRET");
  if (!secret || !token) return null;
  const [header, body, signature] = String(token).split(".");
  if (!header || !body || !signature) return null;
  const expected = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function githubConfig() {
  const token = env("GITHUB_STORAGE_TOKEN");
  const repo = env("GITHUB_STORAGE_REPO");
  const branch = env("GITHUB_STORAGE_BRANCH", "mindlog-data");
  const path = env("GITHUB_STORAGE_PATH", "secure/mindlog-db.enc");
  if (!token || !repo) {
    throw new Error("Configurazione storage GitHub incompleta");
  }
  return { token, repo, branch, path };
}

function databaseConfig() {
  const connectionString = env("DATABASE_URL");
  return {
    connectionString,
    enabled: Boolean(connectionString)
  };
}

let poolPromise = null;

async function getDatabasePool() {
  if (!databaseConfig().enabled) {
    return null;
  }
  if (!poolPromise) {
    poolPromise = (async () => {
      const postgres = await import("pg");
      const Pool = postgres.Pool;
      return new Pool({
        connectionString: databaseConfig().connectionString,
        max: 1,
        ssl: databaseConfig().connectionString.includes("localhost")
          ? false
          : { rejectUnauthorized: false }
      });
    })();
  }
  return poolPromise;
}

async function ensureDatabaseSchema() {
  const pool = await getDatabasePool();
  if (!pool) {
    return null;
  }
  await pool.query(`
    create table if not exists mindlog_state (
      id text primary key,
      payload jsonb not null,
      updated_at timestamptz not null default now()
    )
  `);
  return pool;
}

async function githubRequest(path, options = {}) {
  const { token } = githubConfig();
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status}: ${text}`);
  }
  return response;
}

function isGithubConflictError(error) {
  const message = String(error instanceof Error ? error.message : error || "").toLowerCase();
  return message.includes("github api 409") || message.includes("sha") || message.includes("is at");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateRemoteState(updater, message, options = {}) {
  const maxAttempts = Math.max(1, Number(options.maxAttempts) || 3);
  let lastError = null;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const { state, sha } = await loadRemoteState();
    const nextState = normalizeState(await updater(normalizeState(state)));
    try {
      return await saveRemoteState(nextState, sha, message);
    } catch (error) {
      lastError = error;
      if (!isGithubConflictError(error) || attempt === maxAttempts - 1) {
        throw error;
      }
      await wait(180 * (attempt + 1));
    }
  }
  throw lastError || new Error("Salvataggio remoto non riuscito.");
}

function createBaseState() {
  return {
    version: 1,
    auth: {
      therapist: {
        username: normalizeUsername(env("MINDLOG_ADMIN_USERNAME", "martina")),
        passwordHash: hashPassword(env("MINDLOG_ADMIN_PASSWORD", "1234")),
        name: "Martina"
      }
    },
    patients: [],
    tips: DEFAULT_TIPS,
    customQuestions: DEFAULT_QUESTIONS
  };
}

function createTask(title, completed = false) {
  return {
    id: randomId("task"),
    title,
    completed,
    createdAt: nowIso()
  };
}

function createPatientRecord({ name, username, password }) {
  return {
    id: randomId("patient"),
    name: String(name || username || "").trim(),
    username: normalizeUsername(username),
    passwordHash: hashPassword(password),
    createdAt: nowIso(),
    session: {
      date: futureDateString(7),
      time: "18:30",
      note: "Nessuna nota aggiunta."
    },
    tasks: [
      createTask("Fare una passeggiata di 10 minuti"),
      createTask("Bere acqua con regolarità"),
      createTask("Scrivere un pensiero positivo"),
      createTask("Ascoltare un esercizio di respirazione"),
      createTask("Chiamare una persona cara")
    ],
    entries: [],
    homeworks: [],
    exerciseHistory: [],
    stats: {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: "",
      achievements: []
    },
    gameData: {},
    draft: createEmptyDraft()
  };
}

function createEmptyDraft() {
  return {
    date: new Date().toISOString().slice(0, 10),
    mood: 6,
    anxiety: "Media",
    emotions: [],
    physicalSensations: [],
    betterToday: "",
    hardToday: "",
    gratitude: ["", "", ""],
    positiveThought: "",
    note: "",
    customAnswers: {},
    aiAnswers: {}
  };
}

function futureDateString(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function normalizeTips(tips) {
  return Array.isArray(tips) ? tips.filter(Boolean).map((tip) => ({
    id: String(tip.id || randomId("tip")),
    title: String(tip.title || "").trim(),
    category: TIP_CATEGORIES.includes(tip.category) ? tip.category : "Testo",
    type: ["Testo", "Audio", "Video", "Immagine"].includes(tip.type) ? tip.type : "Testo",
    description: String(tip.description || "").trim(),
    content: String(tip.content || "").trim()
  })).filter((tip) => tip.title && tip.description && tip.content) : DEFAULT_TIPS;
}

function normalizeQuestions(questions) {
  return Array.isArray(questions) ? questions.filter(Boolean).map((question) => ({
    id: String(question.id || randomId("question")),
    text: String(question.text || "").trim(),
    type: ["testo", "textarea", "scelta-singola", "scelta-multipla", "scala"].includes(question.type) ? question.type : "testo",
    options: Array.isArray(question.options) ? question.options.map((item) => String(item).trim()).filter(Boolean) : [],
    active: question.active !== false
  })).filter((question) => question.text) : DEFAULT_QUESTIONS;
}

function normalizePatient(patient) {
  if (!patient || typeof patient !== "object") return null;
  const username = normalizeUsername(patient.username);
  const passwordHash = patient.passwordHash || (patient.password ? hashPassword(patient.password) : "");
  if (!username || !passwordHash) return null;
  return {
    id: String(patient.id || randomId("patient")),
    name: String(patient.name || username).trim(),
    username,
    passwordHash,
    createdAt: String(patient.createdAt || nowIso()),
    session: patient.session && typeof patient.session === "object" ? {
      date: String(patient.session.date || futureDateString(7)),
      time: String(patient.session.time || "18:30"),
      note: String(patient.session.note || "Nessuna nota aggiunta.")
    } : {
      date: futureDateString(7),
      time: "18:30",
      note: "Nessuna nota aggiunta."
    },
    tasks: Array.isArray(patient.tasks) ? patient.tasks : [],
    entries: Array.isArray(patient.entries) ? patient.entries : [],
    homeworks: Array.isArray(patient.homeworks) ? patient.homeworks : [],
    exerciseHistory: Array.isArray(patient.exerciseHistory) ? patient.exerciseHistory : [],
    stats: patient.stats && typeof patient.stats === "object" ? {
      xp: Number(patient.stats.xp) || 0,
      level: Math.max(1, Number(patient.stats.level) || 1),
      streak: Math.max(0, Number(patient.stats.streak) || 0),
      lastActiveDate: String(patient.stats.lastActiveDate || ""),
      achievements: Array.isArray(patient.stats.achievements) ? patient.stats.achievements.map(String) : []
    } : {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: "",
      achievements: []
    },
    gameData: patient.gameData && typeof patient.gameData === "object" ? patient.gameData : {},
    draft: patient.draft && typeof patient.draft === "object" ? patient.draft : createEmptyDraft()
  };
}

function normalizeState(raw) {
  const base = createBaseState();
  return {
    version: 1,
    auth: {
      therapist: {
        username: normalizeUsername(raw?.auth?.therapist?.username || base.auth.therapist.username),
        passwordHash: raw?.auth?.therapist?.passwordHash || (raw?.auth?.therapist?.password ? hashPassword(raw.auth.therapist.password) : base.auth.therapist.passwordHash),
        name: String(raw?.auth?.therapist?.name || base.auth.therapist.name)
      }
    },
    patients: Array.isArray(raw?.patients) ? raw.patients.map(normalizePatient).filter(Boolean) : [],
    tips: normalizeTips(raw?.tips),
    customQuestions: normalizeQuestions(raw?.customQuestions)
  };
}

function mergeHomeworkListsForTherapist(remoteHomeworks, incomingHomeworks) {
  const remoteMap = new Map((Array.isArray(remoteHomeworks) ? remoteHomeworks : []).map((item) => [item.id, normalizeHomework(item)]));
  const merged = [];

  (Array.isArray(incomingHomeworks) ? incomingHomeworks : []).forEach((item) => {
    const incoming = normalizeHomework(item);
    if (!incoming) {
      return;
    }
    const remote = remoteMap.get(incoming.id);
    merged.push({
      ...(remote || {}),
      ...incoming,
      status: remote?.status === "completato" ? "completato" : incoming.status,
      completedAt: remote?.completedAt || incoming.completedAt || ""
    });
    remoteMap.delete(incoming.id);
  });

  return merged;
}

function mergeHomeworkListsForPatient(remoteHomeworks, incomingHomeworks) {
  const incomingMap = new Map((Array.isArray(incomingHomeworks) ? incomingHomeworks : []).map((item) => [item.id, normalizeHomework(item)]));
  return (Array.isArray(remoteHomeworks) ? remoteHomeworks : []).map((item) => {
    const remote = normalizeHomework(item);
    const incoming = incomingMap.get(remote.id);
    if (!incoming) {
      return remote;
    }
    return {
      ...remote,
      status: incoming.status === "completato" ? "completato" : remote.status,
      completedAt: incoming.completedAt || remote.completedAt || ""
    };
  });
}

function mergeTherapistPatient(remotePatient, incomingPatient) {
  const remote = normalizePatient(remotePatient);
  const incoming = normalizePatient({
    ...remotePatient,
    ...incomingPatient,
    passwordHash: remote?.passwordHash || incomingPatient?.passwordHash
  });
  if (!remote || !incoming) {
    return incoming || remote;
  }
  return normalizePatient({
    ...remote,
    name: incoming.name,
    username: incoming.username,
    session: incoming.session,
    homeworks: mergeHomeworkListsForTherapist(remote.homeworks, incoming.homeworks),
    entries: remote.entries.map((entry) => {
      const incomingEntry = incoming.entries.find((item) => item.id === entry.id);
      return sanitizeEntry({
        ...entry,
        privateNote: incomingEntry?.privateNote ?? entry.privateNote ?? ""
      });
    }).filter(Boolean),
    passwordHash: remote.passwordHash,
    createdAt: remote.createdAt,
    tasks: remote.tasks,
    exerciseHistory: remote.exerciseHistory,
    stats: remote.stats,
    gameData: remote.gameData,
    draft: remote.draft
  });
}

function mergePatientSelfUpdate(remotePatient, incomingPatient) {
  const remote = normalizePatient(remotePatient);
  const incoming = normalizePatient({
    ...remotePatient,
    ...incomingPatient,
    passwordHash: remote?.passwordHash || incomingPatient?.passwordHash
  });
  if (!remote || !incoming) {
    return incoming || remote;
  }
  return normalizePatient({
    ...remote,
    tasks: incoming.tasks,
    entries: incoming.entries.map((entry) => {
      const current = remote.entries.find((item) => item.id === entry.id);
      return sanitizeEntry({
        ...entry,
        privateNote: current?.privateNote || ""
      });
    }).filter(Boolean),
    homeworks: mergeHomeworkListsForPatient(remote.homeworks, incoming.homeworks),
    exerciseHistory: incoming.exerciseHistory,
    stats: incoming.stats,
    gameData: incoming.gameData,
    draft: incoming.draft,
    session: remote.session,
    name: remote.name,
    username: remote.username,
    passwordHash: remote.passwordHash,
    createdAt: remote.createdAt
  });
}

function normalizeHomework(homework) {
  const game = GAME_LIBRARY.find((item) => item.id === homework?.exerciseId);
  if (!game) {
    return null;
  }
  return {
    id: String(homework.id || randomId("homework")),
    exerciseId: game.id,
    title: String(homework.title || game.title),
    note: String(homework.note || ""),
    dueDate: String(homework.dueDate || futureDateString(5)),
    priority: ["Bassa", "Media", "Alta"].includes(homework.priority) ? homework.priority : "Media",
    status: ["assegnato", "completato"].includes(homework.status) ? homework.status : "assegnato",
    assignedAt: String(homework.assignedAt || nowIso()),
    completedAt: homework.completedAt ? String(homework.completedAt) : ""
  };
}

function stripSecretsFromPatient(patient) {
  const { passwordHash, ...safePatient } = patient;
  return safePatient;
}

export function createTherapistPayload(state, currentPatientId = null) {
  const normalized = normalizeState(state);
  return {
    role: "therapist",
    currentPatientId: currentPatientId && normalized.patients.some((patient) => patient.id === currentPatientId)
      ? currentPatientId
      : normalized.patients[0]?.id || null,
    state: {
      auth: {
        therapist: {
          username: normalized.auth.therapist.username,
          name: normalized.auth.therapist.name
        }
      },
      patients: normalized.patients.map(stripSecretsFromPatient),
      tips: normalized.tips,
      customQuestions: normalized.customQuestions
    }
  };
}

export function createPatientPayload(state, patientId) {
  const normalized = normalizeState(state);
  const patient = normalized.patients.find((entry) => entry.id === patientId);
  return {
    role: "patient",
    currentPatientId: patient?.id || null,
    state: {
      auth: {
        therapist: {
          username: normalized.auth.therapist.username,
          name: normalized.auth.therapist.name
        }
      },
      patients: patient ? [stripSecretsFromPatient(patient)] : [],
      tips: normalized.tips,
      customQuestions: normalized.customQuestions
    }
  };
}

export async function loadRemoteState() {
  if (databaseConfig().enabled) {
    const pool = await ensureDatabaseSchema();
    const result = await pool.query(
      "select payload from mindlog_state where id = $1 limit 1",
      ["primary"]
    );
    if (!result.rows.length) {
      const initial = normalizeState(createBaseState());
      await pool.query(
        "insert into mindlog_state (id, payload, updated_at) values ($1, $2::jsonb, now())",
        ["primary", JSON.stringify(initial)]
      );
      return { state: initial, sha: null };
    }
    return {
      state: normalizeState(result.rows[0].payload),
      sha: null
    };
  }

  const { repo, branch, path } = githubConfig();
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Authorization: `Bearer ${githubConfig().token}`,
      Accept: "application/vnd.github+json"
    }
  });
  if (response.status === 404) {
    const initial = normalizeState(createBaseState());
    return { state: initial, sha: null };
  }
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  }
  const payload = await response.json();
  const encrypted = Buffer.from(payload.content, "base64").toString("utf8");
  const decrypted = decryptPayload(encrypted);
  return {
    state: normalizeState(JSON.parse(decrypted)),
    sha: payload.sha
  };
}

export async function saveRemoteState(nextState, sha = null, message = "Aggiorna archivio MindLog") {
  const normalized = normalizeState(nextState);

  if (databaseConfig().enabled) {
    const pool = await ensureDatabaseSchema();
    await pool.query(
      `
        insert into mindlog_state (id, payload, updated_at)
        values ($1, $2::jsonb, now())
        on conflict (id)
        do update set payload = excluded.payload, updated_at = now()
      `,
      ["primary", JSON.stringify(normalized)]
    );
    return {
      state: normalized,
      sha: null
    };
  }

  const encrypted = encryptPayload(JSON.stringify(normalized));
  const { repo, branch, path } = githubConfig();
  const currentSha = sha || (await loadRemoteState()).sha || undefined;
  const response = await githubRequest(`/repos/${repo}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(encrypted, "utf8").toString("base64"),
      branch,
      ...(currentSha ? { sha: currentSha } : {})
    })
  });
  const payload = await response.json();
  return {
    state: normalized,
    sha: payload.content?.sha || currentSha || null
  };
}

export function issueSessionToken(role, patientId = null) {
  return signToken({
    role,
    patientId: patientId || null,
    exp: Date.now() + (1000 * 60 * 60 * 24 * 30)
  });
}

export function readSession(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  return verifyToken(token);
}

export async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function loginTherapist(username, password) {
  const { state } = await loadRemoteState();
  const therapist = state.auth.therapist;
  if (normalizeUsername(username) !== therapist.username || !verifyPassword(password, therapist.passwordHash)) {
    return null;
  }
  return {
    token: issueSessionToken("therapist"),
    payload: createTherapistPayload(state)
  };
}

export async function loginPatient(username, password) {
  const { state } = await loadRemoteState();
  const patient = state.patients.find((entry) => entry.username === normalizeUsername(username));
  if (!patient || !verifyPassword(password, patient.passwordHash)) {
    return null;
  }
  return {
    token: issueSessionToken("patient", patient.id),
    payload: createPatientPayload(state, patient.id)
  };
}

export async function createOrUpdatePatient(body) {
  const name = String(body.name || "").trim();
  const username = normalizeUsername(body.username);
  const password = normalizePassword(body.password);
  const id = String(body.id || "").trim();
  if (!name || !username) {
    throw new Error("Nome e nome utente sono obbligatori.");
  }
  if (!isValidUsername(username)) {
    throw new Error("Il nome utente deve avere 3-30 caratteri e può contenere solo lettere minuscole, numeri, punto, trattino o underscore.");
  }
  if (password && password.length < 4) {
    throw new Error("La password deve contenere almeno 4 caratteri.");
  }
  const saved = await updateRemoteState((remoteState) => {
    if (username === remoteState.auth.therapist.username) {
      throw new Error("Questo nome utente è riservato all'area psicologo.");
    }
    const duplicate = remoteState.patients.find((patient) => patient.username === username && patient.id !== id);
    if (duplicate) {
      throw new Error("Esiste già un paziente con questo nome utente.");
    }

    if (id) {
      const patient = remoteState.patients.find((entry) => entry.id === id);
      if (!patient) {
        throw new Error("Paziente non trovato.");
      }
      patient.name = name;
      patient.username = username;
      if (password) {
        patient.passwordHash = hashPassword(password);
      }
    } else {
      if (!password) {
        throw new Error("La password è obbligatoria per un nuovo paziente.");
      }
      remoteState.patients.unshift(createPatientRecord({ name, username, password }));
    }
    return remoteState;
  }, id ? "Aggiorna account paziente" : "Crea account paziente");
  const currentPatientId = id || saved.state.patients.find((entry) => entry.username === username)?.id || saved.state.patients[0]?.id || null;
  return createTherapistPayload(saved.state, currentPatientId);
}

export async function deletePatient(patientId) {
  const saved = await updateRemoteState((remoteState) => {
    const nextPatients = remoteState.patients.filter((entry) => entry.id !== patientId);
    if (nextPatients.length === remoteState.patients.length) {
      throw new Error("Paziente non trovato.");
    }
    remoteState.patients = nextPatients;
    return remoteState;
  }, "Elimina account paziente");
  return createTherapistPayload(saved.state, saved.state.patients[0]?.id || null);
}

export async function syncSharedState(session, clientState, currentPatientId) {
  if (session.role === "therapist") {
    const saved = await updateRemoteState((remoteState) => {
      const nextState = normalizeState(remoteState);
      nextState.tips = normalizeTips(clientState?.tips);
      nextState.customQuestions = normalizeQuestions(clientState?.customQuestions);
      if (Array.isArray(clientState?.patients)) {
        const mergedPatients = clientState.patients.map((patient) => {
          const current = nextState.patients.find((entry) => entry.id === patient.id || entry.username === normalizeUsername(patient.username));
          return mergeTherapistPatient(current, patient);
        }).filter(Boolean);
        const knownIds = new Set(mergedPatients.map((patient) => patient.id));
        nextState.patients = [
          ...mergedPatients,
          ...nextState.patients.filter((patient) => !knownIds.has(patient.id))
        ];
      }
      return nextState;
    }, "Sincronizza stato MindLog");
    return createTherapistPayload(saved.state, currentPatientId);
  }

  const patientId = session.patientId;
  const clientPatient = clientState?.patients?.find?.((entry) => entry.id === patientId) || clientState?.patients?.[0];
  if (!clientPatient) {
    throw new Error("Profilo paziente non disponibile.");
  }
  const saved = await updateRemoteState((remoteState) => {
    const nextState = normalizeState(remoteState);
    const patientIndex = nextState.patients.findIndex((entry) => entry.id === patientId);
    if (patientIndex < 0) {
      throw new Error("Profilo paziente non disponibile.");
    }
    nextState.patients[patientIndex] = mergePatientSelfUpdate(nextState.patients[patientIndex], clientPatient);
    return nextState;
  }, "Sincronizza dati paziente");
  return createPatientPayload(saved.state, patientId);
}
