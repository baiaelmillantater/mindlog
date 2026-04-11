const STORAGE_KEY = "mindlog_app_v3";
const MAX_TOASTS = 4;

const EMOTIONS = [
  "Sereno",
  "Triste",
  "Ansioso",
  "Arrabbiato",
  "Demotivato",
  "Fiducioso",
  "Stanco",
  "Confuso",
  "Sollevato",
  "Grato"
];

const PHYSICAL_SENSATIONS = [
  "Tensione",
  "Mal di testa",
  "Peso sul petto",
  "Stanchezza",
  "Agitazione",
  "Nodo alla gola",
  "Respiro corto",
  "Calma",
  "Leggerezza",
  "Nessuna in particolare"
];

const TIP_CATEGORIES = [
  "Tutti",
  "Respirazione",
  "Grounding",
  "Meditazione",
  "Messaggio dello psicologo",
  "Video",
  "Immagine",
  "Testo",
  "Audio"
];

const NEGATIVE_KEYWORDS = [
  "ansia",
  "blocc",
  "paura",
  "male",
  "croll",
  "pesante",
  "sol",
  "vuot",
  "agit",
  "stanco",
  "diffic"
];

const BREATHING_EXERCISES = [
  {
    id: "478",
    name: "Respirazione 4-7-8",
    description: "Utile per rallentare e favorire una sensazione di distensione prima di sera.",
    duration: "Circa 3 minuti",
    instructions: "Inspira per 4 secondi, trattieni per 7 ed espira lentamente per 8.",
    steps: [
      { label: "Inspira", seconds: 4, className: "inhale" },
      { label: "Trattieni", seconds: 7, className: "" },
      { label: "Espira", seconds: 8, className: "exhale" }
    ]
  },
  {
    id: "box",
    name: "Box breathing 4-4-4-4",
    description: "Una pratica regolare e ordinata per ritrovare stabilità.",
    duration: "Circa 2 minuti",
    instructions: "Inspira, trattieni, espira e fai una breve pausa: ogni fase dura 4 secondi.",
    steps: [
      { label: "Inspira", seconds: 4, className: "inhale" },
      { label: "Trattieni", seconds: 4, className: "" },
      { label: "Espira", seconds: 4, className: "exhale" },
      { label: "Pausa", seconds: 4, className: "" }
    ]
  },
  {
    id: "coerente",
    name: "Respirazione coerente 5-5",
    description: "Un ritmo morbido e continuo, adatto ai momenti in cui senti il bisogno di centrarti.",
    duration: "Circa 5 minuti",
    instructions: "Inspira per 5 secondi ed espira per 5 secondi con continuità.",
    steps: [
      { label: "Inspira", seconds: 5, className: "inhale" },
      { label: "Espira", seconds: 5, className: "exhale" }
    ]
  },
  {
    id: "personalizzato",
    name: "Respiro morbido personalizzato",
    description: "Una sequenza semplice per lasciare scendere il ritmo senza forzarlo.",
    duration: "Circa 4 minuti",
    instructions: "Inspira per 4 secondi, espira per 6 e concediti una pausa finale breve.",
    steps: [
      { label: "Inspira", seconds: 4, className: "inhale" },
      { label: "Espira", seconds: 6, className: "exhale" },
      { label: "Pausa", seconds: 2, className: "" }
    ]
  }
];

const GROUNDING_ITEMS = [
  {
    title: "Tecnica 5-4-3-2-1",
    body: "Nomina 5 cose che vedi, 4 che senti con il tatto, 3 che ascolti, 2 odori e 1 sapore."
  },
  {
    title: "Osserva cinque dettagli",
    body: "Fermati su forme, luci, colori e piccoli particolari intorno a te, senza fretta."
  },
  {
    title: "Ascolta quattro suoni",
    body: "Prova a distinguere rumori vicini e lontani, lasciando che il tuo ascolto rallenti."
  },
  {
    title: "Tocca tre oggetti",
    body: "Nota consistenza, temperatura e peso di ciò che hai accanto: il corpo può aiutarti a rientrare nel presente."
  },
  {
    title: "Respira lentamente",
    body: "Concediti tre respiri lenti e morbidi. Non serve farli perfetti: conta il ritmo, non la prestazione."
  },
  {
    title: "Frase di rientro",
    body: "Ripeti con calma: “Sono qui, adesso. Posso fare un passo alla volta.”"
  }
];

const MOTIVATIONS = [
  "Anche una pausa breve può diventare un gesto di cura importante.",
  "Dare un nome a ciò che senti è già un modo concreto di prenderti sul serio.",
  "Non serve fare tutto oggi: basta scegliere il passo più gentile.",
  "Osservarti con calma può rendere la giornata più abitabile."
];

const refs = {};

const uiState = {
  currentRole: null,
  loginRole: null,
  currentPatientId: null,
  patientSection: "patientHome",
  therapistSection: "therapistDashboard",
  tipFilter: "Tutti",
  taskFilter: "tutte",
  selectedBreathingId: BREATHING_EXERCISES[0].id,
  breathingTimer: null,
  breathingState: null,
  countdownTimer: null,
  aiQuestions: [],
  draft: null,
  revealObserver: null,
  activeModal: null,
  lastFocusedElement: null
};

let state;

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheDom();
  state = loadState();
  uiState.draft = createEmptyDraft();
  populateTipCategories();
  bindEvents();
  initRevealObserver();
  renderAll();
  startCountdown();
}

function cacheDom() {
  const ids = [
    "topbar", "topbarLabel", "topbarTitle", "homeShortcutButton", "logoutButton",
    "landingScreen", "patientScreen", "therapistScreen",
    "loginModal", "closeLoginModal", "loginRoleLabel", "loginTitle", "loginText", "loginForm", "usernameInput", "passwordInput", "loginError",
    "detailModal", "closeDetailModal", "detailContent", "toastStack",
    "patientSidebarText", "motivationText", "sessionTitle", "sessionNote", "countDays", "countHours", "countMinutes", "countSeconds", "recentEntriesList", "focusSummary",
    "sheetDateLabel", "dailySheetForm", "moodRange", "moodValue", "anxietySelect", "emotionChips", "physicalChips", "betterInput", "hardInput",
    "gratitude1", "gratitude2", "gratitude3", "positiveInput", "noteInput", "customQuestionsBox", "aiQuestionsBox", "advicePreview", "resetSheetButton", "draftStatus",
    "tipFilters", "tipsGrid", "breathingList", "groundingList", "breathingOrb", "breathingPhase", "breathingTitle", "breathingInstruction", "breathingCycle", "breathingTime", "startBreathingButton", "stopBreathingButton",
    "taskForm", "taskInput", "taskFilters", "taskList", "historyList",
    "therapistSidebarText", "therapistStats", "moodChart", "weeklySummary", "recordList", "selectedPatientBanner",
    "tipForm", "tipId", "tipTitle", "tipCategory", "tipType", "tipDescription", "tipContent", "resetTipButton", "manageTipsGrid",
    "sessionForm", "sessionDateInput", "sessionTimeInput", "sessionNoteInput", "sessionPreview",
    "questionForm", "questionId", "questionText", "questionType", "questionOptions", "questionOptionsHelp", "questionActive", "resetQuestionButton", "manageQuestionsList",
    "patientAccountForm", "patientAccountId", "patientNameInput", "patientUsernameInput", "patientPasswordInput", "resetPatientAccountButton", "patientSelectionSummary", "patientAccountsList"
  ];

  ids.forEach((id) => {
    refs[id] = document.getElementById(id);
  });
}

function bindEvents() {
  document.addEventListener("keydown", handleGlobalKeydown);

  document.querySelectorAll("[data-open-login]").forEach((button) => {
    button.addEventListener("click", () => openLogin(button.dataset.openLogin));
  });

  refs.closeLoginModal.addEventListener("click", closeLoginModal);
  refs.loginModal.addEventListener("click", (event) => {
    if (event.target === refs.loginModal) {
      closeLoginModal();
    }
  });
  refs.loginForm.addEventListener("submit", handleLogin);

  refs.closeDetailModal.addEventListener("click", closeDetailModal);
  refs.detailModal.addEventListener("click", (event) => {
    if (event.target === refs.detailModal) {
      closeDetailModal();
    }
  });

  refs.logoutButton.addEventListener("click", logout);
  refs.homeShortcutButton.addEventListener("click", () => {
    if (uiState.currentRole === "patient") {
      switchSection("patient", "patientHome");
    } else if (uiState.currentRole === "therapist") {
      switchSection("therapist", "therapistDashboard");
    }
  });

  document.querySelectorAll("[data-role-area]").forEach((button) => {
    button.addEventListener("click", () => switchSection(button.dataset.roleArea, button.dataset.target));
  });

  document.querySelectorAll("[data-jump-section]").forEach((button) => {
    button.addEventListener("click", () => switchSection("patient", button.dataset.jumpSection));
  });

  refs.moodRange.addEventListener("input", () => {
    uiState.draft.mood = Number(refs.moodRange.value);
    renderDynamicSheet();
  });

  refs.anxietySelect.addEventListener("change", () => {
    uiState.draft.anxiety = refs.anxietySelect.value;
    renderDynamicSheet();
  });

  [refs.betterInput, refs.hardInput, refs.gratitude1, refs.gratitude2, refs.gratitude3, refs.positiveInput, refs.noteInput].forEach((field) => {
    field.addEventListener("input", handleDraftTextInput);
  });

  refs.emotionChips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip]");
    if (!chip) {
      return;
    }
    toggleChip("emotions", chip.dataset.chip);
  });

  refs.physicalChips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip]");
    if (!chip) {
      return;
    }
    toggleChip("physicalSensations", chip.dataset.chip);
  });

  refs.customQuestionsBox.addEventListener("input", handleCustomAnswerInput);
  refs.customQuestionsBox.addEventListener("change", handleCustomAnswerInput);
  refs.aiQuestionsBox.addEventListener("input", handleAiAnswerInput);

  refs.dailySheetForm.addEventListener("submit", saveDailySheet);
  refs.resetSheetButton.addEventListener("click", () => resetDraft(true));

  refs.tipFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tip-filter]");
    if (!button) {
      return;
    }
    uiState.tipFilter = button.dataset.tipFilter;
    renderTips();
  });

  refs.tipsGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-tip-open]");
    if (!trigger) {
      return;
    }
    openTipDetail(trigger.dataset.tipOpen);
  });

  refs.breathingList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-breathing]");
    if (!button) {
      return;
    }
    uiState.selectedBreathingId = button.dataset.breathing;
    renderBreathing();
  });

  refs.startBreathingButton.addEventListener("click", startBreathing);
  refs.stopBreathingButton.addEventListener("click", () => stopBreathing(true));

  refs.taskForm.addEventListener("submit", addTask);
  refs.taskFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-filter]");
    if (!button) {
      return;
    }
    uiState.taskFilter = button.dataset.taskFilter;
    renderTasks();
  });

  refs.taskList.addEventListener("click", handleTaskActions);
  refs.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-entry-open]");
    if (!button) {
      return;
    }
    openEntryDetail(button.dataset.entryOpen, false);
  });

  refs.recordList.addEventListener("click", handleRecordActions);

  refs.tipForm.addEventListener("submit", saveTip);
  refs.resetTipButton.addEventListener("click", resetTipForm);
  refs.manageTipsGrid.addEventListener("click", handleManageTipActions);

  refs.sessionForm.addEventListener("submit", saveSession);

  refs.questionForm.addEventListener("submit", saveQuestion);
  refs.resetQuestionButton.addEventListener("click", resetQuestionForm);
  refs.questionType.addEventListener("change", updateQuestionOptionsState);
  refs.manageQuestionsList.addEventListener("click", handleManageQuestionActions);

  refs.patientAccountForm.addEventListener("submit", savePatientAccount);
  refs.resetPatientAccountButton.addEventListener("click", resetPatientAccountForm);
  refs.patientAccountsList.addEventListener("click", handlePatientAccountActions);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const demo = createDemoState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
      return demo;
    }
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch (error) {
    const demo = createDemoState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  }
}

function sanitizeState(value) {
  const demo = createDemoState();
  const raw = value && typeof value === "object" ? value : {};
  return {
    auth: sanitizeAuth(raw.auth, demo.auth),
    tips: Array.isArray(raw.tips) && raw.tips.length ? raw.tips.map(sanitizeTip).filter(Boolean) : demo.tips,
    patients: Array.isArray(raw.patients) ? raw.patients.map(sanitizePatient).filter(Boolean) : demo.patients,
    customQuestions: Array.isArray(raw.customQuestions) && raw.customQuestions.length ? raw.customQuestions.map(sanitizeQuestion).filter(Boolean) : demo.customQuestions,
    drafts: sanitizeDraftStore(raw.drafts)
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showToast("Salvataggio non riuscito", "Non è stato possibile aggiornare i dati su questo dispositivo.");
  }
}

function createDemoState() {
  return {
    auth: {
      therapist: {
        username: "martina",
        password: "1234",
        name: "Martina"
      }
    },
    tips: [
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
      },
      {
        id: "tip-6",
        title: "Tre segnali di sovraccarico",
        category: "Testo",
        type: "Testo",
        description: "Una lettura breve per riconoscere in anticipo quando la giornata sta diventando troppo intensa.",
        content: "I segnali più comuni possono essere irritabilità, respiro corto e difficoltà a restare sul presente. Accorgersene presto permette di intervenire con un gesto piccolo."
      }
    ],
    patients: [],
    customQuestions: [
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
      },
      {
        id: "question-3",
        text: "In quale momento della giornata ti sei sentito più sostenuto?",
        type: "scelta-singola",
        options: ["Mattina", "Pomeriggio", "Sera"],
        active: false
      }
    ],
    drafts: {}
  };
}

function createTask(title, completed, offset) {
  return {
    id: `task-${Math.random().toString(36).slice(2, 9)}`,
    title,
    completed,
    createdAt: createDateTime(dateOffset(offset), "09:00")
  };
}

function createPatientAccount(name, username, password) {
  return {
    id: `patient-${Date.now()}`,
    name,
    username,
    password,
    createdAt: new Date().toISOString(),
    session: {
      date: dateOffset(7),
      time: "18:30",
      note: "Nessuna nota aggiunta."
    },
    tasks: [
      createTask("Fare una passeggiata di 10 minuti", false, 0),
      createTask("Bere acqua con regolarità", false, 0),
      createTask("Scrivere un pensiero positivo", false, 0)
    ],
    entries: []
  };
}

function createEmptyDraft() {
  return {
    date: formatDateInput(new Date()),
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

function sanitizeAuth(auth, fallback) {
  const therapist = auth?.therapist || {};
  return {
    therapist: {
      username: normalizeUsername(therapist.username) || fallback.therapist.username,
      password: normalizePassword(therapist.password) || fallback.therapist.password,
      name: String(therapist.name || fallback.therapist.name)
    }
  };
}

function sanitizeSession(session, fallback) {
  return {
    date: isDateInput(session?.date) ? session.date : fallback.date,
    time: isTimeInput(session?.time) ? session.time : fallback.time,
    note: typeof session?.note === "string" ? session.note : fallback.note
  };
}

function sanitizePatient(patient) {
  if (!patient || typeof patient !== "object") {
    return null;
  }
  const username = normalizeUsername(patient.username);
  const password = normalizePassword(patient.password);
  if (!username || !password) {
    return null;
  }
  return {
    id: String(patient.id || `patient-${Date.now()}`),
    name: String(patient.name || username),
    username,
    password,
    createdAt: typeof patient.createdAt === "string" ? patient.createdAt : new Date().toISOString(),
    session: sanitizeSession(patient.session, {
      date: dateOffset(7),
      time: "18:30",
      note: "Nessuna nota aggiunta."
    }),
    tasks: Array.isArray(patient.tasks) ? patient.tasks.map(sanitizeTask).filter(Boolean) : [],
    entries: Array.isArray(patient.entries) ? patient.entries.map(sanitizeEntry).filter(Boolean) : []
  };
}

function sanitizeTip(tip) {
  if (!tip || typeof tip !== "object") {
    return null;
  }
  const title = String(tip.title || "").trim();
  const description = String(tip.description || "").trim();
  const content = String(tip.content || "").trim();
  const category = TIP_CATEGORIES.includes(tip.category) ? tip.category : "Testo";
  const type = ["Testo", "Audio", "Video", "Immagine"].includes(tip.type) ? tip.type : "Testo";
  if (!title || !description || !content) {
    return null;
  }
  return {
    id: String(tip.id || `tip-${Date.now()}`),
    title,
    category,
    type,
    description,
    content
  };
}

function sanitizeTask(task) {
  if (!task || typeof task !== "object") {
    return null;
  }
  const title = String(task.title || "").trim();
  if (!title) {
    return null;
  }
  return {
    id: String(task.id || `task-${Date.now()}`),
    title,
    completed: Boolean(task.completed),
    createdAt: typeof task.createdAt === "string" ? task.createdAt : new Date().toISOString()
  };
}

function sanitizeQuestion(question) {
  if (!question || typeof question !== "object") {
    return null;
  }
  const validTypes = ["testo", "textarea", "scelta-singola", "scelta-multipla", "scala"];
  const type = validTypes.includes(question.type) ? question.type : "testo";
  const text = String(question.text || "").trim();
  if (!text) {
    return null;
  }
  return {
    id: String(question.id || `question-${Date.now()}`),
    text,
    type,
    options: Array.isArray(question.options) ? question.options.map((item) => String(item).trim()).filter(Boolean) : [],
    active: question.active !== false
  };
}

function sanitizeEntry(entry) {
  if (!entry || typeof entry !== "object" || !isDateInput(entry.date)) {
    return null;
  }
  return {
    id: String(entry.id || `entry-${Date.now()}`),
    date: entry.date,
    createdAt: typeof entry.createdAt === "string" ? entry.createdAt : new Date(`${entry.date}T12:00:00`).toISOString(),
    mood: clamp(Number(entry.mood) || 6, 1, 10),
    anxiety: ["Nessuna", "Bassa", "Media", "Alta", "Molto alta"].includes(entry.anxiety) ? entry.anxiety : "Media",
    emotions: Array.isArray(entry.emotions) ? entry.emotions.filter(Boolean) : [],
    physicalSensations: Array.isArray(entry.physicalSensations) ? entry.physicalSensations.filter(Boolean) : [],
    betterToday: String(entry.betterToday || ""),
    hardToday: String(entry.hardToday || ""),
    gratitude: Array.isArray(entry.gratitude) ? entry.gratitude.slice(0, 3).map((item) => String(item || "")) : ["", "", ""],
    positiveThought: String(entry.positiveThought || ""),
    note: String(entry.note || ""),
    customAnswers: Array.isArray(entry.customAnswers) ? entry.customAnswers.map((item) => ({
      questionId: String(item.questionId || ""),
      questionText: String(item.questionText || ""),
      type: String(item.type || "testo"),
      answer: Array.isArray(item.answer) ? item.answer.map((value) => String(value)) : String(item.answer || "")
    })) : [],
    aiQuestions: Array.isArray(entry.aiQuestions) ? entry.aiQuestions.map((item) => ({
      id: String(item.id || ""),
      question: String(item.question || ""),
      answer: String(item.answer || "")
    })) : [],
    advice: String(entry.advice || ""),
    privateNote: String(entry.privateNote || "")
  };
}

function sanitizeDraft(draft) {
  const fresh = createEmptyDraft();
  if (!draft || typeof draft !== "object") {
    return fresh;
  }
  const today = formatDateInput(new Date());
  if (!isDateInput(draft.date) || draft.date !== today) {
    return fresh;
  }
  return {
    date: today,
    mood: clamp(Number(draft.mood) || 6, 1, 10),
    anxiety: ["Nessuna", "Bassa", "Media", "Alta", "Molto alta"].includes(draft.anxiety) ? draft.anxiety : "Media",
    emotions: Array.isArray(draft.emotions) ? draft.emotions.filter((item) => EMOTIONS.includes(item)) : [],
    physicalSensations: Array.isArray(draft.physicalSensations) ? draft.physicalSensations.filter((item) => PHYSICAL_SENSATIONS.includes(item)) : [],
    betterToday: String(draft.betterToday || ""),
    hardToday: String(draft.hardToday || ""),
    gratitude: Array.isArray(draft.gratitude)
      ? [0, 1, 2].map((index) => String(draft.gratitude[index] || ""))
      : ["", "", ""],
    positiveThought: String(draft.positiveThought || ""),
    note: String(draft.note || ""),
    customAnswers: draft.customAnswers && typeof draft.customAnswers === "object"
      ? Object.fromEntries(Object.entries(draft.customAnswers).map(([key, value]) => [key, Array.isArray(value) ? value.map((item) => String(item)) : String(value || "")]))
      : {},
    aiAnswers: draft.aiAnswers && typeof draft.aiAnswers === "object"
      ? Object.fromEntries(Object.entries(draft.aiAnswers).map(([key, value]) => [key, String(value || "")]))
      : {}
  };
}

function sanitizeDraftStore(store) {
  if (!store || typeof store !== "object") {
    return {};
  }
  return Object.fromEntries(
    Object.entries(store)
      .map(([patientId, draft]) => [patientId, sanitizeDraft(draft)])
  );
}

function renderAll() {
  ensureSelectedPatient();
  renderShell();
  renderPatientHome();
  renderSheet();
  renderTips();
  renderBreathing();
  renderGrounding();
  renderTasks();
  renderHistory();
  renderTherapistDashboard();
  renderPatientAccounts();
  renderRecords();
  renderManageTips();
  renderSession();
  renderQuestionManager();
  updateQuestionOptionsState();
  refreshRevealTargets();
}

function ensureSelectedPatient() {
  if (uiState.currentPatientId && state.patients.some((item) => item.id === uiState.currentPatientId)) {
    return;
  }
  uiState.currentPatientId = state.patients[0]?.id || null;
  uiState.draft = getStoredDraft(uiState.currentPatientId);
}

function getStoredDraft(patientId) {
  if (!patientId) {
    return createEmptyDraft();
  }
  return sanitizeDraft(state.drafts?.[patientId]);
}

function renderShell() {
  const role = uiState.currentRole;
  const patient = getSelectedPatient();
  refs.topbar.classList.toggle("hidden", !role);
  refs.landingScreen.classList.toggle("hidden", Boolean(role));
  refs.patientScreen.classList.toggle("hidden", role !== "patient");
  refs.therapistScreen.classList.toggle("hidden", role !== "therapist");

  if (role === "patient") {
    refs.topbarLabel.textContent = patient ? `Area paziente · ${patient.name}` : "Area paziente";
    refs.topbarTitle.textContent = getSectionTitle(uiState.patientSection);
  } else if (role === "therapist") {
    refs.topbarLabel.textContent = `Area psicologo · ${state.auth.therapist.name}`;
    refs.topbarTitle.textContent = getSectionTitle(uiState.therapistSection);
  }

  syncPanels("patient", uiState.patientSection);
  syncPanels("therapist", uiState.therapistSection);
}

function syncPanels(role, activeId) {
  const screen = role === "patient" ? refs.patientScreen : refs.therapistScreen;
  if (!screen) {
    return;
  }

  screen.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== activeId);
    panel.classList.toggle("active", panel.id === activeId);
  });

  document.querySelectorAll(`[data-role-area="${role}"]`).forEach((button) => {
    const isActive = button.dataset.target === activeId;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function renderPatientHome() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.motivationText.textContent = "Il tuo psicologo creerà il tuo accesso personale, poi potrai iniziare a usare MindLog.";
    refs.patientSidebarText.textContent = "Non risulta ancora un profilo paziente attivo su questo dispositivo.";
    refs.recentEntriesList.innerHTML = `<div class="empty-state">Non è ancora disponibile un account paziente da usare in quest’area.</div>`;
    refs.focusSummary.innerHTML = `<p>Quando il tuo psicologo creerà l’account, qui troverai andamento, compilazioni recenti e una sintesi delicata del percorso.</p>`;
    updateCountdown();
    return;
  }
  const entries = getEntriesDescending();
  const latest = entries[0];
  refs.motivationText.textContent = latest ? getMotivationFromEntry(latest) : MOTIVATIONS[0];
  refs.patientSidebarText.textContent = latest
    ? `Negli ultimi giorni ricorrono soprattutto ${getTopItems(entries.slice(0, 5).flatMap((item) => item.emotions), 1)[0] || "segnali misti"}. Guardare questi andamenti con calma può aiutarti a capire meglio di cosa hai bisogno.`
    : "Compilare con continuità anche pochi campi può già offrirti un punto di orientamento.";

  refs.recentEntriesList.innerHTML = entries.length
    ? entries.slice(0, 3).map((entry) => `
      <div class="stack-item">
        <div class="meta-row">
          <span class="meta-pill">${formatLongDate(entry.date)}</span>
          <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
        </div>
        <strong>${escapeHtml(makePreview(entry.positiveThought || entry.betterToday || "Giornata registrata", 60))}</strong>
        <span>${escapeHtml(makePreview(entry.hardToday || entry.note || "Apri lo storico per leggere tutti i dettagli.", 110))}</span>
      </div>
    `).join("")
    : `<div class="empty-state">Le compilazioni appariranno qui non appena inizierai a usare la scheda giornaliera.</div>`;

  if (latest) {
    const emotions = getTopItems(entries.slice(0, 6).flatMap((item) => item.emotions), 2);
    const avg = (entries.slice(0, 5).reduce((sum, item) => sum + item.mood, 0) / Math.min(entries.length, 5)).toFixed(1);
    refs.focusSummary.innerHTML = `
      <p>Negli ultimi giorni hai registrato <strong>${entries.length}</strong> compilazioni. L’ultima mostra un umore di <strong>${latest.mood}/10</strong> con ansia <strong>${escapeHtml(latest.anxiety)}</strong>.</p>
      <p>Tra gli elementi che ricorrono emergono <strong>${escapeHtml(emotions.join(", ") || "segnali vari")}</strong> e un umore medio recente di <strong>${avg}/10</strong>.</p>
    `;
  } else {
    refs.focusSummary.innerHTML = `<p>Qui troverai una sintesi delicata delle tue compilazioni recenti e dei segnali che emergono con maggiore continuità.</p>`;
  }

  updateCountdown();
}

function renderSheet() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.sheetDateLabel.textContent = formatLongDate(formatDateInput(new Date()));
    refs.draftStatus.innerHTML = `<strong>Account non disponibile</strong><span>Per compilare la scheda serve prima un account paziente creato dallo psicologo.</span>`;
    refs.emotionChips.innerHTML = "";
    refs.physicalChips.innerHTML = "";
    refs.customQuestionsBox.innerHTML = `<div class="empty-state">Appena verrà creato il profilo paziente, qui compariranno le domande della scheda.</div>`;
    refs.aiQuestionsBox.innerHTML = `<div class="empty-state">Le domande dinamiche compariranno quando inizierai a compilare la scheda.</div>`;
    refs.advicePreview.textContent = "Il consiglio finale sarà disponibile dopo la compilazione.";
    refs.dailySheetForm.querySelectorAll("input, select, textarea, button").forEach((element) => {
      if (element.id !== "resetSheetButton") {
        element.disabled = true;
      }
    });
    return;
  }
  refs.dailySheetForm.querySelectorAll("input, select, textarea, button").forEach((element) => {
    element.disabled = false;
  });
  uiState.draft.date = formatDateInput(new Date());
  refs.sheetDateLabel.textContent = formatLongDate(uiState.draft.date);
  refs.draftStatus.innerHTML = isDraftMeaningful(uiState.draft)
    ? `<strong>Bozza in corso</strong><span>Le risposte inserite oggi restano salvate su questo dispositivo fino al salvataggio finale o al ripristino.</span>`
    : `<strong>Scheda pronta</strong><span>Compila con calma: puoi fermarti e riprendere quando vuoi durante la giornata.</span>`;
  refs.moodRange.value = uiState.draft.mood;
  refs.anxietySelect.value = uiState.draft.anxiety;
  refs.betterInput.value = uiState.draft.betterToday;
  refs.hardInput.value = uiState.draft.hardToday;
  refs.gratitude1.value = uiState.draft.gratitude[0] || "";
  refs.gratitude2.value = uiState.draft.gratitude[1] || "";
  refs.gratitude3.value = uiState.draft.gratitude[2] || "";
  refs.positiveInput.value = uiState.draft.positiveThought;
  refs.noteInput.value = uiState.draft.note;
  refs.emotionChips.innerHTML = renderChipSet(EMOTIONS, uiState.draft.emotions);
  refs.physicalChips.innerHTML = renderChipSet(PHYSICAL_SENSATIONS, uiState.draft.physicalSensations);
  renderCustomQuestions();
  renderDynamicSheet();
}

function renderDynamicSheet() {
  refs.moodValue.textContent = `${uiState.draft.mood} / 10`;
  const aiQuestions = buildAiQuestions(uiState.draft).slice(0, 5);
  const previousAnswers = uiState.draft.aiAnswers;
  uiState.aiQuestions = aiQuestions;
  uiState.draft.aiAnswers = aiQuestions.reduce((acc, item) => {
    acc[item.id] = previousAnswers[item.id] || "";
    return acc;
  }, {});

  refs.aiQuestionsBox.innerHTML = aiQuestions.length
    ? aiQuestions.map((item) => `
      <div class="question-card-block">
        <label class="field-label" for="ai-${item.id}">
          <span>${escapeHtml(item.question)}</span>
        </label>
        <textarea id="ai-${item.id}" rows="3" data-ai-id="${item.id}" placeholder="Se vuoi, puoi rispondere qui con calma.">${escapeHtml(uiState.draft.aiAnswers[item.id])}</textarea>
      </div>
    `).join("")
    : `<div class="empty-state">Le domande di approfondimento appariranno qui in modo dinamico, in base a ciò che stai compilando.</div>`;

  refs.advicePreview.textContent = buildAdvice(uiState.draft);
  persistDraft();
}

function renderCustomQuestions() {
  const activeQuestions = state.customQuestions.filter((item) => item.active);
  refs.customQuestionsBox.innerHTML = activeQuestions.length
    ? activeQuestions.map((item) => renderCustomQuestionField(item)).join("")
    : `<div class="empty-state">Al momento non ci sono domande personalizzate attive. La scheda si aggiornerà automaticamente quando verranno aggiunte.</div>`;
}

function renderTips() {
  const dynamicCategories = new Set(state.tips.map((tip) => tip.category));
  const categories = TIP_CATEGORIES.filter((item) => item === "Tutti" || dynamicCategories.has(item));
  if (!categories.includes(uiState.tipFilter)) {
    uiState.tipFilter = "Tutti";
  }

  refs.tipFilters.innerHTML = categories.map((category) => `
    <button class="filter-pill ${uiState.tipFilter === category ? "active" : ""}" type="button" aria-pressed="${uiState.tipFilter === category ? "true" : "false"}" data-tip-filter="${escapeAttribute(category)}">${escapeHtml(category)}</button>
  `).join("");

  const visibleTips = state.tips.filter((tip) => uiState.tipFilter === "Tutti" || tip.category === uiState.tipFilter);
  refs.tipsGrid.innerHTML = visibleTips.length
    ? visibleTips.map((tip, index) => `
      <article class="tip-card reveal" data-delay="${Math.min(index * 40, 180)}">
        <div class="meta-row">
          <span class="meta-pill">${escapeHtml(tip.category)}</span>
          <span class="meta-pill secondary">${escapeHtml(tip.type)}</span>
        </div>
        <strong>${escapeHtml(tip.title)}</strong>
        <span>${escapeHtml(tip.description)}</span>
        <div class="tip-actions">
          <button class="ghost-button small-button" type="button" data-tip-open="${tip.id}">${getTipActionLabel(tip.type)}</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">Non ci sono contenuti in questa categoria al momento.</div>`;
}

function renderBreathing() {
  refs.breathingList.innerHTML = BREATHING_EXERCISES.map((exercise) => `
    <button class="tip-card ${uiState.selectedBreathingId === exercise.id ? "selected-card" : ""}" type="button" aria-pressed="${uiState.selectedBreathingId === exercise.id ? "true" : "false"}" data-breathing="${exercise.id}">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(exercise.duration)}</span>
      </div>
      <strong>${escapeHtml(exercise.name)}</strong>
      <span>${escapeHtml(exercise.description)}</span>
    </button>
  `).join("");

  const current = BREATHING_EXERCISES.find((item) => item.id === uiState.selectedBreathingId);
  refs.breathingTitle.textContent = current ? current.name : "Seleziona un esercizio";
  refs.breathingInstruction.textContent = current ? current.instructions : "Qui troverai la guida passo dopo passo.";
  if (!uiState.breathingState) {
    refs.breathingPhase.textContent = "Pronto";
    refs.breathingCycle.textContent = `Fase: ${current ? current.steps[0].label : "-"}`;
    refs.breathingTime.textContent = "Tempo: 00:00";
    refs.breathingOrb.classList.remove("inhale", "exhale");
  }
  updateBreathingControls();
}

function renderGrounding() {
  refs.groundingList.innerHTML = GROUNDING_ITEMS.map((item) => `
    <div class="grounding-step">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.body)}</span>
    </div>
  `).join("");
}

function renderTasks() {
  const patient = getSelectedPatient();
  const filters = [
    { key: "tutte", label: "Tutte" },
    { key: "completate", label: "Completate" },
    { key: "da-fare", label: "Da fare" }
  ];
  refs.taskFilters.innerHTML = filters.map((item) => `
    <button class="filter-pill ${uiState.taskFilter === item.key ? "active" : ""}" type="button" aria-pressed="${uiState.taskFilter === item.key ? "true" : "false"}" data-task-filter="${item.key}">${item.label}</button>
  `).join("");

  const tasks = patient ? [...patient.tasks].sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt.localeCompare(a.createdAt)) : [];
  const visible = tasks.filter((task) => {
    if (uiState.taskFilter === "completate") {
      return task.completed;
    }
    if (uiState.taskFilter === "da-fare") {
      return !task.completed;
    }
    return true;
  });

  refs.taskList.innerHTML = visible.length
    ? visible.map((task, index) => `
      <article class="task-card ${task.completed ? "completed" : ""} reveal" data-delay="${Math.min(index * 35, 180)}">
        <button class="task-toggle" type="button" data-task-toggle="${task.id}">✓</button>
        <div>
          <strong class="task-title">${escapeHtml(task.title)}</strong>
          <div class="task-meta">${task.completed ? "Completata" : "Da fare"}</div>
        </div>
        <div class="task-actions">
          <button class="task-delete" type="button" data-task-delete="${task.id}">✕</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">${patient ? "Nessuna attività in questo filtro. Puoi aggiungerne una nuova sopra." : "Serve prima un account paziente per usare questa lista."}</div>`;
}

function renderHistory() {
  const entries = getEntriesDescending();
  refs.historyList.innerHTML = entries.length
    ? entries.map((entry, index) => `
      <button class="tip-card reveal" type="button" data-entry-open="${entry.id}" data-delay="${Math.min(index * 35, 180)}">
        <div class="meta-row">
          <span class="meta-pill">${formatLongDate(entry.date)}</span>
          <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
          <span class="meta-pill">${escapeHtml(entry.anxiety)}</span>
        </div>
        <strong>${escapeHtml(makePreview(entry.positiveThought || entry.betterToday || "Scheda quotidiana", 70))}</strong>
        <span>${escapeHtml(makePreview(entry.hardToday || entry.note || "Apri la scheda per rileggere tutti i dettagli.", 120))}</span>
      </button>
    `).join("")
    : `<div class="empty-state">Non ci sono ancora compilazioni salvate. Quando completerai la scheda, lo storico comparirà qui.</div>`;
}

function renderTherapistDashboard() {
  const patient = getSelectedPatient();
  const entries = getEntriesDescending();
  const recent = entriesWithinDays(7);
  const averageMood = recent.length ? (recent.reduce((sum, item) => sum + item.mood, 0) / recent.length).toFixed(1) : "0";
  const commonAnxiety = getTopItems(recent.map((item) => item.anxiety), 1)[0] || "Nessuna";
  const commonEmotion = getTopItems(recent.flatMap((item) => item.emotions), 1)[0] || "Nessuna ricorrenza";

  refs.selectedPatientBanner.innerHTML = patient
    ? `<strong>Paziente attivo</strong><span>Stai osservando il profilo di <strong>${escapeHtml(patient.name)}</strong> con utente <strong>${escapeHtml(patient.username)}</strong>.</span>`
    : `<strong>Nessun paziente selezionato</strong><span>Crea il primo account paziente per iniziare a usare dashboard, schede e impostazioni dedicate.</span>`;

  refs.therapistSidebarText.textContent = patient && entries.length
    ? `Per ${patient.name} emergono soprattutto ${commonEmotion.toLowerCase()} e un livello di ansia ${commonAnxiety.toLowerCase()}. La prossima seduta è fissata per ${formatSessionLong(patient.session)}.`
    : patient
      ? `Il profilo di ${patient.name} è pronto. Appena inizierà a compilare, qui vedrai andamento, ricorrenze e dati utili tra le sedute.`
      : "Crea un account paziente per iniziare a usare la dashboard in modo completo.";

  const stats = [
    { label: "Numero schede compilate", value: String(entries.length), text: patient ? `Schede disponibili per ${patient.name}` : "Nessun profilo selezionato" },
    { label: "Umore medio ultimi 7 giorni", value: `${averageMood}/10`, text: "Media delle compilazioni recenti" },
    { label: "Ansia più frequente", value: commonAnxiety, text: "Livello più ricorrente" },
    { label: "Prossima seduta", value: formatSessionShort(patient?.session), text: "Impostazione attuale" }
  ];

  refs.therapistStats.innerHTML = stats.map((item, index) => `
    <div class="stat-card reveal" data-delay="${Math.min(index * 40, 140)}">
      <span class="mini-label">${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <span>${escapeHtml(item.text)}</span>
    </div>
  `).join("");

  refs.weeklySummary.innerHTML = patient ? `
    <p><strong>Schede negli ultimi 7 giorni:</strong> ${recent.length}</p>
    <p><strong>Umore medio:</strong> ${averageMood}/10</p>
    <p><strong>Ansia più frequente:</strong> ${escapeHtml(commonAnxiety)}</p>
    <p><strong>Emozione ricorrente:</strong> ${escapeHtml(commonEmotion)}</p>
    <p><strong>Sensazioni più presenti:</strong> ${escapeHtml(getTopItems(recent.flatMap((item) => item.physicalSensations), 2).join(", ") || "Nessuna ricorrenza evidente")}</p>
  ` : `<p>Non è ancora presente un paziente attivo. Crea un account nella sezione Pazienti per iniziare.</p>`;

  renderMoodChart();
}

function renderRecords() {
  const entries = getEntriesDescending();
  refs.recordList.innerHTML = entries.length
    ? entries.map((entry, index) => `
      <article class="record-card reveal" data-delay="${Math.min(index * 30, 180)}">
        <div class="record-tags">
          <span class="meta-pill">${formatLongDate(entry.date)}</span>
          <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
          <span class="meta-pill">${escapeHtml(entry.anxiety)}</span>
        </div>
        <strong>${escapeHtml(makePreview(entry.betterToday || entry.positiveThought || "Scheda quotidiana", 78))}</strong>
        <span>${escapeHtml(makePreview(entry.hardToday || entry.note || "Apri per leggere tutte le risposte e le domande AI.", 120))}</span>
        <div class="record-tags">${entry.emotions.map((emotion) => `<span class="meta-pill">${escapeHtml(emotion)}</span>`).join("")}</div>
        <div class="field-block">
          <span>Nota privata dello psicologo</span>
          <textarea rows="3" data-record-note="${entry.id}" placeholder="Aggiungi una nota privata visibile solo qui.">${escapeHtml(entry.privateNote || "")}</textarea>
        </div>
        <div class="inline-actions">
          <button class="ghost-button small-button" type="button" data-record-open="${entry.id}">Apri dettaglio</button>
          <button class="primary-button small-button" type="button" data-record-save="${entry.id}">Salva nota privata</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">${getSelectedPatient() ? "Le schede compilate appariranno qui non appena il paziente inizierà a registrare le giornate." : "Seleziona o crea un paziente per vedere qui le sue compilazioni."}</div>`;
}

function renderManageTips() {
  refs.manageTipsGrid.innerHTML = state.tips.length
    ? state.tips.map((tip, index) => `
      <article class="tip-card reveal" data-delay="${Math.min(index * 35, 180)}">
        <div class="meta-row">
          <span class="meta-pill">${escapeHtml(tip.category)}</span>
          <span class="meta-pill secondary">${escapeHtml(tip.type)}</span>
        </div>
        <strong>${escapeHtml(tip.title)}</strong>
        <span>${escapeHtml(tip.description)}</span>
        <div class="inline-actions">
          <button class="ghost-button small-button" type="button" data-tip-edit="${tip.id}">Modifica</button>
          <button class="ghost-button small-button" type="button" data-tip-delete="${tip.id}">Elimina</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">Non ci sono ancora tips. Puoi crearne una con il modulo qui sopra.</div>`;
}

function renderSession() {
  const patient = getSelectedPatient();
  refs.sessionDateInput.disabled = !patient;
  refs.sessionTimeInput.disabled = !patient;
  refs.sessionNoteInput.disabled = !patient;
  refs.sessionForm.querySelector('button[type="submit"]').disabled = !patient;
  refs.sessionDateInput.value = patient?.session?.date || "";
  refs.sessionTimeInput.value = patient?.session?.time || "";
  refs.sessionNoteInput.value = patient?.session?.note || "";
  refs.sessionPreview.innerHTML = patient ? `
    <p><strong>Paziente:</strong> ${escapeHtml(patient.name)}</p>
    <p><strong>Data:</strong> ${formatSessionLong(patient.session)}</p>
    <p><strong>Nota:</strong> ${escapeHtml(patient.session.note || "Nessuna nota aggiunta.")}</p>
  ` : `<p>Seleziona prima un paziente per impostare la sua prossima seduta.</p>`;
}

function renderQuestionManager() {
  refs.manageQuestionsList.innerHTML = state.customQuestions.length
    ? state.customQuestions.map((question, index) => `
      <article class="manage-question-card reveal" data-delay="${Math.min(index * 35, 180)}">
        <div class="meta-row">
          <span class="meta-pill">${escapeHtml(labelForQuestionType(question.type))}</span>
          <span class="meta-pill secondary">${question.active ? "Attiva" : "Disattivata"}</span>
        </div>
        <strong>${escapeHtml(question.text)}</strong>
        <span>${question.options.length ? `Opzioni: ${escapeHtml(question.options.join(", "))}` : "Risposta libera o guidata senza opzioni predefinite."}</span>
        <div class="inline-actions">
          <button class="ghost-button small-button" type="button" data-question-edit="${question.id}">Modifica</button>
          <button class="ghost-button small-button" type="button" data-question-toggle="${question.id}">${question.active ? "Disattiva" : "Attiva"}</button>
          <button class="ghost-button small-button" type="button" data-question-delete="${question.id}">Elimina</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">Non ci sono ancora domande personalizzate. Puoi crearne una con il modulo qui sopra.</div>`;
}

function renderPatientAccounts() {
  const patient = getSelectedPatient();
  refs.patientSelectionSummary.innerHTML = patient ? `
    <p><strong>Nome:</strong> ${escapeHtml(patient.name)}</p>
    <p><strong>Nome utente:</strong> ${escapeHtml(patient.username)}</p>
    <p><strong>Schede salvate:</strong> ${patient.entries.length}</p>
    <p><strong>Attività attive:</strong> ${patient.tasks.filter((item) => !item.completed).length}</p>
  ` : `<p>Non ci sono ancora account paziente. Crea il primo profilo con il modulo qui accanto.</p>`;

  refs.patientAccountsList.innerHTML = state.patients.length ? state.patients.map((item, index) => `
    <article class="manage-question-card reveal" data-delay="${Math.min(index * 35, 180)}">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(item.name)}</span>
        <span class="meta-pill secondary">${escapeHtml(item.username)}</span>
      </div>
      <strong>${escapeHtml(item.entries.length ? `${item.entries.length} compilazioni registrate` : "Profilo pronto, in attesa delle prime compilazioni")}</strong>
      <span>${item.id === uiState.currentPatientId ? "Questo è il paziente attualmente selezionato nell’area psicologo." : "Puoi selezionare questo profilo per vedere dashboard, schede, seduta e storico dedicati."}</span>
      <div class="inline-actions">
        <button class="ghost-button small-button" type="button" data-patient-select="${item.id}">${item.id === uiState.currentPatientId ? "Selezionato" : "Seleziona"}</button>
        <button class="ghost-button small-button" type="button" data-patient-edit="${item.id}">Modifica</button>
        <button class="ghost-button small-button" type="button" data-patient-delete="${item.id}">Elimina</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Non è ancora stato creato nessun account paziente.</div>`;
}

function getSectionTitle(sectionId) {
  const titles = {
    patientHome: "Home",
    patientSheet: "Scheda giornaliera",
    patientTips: "Tips",
    patientTasks: "Lista attività",
    patientHistory: "Storico personale",
    therapistDashboard: "Dashboard psicologo",
    therapistPatients: "Pazienti",
    therapistRecords: "Schede compilate",
    therapistTips: "Gestione tips",
    therapistSession: "Impostazione seduta",
    therapistQuestions: "Schede personalizzate"
  };
  return titles[sectionId] || "MindLog";
}

function saveDailySheet(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Account non disponibile", "Serve un account paziente attivo per salvare la scheda.");
    return;
  }
  const filledGratitude = uiState.draft.gratitude.map((item) => item.trim()).filter(Boolean);
  if (!uiState.draft.emotions.length) {
    showToast("Completa ancora un passaggio", "Seleziona almeno un’emozione principale per salvare la scheda di oggi.");
    return;
  }
  if (!filledGratitude.length) {
    showToast("Aggiungi un elemento di gratitudine", "Inserisci almeno una cosa per cui ti senti grato oggi, anche piccola.");
    return;
  }

  const entry = {
    id: `entry-${Date.now()}`,
    date: uiState.draft.date,
    createdAt: new Date().toISOString(),
    mood: uiState.draft.mood,
    anxiety: uiState.draft.anxiety,
    emotions: [...uiState.draft.emotions],
    physicalSensations: [...uiState.draft.physicalSensations],
    betterToday: uiState.draft.betterToday.trim(),
    hardToday: uiState.draft.hardToday.trim(),
    gratitude: uiState.draft.gratitude.map((item) => item.trim()),
    positiveThought: uiState.draft.positiveThought.trim(),
    note: uiState.draft.note.trim(),
    customAnswers: state.customQuestions.filter((item) => item.active).map((question) => ({
      questionId: question.id,
      questionText: question.text,
      type: question.type,
      answer: uiState.draft.customAnswers[question.id] ?? (question.type === "scelta-multipla" ? [] : "")
    })),
    aiQuestions: uiState.aiQuestions.map((item) => ({
      id: item.id,
      question: item.question,
      answer: (uiState.draft.aiAnswers[item.id] || "").trim()
    })),
    advice: buildAdvice(uiState.draft),
    privateNote: ""
  };

  patient.entries.push(entry);
  uiState.draft = createEmptyDraft();
  state.drafts[patient.id] = createEmptyDraft();
  saveState();
  renderAll();
  switchSection("patient", "patientHistory");
  openEntryDetail(entry.id, false);
  showToast("Scheda salvata", "La tua compilazione di oggi è stata registrata con successo.");
}

function resetDraft(showFeedback) {
  const patient = getSelectedPatient();
  uiState.draft = createEmptyDraft();
  if (patient) {
    state.drafts[patient.id] = createEmptyDraft();
  }
  saveState();
  renderSheet();
  if (showFeedback) {
    showToast("Campi ripristinati", "Puoi ricominciare a compilare la scheda con calma.");
  }
}

function addTask(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Account non disponibile", "Crea o seleziona prima un account paziente.");
    return;
  }
  const title = refs.taskInput.value.trim();
  if (!title) {
    showToast("Attività non aggiunta", "Scrivi prima un’attività breve e chiara.");
    return;
  }
  if (patient.tasks.some((item) => item.title.toLowerCase() === title.toLowerCase())) {
    showToast("Attività già presente", "Questa attività è già nella lista. Puoi completarla o modificarla eliminandola e reinserendola.");
    return;
  }

  patient.tasks.unshift({
    id: `task-${Date.now()}`,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  });

  refs.taskInput.value = "";
  saveState();
  renderTasks();
  showToast("Attività aggiunta", "La nuova attività è pronta nella tua lista.");
}

function handleTaskActions(event) {
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  const toggle = event.target.closest("[data-task-toggle]");
  const remove = event.target.closest("[data-task-delete]");

  if (toggle) {
    const task = patient.tasks.find((item) => item.id === toggle.dataset.taskToggle);
    if (!task) {
      return;
    }
    task.completed = !task.completed;
    saveState();
    renderTasks();
    showToast(task.completed ? "Attività completata" : "Attività riaperta", task.completed ? "Ottimo passo: anche i gesti piccoli contano." : "L’attività resta disponibile nella lista.");
  }

  if (remove) {
    patient.tasks = patient.tasks.filter((item) => item.id !== remove.dataset.taskDelete);
    saveState();
    renderTasks();
    showToast("Attività eliminata", "La lista è stata aggiornata.");
  }
}

function saveTip(event) {
  event.preventDefault();
  const tip = {
    id: refs.tipId.value || `tip-${Date.now()}`,
    title: refs.tipTitle.value.trim(),
    category: refs.tipCategory.value,
    type: refs.tipType.value,
    description: refs.tipDescription.value.trim(),
    content: refs.tipContent.value.trim()
  };

  if (!tip.title || !tip.description || !tip.content) {
    showToast("Campi mancanti", "Compila titolo, descrizione e contenuto prima di salvare.");
    return;
  }

  const existingIndex = state.tips.findIndex((item) => item.id === tip.id);
  if (existingIndex >= 0) {
    state.tips[existingIndex] = tip;
    showToast("Tip aggiornata", "Le modifiche sono state salvate correttamente.");
  } else {
    state.tips.unshift(tip);
    showToast("Tip creata", "Il nuovo contenuto è ora disponibile anche per il paziente.");
  }

  saveState();
  renderTips();
  renderManageTips();
  resetTipForm();
}

function handleManageTipActions(event) {
  const edit = event.target.closest("[data-tip-edit]");
  const remove = event.target.closest("[data-tip-delete]");

  if (edit) {
    const tip = state.tips.find((item) => item.id === edit.dataset.tipEdit);
    if (!tip) {
      return;
    }
    refs.tipId.value = tip.id;
    refs.tipTitle.value = tip.title;
    refs.tipCategory.value = tip.category;
    refs.tipType.value = tip.type;
    refs.tipDescription.value = tip.description;
    refs.tipContent.value = tip.content;
    switchSection("therapist", "therapistTips");
    showToast("Modifica tip", "Puoi aggiornare il contenuto e salvarlo di nuovo.");
  }

  if (remove) {
    state.tips = state.tips.filter((item) => item.id !== remove.dataset.tipDelete);
    if (refs.tipId.value === remove.dataset.tipDelete) {
      resetTipForm();
    }
    saveState();
    renderTips();
    renderManageTips();
    showToast("Tip eliminata", "Il contenuto non sarà più visibile al paziente.");
  }
}

function resetTipForm() {
  refs.tipForm.reset();
  refs.tipId.value = "";
  refs.tipCategory.value = "Respirazione";
  refs.tipType.value = "Testo";
}

function saveSession(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Nessun paziente selezionato", "Seleziona prima un paziente dalla sezione dedicata.");
    return;
  }
  if (!refs.sessionDateInput.value || !refs.sessionTimeInput.value) {
    showToast("Dati incompleti", "Inserisci data e ora della prossima seduta.");
    return;
  }
  const nextSession = new Date(`${refs.sessionDateInput.value}T${refs.sessionTimeInput.value}:00`);
  if (Number.isNaN(nextSession.getTime()) || nextSession <= new Date()) {
    showToast("Orario non valido", "Imposta una seduta futura, così il countdown mostrerà un appuntamento reale.");
    return;
  }

  patient.session = {
    date: refs.sessionDateInput.value,
    time: refs.sessionTimeInput.value,
    note: refs.sessionNoteInput.value.trim()
  };

  saveState();
  renderSession();
  updateCountdown();
  showToast("Seduta aggiornata", "Il countdown del paziente è stato aggiornato.");
}

function saveQuestion(event) {
  event.preventDefault();
  const needsOptions = ["scelta-singola", "scelta-multipla"].includes(refs.questionType.value);
  const question = {
    id: refs.questionId.value || `question-${Date.now()}`,
    text: refs.questionText.value.trim(),
    type: refs.questionType.value,
    options: needsOptions ? refs.questionOptions.value.split(",").map((item) => item.trim()).filter(Boolean) : [],
    active: refs.questionActive.checked
  };

  if (!question.text) {
    showToast("Domanda mancante", "Scrivi la domanda prima di salvarla.");
    return;
  }
  if (needsOptions && question.options.length < 2) {
    showToast("Opzioni da completare", "Per questo tipo di domanda inserisci almeno due opzioni separate da virgole.");
    return;
  }

  const index = state.customQuestions.findIndex((item) => item.id === question.id);
  if (index >= 0) {
    state.customQuestions[index] = question;
    showToast("Domanda aggiornata", "La scheda del paziente mostrerà la nuova versione.");
  } else {
    state.customQuestions.unshift(question);
    showToast("Domanda aggiunta", "La nuova domanda è stata salvata.");
  }

  saveState();
  renderQuestionManager();
  renderCustomQuestions();
  resetQuestionForm();
}

function handleManageQuestionActions(event) {
  const edit = event.target.closest("[data-question-edit]");
  const toggle = event.target.closest("[data-question-toggle]");
  const remove = event.target.closest("[data-question-delete]");

  if (edit) {
    const question = state.customQuestions.find((item) => item.id === edit.dataset.questionEdit);
    if (!question) {
      return;
    }
    refs.questionId.value = question.id;
    refs.questionText.value = question.text;
    refs.questionType.value = question.type;
    refs.questionOptions.value = question.options.join(", ");
    refs.questionActive.checked = question.active;
    updateQuestionOptionsState();
    switchSection("therapist", "therapistQuestions");
    showToast("Modifica domanda", "Puoi aggiornare testo, tipo o stato di attivazione.");
  }

  if (toggle) {
    const question = state.customQuestions.find((item) => item.id === toggle.dataset.questionToggle);
    if (!question) {
      return;
    }
    question.active = !question.active;
    saveState();
    renderQuestionManager();
    renderCustomQuestions();
    showToast(question.active ? "Domanda attivata" : "Domanda disattivata", "La scheda giornaliera del paziente è stata aggiornata.");
  }

  if (remove) {
    state.customQuestions = state.customQuestions.filter((item) => item.id !== remove.dataset.questionDelete);
    if (refs.questionId.value === remove.dataset.questionDelete) {
      resetQuestionForm();
    }
    saveState();
    renderQuestionManager();
    renderCustomQuestions();
    pruneDraftAnswers();
    showToast("Domanda eliminata", "La domanda non comparirà più nella scheda giornaliera.");
  }
}

function resetQuestionForm() {
  refs.questionForm.reset();
  refs.questionId.value = "";
  refs.questionType.value = "testo";
  refs.questionActive.checked = true;
  updateQuestionOptionsState();
}

function handleRecordActions(event) {
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  const open = event.target.closest("[data-record-open]");
  const save = event.target.closest("[data-record-save]");

  if (open) {
    openEntryDetail(open.dataset.recordOpen, true);
  }

  if (save) {
    const field = refs.recordList.querySelector(`[data-record-note="${save.dataset.recordSave}"]`);
    const entry = patient.entries.find((item) => item.id === save.dataset.recordSave);
    if (!field || !entry) {
      return;
    }
    entry.privateNote = field.value.trim();
    saveState();
    showToast("Nota privata salvata", "La nota è visibile solo nell’area psicologo.");
  }
}

function openEntryDetail(id, therapistMode) {
  const entry = getSelectedPatient()?.entries.find((item) => item.id === id);
  if (!entry) {
    return;
  }
  uiState.lastFocusedElement = document.activeElement;

  refs.detailContent.innerHTML = `
    <p class="mini-label">${therapistMode ? "Dettaglio scheda clinica" : "Dettaglio della tua compilazione"}</p>
    <h2 class="detail-title" id="detailTitle">${formatLongDate(entry.date)}</h2>
    <div class="meta-row">
      <span class="meta-pill">Umore ${entry.mood}/10</span>
      <span class="meta-pill secondary">Ansia ${escapeHtml(entry.anxiety)}</span>
    </div>
    <div class="detail-section">
      <h4>Emozioni</h4>
      <p>${escapeHtml(entry.emotions.join(", ") || "Nessuna selezione")}</p>
    </div>
    <div class="detail-section">
      <h4>Sensazioni fisiche</h4>
      <p>${escapeHtml(entry.physicalSensations.join(", ") || "Nessuna selezione")}</p>
    </div>
    <div class="detail-section">
      <h4>Cosa ti ha fatto stare meglio</h4>
      <p>${escapeHtml(entry.betterToday || "Nessuna risposta inserita.")}</p>
    </div>
    <div class="detail-section">
      <h4>Cosa ti ha messo più in difficoltà</h4>
      <p>${escapeHtml(entry.hardToday || "Nessuna risposta inserita.")}</p>
    </div>
    <div class="detail-section">
      <h4>Gratitudine</h4>
      <div class="detail-list">
        ${entry.gratitude.filter(Boolean).length ? entry.gratitude.filter(Boolean).map((item) => `<p>${escapeHtml(item)}</p>`).join("") : "<p>Nessun elemento inserito.</p>"}
      </div>
    </div>
    <div class="detail-section">
      <h4>Pensiero positivo</h4>
      <p>${escapeHtml(entry.positiveThought || "Nessun pensiero inserito.")}</p>
    </div>
    <div class="detail-section">
      <h4>Nota finale</h4>
      <p>${escapeHtml(entry.note || "Nessuna nota finale.")}</p>
    </div>
    <div class="detail-section">
      <h4>Domande personalizzate</h4>
      ${renderDetailList(entry.customAnswers, false)}
    </div>
    <div class="detail-section">
      <h4>Domande AI e risposte</h4>
      ${renderDetailList(entry.aiQuestions, true)}
    </div>
    <div class="detail-section">
      <h4>Consiglio finale mostrato</h4>
      <p>${escapeHtml(entry.advice || "Nessun consiglio generato.")}</p>
    </div>
    ${therapistMode ? `
      <div class="detail-section">
        <h4>Nota privata dello psicologo</h4>
        <p>${escapeHtml(entry.privateNote || "Nessuna nota privata salvata.")}</p>
      </div>
    ` : ""}
  `;

  setModalState("detail");
}

function openTipDetail(id) {
  const tip = state.tips.find((item) => item.id === id);
  if (!tip) {
    return;
  }
  uiState.lastFocusedElement = document.activeElement;

  refs.detailContent.innerHTML = `
    <p class="mini-label">${escapeHtml(tip.category)} · ${escapeHtml(tip.type)}</p>
    <h2 class="detail-title" id="detailTitle">${escapeHtml(tip.title)}</h2>
    <div class="detail-section">
      <h4>Descrizione</h4>
      <p class="detail-copy">${escapeHtml(tip.description)}</p>
    </div>
    <div class="detail-section">
      <h4>Contenuto</h4>
      <p class="detail-copy">${escapeHtml(tip.content)}</p>
      ${looksLikeUrl(tip.content) ? `<p><a href="${escapeAttribute(tip.content)}" target="_blank" rel="noreferrer">Apri il link del contenuto</a></p>` : ""}
    </div>
  `;

  setModalState("detail");
}

function renderDetailList(items, isAi) {
  if (!items || !items.length) {
    return `<p>Nessun elemento disponibile.</p>`;
  }

  return `
    <div class="detail-list">
      ${items.map((item) => `
        <div>
          <p><strong>${escapeHtml(isAi ? item.question : item.questionText)}</strong></p>
          <p>${Array.isArray(item.answer) ? escapeHtml(item.answer.join(", ") || "Nessuna risposta") : escapeHtml(item.answer || "Nessuna risposta")}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function openLogin(role) {
  uiState.loginRole = role;
  uiState.lastFocusedElement = document.activeElement;
  refs.loginRoleLabel.textContent = role === "paziente" ? "Accesso paziente" : "Accesso psicologo";
  refs.loginTitle.textContent = role === "paziente" ? "Accedi al tuo spazio paziente" : "Accedi all’area psicologo";
  refs.loginText.textContent = role === "paziente"
    ? "Inserisci nome utente e password creati dal tuo psicologo."
    : "Inserisci le credenziali dell’account psicologo.";
  refs.usernameInput.value = "";
  refs.passwordInput.value = "";
  refs.loginError.textContent = "";
  setModalState("login");
  refs.usernameInput.focus();
}

function closeLoginModal() {
  setModalState(null);
}

function closeDetailModal() {
  refs.detailContent.innerHTML = "";
  setModalState(null);
}

function handleLogin(event) {
  event.preventDefault();
  const username = normalizeUsername(refs.usernameInput.value);
  const password = normalizePassword(refs.passwordInput.value);
  if (!username || !password) {
    refs.loginError.textContent = "Inserisci nome utente e password per continuare.";
    return;
  }
  if (uiState.loginRole === "psicologo") {
    if (username !== state.auth.therapist.username || password !== state.auth.therapist.password) {
      refs.loginError.textContent = "Credenziali non valide. Controlla nome utente e password.";
      return;
    }
    closeLoginModal();
    uiState.currentRole = "therapist";
    ensureSelectedPatient();
    uiState.draft = getStoredDraft(uiState.currentPatientId);
    renderAll();
    showToast("Accesso riuscito", `Bentornata ${state.auth.therapist.name}.`);
    return;
  }

  const patient = state.patients.find((item) => item.username === username && item.password === password);
  if (!patient) {
    refs.loginError.textContent = state.patients.length
      ? "Credenziali non valide. Controlla nome utente e password."
      : "Non ci sono ancora account paziente disponibili su questo dispositivo.";
    return;
  }

  closeLoginModal();
  uiState.currentRole = "patient";
  uiState.currentPatientId = patient.id;
  uiState.draft = getStoredDraft(patient.id);
  renderAll();
  showToast("Accesso riuscito", `Bentornato ${patient.name}.`);
}

function logout() {
  uiState.currentRole = null;
  stopBreathing(false);
  closeDetailModal();
  closeLoginModal();
  renderShell();
  showToast("Sei uscito", "Puoi rientrare in qualsiasi momento con il tuo PIN.");
}

function switchSection(role, target) {
  if (!target) {
    return;
  }
  if (role === "patient") {
    uiState.patientSection = target;
  } else {
    uiState.therapistSection = target;
  }
  syncPanels(role, target);
  if ((role === "patient" && uiState.currentRole === "patient") || (role === "therapist" && uiState.currentRole === "therapist")) {
    refs.topbarTitle.textContent = getSectionTitle(target);
  }
  if (window.innerWidth < 1180) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleDraftTextInput(event) {
  if (event.target === refs.betterInput) {
    uiState.draft.betterToday = refs.betterInput.value;
  }
  if (event.target === refs.hardInput) {
    uiState.draft.hardToday = refs.hardInput.value;
  }
  if (event.target === refs.gratitude1) {
    uiState.draft.gratitude[0] = refs.gratitude1.value;
  }
  if (event.target === refs.gratitude2) {
    uiState.draft.gratitude[1] = refs.gratitude2.value;
  }
  if (event.target === refs.gratitude3) {
    uiState.draft.gratitude[2] = refs.gratitude3.value;
  }
  if (event.target === refs.positiveInput) {
    uiState.draft.positiveThought = refs.positiveInput.value;
  }
  if (event.target === refs.noteInput) {
    uiState.draft.note = refs.noteInput.value;
  }
  renderDynamicSheet();
}

function toggleChip(key, value) {
  const current = new Set(uiState.draft[key]);
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  uiState.draft[key] = Array.from(current);

  if (key === "emotions") {
    refs.emotionChips.innerHTML = renderChipSet(EMOTIONS, uiState.draft.emotions);
  } else {
    refs.physicalChips.innerHTML = renderChipSet(PHYSICAL_SENSATIONS, uiState.draft.physicalSensations);
  }

  renderDynamicSheet();
}

function handleCustomAnswerInput(event) {
  const id = event.target.dataset.customId;
  if (!id) {
    return;
  }
  const question = state.customQuestions.find((item) => item.id === id);
  if (!question) {
    return;
  }

  if (question.type === "scelta-multipla") {
    const checked = refs.customQuestionsBox.querySelectorAll(`input[data-custom-id="${id}"]:checked`);
    uiState.draft.customAnswers[id] = Array.from(checked).map((item) => item.value);
  } else if (question.type === "scelta-singola") {
    const current = refs.customQuestionsBox.querySelector(`input[data-custom-id="${id}"]:checked`);
    uiState.draft.customAnswers[id] = current ? current.value : "";
  } else if (question.type === "scala") {
    uiState.draft.customAnswers[id] = event.target.value;
    const label = event.target.closest(".question-card-block")?.querySelector(".field-label strong");
    if (label) {
      label.textContent = `${event.target.value} / 10`;
    }
  } else {
    uiState.draft.customAnswers[id] = event.target.value;
  }

  if (["scelta-singola", "scelta-multipla"].includes(question.type)) {
    renderCustomQuestions();
  }
  persistDraft();
}

function handleAiAnswerInput(event) {
  const id = event.target.dataset.aiId;
  if (!id) {
    return;
  }
  uiState.draft.aiAnswers[id] = event.target.value;
  persistDraft();
}

function renderCustomQuestionField(question) {
  ensureCustomDraftValue(question);
  const value = uiState.draft.customAnswers[question.id];

  if (question.type === "testo") {
    return `
      <div class="question-card-block">
        <label class="field-label" for="custom-${question.id}">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <input id="custom-${question.id}" type="text" data-custom-id="${question.id}" value="${escapeAttribute(String(value || ""))}" placeholder="Scrivi qui la tua risposta">
      </div>
    `;
  }

  if (question.type === "textarea") {
    return `
      <div class="question-card-block">
        <label class="field-label" for="custom-${question.id}">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <textarea id="custom-${question.id}" rows="4" data-custom-id="${question.id}" placeholder="Scrivi qui con calma.">${escapeHtml(String(value || ""))}</textarea>
      </div>
    `;
  }

  if (question.type === "scelta-singola") {
    return `
      <div class="question-card-block">
        <label class="field-label">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <div class="chip-wrap">
          ${question.options.map((option) => `
            <label class="chip ${value === option ? "active" : ""}">
              <input type="radio" hidden data-custom-id="${question.id}" name="custom-${question.id}" value="${escapeAttribute(option)}" ${value === option ? "checked" : ""}>
              ${escapeHtml(option)}
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "scelta-multipla") {
    const current = Array.isArray(value) ? value : [];
    return `
      <div class="question-card-block">
        <label class="field-label">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <div class="chip-wrap">
          ${question.options.map((option) => `
            <label class="chip ${current.includes(option) ? "active" : ""}">
              <input type="checkbox" hidden data-custom-id="${question.id}" value="${escapeAttribute(option)}" ${current.includes(option) ? "checked" : ""}>
              ${escapeHtml(option)}
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="question-card-block">
      <label class="field-label" for="custom-${question.id}">
        <span>${escapeHtml(question.text)}</span>
        <strong>${escapeHtml(String(value || "5"))} / 10</strong>
      </label>
      <input id="custom-${question.id}" type="range" min="1" max="10" value="${escapeAttribute(String(value || "5"))}" data-custom-id="${question.id}">
    </div>
  `;
}

function ensureCustomDraftValue(question) {
  if (!(question.id in uiState.draft.customAnswers)) {
    uiState.draft.customAnswers[question.id] = question.type === "scelta-multipla" ? [] : question.type === "scala" ? "5" : "";
  }
}

function buildAiQuestions(draft) {
  const questions = [];
  const gratitudeCount = draft.gratitude.filter((item) => item.trim()).length;
  const lowerHard = draft.hardToday.toLowerCase();
  const hasNegativeTone = NEGATIVE_KEYWORDS.some((item) => lowerHard.includes(item));
  const bodyTrigger = draft.physicalSensations.some((item) => ["Tensione", "Respiro corto", "Peso sul petto", "Nodo alla gola"].includes(item));

  if (draft.mood <= 4) {
    questions.push({ id: "low-mood", question: "C’è stato un momento preciso della giornata in cui ti sei sentito peggio?" });
    questions.push({ id: "needed", question: "Cosa avresti avuto bisogno di ricevere in quel momento?" });
  }

  if (draft.anxiety === "Alta" || draft.anxiety === "Molto alta") {
    questions.push({ id: "anxiety-when", question: "In quali momenti della giornata l’ansia si è fatta sentire di più?" });
    questions.push({ id: "anxiety-trigger", question: "Hai notato se questa ansia è comparsa in risposta a qualcosa di specifico?" });
  }

  if (bodyTrigger) {
    questions.push({ id: "physical-trigger", question: "Hai notato se queste sensazioni fisiche sono comparse in risposta a un trigger specifico?" });
  }

  if (hasNegativeTone) {
    questions.push({ id: "kindness-reframe", question: "Come parleresti a te stesso con maggiore gentilezza in questa situazione?" });
  }

  if (gratitudeCount >= 2) {
    questions.push({ id: "gratitude", question: "Quale di queste cose positive vorresti portare con te anche domani?" });
  }

  if (draft.mood <= 5 || !draft.betterToday.trim()) {
    questions.push({ id: "relief", question: "C’è stato anche un piccolo momento di sollievo oggi?" });
  }

  return questions.filter((item, index, array) => array.findIndex((inner) => inner.id === item.id) === index);
}

function buildAdvice(draft) {
  const gratitudeCount = draft.gratitude.filter((item) => item.trim()).length;
  const bodyLoad = draft.physicalSensations.some((item) => ["Tensione", "Peso sul petto", "Respiro corto", "Agitazione", "Nodo alla gola"].includes(item));

  if (draft.mood <= 4 && (draft.anxiety === "Alta" || draft.anxiety === "Molto alta")) {
    return "Oggi sembra esserci stata molta attivazione interna, ma il fatto che tu l’abbia osservata con sincerità è già importante. Prova a concederti un momento lento prima di sera, anche breve.";
  }
  if (bodyLoad) {
    return "Il corpo oggi sta segnalando qualcosa con chiarezza. Potrebbe esserti utile rallentare un poco il ritmo e offrirti un gesto semplice di respiro o pausa.";
  }
  if (gratitudeCount >= 2 && draft.positiveThought.trim()) {
    return "Anche dentro la giornata hai saputo riconoscere aspetti buoni e una parola positiva per te. Tenere vive queste tracce può aiutarti a costruire continuità e fiducia.";
  }
  if (draft.mood >= 7) {
    return "Oggi sembra esserci stato più spazio e più respiro. Riconoscere cosa ti ha sostenuto può aiutarti a proteggere questo equilibrio anche nei prossimi giorni.";
  }
  return "Anche una giornata complessa può offrire segnali utili. Fermarti a osservare ciò che hai sentito è già un passo concreto di cura verso te stesso.";
}

function startCountdown() {
  updateCountdown();
  if (uiState.countdownTimer) {
    clearInterval(uiState.countdownTimer);
  }
  uiState.countdownTimer = window.setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const patient = getSelectedPatient();
  const target = getSessionDate(patient?.session);
  if (!target) {
    refs.sessionTitle.textContent = "Seduta da impostare";
    refs.sessionNote.textContent = "Lo psicologo potrà aggiornare data e ora dalla dashboard.";
    refs.countDays.textContent = "00";
    refs.countHours.textContent = "00";
    refs.countMinutes.textContent = "00";
    refs.countSeconds.textContent = "00";
    return;
  }

  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    refs.sessionTitle.textContent = "Seduta da aggiornare";
    refs.sessionNote.textContent = "L’orario impostato è trascorso. Puoi attendere il prossimo aggiornamento dal tuo psicologo.";
    refs.countDays.textContent = "00";
    refs.countHours.textContent = "00";
    refs.countMinutes.textContent = "00";
    refs.countSeconds.textContent = "00";
    return;
  }

  refs.countDays.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
  refs.countHours.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  refs.countMinutes.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
  refs.countSeconds.textContent = pad(Math.floor((diff / 1000) % 60));
  refs.sessionTitle.textContent = formatSessionLong(patient?.session);
  refs.sessionNote.textContent = patient?.session?.note || "Nessuna nota aggiunta.";
}

function startBreathing() {
  const exercise = BREATHING_EXERCISES.find((item) => item.id === uiState.selectedBreathingId);
  if (!exercise) {
    return;
  }
  if (uiState.breathingTimer) {
    return;
  }

  stopBreathing(false);
  uiState.breathingState = {
    phaseIndex: 0,
    remaining: exercise.steps[0].seconds,
    elapsed: 0
  };
  applyBreathingPhase(exercise);

  uiState.breathingTimer = window.setInterval(() => {
    uiState.breathingState.elapsed += 1;
    uiState.breathingState.remaining -= 1;

    if (uiState.breathingState.remaining <= 0) {
      uiState.breathingState.phaseIndex = (uiState.breathingState.phaseIndex + 1) % exercise.steps.length;
      uiState.breathingState.remaining = exercise.steps[uiState.breathingState.phaseIndex].seconds;
    }

    applyBreathingPhase(exercise);
  }, 1000);

  updateBreathingControls();
  showToast("Respirazione avviata", `Esercizio attivo: ${exercise.name}.`);
}

function applyBreathingPhase(exercise) {
  const phase = exercise.steps[uiState.breathingState.phaseIndex];
  refs.breathingPhase.textContent = phase.label;
  refs.breathingCycle.textContent = `Fase: ${phase.label} · ${uiState.breathingState.remaining}s`;
  refs.breathingTime.textContent = `Tempo: ${formatClock(uiState.breathingState.elapsed)}`;
  refs.breathingTitle.textContent = exercise.name;
  refs.breathingInstruction.textContent = `${exercise.instructions} Durata consigliata: ${exercise.duration}.`;
  refs.breathingOrb.classList.remove("inhale", "exhale");
  if (phase.className) {
    refs.breathingOrb.classList.add(phase.className);
  }
}

function stopBreathing(showFeedback) {
  if (uiState.breathingTimer) {
    clearInterval(uiState.breathingTimer);
    uiState.breathingTimer = null;
  }
  uiState.breathingState = null;
  refs.breathingOrb.classList.remove("inhale", "exhale");
  renderBreathing();
  updateBreathingControls();
  if (showFeedback) {
    showToast("Respirazione fermata", "Puoi riprendere l’esercizio quando vuoi.");
  }
}

function renderMoodChart() {
  const dates = [];
  for (let i = 13; i >= 0; i -= 1) {
    dates.push(dateOffset(-i));
  }

  const stats = dates.map((date) => {
    const matches = getSelectedPatient()?.entries.filter((item) => item.date === date) || [];
    if (!matches.length) {
      return { date, mood: null };
    }
    return {
      date,
      mood: Number((matches.reduce((sum, item) => sum + item.mood, 0) / matches.length).toFixed(1))
    };
  });

  const width = 760;
  const height = 300;
  const padding = { top: 24, right: 24, bottom: 48, left: 34 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const x = (index) => padding.left + (innerWidth / Math.max(stats.length - 1, 1)) * index;
  const y = (value) => padding.top + innerHeight - ((value - 1) / 9) * innerHeight;

  const points = stats.map((item, index) => item.mood ? { ...item, x: x(index), y: y(item.mood) } : null).filter(Boolean);
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = points.length > 1
    ? `${path} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`
    : "";

  if (!points.length) {
    refs.moodChart.innerHTML = `<div class="empty-state">Il grafico si popolerà automaticamente quando saranno disponibili compilazioni recenti.</div>`;
    return;
  }

  refs.moodChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafico dell’umore degli ultimi 14 giorni">
      ${[1, 3, 5, 7, 10].map((tick) => `
        <line class="chart-grid-line" x1="${padding.left}" y1="${y(tick)}" x2="${width - padding.right}" y2="${y(tick)}"></line>
        <text class="chart-label" x="8" y="${y(tick) + 4}">${tick}</text>
      `).join("")}
      ${area ? `<path class="chart-area" d="${area}"></path>` : ""}
      ${path ? `<path class="chart-line" d="${path}"></path>` : ""}
      ${points.map((point) => `
        <circle class="chart-dot" cx="${point.x}" cy="${point.y}" r="5.5"></circle>
        <text class="chart-point" x="${point.x}" y="${point.y - 12}" text-anchor="middle">${point.mood}</text>
      `).join("")}
      ${stats.map((item, index) => `
        <text class="chart-label" x="${x(index)}" y="${height - 16}" text-anchor="middle">${shortDayMonth(item.date)}</text>
      `).join("")}
    </svg>
  `;
}

function populateTipCategories() {
  refs.tipCategory.innerHTML = TIP_CATEGORIES.filter((item) => item !== "Tutti").map((item) => `<option value="${escapeAttribute(item)}">${escapeHtml(item)}</option>`).join("");
}

function updateQuestionOptionsState() {
  const needsOptions = ["scelta-singola", "scelta-multipla"].includes(refs.questionType.value);
  refs.questionOptions.disabled = !needsOptions;
  refs.questionOptionsHelp.classList.toggle("disabled", !needsOptions);
  refs.questionOptions.placeholder = needsOptions
    ? "Esempio: Mattina, Pomeriggio, Sera"
    : "Non necessario per questo tipo di risposta";
  if (!needsOptions) {
    refs.questionOptions.value = "";
  }
}

function updateBreathingControls() {
  const running = Boolean(uiState.breathingTimer);
  refs.startBreathingButton.disabled = running;
  refs.stopBreathingButton.disabled = !running;
}

function savePatientAccount(event) {
  event.preventDefault();
  const name = refs.patientNameInput.value.trim();
  const username = normalizeUsername(refs.patientUsernameInput.value);
  const password = normalizePassword(refs.patientPasswordInput.value);
  const existingId = refs.patientAccountId.value;

  if (!name || !username || !password) {
    showToast("Campi mancanti", "Inserisci nome, nome utente e password del paziente.");
    return;
  }

  const usernameTaken = state.patients.some((item) => item.username === username && item.id !== existingId);
  if (usernameTaken || username === state.auth.therapist.username) {
    showToast("Nome utente non disponibile", "Scegli un nome utente diverso per questo paziente.");
    return;
  }

  if (existingId) {
    const patient = state.patients.find((item) => item.id === existingId);
    if (!patient) {
      return;
    }
    patient.name = name;
    patient.username = username;
    patient.password = password;
    if (uiState.currentPatientId === patient.id && uiState.currentRole === "patient") {
      uiState.currentPatientId = patient.id;
    }
    showToast("Account aggiornato", "Le credenziali del paziente sono state aggiornate.");
  } else {
    const patient = createPatientAccount(name, username, password);
    state.patients.unshift(patient);
    uiState.currentPatientId = patient.id;
    uiState.draft = createEmptyDraft();
    showToast("Account creato", "Il nuovo account paziente è pronto per l’accesso.");
  }

  saveState();
  renderAll();
  resetPatientAccountForm();
}

function handlePatientAccountActions(event) {
  const select = event.target.closest("[data-patient-select]");
  const edit = event.target.closest("[data-patient-edit]");
  const remove = event.target.closest("[data-patient-delete]");

  if (select) {
    uiState.currentPatientId = select.dataset.patientSelect;
    uiState.draft = getStoredDraft(uiState.currentPatientId);
    saveState();
    renderAll();
    showToast("Paziente selezionato", "La dashboard ora mostra i dati del profilo scelto.");
  }

  if (edit) {
    const patient = state.patients.find((item) => item.id === edit.dataset.patientEdit);
    if (!patient) {
      return;
    }
    refs.patientAccountId.value = patient.id;
    refs.patientNameInput.value = patient.name;
    refs.patientUsernameInput.value = patient.username;
    refs.patientPasswordInput.value = patient.password;
    switchSection("therapist", "therapistPatients");
    showToast("Modifica account", "Puoi aggiornare i dati del paziente e salvarli di nuovo.");
  }

  if (remove) {
    const patientId = remove.dataset.patientDelete;
    const patient = state.patients.find((item) => item.id === patientId);
    if (!patient) {
      return;
    }
    state.patients = state.patients.filter((item) => item.id !== patientId);
    delete state.drafts[patientId];
    if (refs.patientAccountId.value === patientId) {
      resetPatientAccountForm();
    }
    if (uiState.currentPatientId === patientId) {
      uiState.currentPatientId = state.patients[0]?.id || null;
      uiState.draft = getStoredDraft(uiState.currentPatientId);
      if (uiState.currentRole === "patient") {
        logout();
      }
    }
    saveState();
    renderAll();
    showToast("Account eliminato", `Il profilo di ${patient.name} è stato rimosso da questo dispositivo.`);
  }
}

function resetPatientAccountForm() {
  refs.patientAccountForm.reset();
  refs.patientAccountId.value = "";
}

function persistDraft() {
  if (!state) {
    return;
  }
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  state.drafts[patient.id] = sanitizeDraft(uiState.draft);
  saveState();
}

function isDraftMeaningful(draft) {
  return Boolean(
    draft.emotions.length ||
    draft.physicalSensations.length ||
    draft.betterToday.trim() ||
    draft.hardToday.trim() ||
    draft.gratitude.some((item) => item.trim()) ||
    draft.positiveThought.trim() ||
    draft.note.trim() ||
    Object.values(draft.customAnswers || {}).some((value) => Array.isArray(value) ? value.length : String(value || "").trim()) ||
    Object.values(draft.aiAnswers || {}).some((value) => String(value || "").trim())
  );
}

function pruneDraftAnswers() {
  const activeQuestionIds = new Set(state.customQuestions.map((item) => item.id));
  Object.keys(uiState.draft.customAnswers).forEach((id) => {
    if (!activeQuestionIds.has(id)) {
      delete uiState.draft.customAnswers[id];
    }
  });
  persistDraft();
}

function setModalState(type) {
  uiState.activeModal = type;
  const loginOpen = type === "login";
  const detailOpen = type === "detail";
  refs.loginModal.classList.toggle("hidden", !loginOpen);
  refs.detailModal.classList.toggle("hidden", !detailOpen);
  refs.loginModal.setAttribute("aria-hidden", String(!loginOpen));
  refs.detailModal.setAttribute("aria-hidden", String(!detailOpen));
  document.body.classList.toggle("modal-open", Boolean(type));
  if (!type && uiState.lastFocusedElement instanceof HTMLElement) {
    uiState.lastFocusedElement.focus();
    uiState.lastFocusedElement = null;
  }
}

function handleGlobalKeydown(event) {
  if (event.key === "Escape" && uiState.activeModal === "detail") {
    closeDetailModal();
  } else if (event.key === "Escape" && uiState.activeModal === "login") {
    closeLoginModal();
  }
}

function renderChipSet(values, selected) {
  return values.map((value) => `
    <button class="chip ${selected.includes(value) ? "active" : ""}" type="button" aria-pressed="${selected.includes(value) ? "true" : "false"}" data-chip="${escapeAttribute(value)}">${escapeHtml(value)}</button>
  `).join("");
}

function getSelectedPatient() {
  return state.patients.find((item) => item.id === uiState.currentPatientId) || null;
}

function getEntriesDescending() {
  const entries = getSelectedPatient()?.entries || [];
  return [...entries].sort((a, b) => (b.createdAt || b.date).localeCompare(a.createdAt || a.date));
}

function entriesWithinDays(days) {
  const limit = new Date();
  limit.setHours(0, 0, 0, 0);
  limit.setDate(limit.getDate() - (days - 1));
  return getEntriesDescending().filter((entry) => new Date(`${entry.date}T12:00:00`) >= limit);
}

function getTopItems(items, count) {
  const map = new Map();
  items.forEach((item) => {
    if (!item) {
      return;
    }
    map.set(item, (map.get(item) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, count).map(([item]) => item);
}

function getMotivationFromEntry(entry) {
  if (entry.mood <= 4) {
    return "Hai già fatto qualcosa di importante: fermarti e osservarti con sincerità. Anche oggi possiamo partire da qui, con calma.";
  }
  if (entry.mood >= 7) {
    return "Ci sono segnali di maggiore respiro. Prenderti un momento per notarli può aiutarti a renderli più stabili.";
  }
  return MOTIVATIONS[(entry.mood + entry.emotions.length) % MOTIVATIONS.length];
}

function getTipActionLabel(type) {
  if (type === "Audio") {
    return "Ascolta";
  }
  if (type === "Video") {
    return "Guarda";
  }
  if (type === "Testo") {
    return "Leggi";
  }
  return "Apri";
}

function labelForQuestionType(type) {
  const labels = {
    testo: "Testo",
    textarea: "Area di testo",
    "scelta-singola": "Scelta singola",
    "scelta-multipla": "Scelta multipla",
    scala: "Scala 1-10"
  };
  return labels[type] || type;
}

function normalizeUsername(value) {
  const normalized = String(value || "").trim().toLowerCase().replace(/\s+/g, "");
  return /^[a-z0-9._-]{3,32}$/.test(normalized) ? normalized : "";
}

function normalizePassword(value) {
  const normalized = String(value || "").trim();
  return normalized.length >= 4 ? normalized : "";
}

function isDateInput(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function isTimeInput(value) {
  return /^\d{2}:\d{2}$/.test(String(value || ""));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatLongDate(value) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

function shortDayMonth(value) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit"
  }).format(new Date(`${value}T12:00:00`));
}

function formatSessionLong(session) {
  if (!session?.date || !session?.time) {
    return "Seduta non impostata";
  }
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(`${session.date}T${session.time}:00`));
}

function formatSessionShort(session) {
  if (!session?.date || !session?.time) {
    return "Da impostare";
  }
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(`${session.date}T${session.time}:00`));
}

function getSessionDate(session) {
  if (!session?.date || !session?.time) {
    return null;
  }
  return new Date(`${session.date}T${session.time}:00`);
}

function dateOffset(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return formatDateInput(date);
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function createDateTime(date, time) {
  return new Date(`${date}T${time}:00`).toISOString();
}

function formatClock(seconds) {
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function makePreview(value, length) {
  const trimmed = value.trim();
  if (trimmed.length <= length) {
    return trimmed;
  }
  return `${trimmed.slice(0, length).trim()}…`;
}

function looksLikeUrl(value) {
  return /^https?:\/\//i.test(value.trim());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function showToast(title, text) {
  while (refs.toastStack.children.length >= MAX_TOASTS) {
    refs.toastStack.firstElementChild?.remove();
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p>`;
  refs.toastStack.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    uiState.revealObserver = null;
    return;
  }
  uiState.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        uiState.revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });
}

function refreshRevealTargets() {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.style.setProperty("--reveal-delay", `${Number(element.dataset.delay || 0)}ms`);
    element.classList.remove("visible");
    if (uiState.revealObserver) {
      uiState.revealObserver.observe(element);
    } else {
      element.classList.add("visible");
    }
  });
}
