const STORAGE_KEY = "mindlog_state_cache_v5";
const SESSION_KEY = "mindlog_session_v1";
const REMOTE_SYNC_DELAY = 450;
const MAX_TOASTS = 4;
const DISTORTIONS = [
  { id: "catastrofizzazione", icon: "!", label: "Catastrofizzazione" },
  { id: "lettura-mente", icon: "o", label: "Lettura della mente" },
  { id: "tutto-niente", icon: "=", label: "Tutto-o-niente" },
  { id: "personalizzazione", icon: "@", label: "Personalizzazione" },
  { id: "filtro-mentale", icon: "#", label: "Filtro mentale" },
  { id: "minimizzazione", icon: "-", label: "Minimizzazione" },
  { id: "doverizzazione", icon: "*", label: "Doverizzazione" },
  { id: "conclusioni", icon: ">", label: "Saltare alle conclusioni" }
];

const EMOTIONS = [
  "Sereno", "Triste", "Ansioso", "Arrabbiato", "Demotivato", "Fiducioso", "Stanco", "Confuso", "Sollevato", "Grato"
];

const PHYSICAL_SENSATIONS = [
  "Tensione", "Mal di testa", "Peso sul petto", "Stanchezza", "Agitazione", "Nodo alla gola", "Respiro corto", "Calma", "Leggerezza", "Nessuna in particolare"
];

const TIP_CATEGORIES = [
  "Tutti", "Respirazione", "Grounding", "Meditazione", "Messaggio dello psicologo", "Video", "Immagine", "Testo", "Audio"
];

const GAME_LIBRARY = [
  { id: "cognitive-restructuring", title: "Ristrutturazione Cognitiva", category: "CBT", xp: 50, duration: "3 step", description: "Esplora un pensiero difficile, riconosci le distorsioni e riscrivilo con maggiore equilibrio." },
  { id: "leaves-stream", title: "Foglie sul Ruscello", category: "Mindfulness", xp: 45, duration: "3-10 minuti", description: "Lascia scorrere i pensieri su foglie che attraversano lentamente un ruscello animato." },
  { id: "body-scan", title: "Body Scan Animato", category: "Mindfulness", xp: 50, duration: "Sessione guidata", description: "Scansiona il corpo dall'alto verso il basso e segnala i punti di tensione." },
  { id: "cognitive-defusion", title: "Defusione Cognitiva", category: "CBT", xp: 40, duration: "3 modalità", description: "Osserva i pensieri da una distanza diversa: nuvola, canzone o ticker." },
  { id: "opposite-action", title: "Opposite Action", category: "Regolazione", xp: 60, duration: "5 step", description: "Parti dall'emozione, riconosci l'impulso e scegli un'azione opposta più utile." },
  { id: "tipp", title: "Skill TIPP", category: "Regolazione", xp: 50, duration: "4 skill", description: "Temperatura, esercizio, respiro cadenzato e rilassamento progressivo in formato interattivo." },
  { id: "breathing-studio", title: "Esercizi di Respirazione", category: "Respirazione", xp: 45, duration: "2-10 minuti", description: "Box breathing, 4-7-8, coerenza cardiaca e respirazione diaframmatica." },
  { id: "graded-exposure", title: "Esposizione Graduale", category: "Esposizione", xp: 60, duration: "3 schermate", description: "Costruisci una scala della paura, scegli un gradino e osserva l'andamento dell'ansia." },
  { id: "pmr", title: "Rilassamento Muscolare Progressivo", category: "PMR", xp: 55, duration: "10 gruppi", description: "Attraversa i gruppi muscolari in sequenza, alternando contrazione e rilascio." },
  { id: "guided-imagery", title: "Visualizzazione Guidata", category: "Mindfulness", xp: 50, duration: "5-15 minuti", description: "Immergiti in una spiaggia, una foresta o una montagna con narrazione e audio ambientale generativo." }
];

const ACHIEVEMENTS = [
  { id: "first-game", icon: "◎", title: "Primo passo", description: "Completa il primo mini-gioco." },
  { id: "xp-100", icon: "✦", title: "Energia in crescita", description: "Raggiungi 100 XP totali." },
  { id: "xp-300", icon: "✺", title: "Ritmo costante", description: "Raggiungi 300 XP totali." },
  { id: "streak-3", icon: "F", title: "Presenza continua", description: "Arriva a 3 giorni di streak." },
  { id: "streak-7", icon: "FF", title: "Settimana piena", description: "Arriva a 7 giorni di streak." },
  { id: "sheet-3", icon: "✎", title: "Voce interiore", description: "Compila 3 schede giornaliere." },
  { id: "homework-1", icon: "✓", title: "Primo homework", description: "Completa il primo homework assegnato." },
  { id: "homework-5", icon: "✓✓", title: "Costanza attiva", description: "Completa 5 homework." },
  { id: "cbt-3", icon: "∞", title: "Nuove prospettive", description: "Completa 3 esercizi CBT." },
  { id: "breath-3", icon: "◌", title: "Respiro stabile", description: "Completa 3 esercizi di respirazione." },
  { id: "mindfulness-3", icon: "~", title: "Presenza morbida", description: "Completa 3 esercizi mindfulness." },
  { id: "all-categories", icon: "★", title: "Allenamento completo", description: "Completa almeno un esercizio in ogni area principale." }
];

const MOTIVATIONS = [
  "Anche una pausa breve può diventare un gesto di cura importante.",
  "Dare un nome a ciò che senti è già un modo concreto di prenderti sul serio.",
  "Non serve fare tutto oggi: basta scegliere il passo più gentile.",
  "Osservarti con calma può rendere la giornata più abitabile."
];

const NEGATIVE_KEYWORDS = [
  "ansia", "blocc", "paura", "male", "croll", "pesante", "sol", "vuot", "agit", "stanco", "diffic"
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
  }
];

const GROUNDING_ITEMS = [
  { title: "Tecnica 5-4-3-2-1", body: "Nomina 5 cose che vedi, 4 che senti con il tatto, 3 che ascolti, 2 odori e 1 sapore." },
  { title: "Osserva cinque dettagli", body: "Fermati su forme, luci, colori e piccoli particolari intorno a te, senza fretta." },
  { title: "Ascolta quattro suoni", body: "Prova a distinguere rumori vicini e lontani, lasciando che il tuo ascolto rallenti." },
  { title: "Tocca tre oggetti", body: "Nota consistenza, temperatura e peso di ciò che hai accanto: il corpo può aiutarti a rientrare nel presente." },
  { title: "Respira lentamente", body: "Concediti tre respiri lenti e morbidi. Non serve farli perfetti: conta il ritmo, non la prestazione." },
  { title: "Frase di rientro", body: "Ripeti con calma: “Sono qui, adesso. Posso fare un passo alla volta.”" }
];

const BODY_ZONES = [
  { id: "testa", label: "Testa", text: "Porta l'attenzione alla fronte, agli occhi e al cuoio capelluto. Nota se c'è pressione, rigidità o un piccolo spazio di sollievo." },
  { id: "collo", label: "Collo", text: "Osserva il collo e la gola. Prova a notare tensione, chiusura o il bisogno di allungare il respiro." },
  { id: "spalle", label: "Spalle", text: "Le spalle spesso trattengono peso. Lascia che il respiro passi di qui e osserva se qualcosa può ammorbidirsi." },
  { id: "petto", label: "Petto", text: "Resta sul petto per qualche istante. Nota se il respiro è libero, corto, veloce o trattenuto." },
  { id: "addome", label: "Addome", text: "Porta l'attenzione all'addome e al suo movimento. Anche un piccolo espandersi e ritirarsi è già una traccia utile." },
  { id: "braccia", label: "Braccia", text: "Scorri lungo braccia e avambracci. Chiediti se senti pesantezza, formicolio o stanchezza residua." },
  { id: "mani", label: "Mani", text: "Osserva mani e dita: possono raccontare agitazione, trattenimento o la possibilità di lasciare andare." },
  { id: "bacino", label: "Bacino", text: "Rimani sul bacino e sulla zona lombare. Nota appoggio, rigidità e contatto con il supporto." },
  { id: "gambe", label: "Gambe", text: "Attraversa cosce e polpacci. Riconosci peso, stanchezza o il modo in cui il corpo si sostiene." },
  { id: "piedi", label: "Piedi", text: "Concludi con piedi e appoggi. Sentire il contatto con il terreno può aiutarti a tornare nel presente." }
];

const PMR_GROUPS = [
  "mani", "braccia", "spalle", "viso", "collo", "petto", "addome", "glutei", "gambe", "piedi"
];

const OPPOSITE_ACTIONS = {
  rabbia: ["Parlare più lentamente", "Allontanarti per due minuti", "Abbassare il tono del corpo prima delle parole"],
  paura: ["Fare un passo piccolo verso ciò che eviti", "Guardarti attorno e orientarti", "Restare ancora 30 secondi nel presente"],
  tristezza: ["Muovere il corpo per pochi minuti", "Cercare contatto con qualcuno", "Aprire uno spazio minimo di cura"],
  vergogna: ["Rimanere visibile in modo gentile", "Dirti una frase valida", "Ridurre l'isolamento di un piccolo passo"],
  colpa: ["Valutare il fatto e non solo la sensazione", "Riparare se serve, senza punirti", "Tornare a una voce interna più equa"],
  disgusto: ["Respirare e restare per un momento", "Ridurre l'impulso di fuga", "Osservare senza chiuderti del tutto"],
  invidia: ["Riconoscere il bisogno sotto l'emozione", "Scegliere un gesto costruttivo", "Trasformare il confronto in informazione"],
  amore: ["Restare aperto senza annullarti", "Esprimerti con chiarezza", "Proteggere il legame e i confini insieme"]
};

const DAILY_CHALLENGES = [
  { id: "cognitive-restructuring", text: "Rileggi un pensiero difficile e prova a riscriverlo con più equilibrio." },
  { id: "breathing-studio", text: "Concediti una tecnica di respiro completa e lenta." },
  { id: "body-scan", text: "Fermati ad ascoltare dove oggi il corpo chiede attenzione." },
  { id: "leaves-stream", text: "Lascia andare almeno due pensieri sul ruscello." },
  { id: "opposite-action", text: "Scegli un'azione opposta a un impulso emotivo difficile." }
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
  gameFilter: "Tutti",
  progressView: "timeline",
  selectedBreathingId: BREATHING_EXERCISES[0].id,
  countdownTimer: null,
  breathingTimer: null,
  breathingState: null,
  revealObserver: null,
  activeModal: null,
  lastFocusedElement: null,
  homeworkDrawerExerciseId: null,
  homeworkPriority: "Media",
  draft: null,
  currentGame: null,
  gameState: {},
  gameRuntime: [],
  gameVisualRuntime: [],
  audioContext: null,
  audioNodes: [],
  currentOpenHomeworkId: null,
  remoteSyncTimer: null,
  remoteSyncPromise: null
};

let state;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheDom();
  state = loadState();
  uiState.draft = createEmptyDraft();
  populateTipCategories();
  bindEvents();
  initRevealObserver();
  resizeCelebrationCanvas();
  window.addEventListener("resize", resizeCelebrationCanvas);
  renderAll();
  startCountdown();
  await restoreRemoteSession();
}

function cacheDom() {
  const ids = [
    "topbar", "topbarLabel", "topbarTitle", "homeShortcutButton", "logoutButton", "patientHeaderStats", "xpFill", "xpText", "xpLevelLabel", "streakValue", "simulateDayButton",
    "landingScreen", "patientScreen", "therapistScreen",
    "loginModal", "closeLoginModal", "loginRoleLabel", "loginTitle", "loginText", "loginForm", "usernameInput", "passwordInput", "loginError",
    "detailModal", "closeDetailModal", "detailContent", "toastStack", "xpFloatLayer", "celebrationCanvas",
    "patientSidebarText", "motivationText", "sessionTitle", "sessionNote", "countDays", "countHours", "countMinutes", "countSeconds", "recentEntriesList", "focusSummary",
    "sheetDateLabel", "dailySheetForm", "moodRange", "moodValue", "anxietySelect", "emotionChips", "physicalChips", "betterInput", "hardInput", "gratitude1", "gratitude2", "gratitude3", "positiveInput", "noteInput", "customQuestionsBox", "aiQuestionsBox", "advicePreview", "resetSheetButton", "draftStatus",
    "tipFilters", "tipsGrid", "breathingList", "groundingList", "breathingOrb", "breathingPhase", "breathingTitle", "breathingInstruction", "breathingCycle", "breathingTime", "startBreathingButton", "stopBreathingButton",
    "taskForm", "taskInput", "taskFilters", "taskList", "historyList", "dailyChallengeCard", "homeworkPreviewList", "gamificationSummary", "recentProgressList", "achievementGrid",
    "gameFilters", "gamesGrid", "patientHomeworkList",
    "therapistSidebarText", "therapistStats", "moodChart", "weeklySummary", "recordList", "selectedPatientBanner",
    "tipForm", "tipId", "tipTitle", "tipCategory", "tipType", "tipDescription", "tipContent", "resetTipButton", "manageTipsGrid",
    "sessionForm", "sessionDateInput", "sessionTimeInput", "sessionNoteInput", "sessionPreview",
    "questionForm", "questionId", "questionText", "questionType", "questionOptions", "questionOptionsHelp", "questionActive", "resetQuestionButton", "manageQuestionsList",
    "patientAccountForm", "patientAccountId", "patientNameInput", "patientUsernameInput", "patientPasswordInput", "resetPatientAccountButton", "patientSelectionSummary", "patientAccountsList",
    "therapistHomeworkGrid", "assignedHomeworkList", "progressViewTabs", "progressTimeline", "radarChart", "heatmapSummaryCards", "heatmapBoard",
    "homeworkDrawer", "closeHomeworkDrawer", "homeworkAssignForm", "drawerExerciseId", "drawerExerciseTitle", "drawerHomeworkTitle", "drawerHomeworkNote", "drawerHomeworkDueDate", "drawerPriorityPills",
    "gameModal", "closeGameModal", "gameModalLabel", "gameModalTitle", "gameModalMeta", "gameModalBody"
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
  refs.closeDetailModal.addEventListener("click", closeDetailModal);
  refs.closeGameModal.addEventListener("click", closeGameModal);
  refs.closeHomeworkDrawer.addEventListener("click", closeHomeworkDrawer);

  refs.loginModal.addEventListener("click", (event) => {
    if (event.target === refs.loginModal) {
      closeLoginModal();
    }
  });
  refs.detailModal.addEventListener("click", (event) => {
    if (event.target === refs.detailModal) {
      closeDetailModal();
    }
  });
  refs.gameModal.addEventListener("click", (event) => {
    if (event.target === refs.gameModal) {
      closeGameModal();
    }
  });
  refs.homeworkDrawer.addEventListener("click", (event) => {
    if (event.target === refs.homeworkDrawer) {
      closeHomeworkDrawer();
    }
  });

  refs.loginForm.addEventListener("submit", handleLogin);
  refs.logoutButton.addEventListener("click", logout);
  refs.homeShortcutButton.addEventListener("click", handleHomeShortcut);
  refs.simulateDayButton.addEventListener("click", simulateDayForTesting);

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
    if (chip) {
      toggleChip("emotions", chip.dataset.chip);
    }
  });

  refs.physicalChips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip]");
    if (chip) {
      toggleChip("physicalSensations", chip.dataset.chip);
    }
  });

  refs.customQuestionsBox.addEventListener("input", handleCustomAnswerInput);
  refs.customQuestionsBox.addEventListener("change", handleCustomAnswerInput);
  refs.aiQuestionsBox.addEventListener("input", handleAiAnswerInput);
  refs.dailySheetForm.addEventListener("submit", saveDailySheet);
  refs.resetSheetButton.addEventListener("click", () => resetDraft(true));

  refs.tipFilters.addEventListener("click", handleTipFilterClick);
  refs.tipsGrid.addEventListener("click", handleTipOpen);
  refs.breathingList.addEventListener("click", handleBreathingSelect);
  refs.startBreathingButton.addEventListener("click", startBreathing);
  refs.stopBreathingButton.addEventListener("click", () => stopBreathing(true));

  refs.taskForm.addEventListener("submit", addTask);
  refs.taskFilters.addEventListener("click", handleTaskFilterClick);
  refs.taskList.addEventListener("click", handleTaskActions);
  refs.historyList.addEventListener("click", handleHistoryOpen);
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

  refs.gameFilters.addEventListener("click", handleGameFilterClick);
  refs.gamesGrid.addEventListener("click", handleGameCardActions);
  refs.patientHomeworkList.addEventListener("click", handlePatientHomeworkActions);
  refs.therapistHomeworkGrid.addEventListener("click", handleTherapistHomeworkCardClick);
  refs.assignedHomeworkList.addEventListener("click", handleAssignedHomeworkActions);

  refs.homeworkAssignForm.addEventListener("submit", assignHomework);
  refs.drawerPriorityPills.addEventListener("click", handlePrioritySelect);

  refs.progressViewTabs.addEventListener("click", handleProgressTabClick);
  refs.gameModalBody.addEventListener("click", handleGameClick);
  refs.gameModalBody.addEventListener("input", handleGameInput);
  refs.gameModalBody.addEventListener("change", handleGameChange);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDemoState();
    }
    return sanitizeState(JSON.parse(raw));
  } catch (error) {
    return createDemoState();
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
    patients: [],
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
      }
    ],
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
      }
    ]
  };
}

function sanitizeState(raw) {
  const demo = createDemoState();
  return {
    auth: sanitizeAuth(raw?.auth || demo.auth),
    patients: Array.isArray(raw?.patients) ? raw.patients.map(sanitizePatient).filter(Boolean) : [],
    tips: Array.isArray(raw?.tips) && raw.tips.length ? raw.tips.map(sanitizeTip).filter(Boolean) : demo.tips,
    customQuestions: Array.isArray(raw?.customQuestions) ? raw.customQuestions.map(sanitizeQuestion).filter(Boolean) : demo.customQuestions
  };
}

function sanitizeAuth(auth) {
  return {
    therapist: {
      username: normalizeUsername(auth?.therapist?.username) || "martina",
      name: String(auth?.therapist?.name || "Martina")
    }
  };
}

function sanitizePatient(patient) {
  if (!patient || typeof patient !== "object") {
    return null;
  }
  const username = normalizeUsername(patient.username);
  const password = normalizePassword(patient.password);
  if (!username) {
    return null;
  }
  const sanitized = {
    id: String(patient.id || `patient-${Date.now()}`),
    name: String(patient.name || username),
    username,
    ...(password ? { password } : {}),
    createdAt: String(patient.createdAt || new Date().toISOString()),
    session: sanitizeSession(patient.session),
    tasks: Array.isArray(patient.tasks) ? patient.tasks.map(sanitizeTask).filter(Boolean) : [],
    entries: Array.isArray(patient.entries) ? patient.entries.map(sanitizeEntry).filter(Boolean) : [],
    homeworks: Array.isArray(patient.homeworks) ? patient.homeworks.map(sanitizeHomework).filter(Boolean) : [],
    exerciseHistory: Array.isArray(patient.exerciseHistory) ? patient.exerciseHistory.map(sanitizeProgress).filter(Boolean) : [],
    stats: sanitizeStats(patient.stats),
    gameData: patient.gameData && typeof patient.gameData === "object" ? patient.gameData : {},
    draft: sanitizeDraft(patient.draft)
  };
  sanitized.stats.achievements = computeAchievements(sanitized);
  return sanitized;
}

function sanitizeSession(session) {
  return {
    date: isDateInput(session?.date) ? session.date : dateOffset(7),
    time: isTimeInput(session?.time) ? session.time : "18:30",
    note: String(session?.note || "Nessuna nota aggiunta.")
  };
}

function sanitizeTip(tip) {
  if (!tip || typeof tip !== "object") {
    return null;
  }
  const title = String(tip.title || "").trim();
  const description = String(tip.description || "").trim();
  const content = String(tip.content || "").trim();
  if (!title || !description || !content) {
    return null;
  }
  return {
    id: String(tip.id || `tip-${Date.now()}`),
    title,
    category: TIP_CATEGORIES.includes(tip.category) ? tip.category : "Testo",
    type: ["Testo", "Audio", "Video", "Immagine"].includes(tip.type) ? tip.type : "Testo",
    description,
    content
  };
}

function sanitizeQuestion(question) {
  if (!question || typeof question !== "object") {
    return null;
  }
  const text = String(question.text || "").trim();
  if (!text) {
    return null;
  }
  const type = ["testo", "textarea", "scelta-singola", "scelta-multipla", "scala"].includes(question.type) ? question.type : "testo";
  return {
    id: String(question.id || `question-${Date.now()}`),
    text,
    type,
    options: Array.isArray(question.options) ? question.options.map((item) => String(item).trim()).filter(Boolean) : [],
    active: question.active !== false
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
    createdAt: String(task.createdAt || new Date().toISOString())
  };
}

function sanitizeEntry(entry) {
  if (!entry || typeof entry !== "object" || !isDateInput(entry.date)) {
    return null;
  }
  return {
    id: String(entry.id || `entry-${Date.now()}`),
    date: entry.date,
    createdAt: String(entry.createdAt || new Date(`${entry.date}T12:00:00`).toISOString()),
    mood: clamp(Number(entry.mood) || 6, 1, 10),
    anxiety: ["Nessuna", "Bassa", "Media", "Alta", "Molto alta"].includes(entry.anxiety) ? entry.anxiety : "Media",
    emotions: Array.isArray(entry.emotions) ? entry.emotions.filter((item) => EMOTIONS.includes(item)) : [],
    physicalSensations: Array.isArray(entry.physicalSensations) ? entry.physicalSensations.filter((item) => PHYSICAL_SENSATIONS.includes(item)) : [],
    betterToday: String(entry.betterToday || ""),
    hardToday: String(entry.hardToday || ""),
    gratitude: Array.isArray(entry.gratitude) ? [0, 1, 2].map((index) => String(entry.gratitude[index] || "")) : ["", "", ""],
    positiveThought: String(entry.positiveThought || ""),
    note: String(entry.note || ""),
    customAnswers: Array.isArray(entry.customAnswers) ? entry.customAnswers : [],
    aiQuestions: Array.isArray(entry.aiQuestions) ? entry.aiQuestions : [],
    advice: String(entry.advice || ""),
    privateNote: String(entry.privateNote || "")
  };
}

function sanitizeHomework(homework) {
  if (!homework || typeof homework !== "object") {
    return null;
  }
  const game = GAME_LIBRARY.find((item) => item.id === homework.exerciseId);
  if (!game) {
    return null;
  }
  return {
    id: String(homework.id || `homework-${Date.now()}`),
    exerciseId: game.id,
    title: String(homework.title || game.title),
    note: String(homework.note || ""),
    dueDate: isDateInput(homework.dueDate) ? homework.dueDate : dateOffset(5),
    priority: ["Bassa", "Media", "Alta"].includes(homework.priority) ? homework.priority : "Media",
    status: ["assegnato", "completato"].includes(homework.status) ? homework.status : "assegnato",
    assignedAt: String(homework.assignedAt || new Date().toISOString()),
    completedAt: homework.completedAt ? String(homework.completedAt) : ""
  };
}

function sanitizeProgress(item) {
  if (!item || typeof item !== "object") {
    return null;
  }
  const game = GAME_LIBRARY.find((entry) => entry.id === item.exerciseId);
  if (!game) {
    return null;
  }
  return {
    id: String(item.id || `progress-${Date.now()}`),
    exerciseId: game.id,
    title: String(item.title || game.title),
    xp: Number(item.xp) || game.xp,
    category: String(item.category || game.category),
    completedAt: String(item.completedAt || new Date().toISOString()),
    source: String(item.source || "gioco"),
    note: String(item.note || "")
  };
}

function sanitizeStats(stats) {
  return {
    xp: Math.max(0, Number(stats?.xp) || 0),
    level: Math.max(1, Number(stats?.level) || 1),
    streak: Math.max(0, Number(stats?.streak) || 0),
    lastActiveDate: isDateInput(stats?.lastActiveDate) ? stats.lastActiveDate : "",
    achievements: Array.isArray(stats?.achievements) ? stats.achievements.map(String) : []
  };
}

function sanitizeDraft(draft) {
  const fallback = createEmptyDraft();
  if (!draft || typeof draft !== "object") {
    return fallback;
  }
  return {
    date: isDateInput(draft.date) ? draft.date : fallback.date,
    mood: clamp(Number(draft.mood) || fallback.mood, 1, 10),
    anxiety: ["Nessuna", "Bassa", "Media", "Alta", "Molto alta"].includes(draft.anxiety) ? draft.anxiety : fallback.anxiety,
    emotions: Array.isArray(draft.emotions) ? draft.emotions.filter((item) => EMOTIONS.includes(item)) : [],
    physicalSensations: Array.isArray(draft.physicalSensations) ? draft.physicalSensations.filter((item) => PHYSICAL_SENSATIONS.includes(item)) : [],
    betterToday: String(draft.betterToday || ""),
    hardToday: String(draft.hardToday || ""),
    gratitude: Array.isArray(draft.gratitude) ? [0, 1, 2].map((index) => String(draft.gratitude[index] || "")) : ["", "", ""],
    positiveThought: String(draft.positiveThought || ""),
    note: String(draft.note || ""),
    customAnswers: draft.customAnswers && typeof draft.customAnswers === "object" ? { ...draft.customAnswers } : {},
    aiAnswers: draft.aiAnswers && typeof draft.aiAnswers === "object" ? { ...draft.aiAnswers } : {}
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  queueRemoteSync();
}

function saveStateLocalOnly() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getSessionToken() {
  return localStorage.getItem(SESSION_KEY) || "";
}

function setSessionToken(token) {
  localStorage.setItem(SESSION_KEY, token);
}

function clearSessionToken() {
  localStorage.removeItem(SESSION_KEY);
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = getSessionToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(path, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Richiesta non riuscita.");
  }
  return payload;
}

function applyRemotePayload(payload) {
  state = sanitizeState(payload.state);
  uiState.currentRole = payload.role || uiState.currentRole;
  uiState.currentPatientId = payload.currentPatientId || state.patients[0]?.id || null;
  syncDraftFromPatient();
  saveStateLocalOnly();
  renderAll();
  startCountdown();
}

async function restoreRemoteSession() {
  const token = getSessionToken();
  if (!token) {
    return;
  }
  try {
    const payload = await apiRequest("/api/session");
    applyRemotePayload(payload);
  } catch (error) {
    clearSessionToken();
    uiState.currentRole = null;
    uiState.currentPatientId = null;
    renderAll();
  }
}

function queueRemoteSync() {
  if (!uiState.currentRole || !getSessionToken()) {
    return;
  }
  if (uiState.remoteSyncTimer) {
    clearTimeout(uiState.remoteSyncTimer);
  }
  uiState.remoteSyncTimer = window.setTimeout(() => {
    uiState.remoteSyncTimer = null;
    uiState.remoteSyncPromise = syncRemoteState().catch((error) => {
      showToast("Sincronizzazione non riuscita", error.message || "Riproveremo alla prossima modifica.");
    });
  }, REMOTE_SYNC_DELAY);
}

async function syncRemoteState() {
  if (!uiState.currentRole || !getSessionToken()) {
    return;
  }
  const payload = await apiRequest("/api/sync", {
    method: "POST",
    body: {
      currentPatientId: uiState.currentPatientId,
      state
    }
  });
  const previousRole = uiState.currentRole;
  const previousSection = uiState.patientSection;
  const previousTherapistSection = uiState.therapistSection;
  applyRemotePayload(payload);
  uiState.currentRole = previousRole;
  uiState.patientSection = previousSection;
  uiState.therapistSection = previousTherapistSection;
  switchSection(previousRole === "patient" ? "patient" : "therapist", previousRole === "patient" ? previousSection : previousTherapistSection);
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

function createPatientAccount(name, username, password) {
  return {
    id: `patient-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
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
      createTask("Fare una passeggiata di 10 minuti", false),
      createTask("Bere acqua con regolarità", false),
      createTask("Scrivere un pensiero positivo", false),
      createTask("Ascoltare un esercizio di respirazione", false),
      createTask("Chiamare una persona cara", false)
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

function createTask(title, completed) {
  return {
    id: `task-${Math.random().toString(36).slice(2, 9)}`,
    title,
    completed,
    createdAt: new Date().toISOString()
  };
}

function renderAll() {
  ensureSelectedPatient();
  syncDraftFromPatient();
  renderShell();
  renderPatientHome();
  renderSheet();
  renderTips();
  renderTasks();
  renderHistory();
  renderGames();
  renderPatientHomework();
  renderAchievements();
  renderTherapistDashboard();
  renderRecords();
  renderTipsManager();
  renderSession();
  renderQuestions();
  renderPatients();
  renderTherapistHomework();
  renderProgressViews();
  refreshRevealTargets();
}

function renderShell() {
  const loggedIn = Boolean(uiState.currentRole);
  refs.topbar.classList.toggle("hidden", !loggedIn);
  refs.landingScreen.classList.toggle("hidden", loggedIn);
  refs.patientScreen.classList.toggle("hidden", uiState.currentRole !== "patient");
  refs.therapistScreen.classList.toggle("hidden", uiState.currentRole !== "therapist");
  refs.patientHeaderStats.classList.toggle("hidden", uiState.currentRole !== "patient");
  refs.simulateDayButton.classList.toggle("hidden", uiState.currentRole !== "patient");

  if (!loggedIn) {
    return;
  }

  const currentPatient = getSelectedPatient();
  const patientName = currentPatient ? ` · ${currentPatient.name}` : "";

  if (uiState.currentRole === "patient") {
    refs.topbarLabel.textContent = "Area paziente";
    refs.topbarTitle.textContent = sectionLabel(uiState.patientSection);
  } else {
    refs.topbarLabel.textContent = "Area psicologo";
    refs.topbarTitle.textContent = `${sectionLabel(uiState.therapistSection)}${patientName}`;
  }

  document.querySelectorAll(".nav-link, .bottom-link").forEach((button) => {
    const role = button.dataset.roleArea;
    const target = button.dataset.target;
    const active = (role === "patient" && target === uiState.patientSection) || (role === "therapist" && target === uiState.therapistSection);
    button.classList.toggle("active", active);
  });

  renderXpHeader();
}

function renderPatientHome() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.patientSidebarText.textContent = "Nessun profilo paziente attivo.";
    refs.motivationText.textContent = "Quando il tuo psicologo creerà il profilo, troverai qui il tuo spazio quotidiano.";
    refs.focusSummary.innerHTML = `<div class="empty-state">Per iniziare serve un account paziente attivo.</div>`;
    refs.recentEntriesList.innerHTML = `<div class="empty-state">Non ci sono ancora compilazioni.</div>`;
    refs.dailyChallengeCard.innerHTML = `<div class="empty-state">La challenge del giorno apparirà quando il profilo sarà attivo.</div>`;
    refs.homeworkPreviewList.innerHTML = `<div class="empty-state">Qui vedrai gli homework più recenti.</div>`;
    return;
  }

  const entries = getEntriesDescending();
  const latest = entries[0];
  refs.patientSidebarText.textContent = latest ? getMotivationFromEntry(latest) : "Prenditi un momento per ascoltare come stai oggi.";
  refs.motivationText.textContent = latest ? getMotivationFromEntry(latest) : MOTIVATIONS[new Date().getDate() % MOTIVATIONS.length];

  refs.recentEntriesList.innerHTML = entries.length
    ? entries.slice(0, 3).map((entry) => `
        <button class="stack-item tip-card" type="button" data-entry-open="${escapeAttribute(entry.id)}">
          <div class="meta-row">
            <span class="meta-pill">${escapeHtml(formatLongDate(entry.date))}</span>
            <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
          </div>
          <strong>${escapeHtml(makePreview(entry.hardToday || entry.betterToday || "Compilazione salvata.", 70))}</strong>
          <span>${escapeHtml(entry.advice || "Osservazione salvata nel tuo storico.")}</span>
        </button>
      `).join("")
    : `<div class="empty-state">Le tue compilazioni appariranno qui dopo il primo salvataggio.</div>`;

  refs.recentEntriesList.querySelectorAll("[data-entry-open]").forEach((button) => {
    button.addEventListener("click", () => openEntryDetail(button.dataset.entryOpen, false));
  });

  refs.focusSummary.innerHTML = latest
    ? `
      <p>Negli ultimi giorni emerge soprattutto <strong>${escapeHtml(getTopItems(entries.flatMap((item) => item.emotions), 1)[0] || "un bisogno di ascolto")}</strong>.</p>
      <p>Il livello di ansia più frequente è <strong>${escapeHtml(getMostFrequent(entries.map((item) => item.anxiety)) || "non disponibile")}</strong> e il tono generale recente è <strong>${latest.mood >= 7 ? "più aperto" : latest.mood <= 4 ? "più fragile" : "in equilibrio variabile"}</strong>.</p>
      <p>Se vuoi, puoi partire da una scheda giornaliera o da un mini-gioco per lavorare su ciò che senti adesso.</p>
    `
    : `<div class="empty-state">Dopo le prime compilazioni troverai qui una sintesi gentile del tuo andamento.</div>`;

  const challenge = getDailyChallenge();
  const isCompleted = patient.exerciseHistory.some((item) => item.exerciseId === challenge.id && sameDate(item.completedAt, new Date().toISOString()));
  const progress = isCompleted ? 100 : 24;
  refs.dailyChallengeCard.innerHTML = `
    <div class="challenge-card">
      <div class="meta-row">
        <span class="meta-pill tertiary">Challenge quotidiana</span>
        <span class="level-badge">Bonus XP doppi</span>
      </div>
      <h3>${escapeHtml(findGame(challenge.id).title)}</h3>
      <p>${escapeHtml(challenge.text)}</p>
      <div class="challenge-progress"><span style="width:${progress}%"></span></div>
      <div class="inline-actions">
        <button class="primary-button" type="button" data-start-game="${escapeAttribute(challenge.id)}">${isCompleted ? "Riapri" : "Inizia adesso"}</button>
        ${isCompleted ? `<span class="status-badge completato">Completata oggi</span>` : `<span class="status-badge">Bonus attivo</span>`}
      </div>
    </div>
  `;
  refs.dailyChallengeCard.querySelector("[data-start-game]")?.addEventListener("click", (event) => {
    openGame(event.currentTarget.dataset.startGame, { homeworkId: "" });
  });

  const activeHomework = patient.homeworks.filter((item) => item.status === "assegnato");
  refs.homeworkPreviewList.innerHTML = activeHomework.length
    ? activeHomework.slice(0, 3).map((homework) => `
        <div class="homework-card">
          <div class="meta-row">
            <span class="priority-pill ${homework.priority.toLowerCase()}">${escapeHtml(homework.priority)}</span>
            <span class="meta-pill">Scadenza ${escapeHtml(shortDayMonth(homework.dueDate))}</span>
          </div>
          <strong>${escapeHtml(homework.title)}</strong>
          <p class="homework-note">${escapeHtml(makePreview(homework.note || "Homework assegnato dal tuo psicologo.", 90))}</p>
        </div>
      `).join("")
    : `<div class="empty-state">Quando ti verrà assegnato un homework, lo troverai qui.</div>`;
}

function renderSheet() {
  const patient = getSelectedPatient();
  refs.sheetDateLabel.textContent = formatLongDate(uiState.draft.date);
  refs.customQuestionsBox.innerHTML = state.customQuestions.filter((item) => item.active).length
    ? state.customQuestions.filter((item) => item.active).map(renderCustomQuestion).join("")
    : `<div class="empty-state">Il tuo psicologo non ha ancora aggiunto domande personalizzate.</div>`;
  renderDynamicSheet();

  if (!patient) {
    refs.draftStatus.innerHTML = `<strong>Profilo paziente non disponibile.</strong> Lo psicologo deve prima creare e selezionare un account.`;
  }
}

function renderDynamicSheet() {
  refs.moodValue.textContent = `${uiState.draft.mood} / 10`;
  refs.moodRange.value = String(uiState.draft.mood);
  refs.anxietySelect.value = uiState.draft.anxiety;
  refs.emotionChips.innerHTML = renderChipSet(EMOTIONS, uiState.draft.emotions);
  refs.physicalChips.innerHTML = renderChipSet(PHYSICAL_SENSATIONS, uiState.draft.physicalSensations);
  refs.betterInput.value = uiState.draft.betterToday;
  refs.hardInput.value = uiState.draft.hardToday;
  refs.gratitude1.value = uiState.draft.gratitude[0];
  refs.gratitude2.value = uiState.draft.gratitude[1];
  refs.gratitude3.value = uiState.draft.gratitude[2];
  refs.positiveInput.value = uiState.draft.positiveThought;
  refs.noteInput.value = uiState.draft.note;

  const questions = buildAiQuestions(uiState.draft);
  uiState.gameState.aiQuestions = questions;
  refs.aiQuestionsBox.innerHTML = questions.length ? questions.map((item) => `
    <div class="question-card-block">
      <label class="field-label" for="ai-${escapeAttribute(item.id)}">
        <span>${escapeHtml(item.question)}</span>
      </label>
      <textarea id="ai-${escapeAttribute(item.id)}" rows="3" data-ai-id="${escapeAttribute(item.id)}" placeholder="Scrivi qui la tua risposta.">${escapeHtml(uiState.draft.aiAnswers[item.id] || "")}</textarea>
    </div>
  `).join("") : `<div class="empty-state">Le domande di approfondimento appariranno in base alle tue risposte.</div>`;

  refs.advicePreview.textContent = buildAdvice(uiState.draft);
  const meaningful = isDraftMeaningful(uiState.draft);
  refs.draftStatus.innerHTML = meaningful
    ? `<strong>Bozza in corso.</strong> Le modifiche vengono salvate su questo dispositivo mentre compili.`
    : `<strong>Pronto per iniziare.</strong> Compila con calma e salva quando senti che la scheda è completa.`;

  persistDraft();
}

function renderTips() {
  const categories = ["Tutti", ...new Set(state.tips.map((tip) => tip.category))];
  refs.tipFilters.innerHTML = categories.map((item) => `
    <button class="filter-pill ${uiState.tipFilter === item ? "active" : ""}" type="button" data-tip-filter="${escapeAttribute(item)}">${escapeHtml(item)}</button>
  `).join("");

  const tips = state.tips.filter((tip) => uiState.tipFilter === "Tutti" || tip.category === uiState.tipFilter);
  refs.tipsGrid.innerHTML = tips.length ? tips.map((tip) => `
    <article class="tip-card">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(tip.category)}</span>
        <span class="meta-pill secondary">${escapeHtml(tip.type)}</span>
      </div>
      <strong>${escapeHtml(tip.title)}</strong>
      <span>${escapeHtml(tip.description)}</span>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-tip-open="${escapeAttribute(tip.id)}">${escapeHtml(getTipActionLabel(tip.type))}</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Non ci sono tips per questa categoria.</div>`;

  refs.breathingList.innerHTML = BREATHING_EXERCISES.map((exercise) => `
    <button class="tip-card ${uiState.selectedBreathingId === exercise.id ? "selected-card" : ""}" type="button" aria-pressed="${uiState.selectedBreathingId === exercise.id ? "true" : "false"}" data-breathing="${escapeAttribute(exercise.id)}">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(exercise.duration)}</span>
      </div>
      <strong>${escapeHtml(exercise.name)}</strong>
      <span>${escapeHtml(exercise.description)}</span>
    </button>
  `).join("");

  refs.groundingList.innerHTML = GROUNDING_ITEMS.map((item) => `
    <div class="grounding-step">
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.body)}</p>
    </div>
  `).join("");

  renderBreathing();
}

function renderBreathing() {
  const exercise = BREATHING_EXERCISES.find((item) => item.id === uiState.selectedBreathingId);
  if (!exercise) {
    return;
  }
  refs.breathingTitle.textContent = exercise.name;
  refs.breathingInstruction.textContent = `${exercise.instructions} Durata consigliata: ${exercise.duration}.`;
  if (!uiState.breathingState) {
    refs.breathingPhase.textContent = "Pronto";
    refs.breathingCycle.textContent = "Fase: -";
    refs.breathingTime.textContent = "Tempo: 00:00";
    refs.breathingOrb.classList.remove("inhale", "exhale");
  }
  updateBreathingControls();
}

function renderTasks() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.taskList.innerHTML = `<div class="empty-state">Crea prima un profilo paziente per usare le attività.</div>`;
    refs.taskFilters.innerHTML = "";
    return;
  }
  const filters = [
    { id: "tutte", label: "Tutte" },
    { id: "da-fare", label: "Da fare" },
    { id: "completate", label: "Completate" }
  ];
  refs.taskFilters.innerHTML = filters.map((item) => `
    <button class="filter-pill ${uiState.taskFilter === item.id ? "active" : ""}" type="button" data-task-filter="${item.id}">${item.label}</button>
  `).join("");

  const tasks = patient.tasks.filter((task) => {
    if (uiState.taskFilter === "completate") {
      return task.completed;
    }
    if (uiState.taskFilter === "da-fare") {
      return !task.completed;
    }
    return true;
  });

  refs.taskList.innerHTML = tasks.length ? tasks.map((task) => `
    <article class="task-card ${task.completed ? "completed" : ""}">
      <button class="task-toggle" type="button" data-task-toggle="${escapeAttribute(task.id)}" aria-label="Segna attività">${task.completed ? "✓" : "○"}</button>
      <div>
        <strong class="task-title">${escapeHtml(task.title)}</strong>
        <p class="task-meta">Creata il ${escapeHtml(shortDayMonth(task.createdAt.slice(0, 10)))}.</p>
      </div>
      <button class="task-delete" type="button" data-task-delete="${escapeAttribute(task.id)}" aria-label="Elimina attività">×</button>
    </article>
  `).join("") : `<div class="empty-state">Non ci sono attività in questo filtro.</div>`;
}

function renderHistory() {
  const entries = getEntriesDescending();
  refs.historyList.innerHTML = entries.length ? entries.map((entry) => `
    <button class="record-card" type="button" data-entry-open="${escapeAttribute(entry.id)}">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(formatLongDate(entry.date))}</span>
        <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
        <span class="meta-pill tertiary">Ansia ${escapeHtml(entry.anxiety)}</span>
      </div>
      <strong>${escapeHtml(makePreview(entry.hardToday || entry.betterToday || "Compilazione salvata.", 84))}</strong>
      <span>${escapeHtml(entry.advice || "Consiglio salvato.")}</span>
    </button>
  `).join("") : `<div class="empty-state">Lo storico personale si popolerà con le compilazioni che salverai.</div>`;
}

function renderGames() {
  const categories = ["Tutti", ...new Set(GAME_LIBRARY.map((game) => game.category))];
  refs.gameFilters.innerHTML = categories.map((item) => `
    <button class="filter-pill ${uiState.gameFilter === item ? "active" : ""}" type="button" data-game-filter="${escapeAttribute(item)}">${escapeHtml(item)}</button>
  `).join("");

  const patient = getSelectedPatient();
  const visible = GAME_LIBRARY.filter((game) => uiState.gameFilter === "Tutti" || game.category === uiState.gameFilter);
  refs.gamesGrid.innerHTML = visible.map((game) => {
    const assigned = patient?.homeworks.some((item) => item.exerciseId === game.id && item.status === "assegnato");
    return `
      <article class="game-card reveal" data-delay="40">
        <div class="game-card-visual"></div>
        <div class="meta-row">
          <span class="meta-pill">${escapeHtml(game.category)}</span>
          <span class="meta-pill secondary">${escapeHtml(game.duration)}</span>
          <span class="meta-pill tertiary">${game.xp} XP</span>
        </div>
        <strong>${escapeHtml(game.title)}</strong>
        <p>${escapeHtml(game.description)}</p>
        <div class="tip-actions">
          <button class="primary-button small-button" type="button" data-start-game="${escapeAttribute(game.id)}">Apri esercizio</button>
          ${assigned ? `<span class="status-badge">Homework assegnato</span>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

function renderPatientHomework() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.patientHomeworkList.innerHTML = `<div class="empty-state">Per vedere gli homework serve un profilo paziente attivo.</div>`;
    return;
  }
  const list = [...patient.homeworks].sort((a, b) => a.status.localeCompare(b.status) || a.dueDate.localeCompare(b.dueDate));
  refs.patientHomeworkList.innerHTML = list.length ? list.map((homework) => {
    const game = findGame(homework.exerciseId);
    return `
      <article class="homework-card ${homework.status === "completato" ? "completed" : ""}">
        <div class="meta-row">
          <span class="priority-pill ${homework.priority.toLowerCase()}">${escapeHtml(homework.priority)}</span>
          <span class="status-badge ${homework.status === "completato" ? "completato" : ""}">${homework.status === "completato" ? "Completato" : "Assegnato"}</span>
        </div>
        <strong>${escapeHtml(homework.title)}</strong>
        <p class="homework-note">${escapeHtml(homework.note || "Homework assegnato dal tuo psicologo.")}</p>
        <div class="meta-row">
          <span class="meta-pill">${escapeHtml(game.title)}</span>
          <span class="meta-pill secondary">Scadenza ${escapeHtml(formatLongDate(homework.dueDate))}</span>
        </div>
        <div class="tip-actions">
          <button class="primary-button small-button" type="button" data-homework-start="${escapeAttribute(homework.id)}">${homework.status === "completato" ? "Riapri" : "Inizia esercizio"}</button>
          ${homework.status === "completato" ? `
            <svg class="checkmark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.3 4.3L19 7.4" fill="none" stroke="#1e7f52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          ` : ""}
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Non hai homework attivi in questo momento.</div>`;
}

function renderAchievements() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.gamificationSummary.innerHTML = `<div class="empty-state">Qui vedrai XP, streak e badge del paziente attivo.</div>`;
    refs.recentProgressList.innerHTML = `<div class="empty-state">I progressi appariranno dopo i primi esercizi completati.</div>`;
    refs.achievementGrid.innerHTML = "";
    return;
  }
  const levelTarget = patient.stats.level * 100;
  const nextProgress = Math.min(100, Math.round(((patient.stats.xp - ((patient.stats.level - 1) * 100)) / 100) * 100));
  refs.gamificationSummary.innerHTML = `
    <p>Livello attuale: <strong>${patient.stats.level}</strong>.</p>
    <p>XP totali: <strong>${patient.stats.xp}</strong> su <strong>${levelTarget}</strong> per il prossimo livello.</p>
    <p>Streak corrente: <strong>${patient.stats.streak} giorni</strong>.</p>
    <div class="challenge-progress"><span style="width:${nextProgress}%"></span></div>
  `;

  const recent = [...patient.exerciseHistory].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, 4);
  refs.recentProgressList.innerHTML = recent.length ? recent.map((item) => `
    <div class="tip-card">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(findGame(item.exerciseId).title)}</span>
        <span class="meta-pill secondary">+${item.xp} XP</span>
      </div>
      <strong>${escapeHtml(formatLongDate(item.completedAt.slice(0, 10)))}</strong>
      <span>${escapeHtml(item.note || "Sessione completata con successo.")}</span>
    </div>
  `).join("") : `<div class="empty-state">Quando completerai i primi esercizi, qui appariranno i progressi recenti.</div>`;

  refs.achievementGrid.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const unlocked = patient.stats.achievements.includes(achievement.id);
    return `
      <article class="achievement-card ${unlocked ? "unlocked" : "locked"}">
        <div class="achievement-icon">${escapeHtml(achievement.icon)}</div>
        <h3>${escapeHtml(achievement.title)}</h3>
        <p>${escapeHtml(achievement.description)}</p>
        <div class="meta-row">
          <span class="status-badge ${unlocked ? "completato" : ""}">${unlocked ? "Sbloccato" : "Bloccato"}</span>
          ${unlocked ? `<span class="meta-pill tertiary">Badge attivo</span>` : `<span class="meta-pill">Lucchetto</span>`}
        </div>
      </article>
    `;
  }).join("");
}

function renderTherapistDashboard() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.selectedPatientBanner.innerHTML = `<strong>Nessun paziente selezionato.</strong> Crea o seleziona un profilo nella sezione Pazienti per visualizzare dati, homework e progressi.`;
    refs.therapistSidebarText.textContent = "La dashboard si attiverà quando sarà disponibile un profilo paziente.";
    refs.therapistStats.innerHTML = `<div class="empty-state">Ancora nessun paziente selezionato.</div>`;
    refs.weeklySummary.innerHTML = `<div class="empty-state">Le statistiche settimanali appariranno qui.</div>`;
    refs.moodChart.innerHTML = `<div class="empty-state">Il grafico si popolerà con le compilazioni del paziente selezionato.</div>`;
    return;
  }

  refs.selectedPatientBanner.innerHTML = `<strong>Paziente attivo:</strong> ${escapeHtml(patient.name)} · ${escapeHtml(patient.username)}`;
  refs.therapistSidebarText.textContent = `XP totali ${patient.stats.xp}, livello ${patient.stats.level}, streak ${patient.stats.streak} giorni.`;

  const recentEntries = entriesWithinDays(7);
  const avgMood = recentEntries.length ? (recentEntries.reduce((sum, item) => sum + item.mood, 0) / recentEntries.length).toFixed(1) : "-";
  const topAnxiety = recentEntries.length ? getMostFrequent(recentEntries.map((item) => item.anxiety)) : "Nessuna";
  const recurringEmotion = recentEntries.length ? getTopItems(recentEntries.flatMap((item) => item.emotions), 1)[0] || "Non disponibile" : "Non disponibile";
  const assigned = patient.homeworks.filter((item) => item.status === "assegnato").length;

  refs.therapistStats.innerHTML = [
    { label: "Schede compilate", value: patient.entries.length, note: "Totale archivio" },
    { label: "Umore medio 7 giorni", value: avgMood, note: "Media recente" },
    { label: "Ansia ricorrente", value: topAnxiety, note: "Livello prevalente" },
    { label: "Homework attivi", value: assigned, note: "Da completare" }
  ].map((item) => `
    <article class="stat-card">
      <p class="mini-label">${escapeHtml(item.label)}</p>
      <strong>${escapeHtml(String(item.value))}</strong>
      <span>${escapeHtml(item.note)}</span>
    </article>
  `).join("");

  refs.weeklySummary.innerHTML = `
    <p>Emozione ricorrente: <strong>${escapeHtml(recurringEmotion)}</strong>.</p>
    <p>XP accumulati: <strong>${patient.stats.xp}</strong> · Livello <strong>${patient.stats.level}</strong>.</p>
    <p>Exercise streak: <strong>${patient.stats.streak}</strong> giorni.</p>
    <p>Homework completati: <strong>${patient.homeworks.filter((item) => item.status === "completato").length}</strong>.</p>
  `;

  renderMoodChart();
}

function renderRecords() {
  const entries = getEntriesDescending();
  refs.recordList.innerHTML = entries.length ? entries.map((entry) => `
    <article class="record-card">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(formatLongDate(entry.date))}</span>
        <span class="meta-pill secondary">Umore ${entry.mood}/10</span>
        <span class="meta-pill tertiary">Ansia ${escapeHtml(entry.anxiety)}</span>
      </div>
      <strong>${escapeHtml(makePreview(entry.hardToday || entry.betterToday || "Compilazione salvata.", 90))}</strong>
      <div class="record-tags">
        ${entry.emotions.slice(0, 3).map((item) => `<span class="status-badge">${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-record-open="${escapeAttribute(entry.id)}">Apri dettaglio</button>
        <button class="ghost-button small-button" type="button" data-record-note="${escapeAttribute(entry.id)}">Nota privata</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Le schede compilate appariranno qui quando il paziente inizierà a salvarle.</div>`;
}

function renderTipsManager() {
  refs.manageTipsGrid.innerHTML = state.tips.length ? state.tips.map((tip) => `
    <article class="tip-card">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(tip.category)}</span>
        <span class="meta-pill secondary">${escapeHtml(tip.type)}</span>
      </div>
      <strong>${escapeHtml(tip.title)}</strong>
      <span>${escapeHtml(tip.description)}</span>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-tip-edit="${escapeAttribute(tip.id)}">Modifica</button>
        <button class="ghost-button small-button" type="button" data-tip-delete="${escapeAttribute(tip.id)}">Elimina</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Non ci sono ancora tips. Puoi crearne una con il modulo qui sopra.</div>`;
}

function renderSession() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.sessionPreview.innerHTML = `<div class="empty-state">Seleziona un paziente per impostare la seduta.</div>`;
    refs.sessionForm.reset();
    return;
  }
  refs.sessionDateInput.value = patient.session.date;
  refs.sessionTimeInput.value = patient.session.time;
  refs.sessionNoteInput.value = patient.session.note;
  refs.sessionPreview.innerHTML = `
    <p><strong>Data e ora:</strong> ${escapeHtml(formatSessionLong(patient.session))}</p>
    <p><strong>Nota:</strong> ${escapeHtml(patient.session.note)}</p>
  `;
}

function renderQuestions() {
  refs.manageQuestionsList.innerHTML = state.customQuestions.length ? state.customQuestions.map((question) => `
    <article class="manage-question-card">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(labelForQuestionType(question.type))}</span>
        <span class="status-badge ${question.active ? "completato" : ""}">${question.active ? "Attiva" : "Disattiva"}</span>
      </div>
      <strong>${escapeHtml(question.text)}</strong>
      <p class="question-note">${question.options.length ? `Opzioni: ${question.options.join(", ")}` : "Nessuna opzione specifica."}</p>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-question-edit="${escapeAttribute(question.id)}">Modifica</button>
        <button class="ghost-button small-button" type="button" data-question-delete="${escapeAttribute(question.id)}">Elimina</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Non ci sono ancora domande personalizzate.</div>`;
}

function renderPatients() {
  const patient = getSelectedPatient();
  refs.patientSelectionSummary.innerHTML = patient ? `
    <p><strong>${escapeHtml(patient.name)}</strong></p>
    <p>Nome utente: <strong>${escapeHtml(patient.username)}</strong></p>
    <p>XP: <strong>${patient.stats.xp}</strong> · Livello <strong>${patient.stats.level}</strong></p>
    <p>Homework assegnati: <strong>${patient.homeworks.length}</strong></p>
  ` : `<div class="empty-state">Nessun paziente selezionato.</div>`;

  refs.patientAccountsList.innerHTML = state.patients.length ? state.patients.map((item) => `
    <article class="manage-question-card ${uiState.currentPatientId === item.id ? "selected-card" : ""}">
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(item.name)}</span>
        <span class="meta-pill secondary">${escapeHtml(item.username)}</span>
      </div>
      <strong>Livello ${item.stats.level} · ${item.stats.xp} XP</strong>
      <p>${escapeHtml(item.homeworks.filter((homework) => homework.status === "assegnato").length)} homework attivi · ${item.entries.length} schede salvate.</p>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-patient-select="${escapeAttribute(item.id)}">Seleziona</button>
        <button class="ghost-button small-button" type="button" data-patient-edit="${escapeAttribute(item.id)}">Modifica</button>
        <button class="ghost-button small-button" type="button" data-patient-delete="${escapeAttribute(item.id)}">Elimina</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Non ci sono ancora pazienti. Puoi creare il primo account con il modulo qui sopra.</div>`;
}

function renderTherapistHomework() {
  refs.therapistHomeworkGrid.innerHTML = GAME_LIBRARY.map((game) => `
    <article class="game-card">
      <div class="game-card-visual"></div>
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(game.category)}</span>
        <span class="meta-pill tertiary">${game.xp} XP</span>
      </div>
      <strong>${escapeHtml(game.title)}</strong>
      <p>${escapeHtml(game.description)}</p>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-assign-exercise="${escapeAttribute(game.id)}">Apri pannello</button>
      </div>
    </article>
  `).join("");

  const patient = getSelectedPatient();
  const assigned = patient ? [...patient.homeworks].sort((a, b) => a.status.localeCompare(b.status) || a.dueDate.localeCompare(b.dueDate)) : [];
  refs.assignedHomeworkList.innerHTML = assigned.length ? assigned.map((homework) => `
    <article class="homework-card ${homework.status === "completato" ? "completed" : ""}">
      <div class="meta-row">
        <span class="priority-pill ${homework.priority.toLowerCase()}">${escapeHtml(homework.priority)}</span>
        <span class="status-badge ${homework.status === "completato" ? "completato" : ""}">${homework.status === "completato" ? "Completato" : "Assegnato"}</span>
      </div>
      <strong>${escapeHtml(homework.title)}</strong>
      <p class="homework-note">${escapeHtml(homework.note || "Nessuna nota aggiunta.")}</p>
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(findGame(homework.exerciseId).title)}</span>
        <span class="meta-pill secondary">${escapeHtml(formatLongDate(homework.dueDate))}</span>
      </div>
      <div class="tip-actions">
        <button class="primary-button small-button" type="button" data-homework-edit="${escapeAttribute(homework.id)}">Modifica</button>
        <button class="ghost-button small-button" type="button" data-homework-remove="${escapeAttribute(homework.id)}">Rimuovi</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Quando assegnerai un esercizio al paziente selezionato, lo troverai qui.</div>`;

  refs.drawerPriorityPills.innerHTML = ["Bassa", "Media", "Alta"].map((priority) => `
    <button class="priority-pill ${priority.toLowerCase()} ${uiState.homeworkPriority === priority ? "active" : ""}" type="button" data-priority="${priority}">${priority}</button>
  `).join("");
}

function renderProgressViews() {
  const tabs = [
    { id: "timeline", label: "Timeline verticale" },
    { id: "radar", label: "Radar chart" },
    { id: "heatmap", label: "Heatmap calendario" }
  ];
  refs.progressViewTabs.innerHTML = tabs.map((tab) => `
    <button class="tab-button ${uiState.progressView === tab.id ? "active" : ""}" type="button" data-progress-view="${tab.id}">${tab.label}</button>
  `).join("");

  document.getElementById("progressTimelineView").classList.toggle("hidden", uiState.progressView !== "timeline");
  document.getElementById("progressRadarView").classList.toggle("hidden", uiState.progressView !== "radar");
  document.getElementById("progressHeatmapView").classList.toggle("hidden", uiState.progressView !== "heatmap");
  renderProgressTimeline();
  renderRadarChart();
  renderHeatmap();
}

function renderProgressTimeline() {
  const patient = getSelectedPatient();
  const list = patient ? [...patient.exerciseHistory].sort((a, b) => b.completedAt.localeCompare(a.completedAt)) : [];
  refs.progressTimeline.innerHTML = list.length ? list.map((item, index) => `
    <article class="timeline-card reveal" data-delay="${index * 30}">
      <span class="timeline-dot" style="background:${timelineColor(item.category)}"></span>
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(formatLongDate(item.completedAt.slice(0, 10)))}</span>
        <span class="meta-pill secondary">+${item.xp} XP</span>
      </div>
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.note || `Categoria ${item.category}.`)}</p>
    </article>
  `).join("") : `<div class="empty-state">La timeline dei progressi si attiverà con le prime sessioni completate.</div>`;
}

function renderRadarChart() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.radarChart.innerHTML = `<div class="empty-state">Seleziona un paziente per visualizzare il radar chart.</div>`;
    return;
  }
  const axes = ["Respirazione", "Mindfulness", "CBT", "Regolazione", "Esposizione", "PMR", "Homework", "Streak"];
  const current = getRadarValues(patient, 7);
  const previous = getRadarValues(patient, 14, 7);
  const size = 420;
  const center = size / 2;
  const radius = 150;
  const angleStep = (Math.PI * 2) / axes.length;

  function point(value, index) {
    const normalized = value / 10;
    const angle = -Math.PI / 2 + index * angleStep;
    return {
      x: center + Math.cos(angle) * radius * normalized,
      y: center + Math.sin(angle) * radius * normalized
    };
  }

  const previousPoints = axes.map((_, index) => point(previous[index], index));
  const currentPoints = axes.map((_, index) => point(current[index], index));
  const previousPath = previousPoints.map((p, index) => `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const currentPath = currentPoints.map((p, index) => `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  refs.radarChart.innerHTML = `
    <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Radar chart progressi">
      ${[0.25, 0.5, 0.75, 1].map((scale) => `
        <polygon points="${axes.map((_, index) => {
          const angle = -Math.PI / 2 + index * angleStep;
          const x = center + Math.cos(angle) * radius * scale;
          const y = center + Math.sin(angle) * radius * scale;
          return `${x},${y}`;
        }).join(" ")}" fill="none" stroke="rgba(22,59,147,0.10)"></polygon>
      `).join("")}
      ${axes.map((axis, index) => {
        const angle = -Math.PI / 2 + index * angleStep;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return `
          <line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(22,59,147,0.10)"></line>
          <text x="${center + Math.cos(angle) * (radius + 22)}" y="${center + Math.sin(angle) * (radius + 22)}" text-anchor="middle" class="chart-label">${axis}</text>
        `;
      }).join("")}
      <path d="${previousPath}" fill="rgba(106,122,160,0.08)" stroke="rgba(106,122,160,0.32)" stroke-width="2"></path>
      <path d="${currentPath}" fill="rgba(73,219,241,0.18)" stroke="rgba(42,184,220,0.88)" stroke-width="3"></path>
    </svg>
  `;
}

function renderHeatmap() {
  const patient = getSelectedPatient();
  if (!patient) {
    refs.heatmapBoard.innerHTML = `<div class="empty-state">Seleziona un paziente per vedere la heatmap.</div>`;
    refs.heatmapSummaryCards.innerHTML = "";
    return;
  }
  const counts = buildHeatmapCounts(patient.exerciseHistory);
  refs.heatmapBoard.innerHTML = counts.map((count) => `
    <div class="heatmap-cell" title="${count.date}: ${count.value} attività" style="background:${heatColor(count.value)}"></div>
  `).join("");

  const completed = patient.exerciseHistory.length;
  const homeworks = patient.homeworks.filter((item) => item.status === "completato").length;
  const bestDay = counts.reduce((best, current) => current.value > best.value ? current : best, counts[0] || { value: 0, date: "-" });
  const summary = [
    { label: "Sessioni totali", value: completed },
    { label: "Homework completati", value: homeworks },
    { label: "Streak attuale", value: patient.stats.streak },
    { label: "Giorno più attivo", value: bestDay.value ? shortDayMonth(bestDay.date) : "-" }
  ];
  refs.heatmapSummaryCards.innerHTML = summary.map((item) => `
    <article class="stat-card">
      <p class="mini-label">${escapeHtml(item.label)}</p>
      <strong>${escapeHtml(String(item.value))}</strong>
    </article>
  `).join("");
}

function renderXpHeader() {
  const patient = getSelectedPatient();
  if (!patient || uiState.currentRole !== "patient") {
    refs.xpFill.style.width = "0%";
    refs.xpText.textContent = "0 / 100 XP";
    refs.xpLevelLabel.textContent = "Livello 1";
    refs.streakValue.textContent = "0";
    return;
  }
  const level = patient.stats.level;
  const currentLevelXp = patient.stats.xp - ((level - 1) * 100);
  const percent = Math.min(100, Math.max(0, currentLevelXp));
  refs.xpFill.style.width = `${percent}%`;
  refs.xpText.textContent = `${currentLevelXp} / 100 XP`;
  refs.xpLevelLabel.textContent = `Livello ${level}`;
  refs.streakValue.textContent = String(patient.stats.streak);
}

function openLogin(role) {
  uiState.lastFocusedElement = document.activeElement;
  uiState.loginRole = role;
  refs.loginRoleLabel.textContent = role === "paziente" ? "Accesso paziente" : "Accesso psicologo";
  refs.loginTitle.textContent = "Inserisci le credenziali";
  refs.loginText.textContent = role === "paziente"
    ? "Usa nome utente e password creati dal tuo psicologo."
    : "Accedi con le credenziali dell'area psicologo.";
  refs.loginForm.reset();
  refs.loginError.textContent = "";
  setModalState("login");
  refs.usernameInput.focus();
}

function closeLoginModal() {
  setModalState(null);
}

function closeDetailModal() {
  setModalState(null);
}

function closeGameModal() {
  cleanupGameRuntime();
  uiState.currentGame = null;
  uiState.gameState = {};
  setModalState(null);
}

function openDetailModal(html) {
  uiState.lastFocusedElement = document.activeElement;
  refs.detailContent.innerHTML = html;
  setModalState("detail");
}

function openHomeworkDrawer(exerciseId, homeworkId = "") {
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Seleziona un paziente", "Per assegnare un homework serve prima un paziente attivo.");
    return;
  }
  uiState.homeworkDrawerExerciseId = exerciseId;
  uiState.lastFocusedElement = document.activeElement;
  refs.homeworkDrawer.classList.remove("hidden");
  refs.homeworkDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const game = findGame(exerciseId);
  refs.drawerExerciseTitle.textContent = game.title;
  refs.drawerExerciseId.value = exerciseId;
  uiState.currentOpenHomeworkId = homeworkId;
  const current = patient.homeworks.find((item) => item.id === homeworkId);
  refs.drawerHomeworkTitle.value = current ? current.title : game.title;
  refs.drawerHomeworkNote.value = current ? current.note : `Ti propongo questo esercizio per lavorare con calma su ${game.title.toLowerCase()}.`;
  refs.drawerHomeworkDueDate.value = current ? current.dueDate : dateOffset(5);
  uiState.homeworkPriority = current ? current.priority : "Media";
  renderTherapistHomework();
}

function closeHomeworkDrawer() {
  refs.homeworkDrawer.classList.add("hidden");
  refs.homeworkDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  uiState.homeworkDrawerExerciseId = null;
  uiState.currentOpenHomeworkId = null;
}

async function handleLogin(event) {
  event.preventDefault();
  const username = normalizeUsername(refs.usernameInput.value);
  const password = normalizePassword(refs.passwordInput.value);
  if (!username || !password) {
    refs.loginError.textContent = "Inserisci nome utente e password validi.";
    return;
  }
  refs.loginError.textContent = "";
  try {
    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: {
        role: uiState.loginRole,
        username,
        password
      }
    });
    setSessionToken(payload.token);
    applyRemotePayload(payload);
    closeLoginModal();
    showToast(
      "Accesso eseguito",
      payload.role === "therapist"
        ? "Benvenuta nell'area psicologo."
        : `Bentornato, ${state.patients[0]?.name || "paziente"}.`
    );
  } catch (error) {
    refs.loginError.textContent = uiState.loginRole === "psicologo"
      ? "Credenziali psicologo non corrette."
      : "Credenziali paziente non corrette.";
  }
}

function logout() {
  closeGameModal();
  closeHomeworkDrawer();
  stopBreathing(false);
  clearSessionToken();
  uiState.currentRole = null;
  uiState.currentPatientId = null;
  uiState.patientSection = "patientHome";
  uiState.therapistSection = "therapistDashboard";
  uiState.gameFilter = "Tutti";
  uiState.tipFilter = "Tutti";
  uiState.taskFilter = "tutte";
  uiState.progressView = "timeline";
  uiState.draft = createEmptyDraft();
  state = createDemoState();
  saveStateLocalOnly();
  renderAll();
}

function handleHomeShortcut() {
  if (uiState.currentRole === "patient") {
    switchSection("patient", "patientHome");
  } else if (uiState.currentRole === "therapist") {
    switchSection("therapist", "therapistDashboard");
  }
}

function switchSection(role, target) {
  if (role === "patient") {
    uiState.patientSection = target;
    document.querySelectorAll("#patientScreen .view-panel").forEach((panel) => {
      panel.classList.toggle("hidden", panel.id !== target);
      panel.classList.toggle("active", panel.id === target);
    });
  } else {
    uiState.therapistSection = target;
    document.querySelectorAll("#therapistScreen .view-panel").forEach((panel) => {
      panel.classList.toggle("hidden", panel.id !== target);
      panel.classList.toggle("active", panel.id === target);
    });
  }
  renderShell();
  refreshRevealTargets();
}

function handleTipFilterClick(event) {
  const button = event.target.closest("[data-tip-filter]");
  if (!button) {
    return;
  }
  uiState.tipFilter = button.dataset.tipFilter;
  renderTips();
}

function handleTipOpen(event) {
  const button = event.target.closest("[data-tip-open]");
  if (!button) {
    return;
  }
  openTipDetail(button.dataset.tipOpen);
}

function handleBreathingSelect(event) {
  const button = event.target.closest("[data-breathing]");
  if (!button) {
    return;
  }
  uiState.selectedBreathingId = button.dataset.breathing;
  renderTips();
}

function handleTaskFilterClick(event) {
  const button = event.target.closest("[data-task-filter]");
  if (!button) {
    return;
  }
  uiState.taskFilter = button.dataset.taskFilter;
  renderTasks();
}

function handleHistoryOpen(event) {
  const button = event.target.closest("[data-entry-open]");
  if (button) {
    openEntryDetail(button.dataset.entryOpen, false);
  }
}

function handleGameFilterClick(event) {
  const button = event.target.closest("[data-game-filter]");
  if (!button) {
    return;
  }
  uiState.gameFilter = button.dataset.gameFilter;
  renderGames();
}

function handleGameCardActions(event) {
  const button = event.target.closest("[data-start-game]");
  if (button) {
    openGame(button.dataset.startGame, {});
  }
}

function handlePatientHomeworkActions(event) {
  const button = event.target.closest("[data-homework-start]");
  if (!button) {
    return;
  }
  const patient = getSelectedPatient();
  const homework = patient?.homeworks.find((item) => item.id === button.dataset.homeworkStart);
  if (!homework) {
    return;
  }
  openGame(homework.exerciseId, { homeworkId: homework.id });
}

function handleTherapistHomeworkCardClick(event) {
  const button = event.target.closest("[data-assign-exercise]");
  if (button) {
    openHomeworkDrawer(button.dataset.assignExercise);
  }
}

function handleAssignedHomeworkActions(event) {
  const edit = event.target.closest("[data-homework-edit]");
  const remove = event.target.closest("[data-homework-remove]");
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  if (edit) {
    const homework = patient.homeworks.find((item) => item.id === edit.dataset.homeworkEdit);
    if (homework) {
      openHomeworkDrawer(homework.exerciseId, homework.id);
    }
  }
  if (remove) {
    patient.homeworks = patient.homeworks.filter((item) => item.id !== remove.dataset.homeworkRemove);
    saveCurrentPatient();
    renderAll();
    showToast("Homework rimosso", "L'assegnazione è stata eliminata.");
  }
}

function handlePrioritySelect(event) {
  const button = event.target.closest("[data-priority]");
  if (!button) {
    return;
  }
  uiState.homeworkPriority = button.dataset.priority;
  renderTherapistHomework();
}

function handleProgressTabClick(event) {
  const button = event.target.closest("[data-progress-view]");
  if (!button) {
    return;
  }
  uiState.progressView = button.dataset.progressView;
  renderProgressViews();
}

async function savePatientAccount(event) {
  event.preventDefault();
  const name = refs.patientNameInput.value.trim();
  const username = normalizeUsername(refs.patientUsernameInput.value);
  const password = normalizePassword(refs.patientPasswordInput.value);
  const editId = refs.patientAccountId.value;

  if (!name || !username || (!editId && !password)) {
    showToast("Campi mancanti", editId
      ? "Inserisci nome e nome utente. La password serve solo se vuoi cambiarla."
      : "Inserisci nome, nome utente e password del paziente.");
    return;
  }
  const duplicate = state.patients.some((item) => item.username === username && item.id !== editId);
  if (duplicate || username === state.auth.therapist.username) {
    showToast("Nome utente non disponibile", "Scegli un nome utente diverso per questo paziente.");
    return;
  }
  try {
    const payload = await apiRequest("/api/patients", {
      method: editId ? "PUT" : "POST",
      body: {
        id: editId || undefined,
        name,
        username,
        ...(password ? { password } : {})
      }
    });
    applyRemotePayload(payload);
    resetPatientAccountForm();
    showToast(
      editId ? "Account aggiornato" : "Account creato",
      editId ? "Le credenziali del paziente sono state aggiornate." : "Il nuovo account paziente è pronto per l'accesso."
    );
  } catch (error) {
    showToast("Operazione non riuscita", error.message || "Non è stato possibile salvare l'account.");
  }
}

function resetPatientAccountForm() {
  refs.patientAccountForm.reset();
  refs.patientAccountId.value = "";
  refs.patientPasswordInput.placeholder = "Crea una password";
}

function handlePatientAccountActions(event) {
  const select = event.target.closest("[data-patient-select]");
  const edit = event.target.closest("[data-patient-edit]");
  const remove = event.target.closest("[data-patient-delete]");

  if (select) {
    uiState.currentPatientId = select.dataset.patientSelect;
    syncDraftFromPatient();
    saveStateLocalOnly();
    renderAll();
    showToast("Paziente selezionato", "La dashboard ora mostra il profilo scelto.");
  }

  if (edit) {
    const patient = state.patients.find((item) => item.id === edit.dataset.patientEdit);
    if (!patient) {
      return;
    }
    refs.patientAccountId.value = patient.id;
    refs.patientNameInput.value = patient.name;
    refs.patientUsernameInput.value = patient.username;
    refs.patientPasswordInput.value = "";
    refs.patientPasswordInput.placeholder = "Lascia vuoto per mantenere la password attuale";
    switchSection("therapist", "therapistPatients");
  }

  if (remove) {
    const patientId = remove.dataset.patientDelete;
    apiRequest("/api/patients", {
      method: "DELETE",
      body: { id: patientId }
    }).then((payload) => {
      applyRemotePayload(payload);
      showToast("Account eliminato", "Il paziente è stato rimosso dall'archivio condiviso.");
    }).catch((error) => {
      showToast("Eliminazione non riuscita", error.message || "Non è stato possibile eliminare il paziente.");
    });
  }
}

function saveTip(event) {
  event.preventDefault();
  const tip = sanitizeTip({
    id: refs.tipId.value || `tip-${Date.now()}`,
    title: refs.tipTitle.value,
    category: refs.tipCategory.value,
    type: refs.tipType.value,
    description: refs.tipDescription.value,
    content: refs.tipContent.value
  });
  if (!tip) {
    showToast("Dati non completi", "Compila tutti i campi della tip prima di salvarla.");
    return;
  }
  const index = state.tips.findIndex((item) => item.id === tip.id);
  if (index >= 0) {
    state.tips[index] = tip;
    showToast("Tip aggiornata", "Il contenuto di supporto è stato aggiornato.");
  } else {
    state.tips.unshift(tip);
    showToast("Tip creata", "Il contenuto di supporto è stato aggiunto.");
  }
  saveState();
  resetTipForm();
  renderAll();
}

function resetTipForm() {
  refs.tipForm.reset();
  refs.tipId.value = "";
  refs.tipType.value = "Testo";
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
  }
  if (remove) {
    state.tips = state.tips.filter((item) => item.id !== remove.dataset.tipDelete);
    saveState();
    renderAll();
    showToast("Tip eliminata", "Il contenuto è stato rimosso.");
  }
}

function saveSession(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Nessun paziente selezionato", "Seleziona un paziente prima di salvare la seduta.");
    return;
  }
  if (!refs.sessionDateInput.value || !refs.sessionTimeInput.value) {
    showToast("Data incompleta", "Inserisci data e ora della seduta.");
    return;
  }
  patient.session = {
    date: refs.sessionDateInput.value,
    time: refs.sessionTimeInput.value,
    note: refs.sessionNoteInput.value.trim() || "Nessuna nota aggiunta."
  };
  saveCurrentPatient();
  renderAll();
  showToast("Seduta aggiornata", "Il countdown del paziente è stato aggiornato.");
}

function saveQuestion(event) {
  event.preventDefault();
  const type = refs.questionType.value;
  const needsOptions = ["scelta-singola", "scelta-multipla"].includes(type);
  const options = needsOptions ? refs.questionOptions.value.split(",").map((item) => item.trim()).filter(Boolean) : [];
  if (needsOptions && !options.length) {
    showToast("Opzioni mancanti", "Per questo tipo di domanda serve almeno un'opzione.");
    return;
  }
  const question = sanitizeQuestion({
    id: refs.questionId.value || `question-${Date.now()}`,
    text: refs.questionText.value,
    type,
    options,
    active: refs.questionActive.checked
  });
  if (!question) {
    showToast("Domanda incompleta", "Inserisci il testo della domanda prima di salvare.");
    return;
  }
  const index = state.customQuestions.findIndex((item) => item.id === question.id);
  if (index >= 0) {
    state.customQuestions[index] = question;
    showToast("Domanda aggiornata", "La domanda personalizzata è stata aggiornata.");
  } else {
    state.customQuestions.unshift(question);
    showToast("Domanda creata", "La nuova domanda è ora disponibile nella scheda giornaliera.");
  }
  saveState();
  resetQuestionForm();
  renderAll();
}

function resetQuestionForm() {
  refs.questionForm.reset();
  refs.questionId.value = "";
  refs.questionType.value = "testo";
  refs.questionActive.checked = true;
  updateQuestionOptionsState();
}

function updateQuestionOptionsState() {
  const needsOptions = ["scelta-singola", "scelta-multipla"].includes(refs.questionType.value);
  refs.questionOptions.disabled = !needsOptions;
  refs.questionOptionsHelp.classList.toggle("disabled", !needsOptions);
  refs.questionOptions.placeholder = needsOptions ? "Esempio: Mattina, Pomeriggio, Sera" : "Non necessario per questo tipo di risposta";
  if (!needsOptions) {
    refs.questionOptions.value = "";
  }
}

function handleManageQuestionActions(event) {
  const edit = event.target.closest("[data-question-edit]");
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
  }
  if (remove) {
    state.customQuestions = state.customQuestions.filter((item) => item.id !== remove.dataset.questionDelete);
    saveState();
    renderAll();
    showToast("Domanda eliminata", "La domanda personalizzata è stata rimossa.");
  }
}

function assignHomework(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  const game = findGame(refs.drawerExerciseId.value);
  if (!patient || !game) {
    return;
  }
  const title = refs.drawerHomeworkTitle.value.trim();
  const dueDate = refs.drawerHomeworkDueDate.value;
  if (!title || !dueDate) {
    showToast("Compilazione incompleta", "Inserisci titolo e scadenza dell'homework.");
    return;
  }
  const homework = sanitizeHomework({
    id: uiState.currentOpenHomeworkId || `homework-${Date.now()}`,
    exerciseId: game.id,
    title,
    note: refs.drawerHomeworkNote.value.trim(),
    dueDate,
    priority: uiState.homeworkPriority,
    status: "assegnato",
    assignedAt: new Date().toISOString()
  });
  const index = patient.homeworks.findIndex((item) => item.id === homework.id);
  if (index >= 0) {
    patient.homeworks[index] = { ...patient.homeworks[index], ...homework };
    showToast("Homework aggiornato", "L'assegnazione è stata aggiornata.");
  } else {
    patient.homeworks.unshift(homework);
    showToast("Homework assegnato", "Il compito è stato assegnato al paziente.");
  }
  closeHomeworkDrawer();
  saveCurrentPatient();
  renderAll();
}

function handleDraftTextInput() {
  uiState.draft.betterToday = refs.betterInput.value;
  uiState.draft.hardToday = refs.hardInput.value;
  uiState.draft.gratitude = [refs.gratitude1.value, refs.gratitude2.value, refs.gratitude3.value];
  uiState.draft.positiveThought = refs.positiveInput.value;
  uiState.draft.note = refs.noteInput.value;
  renderDynamicSheet();
}

function toggleChip(key, value) {
  const current = new Set(uiState.draft[key]);
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  uiState.draft[key] = [...current];
  renderDynamicSheet();
}

function handleCustomAnswerInput(event) {
  const target = event.target;
  const id = target.dataset.customId;
  if (!id) {
    return;
  }
  if (target.type === "checkbox") {
    const values = [...refs.customQuestionsBox.querySelectorAll(`[data-custom-id="${id}"]:checked`)].map((input) => input.value);
    uiState.draft.customAnswers[id] = values;
  } else if (target.type === "radio") {
    uiState.draft.customAnswers[id] = target.value;
  } else {
    uiState.draft.customAnswers[id] = target.value;
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

function saveDailySheet(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Profilo non disponibile", "Serve un account paziente attivo per salvare la scheda.");
    return;
  }
  const entry = sanitizeEntry({
    id: `entry-${Date.now()}`,
    date: uiState.draft.date,
    createdAt: new Date().toISOString(),
    mood: uiState.draft.mood,
    anxiety: uiState.draft.anxiety,
    emotions: uiState.draft.emotions,
    physicalSensations: uiState.draft.physicalSensations,
    betterToday: uiState.draft.betterToday,
    hardToday: uiState.draft.hardToday,
    gratitude: uiState.draft.gratitude,
    positiveThought: uiState.draft.positiveThought,
    note: uiState.draft.note,
    customAnswers: state.customQuestions.filter((item) => item.active).map((question) => ({
      questionId: question.id,
      questionText: question.text,
      type: question.type,
      answer: uiState.draft.customAnswers[question.id] || (question.type === "scelta-multipla" ? [] : "")
    })),
    aiQuestions: (uiState.gameState.aiQuestions || []).map((item) => ({
      id: item.id,
      question: item.question,
      answer: uiState.draft.aiAnswers[item.id] || ""
    })),
    advice: buildAdvice(uiState.draft),
    privateNote: ""
  });

  patient.entries.unshift(entry);
  markPatientActivity(patient);
  maybeAwardAchievementToasts(patient, computeAchievements(patient));
  patient.stats.achievements = computeAchievements(patient);
  patient.draft = createEmptyDraft();
  uiState.draft = createEmptyDraft();
  saveCurrentPatient();
  renderAll();
  showToast("Scheda salvata", "La compilazione di oggi è stata aggiunta al tuo storico.");
}

function resetDraft(showFeedback) {
  uiState.draft = createEmptyDraft();
  persistDraft();
  renderSheet();
  if (showFeedback) {
    showToast("Campi ripristinati", "La bozza della scheda è stata riportata allo stato iniziale.");
  }
}

function addTask(event) {
  event.preventDefault();
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  const title = refs.taskInput.value.trim();
  if (!title) {
    return;
  }
  const exists = patient.tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
  if (exists) {
    showToast("Attività già presente", "Questa attività esiste già nella lista.");
    return;
  }
  patient.tasks.unshift(createTask(title, false));
  refs.taskForm.reset();
  saveCurrentPatient();
  renderTasks();
  showToast("Attività aggiunta", "La nuova attività è ora nella tua lista.");
}

function handleTaskActions(event) {
  const toggle = event.target.closest("[data-task-toggle]");
  const remove = event.target.closest("[data-task-delete]");
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  if (toggle) {
    const task = patient.tasks.find((item) => item.id === toggle.dataset.taskToggle);
    if (!task) {
      return;
    }
    task.completed = !task.completed;
    saveCurrentPatient();
    renderTasks();
    showToast(task.completed ? "Attività completata" : "Attività riaperta", task.title);
  }
  if (remove) {
    patient.tasks = patient.tasks.filter((item) => item.id !== remove.dataset.taskDelete);
    saveCurrentPatient();
    renderTasks();
    showToast("Attività eliminata", "L'attività è stata rimossa.");
  }
}

function handleRecordActions(event) {
  const open = event.target.closest("[data-record-open]");
  const note = event.target.closest("[data-record-note]");
  if (open) {
    openEntryDetail(open.dataset.recordOpen, true);
  }
  if (note) {
    const entry = getSelectedPatient()?.entries.find((item) => item.id === note.dataset.recordNote);
    if (!entry) {
      return;
    }
    const current = window.prompt("Scrivi o aggiorna la nota privata dello psicologo:", entry.privateNote || "");
    if (current !== null) {
      entry.privateNote = current.trim();
      saveCurrentPatient();
      renderRecords();
      showToast("Nota privata salvata", "La nota resta visibile solo nell'area psicologo.");
    }
  }
}

function openTipDetail(id) {
  const tip = state.tips.find((item) => item.id === id);
  if (!tip) {
    return;
  }
  openDetailModal(`
    <p class="mini-label">Tip · ${escapeHtml(tip.category)}</p>
    <h2 class="detail-title" id="detailTitle">${escapeHtml(tip.title)}</h2>
    <div class="detail-section">
      <p>${escapeHtml(tip.description)}</p>
    </div>
    <div class="detail-section">
      <p class="detail-copy">${escapeHtml(tip.content)}</p>
    </div>
  `);
}

function openEntryDetail(id, therapistView) {
  const entry = getSelectedPatient()?.entries.find((item) => item.id === id);
  if (!entry) {
    return;
  }
  openDetailModal(`
    <p class="mini-label">${therapistView ? "Dettaglio clinico" : "Dettaglio personale"}</p>
    <h2 class="detail-title" id="detailTitle">${escapeHtml(formatLongDate(entry.date))}</h2>
    <div class="detail-list">
      <div class="detail-section"><strong>Umore</strong><p>${entry.mood}/10</p></div>
      <div class="detail-section"><strong>Ansia</strong><p>${escapeHtml(entry.anxiety)}</p></div>
      <div class="detail-section"><strong>Emozioni</strong><p>${escapeHtml(entry.emotions.join(", ") || "Nessuna indicata")}</p></div>
      <div class="detail-section"><strong>Sensazioni fisiche</strong><p>${escapeHtml(entry.physicalSensations.join(", ") || "Nessuna indicata")}</p></div>
      <div class="detail-section"><strong>Cosa ha aiutato</strong><p class="detail-copy">${escapeHtml(entry.betterToday || "—")}</p></div>
      <div class="detail-section"><strong>Cosa ha messo in difficoltà</strong><p class="detail-copy">${escapeHtml(entry.hardToday || "—")}</p></div>
      <div class="detail-section"><strong>Gratitudine</strong><p>${escapeHtml(entry.gratitude.filter(Boolean).join(" · ") || "—")}</p></div>
      <div class="detail-section"><strong>Pensiero positivo</strong><p class="detail-copy">${escapeHtml(entry.positiveThought || "—")}</p></div>
      <div class="detail-section"><strong>Nota libera</strong><p class="detail-copy">${escapeHtml(entry.note || "—")}</p></div>
      <div class="detail-section"><strong>Domande AI</strong><p class="detail-copy">${escapeHtml(entry.aiQuestions.map((item) => `${item.question}: ${item.answer || "—"}`).join("\n\n") || "—")}</p></div>
      <div class="detail-section"><strong>Consiglio finale</strong><p class="detail-copy">${escapeHtml(entry.advice || "—")}</p></div>
      ${therapistView ? `<div class="detail-section"><strong>Nota privata</strong><p class="detail-copy">${escapeHtml(entry.privateNote || "Nessuna nota privata salvata.")}</p></div>` : ""}
    </div>
  `);
}

function openGame(gameId, options) {
  const patient = getSelectedPatient();
  if (!patient) {
    showToast("Profilo non disponibile", "Per aprire un esercizio serve un paziente attivo.");
    return;
  }
  cleanupGameRuntime();
  uiState.lastFocusedElement = document.activeElement;
  uiState.currentGame = gameId;
  uiState.gameState = createGameState(gameId, options || {});
  refs.gameModalLabel.textContent = "Mini-gioco terapeutico";
  refs.gameModalTitle.textContent = findGame(gameId).title;
  refs.gameModalMeta.textContent = `${findGame(gameId).category} · ${findGame(gameId).xp} XP`;
  renderGame();
  setModalState("game");
}

function createGameState(gameId, options = {}) {
  const base = {
    homeworkId: options.homeworkId || "",
    ended: false
  };
  if (gameId === "cognitive-restructuring") {
    return { ...base, step: 0, thought: "", distortions: [], flipped: false, reframed: "", particles: createThoughtParticles() };
  }
  if (gameId === "leaves-stream") {
    return { ...base, running: false, duration: 180, remaining: 180, released: 0, input: "", leaves: createRiverLeaves(), customLeaves: [], summary: false, waterSound: null };
  }
  if (gameId === "body-scan") {
    return { ...base, zoneIndex: 0, tensionZones: [], visited: [], fillProgress: 0, typingText: "", timer: 0, summary: false };
  }
  if (gameId === "cognitive-defusion") {
    return { ...base, thought: "", mode: "nuvola", acted: false };
  }
  if (gameId === "opposite-action") {
    return { ...base, step: 0, emotion: "", intensity: 50, impulse: "", flipped: false };
  }
  if (gameId === "tipp") {
    return { ...base, mode: "", running: false, remaining: 30, count: 0, energy: 0, phase: "Pronto", stageIndex: 0 };
  }
  if (gameId === "breathing-studio") {
    return { ...base, technique: "box", duration: 2, running: false, remaining: 120, phaseIndex: 0, phaseRemaining: 4, cycles: 0 };
  }
  if (gameId === "graded-exposure") {
    return { ...base, step: 0, fear: "", situations: [], selectedId: "", countdown: 180, running: false, graph: [], summary: false, draftSituation: "", draftIntensity: 35 };
  }
  if (gameId === "pmr") {
    return { ...base, index: 0, phase: "contrai", remaining: 6, zones: {}, summary: false };
  }
  if (gameId === "guided-imagery") {
    return { ...base, scenario: "spiaggia", duration: 300, remaining: 300, running: false, scriptIndex: 0, summary: false };
  }
  return base;
}

function renderGame() {
  cleanupGameVisualRuntime();
  const game = uiState.currentGame;
  if (!game) {
    return;
  }
  if (game === "cognitive-restructuring") {
    renderGameCognitiveRestructuring();
  } else if (game === "leaves-stream") {
    renderGameLeavesStream();
  } else if (game === "body-scan") {
    renderGameBodyScan();
  } else if (game === "cognitive-defusion") {
    renderGameDefusion();
  } else if (game === "opposite-action") {
    renderGameOppositeAction();
  } else if (game === "tipp") {
    renderGameTipp();
  } else if (game === "breathing-studio") {
    renderGameBreathingStudio();
  } else if (game === "graded-exposure") {
    renderGameExposure();
  } else if (game === "pmr") {
    renderGamePmr();
  } else if (game === "guided-imagery") {
    renderGameGuidedImagery();
  }
}

function handleGameClick(event) {
  const action = event.target.closest("[data-game-action]");
  if (action) {
    handleGameAction(action.dataset.gameAction, action);
  }
  const distortion = event.target.closest("[data-distortion]");
  if (distortion && uiState.currentGame === "cognitive-restructuring") {
    toggleDistortion(distortion.dataset.distortion, distortion);
  }
  const timer = event.target.closest("[data-stream-timer]");
  if (timer && uiState.currentGame === "leaves-stream") {
    setLeavesTimer(Number(timer.dataset.streamTimer));
  }
  const defusionMode = event.target.closest("[data-defusion-mode]");
  if (defusionMode && uiState.currentGame === "cognitive-defusion") {
    uiState.gameState.mode = defusionMode.dataset.defusionMode;
    renderGame();
  }
  const breathingTech = event.target.closest("[data-breath-tech]");
  if (breathingTech && uiState.currentGame === "breathing-studio") {
    uiState.gameState.technique = breathingTech.dataset.breathTech;
    renderGame();
  }
  const breathDuration = event.target.closest("[data-breath-duration]");
  if (breathDuration && uiState.currentGame === "breathing-studio") {
    const minutes = Number(breathDuration.dataset.breathDuration);
    uiState.gameState.duration = minutes;
    uiState.gameState.remaining = minutes * 60;
    renderGame();
  }
  const scenario = event.target.closest("[data-scenario]");
  if (scenario && uiState.currentGame === "guided-imagery") {
    uiState.gameState.scenario = scenario.dataset.scenario;
    renderGame();
  }
  const intensity = event.target.closest("[data-exposure-select]");
  if (intensity && uiState.currentGame === "graded-exposure") {
    uiState.gameState.selectedId = intensity.dataset.exposureSelect;
    renderGame();
  }
  const sortable = event.target.closest("[data-exposure-move]");
  if (sortable && uiState.currentGame === "graded-exposure") {
    moveExposureItem(sortable.dataset.exposureMove, Number(sortable.dataset.direction));
  }
  const tippCard = event.target.closest("[data-tipp-open]");
  if (tippCard && uiState.currentGame === "tipp") {
    uiState.gameState.mode = tippCard.dataset.tippOpen;
    uiState.gameState.running = false;
    uiState.gameState.count = 0;
    uiState.gameState.energy = 0;
    uiState.gameState.remaining = uiState.gameState.mode === "temperatura" ? 30 : 24;
    renderGame();
  }
}

function handleGameInput(event) {
  const target = event.target;
  const game = uiState.currentGame;
  if (game === "cognitive-restructuring") {
    if (target.id === "cr-thought") {
      uiState.gameState.thought = target.value;
    }
    if (target.id === "cr-reframed") {
      uiState.gameState.reframed = target.value;
    }
  } else if (game === "leaves-stream" && target.id === "stream-input") {
    uiState.gameState.input = target.value;
  } else if (game === "cognitive-defusion" && target.id === "defusion-input") {
    uiState.gameState.thought = target.value;
  } else if (game === "opposite-action") {
    if (target.id === "oa-intensity") {
      uiState.gameState.intensity = Number(target.value);
      renderGame();
    }
    if (target.id === "oa-impulse") {
      uiState.gameState.impulse = target.value;
    }
  } else if (game === "graded-exposure") {
    if (target.id === "exposure-fear") {
      uiState.gameState.fear = target.value;
    }
    if (target.id === "exposure-situation") {
      uiState.gameState.draftSituation = target.value;
    }
    if (target.id === "exposure-intensity") {
      uiState.gameState.draftIntensity = Number(target.value);
      renderGame();
    }
    if (target.id === "exposure-anxiety-now") {
      uiState.gameState.currentAnxiety = Number(target.value);
      const label = refs.gameModalBody.querySelector("#exposure-anxiety-label");
      if (label) {
        label.textContent = `${uiState.gameState.currentAnxiety || 0}/100`;
      }
    }
  }
}

function handleGameChange(event) {
  if (uiState.currentGame === "cognitive-restructuring" && event.target.id === "cr-reframed") {
    uiState.gameState.reframed = event.target.value;
  }
}

function handleGameAction(action, element) {
  const game = uiState.currentGame;
  if (game === "cognitive-restructuring") {
    handleCognitiveRestructuringAction(action, element);
  } else if (game === "leaves-stream") {
    handleLeavesAction(action);
  } else if (game === "body-scan") {
    handleBodyScanAction(action);
  } else if (game === "cognitive-defusion") {
    handleDefusionAction(action);
  } else if (game === "opposite-action") {
    handleOppositeAction(action, element);
  } else if (game === "tipp") {
    handleTippAction(action);
  } else if (game === "breathing-studio") {
    handleBreathingStudioAction(action);
  } else if (game === "graded-exposure") {
    handleExposureAction(action);
  } else if (game === "pmr") {
    handlePmrAction(action);
  } else if (game === "guided-imagery") {
    handleGuidedImageryAction(action);
  }
}

function renderGameCognitiveRestructuring() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="progress-steps">
        ${[0, 1, 2].map((index) => `<div class="progress-step ${game.step > index ? "completed" : game.step === index ? "active" : ""}"><span></span></div>`).join("")}
      </div>
      <div class="game-stage" id="cr-stage">
        <canvas id="cr-particles"></canvas>
        <div class="slide-stage" style="transform:translateX(-${game.step * 33.3333}%);">
          <section class="slide-step">
            <div class="game-panel">
              <p class="mini-label">Step 1</p>
              <h3>Pensiero negativo</h3>
              <p>Scrivi il pensiero che vuoi osservare e ristrutturare.</p>
            </div>
            <textarea id="cr-thought" class="teal-glow" rows="8" placeholder="Scrivi qui il pensiero che vuoi analizzare.">${escapeHtml(game.thought)}</textarea>
            <div class="inline-actions">
              <button class="primary-button" type="button" data-game-action="cr-next">Continua</button>
            </div>
          </section>
          <section class="slide-step">
            <div class="game-panel">
              <p class="mini-label">Step 2</p>
              <h3>Quali distorsioni riconosci?</h3>
              <p>Puoi selezionare più schemi contemporaneamente.</p>
            </div>
            <div class="distortion-grid">
              ${DISTORTIONS.map((item) => `
                <button class="distortion-card ${game.distortions.includes(item.id) ? "selected" : ""}" type="button" data-distortion="${escapeAttribute(item.id)}">
                  <strong>${escapeHtml(item.icon)}</strong>
                  <span>${escapeHtml(item.label)}</span>
                </button>
              `).join("")}
            </div>
            <div class="inline-actions">
              <button class="ghost-button" type="button" data-game-action="cr-back">Indietro</button>
              <button class="primary-button" type="button" data-game-action="cr-next">Vai alla ristrutturazione</button>
            </div>
          </section>
          <section class="slide-step">
            <div class="game-panel">
              <p class="mini-label">Step 3</p>
              <h3>Capovolgi la prospettiva</h3>
              <p>Porta il pensiero su un tono più equilibrato, realistico e gentile.</p>
            </div>
            <div class="flip-zone">
              <div class="flip-card ${game.flipped ? "flipped" : ""}">
                <div class="flip-face front">
                  <p class="mini-label">Pensiero iniziale</p>
                  <h3>${escapeHtml(game.thought || "Scrivi il pensiero nello step precedente.")}</h3>
                </div>
                <div class="flip-face back">
                  <p class="mini-label">Nuova formulazione</p>
                  <textarea id="cr-reframed" rows="7" placeholder="Scrivi qui una versione più equilibrata del pensiero.">${escapeHtml(game.reframed)}</textarea>
                </div>
              </div>
            </div>
            <div class="inline-actions">
              <button class="ghost-button" type="button" data-game-action="cr-back">Indietro</button>
              <button class="ghost-button" type="button" data-game-action="cr-flip">Capovolgi la prospettiva</button>
              <button class="primary-button" type="button" data-game-action="cr-complete">Concludi esercizio</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
  startThoughtParticles();
}

function handleCognitiveRestructuringAction(action, element) {
  if (action === "cr-next") {
    if (uiState.gameState.step === 0 && !uiState.gameState.thought.trim()) {
      showToast("Pensiero mancante", "Scrivi prima il pensiero che vuoi analizzare.");
      return;
    }
    uiState.gameState.step = Math.min(2, uiState.gameState.step + 1);
    renderGame();
  }
  if (action === "cr-back") {
    uiState.gameState.step = Math.max(0, uiState.gameState.step - 1);
    renderGame();
  }
  if (action === "cr-flip") {
    uiState.gameState.flipped = !uiState.gameState.flipped;
    playClickTone();
    renderGame();
  }
  if (action === "cr-complete") {
    if (!uiState.gameState.reframed.trim()) {
      showToast("Ristrutturazione incompleta", "Scrivi il pensiero ristrutturato prima di concludere.");
      return;
    }
    celebrateAndComplete(findGame("cognitive-restructuring"), 50, element, `Pensiero riformulato da: ${uiState.gameState.thought.slice(0, 80)}`);
  }
}

function renderGameLeavesStream() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="game-stage">
        <canvas id="stream-canvas"></canvas>
        <div class="game-ui-layer">
          <div class="panel-heading">
            <div class="timer-pills">
              ${[3, 5, 10].map((minutes) => `<button class="filter-pill timer-pill ${game.duration === minutes * 60 ? "active" : ""}" type="button" data-stream-timer="${minutes * 60}">${minutes} min</button>`).join("")}
            </div>
            <div class="game-panel">
              <strong>${game.released} pensieri rilasciati</strong>
            </div>
          </div>
          <div></div>
          <div class="game-panel">
            <div class="small-row">
              <span>Tempo residuo: ${formatClock(game.remaining)}</span>
              <span>${game.running ? "Sessione attiva" : "Pronto"}</span>
            </div>
            <div class="task-form">
              <input id="stream-input" type="text" placeholder="Scrivi un pensiero da lasciare andare." value="${escapeAttribute(game.input)}">
              <button class="primary-button" type="button" data-game-action="stream-release">Lascia andare</button>
            </div>
            <div class="inline-actions">
              <button class="ghost-button" type="button" data-game-action="${game.running ? "stream-stop" : "stream-start"}">${game.running ? "Ferma sessione" : "Avvia sessione"}</button>
            </div>
          </div>
          ${game.summary ? `
            <div class="overlay-summary">
              <div>
                <p class="mini-label">Sessione conclusa</p>
                <h3>Hai lasciato andare ${game.released} pensieri</h3>
                <p>Tempo svolto: ${formatClock(game.duration)} · Esercizio completato con calma e continuità.</p>
                <button class="primary-button" type="button" data-game-action="stream-complete">Raccogli XP</button>
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;
  startLeavesAnimation();
}

function handleLeavesAction(action) {
  if (action === "stream-start") {
    uiState.gameState.running = true;
    startLeavesTimer();
    playWaterLoop();
    renderGame();
  }
  if (action === "stream-stop") {
    stopGameTimer("streamTimer");
    stopAudioLoops();
    uiState.gameState.running = false;
    uiState.gameState.summary = true;
    renderGame();
  }
  if (action === "stream-release") {
    const thought = uiState.gameState.input.trim();
    if (!thought) {
      showToast("Pensiero mancante", "Scrivi prima un pensiero da affidare alla foglia.");
      return;
    }
    uiState.gameState.customLeaves.push({
      text: thought,
      x: 1.05,
      y: 0.5 + (Math.random() * 0.24 - 0.12),
      size: 1.2,
      angle: Math.random() * Math.PI,
      speed: 0.0012 + Math.random() * 0.0015,
      glow: true,
      color: ["#88c18b", "#c58b50", "#d8b25d"][Math.floor(Math.random() * 3)]
    });
    uiState.gameState.input = "";
    uiState.gameState.released += 1;
    renderGame();
  }
  if (action === "stream-complete") {
    celebrateAndComplete(findGame("leaves-stream"), findGame("leaves-stream").xp, null, `Pensieri rilasciati: ${uiState.gameState.released}`);
  }
}

function setLeavesTimer(seconds) {
  uiState.gameState.duration = seconds;
  uiState.gameState.remaining = seconds;
  renderGame();
}

function renderGameBodyScan() {
  const game = uiState.gameState;
  const currentZone = BODY_ZONES[game.zoneIndex] || BODY_ZONES[BODY_ZONES.length - 1];
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="game-grid">
        <div class="game-panel">
          ${renderBodySvg(game)}
          <div class="small-row" style="margin-top:18px; justify-content:space-between;">
            <span>Zona attiva: <strong>${escapeHtml(currentZone.label)}</strong></span>
            <div class="breath-pulse"></div>
          </div>
        </div>
        <div class="game-panel">
          <p class="mini-label">Scansione guidata</p>
          <h3>${escapeHtml(currentZone.label)}</h3>
          <p>${escapeHtml(currentZone.text)}</p>
          <p><strong>Tensioni segnalate:</strong> ${escapeHtml(game.tensionZones.join(", ") || "Nessuna finora")}</p>
          <div class="inline-actions">
            <button class="primary-button" type="button" data-game-action="${game.summary ? "body-complete" : "body-start"}">${game.summary ? "Raccogli XP" : "Avvia sessione"}</button>
          </div>
        </div>
      </div>
      ${game.summary ? `
        <div class="overlay-summary">
          <div>
            <p class="mini-label">Sessione conclusa</p>
            <h3>Body scan completato</h3>
            <p>Zone tese rilevate: ${escapeHtml(game.tensionZones.join(", ") || "nessuna evidenza importante")}.</p>
            <button class="primary-button" type="button" data-game-action="body-complete">Raccogli XP</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
  refs.gameModalBody.querySelectorAll("[data-zone]").forEach((zone) => {
    zone.addEventListener("click", () => {
      const id = zone.dataset.zone;
      if (!uiState.gameState.tensionZones.includes(id)) {
        uiState.gameState.tensionZones.push(id);
      } else {
        uiState.gameState.tensionZones = uiState.gameState.tensionZones.filter((item) => item !== id);
      }
      renderGame();
    });
  });
}

function handleBodyScanAction(action) {
  if (action === "body-start") {
    startBodyScanProgress();
  }
  if (action === "body-complete") {
    celebrateAndComplete(findGame("body-scan"), 50, null, `Tensioni: ${uiState.gameState.tensionZones.join(", ") || "nessuna"}`);
  }
}

function renderGameDefusion() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="game-panel">
        <p class="mini-label">Pensiero</p>
        <div class="task-form">
          <input id="defusion-input" type="text" placeholder="Scrivi qui il pensiero da osservare." value="${escapeAttribute(game.thought)}">
          <button class="primary-button" type="button" data-game-action="defusion-action">${game.mode === "nuvola" ? "Soffia via" : game.mode === "canzone" ? "Canta!" : "Osserva il flusso"}</button>
        </div>
        <div class="mode-tabs" style="margin-top:16px;">
          ${["nuvola", "canzone", "ticker"].map((mode) => `<button class="tab-button ${game.mode === mode ? "active" : ""}" type="button" data-defusion-mode="${mode}">${mode === "nuvola" ? "Modalità Nuvola" : mode === "canzone" ? "Modalità Canzone" : "Modalità Ticker"}</button>`).join("")}
        </div>
      </div>
      <div class="game-stage">
        ${game.mode === "nuvola" ? renderCloudMode(game) : game.mode === "canzone" ? renderSongMode(game) : renderTickerMode(game)}
      </div>
      <div class="inline-actions">
        <button class="primary-button" type="button" data-game-action="defusion-complete">Concludi esercizio</button>
      </div>
    </div>
  `;
  if (game.mode === "nuvola") {
    startCloudAnimation();
  }
}

function handleDefusionAction(action) {
  if (action === "defusion-action") {
    if (!uiState.gameState.thought.trim()) {
      showToast("Pensiero mancante", "Scrivi prima il pensiero che vuoi osservare.");
      return;
    }
    uiState.gameState.acted = true;
    if (uiState.gameState.mode === "nuvola") {
      playTone("triangle", 520, 0.14, 0.05);
      renderGame();
    } else if (uiState.gameState.mode === "canzone") {
      playMelody([330, 392, 494, 392], 0.12);
      renderGame();
    } else {
      renderGame();
    }
  }
  if (action === "defusion-complete") {
    if (!uiState.gameState.thought.trim()) {
      showToast("Pensiero mancante", "Scrivi il pensiero prima di completare l'esercizio.");
      return;
    }
    celebrateAndComplete(findGame("cognitive-defusion"), 40, null, `Modalità usata: ${uiState.gameState.mode}`);
  }
}

function renderGameOppositeAction() {
  const game = uiState.gameState;
  const suggestions = OPPOSITE_ACTIONS[game.emotion] || ["Respira e rallenta", "Fai un passo minimo utile", "Scegli un gesto in linea con i tuoi valori"];
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="progress-steps">
        ${[0, 1, 2, 3, 4].map((index) => `<div class="progress-step ${game.step > index ? "completed" : game.step === index ? "active" : ""}"><span></span></div>`).join("")}
      </div>
      ${game.step === 0 ? `
        <div class="game-grid">
          <div class="wheel-wrap game-stage"><canvas id="emotion-wheel"></canvas></div>
          <div class="game-panel">
            <p class="mini-label">Step 1</p>
            <h3>Scegli l'emozione</h3>
            <p>Seleziona l'emozione prevalente da cui vuoi partire.</p>
            <p><strong>Selezione attuale:</strong> ${escapeHtml(game.emotion || "nessuna")}</p>
            <button class="primary-button" type="button" data-game-action="oa-next">Continua</button>
          </div>
        </div>
      ` : game.step === 1 ? `
        <div class="thermometer-wrap">
          <div class="game-panel">${renderThermometer(game.intensity)}</div>
          <div class="game-panel">
            <p class="mini-label">Step 2</p>
            <h3>Intensità</h3>
            <input id="oa-intensity" type="range" min="0" max="100" value="${game.intensity}">
            <p>Intensità attuale: <strong>${game.intensity}/100</strong></p>
            <div class="inline-actions">
              <button class="ghost-button" type="button" data-game-action="oa-back">Indietro</button>
              <button class="primary-button" type="button" data-game-action="oa-next">Continua</button>
            </div>
          </div>
        </div>
      ` : game.step === 2 ? `
        <div class="game-panel">
          <p class="mini-label">Step 3</p>
          <h3>Impulso tipico</h3>
          <textarea id="oa-impulse" rows="5" placeholder="Descrivi l'impulso che accompagna questa emozione.">${escapeHtml(game.impulse || getDefaultImpulse(game.emotion))}</textarea>
          <div class="inline-actions">
            <button class="ghost-button" type="button" data-game-action="oa-back">Indietro</button>
            <button class="primary-button" type="button" data-game-action="oa-next">Continua</button>
          </div>
        </div>
      ` : game.step === 3 ? `
        <div class="flip-zone">
          <div class="flip-card ${game.flipped ? "flipped" : ""}">
            <div class="flip-face front">
              <p class="mini-label">Impulso</p>
              <h3>${escapeHtml(game.impulse || getDefaultImpulse(game.emotion))}</h3>
            </div>
            <div class="flip-face back">
              <p class="mini-label">Azioni opposte consigliate</p>
              ${suggestions.map((item, index) => `<div class="game-panel" style="animation-delay:${index * 120}ms;">${escapeHtml(item)}</div>`).join("")}
            </div>
          </div>
          <div class="inline-actions" style="margin-top:18px;">
            <button class="ghost-button" type="button" data-game-action="oa-back">Indietro</button>
            <button class="ghost-button" type="button" data-game-action="oa-flip">Capovolgi</button>
            <button class="primary-button" type="button" data-game-action="oa-next">Vai al passo finale</button>
          </div>
        </div>
      ` : `
        <div class="game-panel" style="display:grid; place-items:center; min-height:360px;">
          <p class="mini-label">Step 5</p>
          <h3>Impegnati nell'azione opposta</h3>
          <p>Scegli ora di orientarti verso un gesto più utile e coerente con ciò che conta.</p>
          <button class="primary-button heart-button" type="button" data-game-action="oa-complete">Attiva l'azione opposta</button>
        </div>
      `}
    </div>
  `;
  if (game.step === 0) {
    startEmotionWheel();
  }
}

function handleOppositeAction(action, element) {
  if (action === "oa-next") {
    if (uiState.gameState.step === 0 && !uiState.gameState.emotion) {
      showToast("Emozione non selezionata", "Scegli un'emozione dalla ruota prima di continuare.");
      return;
    }
    uiState.gameState.step = Math.min(4, uiState.gameState.step + 1);
    renderGame();
  }
  if (action === "oa-back") {
    uiState.gameState.step = Math.max(0, uiState.gameState.step - 1);
    renderGame();
  }
  if (action === "oa-flip") {
    uiState.gameState.flipped = !uiState.gameState.flipped;
    playClickTone();
    renderGame();
  }
  if (action === "oa-complete") {
    createWaveBlast(element);
    playBellTone();
    celebrateAndComplete(findGame("opposite-action"), 60, element, `Emozione allenata: ${uiState.gameState.emotion}`);
  }
}

function renderGameTipp() {
  const game = uiState.gameState;
  if (!game.mode) {
    refs.gameModalBody.innerHTML = `
      <div class="game-layout">
        <div class="tipp-grid">
          ${[
            { id: "temperatura", title: "T Temperatura", text: "Countdown circolare da 30 secondi e atmosfera fredda progressiva." },
            { id: "intenso", title: "I Esercizio Intenso", text: "Figura stilizzata in movimento, contatore automatico e barra energia." },
            { id: "respiro", title: "P Paced Breathing", text: "Cerchio guida che si espande, trattiene e si restringe in sincronia." },
            { id: "rilassamento", title: "P Progressive Relaxation", text: "Contrai e rilascia in sequenza rapida su gruppi muscolari principali." }
          ].map((item, index) => `
            <button class="game-card tipp-card reveal" data-delay="${index * 60}" type="button" data-tipp-open="${item.id}">
              <div class="game-card-visual"></div>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </button>
          `).join("")}
        </div>
      </div>
    `;
    return;
  }

  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="inline-actions">
        <button class="ghost-button" type="button" data-game-action="tipp-back">Torna alle skill</button>
        <button class="primary-button" type="button" data-game-action="${game.running ? "tipp-stop" : "tipp-start"}">${game.running ? "Ferma" : "Avvia"}</button>
      </div>
      <div class="game-stage">
        ${renderTippStage(game)}
      </div>
      ${game.ended ? `
        <div class="overlay-summary">
          <div>
            <p class="mini-label">Skill completata</p>
            <h3>${escapeHtml(labelForTipp(game.mode))}</h3>
            <p>Hai completato la pratica e raccolto dati utili per la regolazione emotiva.</p>
            <button class="primary-button" type="button" data-game-action="tipp-complete">Raccogli XP</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
  if (game.mode === "respiro") {
    startTippBreathCanvas();
  }
}

function renderTippStage(game) {
  if (game.mode === "temperatura") {
    const progress = (game.remaining / 30) * 282.6;
    return `
      <div class="game-ui-layer" style="background:linear-gradient(180deg, rgba(25,55,92,${0.4 + ((30 - game.remaining) / 30) * 0.5}), rgba(8,16,28,0.94));">
        <div class="game-panel" style="justify-self:center;">
          <p class="mini-label">T Temperatura</p>
          <h3>Tempo residuo ${game.remaining}s</h3>
        </div>
        <div class="game-panel" style="justify-self:center;">
          <svg class="circular-timer" viewBox="0 0 100 100">
            <circle class="circular-bg" cx="50" cy="50" r="45"></circle>
            <circle class="circular-fill" cx="50" cy="50" r="45" stroke-dasharray="282.6" stroke-dashoffset="${282.6 - progress}"></circle>
            <text x="50" y="56" text-anchor="middle" fill="#163b93" font-size="20">${game.remaining}</text>
          </svg>
        </div>
      </div>
    `;
  }
  if (game.mode === "intenso") {
    return `
      <div class="game-ui-layer">
        <div class="game-panel">
          <p class="mini-label">I Esercizio Intenso</p>
          <h3>Jumping jacks: ${game.count}</h3>
          <div class="energy-bar"><div class="energy-fill" style="width:${Math.min(100, game.energy)}%"></div></div>
        </div>
        <div class="game-panel" style="justify-self:center;">
          <svg class="exercise-figure" viewBox="0 0 220 220">
            <circle cx="110" cy="32" r="18" fill="#d9eff0"></circle>
            <rect x="96" y="52" width="28" height="68" rx="14" fill="#d9eff0"></rect>
            <rect class="jj-arm" x="62" y="68" width="18" height="74" rx="9" fill="#f1c9e6" transform="rotate(-24 70 70)"></rect>
            <rect class="jj-arm" x="140" y="68" width="18" height="74" rx="9" fill="#f1c9e6" transform="rotate(24 150 70)"></rect>
            <rect class="jj-leg" x="86" y="116" width="18" height="86" rx="9" fill="#c7e8f3" transform="rotate(-14 95 116)"></rect>
            <rect class="jj-leg" x="118" y="116" width="18" height="86" rx="9" fill="#c7e8f3" transform="rotate(14 127 116)"></rect>
          </svg>
        </div>
      </div>
    `;
  }
  if (game.mode === "respiro") {
    return `<canvas id="tipp-breath-canvas"></canvas>`;
  }
  return `
    <div class="game-ui-layer">
      <div class="game-panel">
        <p class="mini-label">P Progressive Relaxation</p>
        <h3>${game.phase === "contrai" ? "CONTRAI" : "RILASCIA"}</h3>
        <p>Gruppo ${game.stageIndex + 1} di 6 · Tempo residuo ${game.remaining}s</p>
      </div>
      <div class="game-panel" style="justify-self:center;">
        ${renderMiniPmrSvg(game.stageIndex)}
      </div>
    </div>
  `;
}

function handleTippAction(action) {
  if (action === "tipp-back") {
    stopGameTimer("tippTimer");
    uiState.gameState = createGameState("tipp", { homeworkId: uiState.gameState.homeworkId });
    renderGame();
  }
  if (action === "tipp-start") {
    startTippSequence();
  }
  if (action === "tipp-stop") {
    stopGameTimer("tippTimer");
    uiState.gameState.running = false;
    uiState.gameState.ended = true;
    renderGame();
  }
  if (action === "tipp-complete") {
    celebrateAndComplete(findGame("tipp"), 50, null, `Skill TIPP completata: ${labelForTipp(uiState.gameState.mode)}`);
  }
}

function renderGameBreathingStudio() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="game-panel">
        <div class="mode-tabs">
          ${[
            { id: "box", label: "Box Breathing 4-4-4-4" },
            { id: "478", label: "4-7-8" },
            { id: "coerenza", label: "Coerenza Cardiaca 5-5" },
            { id: "diaframmatica", label: "Respirazione Diaframmatica" }
          ].map((item) => `<button class="tab-button ${game.technique === item.id ? "active" : ""}" type="button" data-breath-tech="${item.id}">${item.label}</button>`).join("")}
        </div>
        <div class="mode-tabs" style="margin-top:12px;">
          ${[2, 5, 10].map((minutes) => `<button class="filter-pill ${game.duration === minutes ? "active" : ""}" type="button" data-breath-duration="${minutes}">${minutes} minuti</button>`).join("")}
        </div>
      </div>
      <div class="game-stage">
        <canvas id="breathing-studio-canvas"></canvas>
        <div class="game-ui-layer">
          <div class="game-panel" style="justify-self:center;">
            <h3>${escapeHtml(labelForBreathingTechnique(game.technique))}</h3>
            <p>Tempo residuo ${formatClock(game.remaining)} · Cicli ${game.cycles}</p>
            <div class="inline-actions">
              <button class="primary-button" type="button" data-game-action="${game.running ? "breath-stop" : "breath-start"}">${game.running ? "Ferma" : "Avvia"}</button>
              ${game.ended ? `<button class="primary-button" type="button" data-game-action="breath-complete">Raccogli XP</button>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  startBreathingStudioCanvas();
}

function handleBreathingStudioAction(action) {
  if (action === "breath-start") {
    startBreathingStudio();
  }
  if (action === "breath-stop") {
    stopGameTimer("breathingStudioTimer");
    uiState.gameState.running = false;
    uiState.gameState.ended = true;
    renderGame();
  }
  if (action === "breath-complete") {
    celebrateAndComplete(findGame("breathing-studio"), 45, null, `Tecnica ${labelForBreathingTechnique(uiState.gameState.technique)}`);
  }
}

function renderGameExposure() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="progress-steps">
        ${[0, 1, 2].map((index) => `<div class="progress-step ${game.step > index ? "completed" : game.step === index ? "active" : ""}"><span></span></div>`).join("")}
      </div>
      ${game.step === 0 ? `
        <div class="game-panel">
          <p class="mini-label">Schermata 1</p>
          <h3>Qual è la paura principale?</h3>
          <textarea id="exposure-fear" rows="6" placeholder="Descrivi la paura che vuoi affrontare un gradino alla volta.">${escapeHtml(game.fear)}</textarea>
          <div class="inline-actions">
            <button class="primary-button" type="button" data-game-action="exposure-next">Continua</button>
          </div>
        </div>
      ` : game.step === 1 ? `
        <div class="game-grid">
          <div class="game-panel">
            <p class="mini-label">Schermata 2</p>
            <h3>Costruisci la scala</h3>
            <div class="task-form">
              <input id="exposure-situation" type="text" placeholder="Aggiungi una situazione legata alla paura." value="${escapeAttribute(game.draftSituation || "")}">
              <button class="primary-button" type="button" data-game-action="exposure-add">Aggiungi</button>
            </div>
            <p style="margin-top:12px;">Intensità: <strong>${game.draftIntensity}/100</strong></p>
            <input id="exposure-intensity" type="range" min="0" max="100" value="${game.draftIntensity}">
            <div class="sortable-list" style="margin-top:16px;">
              ${game.situations.map((item, index) => `
                <article class="homework-card sortable-card">
                  <div class="meta-row">
                    <span class="meta-pill">SUD ${item.intensity}</span>
                    <span class="meta-pill secondary">${index + 1}° gradino</span>
                  </div>
                  <strong>${escapeHtml(item.text)}</strong>
                  <div class="inline-actions">
                    <button class="ghost-button small-button" type="button" data-exposure-move="${escapeAttribute(item.id)}" data-direction="-1">Su</button>
                    <button class="ghost-button small-button" type="button" data-exposure-move="${escapeAttribute(item.id)}" data-direction="1">Giù</button>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
          <div class="game-panel ladder-board">
            ${renderLadderSvg(game.situations)}
            <div class="inline-actions" style="margin-top:18px;">
              <button class="ghost-button" type="button" data-game-action="exposure-back">Indietro</button>
              <button class="primary-button" type="button" data-game-action="exposure-next">Vai alla sessione</button>
            </div>
          </div>
        </div>
      ` : `
        <div class="game-grid">
          <div class="game-panel">
            <p class="mini-label">Schermata 3</p>
            <h3>Scegli il gradino da affrontare</h3>
            <div class="stack-list">
              ${game.situations.map((item) => `
                <button class="homework-card ${game.selectedId === item.id ? "selected-card" : ""}" type="button" data-exposure-select="${escapeAttribute(item.id)}">
                  <strong>${escapeHtml(item.text)}</strong>
                  <span>SUD ${item.intensity}/100</span>
                </button>
              `).join("")}
            </div>
          </div>
          <div class="game-panel">
            <div class="circular-timer" style="margin-bottom:16px;">${renderCountdownCircle(game.countdown, 180)}</div>
            <p>Ansia attuale: <strong id="exposure-anxiety-label">${game.currentAnxiety || 0}/100</strong></p>
            <input id="exposure-anxiety-now" type="range" min="0" max="100" value="${game.currentAnxiety || 0}">
            <div class="inline-actions" style="margin-top:12px;">
              <button class="ghost-button" type="button" data-game-action="exposure-mark-anxiety">Registra ansia</button>
              <button class="primary-button" type="button" data-game-action="${game.running ? "exposure-stop" : "exposure-start"}">${game.running ? "Ferma countdown" : "Avvia countdown"}</button>
            </div>
            <div class="chart-box" style="min-height:180px; margin-top:16px;">${renderExposureChart(game.graph)}</div>
          </div>
        </div>
      `}
      ${game.summary ? `
        <div class="overlay-summary">
          <div>
            <p class="mini-label">Gradino affrontato</p>
            <h3>${escapeHtml(game.situations.find((item) => item.id === game.selectedId)?.text || "Sessione completata")}</h3>
            <p>La curva dell'ansia è stata registrata e il gradino è stato segnato come affrontato.</p>
            <button class="primary-button" type="button" data-game-action="exposure-complete">Raccogli XP</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function handleExposureAction(action) {
  if (action === "exposure-next") {
    if (uiState.gameState.step === 0 && !uiState.gameState.fear.trim()) {
      showToast("Paura mancante", "Scrivi la paura principale prima di continuare.");
      return;
    }
    if (uiState.gameState.step === 1 && !uiState.gameState.situations.length) {
      showToast("Scala incompleta", "Aggiungi almeno una situazione alla scala.");
      return;
    }
    uiState.gameState.step = Math.min(2, uiState.gameState.step + 1);
    renderGame();
  }
  if (action === "exposure-back") {
    uiState.gameState.step = Math.max(0, uiState.gameState.step - 1);
    renderGame();
  }
  if (action === "exposure-add") {
    if (!uiState.gameState.draftSituation?.trim()) {
      return;
    }
    uiState.gameState.situations.push({
      id: `sud-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      text: uiState.gameState.draftSituation.trim(),
      intensity: uiState.gameState.draftIntensity
    });
    uiState.gameState.draftSituation = "";
    renderGame();
  }
  if (action === "exposure-start") {
    if (!uiState.gameState.selectedId) {
      showToast("Gradino non selezionato", "Scegli prima un gradino della scala.");
      return;
    }
    startExposureTimer();
  }
  if (action === "exposure-stop") {
    stopGameTimer("exposureTimer");
    uiState.gameState.running = false;
    uiState.gameState.summary = true;
    renderGame();
  }
  if (action === "exposure-mark-anxiety") {
    uiState.gameState.graph.push({
      t: 180 - uiState.gameState.countdown,
      v: uiState.gameState.currentAnxiety || 0
    });
    renderGame();
  }
  if (action === "exposure-complete") {
    celebrateAndComplete(findGame("graded-exposure"), 60, null, `Paura: ${uiState.gameState.fear.slice(0, 80)}`);
  }
}

function moveExposureItem(id, direction) {
  const index = uiState.gameState.situations.findIndex((item) => item.id === id);
  if (index < 0) {
    return;
  }
  const target = index + direction;
  if (target < 0 || target >= uiState.gameState.situations.length) {
    return;
  }
  const list = [...uiState.gameState.situations];
  [list[index], list[target]] = [list[target], list[index]];
  uiState.gameState.situations = list;
  renderGame();
}

function renderGamePmr() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="progress-steps">
        ${PMR_GROUPS.map((group, index) => `<div class="progress-step ${index < game.index ? "completed" : index === game.index ? "active" : ""}"><span></span></div>`).join("")}
      </div>
      <div class="game-grid">
        <div class="game-panel">
          ${renderPmrBodySvg(game)}
        </div>
        <div class="game-panel">
          <p class="mini-label">Rilassamento Muscolare Progressivo</p>
          <h3>${escapeHtml(PMR_GROUPS[game.index] || "Sessione conclusa")}</h3>
          <p><strong>${game.phase.toUpperCase()}</strong> · Tempo residuo ${game.remaining}s</p>
          <p>${escapeHtml(getPmrInstruction(game))}</p>
          <div class="inline-actions">
            <button class="primary-button" type="button" data-game-action="${game.summary ? "pmr-complete" : "pmr-start"}">${game.summary ? "Raccogli XP" : "Avvia sessione"}</button>
          </div>
        </div>
      </div>
      ${game.summary ? `
        <div class="overlay-summary">
          <div>
            <p class="mini-label">Sessione conclusa</p>
            <h3>Rilassamento completato</h3>
            <p>La heatmap finale mostra i gruppi attraversati e il rilascio progressivo del corpo.</p>
            <button class="primary-button" type="button" data-game-action="pmr-complete">Raccogli XP</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function handlePmrAction(action) {
  if (action === "pmr-start") {
    startPmrSequence();
  }
  if (action === "pmr-complete") {
    celebrateAndComplete(findGame("pmr"), 55, null, "Rilassamento muscolare progressivo completato.");
  }
}

function renderGameGuidedImagery() {
  const game = uiState.gameState;
  refs.gameModalBody.innerHTML = `
    <div class="game-layout">
      <div class="scenario-grid">
        ${["spiaggia", "foresta", "montagna"].map((item) => `
          <button class="game-card scenario-card ${game.scenario === item ? "selected-card" : ""}" type="button" data-scenario="${item}">
            <div class="scenario-preview"></div>
            <strong>${escapeHtml(capitalize(item))}</strong>
            <p>${escapeHtml(getScenarioText(item))}</p>
          </button>
        `).join("")}
      </div>
      <div class="game-panel">
        <div class="mode-tabs">
          ${[5, 10, 15].map((minutes) => `<button class="filter-pill ${game.duration === minutes * 60 ? "active" : ""}" type="button" data-game-action="set-guided-${minutes}">${minutes} minuti</button>`).join("")}
        </div>
      </div>
      <div class="game-stage">
        <canvas id="guided-canvas"></canvas>
        <div class="game-ui-layer">
          <div class="game-panel" style="align-self:end;">
            <p class="mini-label">${escapeHtml(capitalize(game.scenario))}</p>
            <h3>${escapeHtml(getGuidedScript(game.scenario, game.scriptIndex))}</h3>
            <div class="small-row">
              <span>Tempo residuo ${formatClock(game.remaining)}</span>
              <span>${game.running ? "Sessione in corso" : "Pronto"}</span>
            </div>
            <div class="inline-actions">
              <button class="primary-button" type="button" data-game-action="${game.running ? "guided-stop" : "guided-start"}">${game.running ? "Ferma" : "Avvia"}</button>
              ${game.summary ? `<button class="primary-button" type="button" data-game-action="guided-complete">Raccogli XP</button>` : ""}
            </div>
          </div>
          ${game.summary ? `
            <div class="overlay-summary">
              <div>
                <p class="mini-label">Rientro</p>
                <h3>Visualizzazione conclusa</h3>
                <p>Hai completato lo scenario ${escapeHtml(game.scenario)} e chiuso la sessione con una dissolvenza guidata.</p>
                <button class="primary-button" type="button" data-game-action="guided-complete">Raccogli XP</button>
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;
  startGuidedCanvas();
}

function handleGuidedImageryAction(action) {
  if (action.startsWith("set-guided-")) {
    const minutes = Number(action.replace("set-guided-", ""));
    uiState.gameState.duration = minutes * 60;
    uiState.gameState.remaining = minutes * 60;
    renderGame();
    return;
  }
  if (action === "guided-start") {
    startGuidedSession();
  }
  if (action === "guided-stop") {
    stopGameTimer("guidedTimer");
    uiState.gameState.running = false;
    uiState.gameState.summary = true;
    renderGame();
  }
  if (action === "guided-complete") {
    celebrateAndComplete(findGame("guided-imagery"), 50, null, `Scenario: ${uiState.gameState.scenario}`);
  }
}

function celebrateAndComplete(game, xp, element, note) {
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  const beforeLevel = patient.stats.level;
  const sourcePoint = element ? element.getBoundingClientRect() : null;
  completeGameForPatient(patient, game, xp, note, uiState.gameState.homeworkId);
  triggerConfetti();
  animateXpReward(xp, sourcePoint);
  if (patient.stats.level > beforeLevel) {
    showLevelUp(patient.stats.level);
    playVictoryMelody();
  } else {
    playClickTone();
  }
  saveCurrentPatient();
  renderAll();
  closeGameModal();
}

function completeGameForPatient(patient, game, xp, note, homeworkId) {
  markPatientActivity(patient);
  patient.stats.xp += xp;
  patient.stats.level = Math.floor(patient.stats.xp / 100) + 1;
  patient.exerciseHistory.unshift({
    id: `progress-${Date.now()}`,
    exerciseId: game.id,
    title: game.title,
    xp,
    category: game.category,
    completedAt: new Date().toISOString(),
    source: homeworkId ? "homework" : "gioco",
    note
  });
  if (homeworkId) {
    const homework = patient.homeworks.find((item) => item.id === homeworkId);
    if (homework) {
      homework.status = "completato";
      homework.completedAt = new Date().toISOString();
    }
  }
  const challenge = getDailyChallenge();
  if (challenge.id === game.id) {
    patient.stats.xp += xp;
    showToast("Challenge completata", "Hai ottenuto XP doppi per la challenge quotidiana.");
  }
  const achievements = computeAchievements(patient);
  maybeAwardAchievementToasts(patient, achievements);
  patient.stats.achievements = achievements;
}

function computeAchievements(patient) {
  const history = patient.exerciseHistory;
  const categories = new Set(history.map((item) => item.category));
  const unlocked = [];
  if (history.length >= 1) unlocked.push("first-game");
  if (patient.stats.xp >= 100) unlocked.push("xp-100");
  if (patient.stats.xp >= 300) unlocked.push("xp-300");
  if (patient.stats.streak >= 3) unlocked.push("streak-3");
  if (patient.stats.streak >= 7) unlocked.push("streak-7");
  if (patient.entries.length >= 3) unlocked.push("sheet-3");
  if (patient.homeworks.filter((item) => item.status === "completato").length >= 1) unlocked.push("homework-1");
  if (patient.homeworks.filter((item) => item.status === "completato").length >= 5) unlocked.push("homework-5");
  if (history.filter((item) => item.category === "CBT").length >= 3) unlocked.push("cbt-3");
  if (history.filter((item) => item.category === "Respirazione").length >= 3) unlocked.push("breath-3");
  if (history.filter((item) => item.category === "Mindfulness").length >= 3) unlocked.push("mindfulness-3");
  if (["CBT", "Mindfulness", "Respirazione", "Regolazione", "Esposizione", "PMR"].every((item) => categories.has(item))) unlocked.push("all-categories");
  return unlocked;
}

function maybeAwardAchievementToasts(patient, nextAchievements) {
  const previous = new Set(patient.stats.achievements);
  nextAchievements.forEach((id) => {
    if (!previous.has(id)) {
      const achievement = ACHIEVEMENTS.find((item) => item.id === id);
      showToast("Achievement sbloccato", achievement ? achievement.title : "Nuovo badge ottenuto.");
    }
  });
}

function markPatientActivity(patient) {
  const today = formatDateInput(new Date());
  if (!patient.stats.lastActiveDate) {
    patient.stats.streak = 1;
    patient.stats.lastActiveDate = today;
    return;
  }
  if (patient.stats.lastActiveDate === today) {
    return;
  }
  const diff = daysBetween(patient.stats.lastActiveDate, today);
  if (diff === 1) {
    patient.stats.streak += 1;
  } else {
    patient.stats.streak = 1;
  }
  patient.stats.lastActiveDate = today;
}

function simulateDayForTesting() {
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  patient.stats.streak += 1;
  patient.stats.lastActiveDate = dateOffset(0);
  patient.stats.achievements = computeAchievements(patient);
  saveCurrentPatient();
  renderAll();
  showToast("Simulazione eseguita", "Lo streak è stato incrementato per facilitare il test della gamification.");
}

function startCountdown() {
  updateCountdown();
  if (uiState.countdownTimer) {
    clearInterval(uiState.countdownTimer);
  }
  uiState.countdownTimer = window.setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const target = getSessionDate(getSelectedPatient()?.session);
  if (!target) {
    refs.sessionTitle.textContent = "Seduta da impostare";
    refs.sessionNote.textContent = "Lo psicologo potrà aggiornare data e ora dalla dashboard.";
    ["countDays", "countHours", "countMinutes", "countSeconds"].forEach((id) => refs[id].textContent = "00");
    return;
  }
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    refs.sessionTitle.textContent = "Seduta da aggiornare";
    refs.sessionNote.textContent = "L'orario impostato è trascorso. Attendi il prossimo aggiornamento.";
    ["countDays", "countHours", "countMinutes", "countSeconds"].forEach((id) => refs[id].textContent = "00");
    return;
  }
  refs.countDays.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
  refs.countHours.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
  refs.countMinutes.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
  refs.countSeconds.textContent = pad(Math.floor((diff / 1000) % 60));
  refs.sessionTitle.textContent = formatSessionLong(getSelectedPatient().session);
  refs.sessionNote.textContent = getSelectedPatient().session.note || "Nessuna nota aggiunta.";
}

function startBreathing() {
  const exercise = BREATHING_EXERCISES.find((item) => item.id === uiState.selectedBreathingId);
  if (!exercise || uiState.breathingTimer) {
    return;
  }
  uiState.breathingState = { phaseIndex: 0, remaining: exercise.steps[0].seconds, elapsed: 0 };
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
}

function applyBreathingPhase(exercise) {
  const phase = exercise.steps[uiState.breathingState.phaseIndex];
  refs.breathingPhase.textContent = phase.label;
  refs.breathingCycle.textContent = `Fase: ${phase.label} · ${uiState.breathingState.remaining}s`;
  refs.breathingTime.textContent = `Tempo: ${formatClock(uiState.breathingState.elapsed)}`;
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
  renderBreathing();
  if (showFeedback) {
    showToast("Respirazione fermata", "Puoi riprendere l'esercizio quando vuoi.");
  }
}

function updateBreathingControls() {
  const running = Boolean(uiState.breathingTimer);
  refs.startBreathingButton.disabled = running;
  refs.stopBreathingButton.disabled = !running;
}

function renderCustomQuestion(question) {
  ensureCustomDraftValue(question);
  const value = uiState.draft.customAnswers[question.id];
  if (question.type === "testo") {
    return `
      <div class="question-card-block">
        <label class="field-label" for="custom-${question.id}">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <input id="custom-${question.id}" type="text" data-custom-id="${escapeAttribute(question.id)}" value="${escapeAttribute(String(value || ""))}" placeholder="Scrivi qui la tua risposta">
      </div>
    `;
  }
  if (question.type === "textarea") {
    return `
      <div class="question-card-block">
        <label class="field-label" for="custom-${question.id}">
          <span>${escapeHtml(question.text)}</span>
        </label>
        <textarea id="custom-${question.id}" rows="4" data-custom-id="${escapeAttribute(question.id)}" placeholder="Scrivi qui con calma.">${escapeHtml(String(value || ""))}</textarea>
      </div>
    `;
  }
  if (question.type === "scelta-singola") {
    return `
      <div class="question-card-block">
        <label class="field-label"><span>${escapeHtml(question.text)}</span></label>
        <div class="chip-wrap">
          ${question.options.map((option) => `
            <label class="chip ${value === option ? "active" : ""}">
              <input type="radio" hidden data-custom-id="${escapeAttribute(question.id)}" name="custom-${escapeAttribute(question.id)}" value="${escapeAttribute(option)}" ${value === option ? "checked" : ""}>
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
        <label class="field-label"><span>${escapeHtml(question.text)}</span></label>
        <div class="chip-wrap">
          ${question.options.map((option) => `
            <label class="chip ${current.includes(option) ? "active" : ""}">
              <input type="checkbox" hidden data-custom-id="${escapeAttribute(question.id)}" value="${escapeAttribute(option)}" ${current.includes(option) ? "checked" : ""}>
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
      <input id="custom-${question.id}" type="range" min="1" max="10" value="${escapeAttribute(String(value || "5"))}" data-custom-id="${escapeAttribute(question.id)}">
    </div>
  `;
}

function ensureCustomDraftValue(question) {
  if (!(question.id in uiState.draft.customAnswers)) {
    uiState.draft.customAnswers[question.id] = question.type === "scelta-multipla" ? [] : question.type === "scala" ? "5" : "";
  }
}

function renderChipSet(values, selected) {
  return values.map((value) => `
    <button class="chip ${selected.includes(value) ? "active" : ""}" type="button" data-chip="${escapeAttribute(value)}">${escapeHtml(value)}</button>
  `).join("");
}

function buildAiQuestions(draft) {
  const questions = [];
  const gratitudeCount = draft.gratitude.filter((item) => item.trim()).length;
  const lowerHard = draft.hardToday.toLowerCase();
  const negativeTone = NEGATIVE_KEYWORDS.some((item) => lowerHard.includes(item));
  const bodyTrigger = draft.physicalSensations.some((item) => ["Tensione", "Respiro corto", "Peso sul petto", "Nodo alla gola"].includes(item));

  if (draft.mood <= 4) {
    questions.push({ id: "low-mood", question: "C'è stato un momento preciso della giornata in cui ti sei sentito peggio?" });
    questions.push({ id: "needed", question: "Cosa avresti avuto bisogno di ricevere in quel momento?" });
  }
  if (draft.anxiety === "Alta" || draft.anxiety === "Molto alta") {
    questions.push({ id: "anxiety-when", question: "In quali momenti della giornata l'ansia si è fatta sentire di più?" });
    questions.push({ id: "anxiety-trigger", question: "Hai notato se questa ansia è comparsa in risposta a qualcosa di specifico?" });
  }
  if (bodyTrigger) {
    questions.push({ id: "physical-trigger", question: "Hai notato se queste sensazioni fisiche sono comparse in risposta a un trigger specifico?" });
  }
  if (negativeTone) {
    questions.push({ id: "kindness-reframe", question: "Come parleresti a te stesso con maggiore gentilezza in questa situazione?" });
  }
  if (gratitudeCount >= 2) {
    questions.push({ id: "gratitude", question: "Quale di queste cose positive vorresti portare con te anche domani?" });
  }
  if (draft.mood <= 5 || !draft.betterToday.trim()) {
    questions.push({ id: "relief", question: "C'è stato anche un piccolo momento di sollievo oggi?" });
  }
  return questions;
}

function buildAdvice(draft) {
  const gratitudeCount = draft.gratitude.filter((item) => item.trim()).length;
  const bodyLoad = draft.physicalSensations.some((item) => ["Tensione", "Peso sul petto", "Respiro corto", "Agitazione", "Nodo alla gola"].includes(item));
  if (draft.mood <= 4 && (draft.anxiety === "Alta" || draft.anxiety === "Molto alta")) {
    return "Oggi sembra esserci stata molta attivazione interna, ma il fatto che tu l'abbia osservata con sincerità è già importante. Prova a concederti un momento lento prima di sera, anche breve.";
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

function persistDraft() {
  const patient = getSelectedPatient();
  if (!patient) {
    return;
  }
  patient.draft = sanitizeDraft(uiState.draft);
  saveCurrentPatient(false);
}

function syncDraftFromPatient() {
  const patient = getSelectedPatient();
  uiState.draft = patient ? sanitizeDraft(patient.draft) : createEmptyDraft();
}

function isDraftMeaningful(draft) {
  return Boolean(
    draft.emotions.length ||
    draft.physicalSensations.length ||
    draft.betterToday.trim() ||
    draft.hardToday.trim() ||
    draft.gratitude.some((item) => item.trim()) ||
    draft.positiveThought.trim() ||
    draft.note.trim()
  );
}

function saveCurrentPatient(render = false) {
  saveState();
  if (render) {
    renderAll();
  }
}

function ensureSelectedPatient() {
  if (!state.patients.length) {
    uiState.currentPatientId = null;
    return;
  }
  if (!state.patients.some((item) => item.id === uiState.currentPatientId)) {
    uiState.currentPatientId = state.patients[0].id;
  }
}

function getSelectedPatient() {
  return state.patients.find((item) => item.id === uiState.currentPatientId) || null;
}

function getEntriesDescending() {
  return getSelectedPatient() ? [...getSelectedPatient().entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) : [];
}

function entriesWithinDays(days) {
  const limit = new Date();
  limit.setHours(0, 0, 0, 0);
  limit.setDate(limit.getDate() - (days - 1));
  return getEntriesDescending().filter((entry) => new Date(`${entry.date}T12:00:00`) >= limit);
}

function handleGlobalKeydown(event) {
  if (event.key === "Escape") {
    if (uiState.activeModal === "game") closeGameModal();
    else if (uiState.activeModal === "detail") closeDetailModal();
    else if (uiState.activeModal === "login") closeLoginModal();
  }
}

function setModalState(type) {
  uiState.activeModal = type;
  refs.loginModal.classList.toggle("hidden", type !== "login");
  refs.detailModal.classList.toggle("hidden", type !== "detail");
  refs.gameModal.classList.toggle("hidden", type !== "game");
  refs.loginModal.setAttribute("aria-hidden", String(type !== "login"));
  refs.detailModal.setAttribute("aria-hidden", String(type !== "detail"));
  refs.gameModal.setAttribute("aria-hidden", String(type !== "game"));
  document.body.classList.toggle("modal-open", Boolean(type) || !refs.homeworkDrawer.classList.contains("hidden"));
  if (!type && refs.homeworkDrawer.classList.contains("hidden") && uiState.lastFocusedElement instanceof HTMLElement) {
    uiState.lastFocusedElement.focus();
    uiState.lastFocusedElement = null;
  }
}

function showToast(title, text) {
  while (refs.toastStack.children.length >= MAX_TOASTS) {
    refs.toastStack.firstElementChild?.remove();
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p>`;
  refs.toastStack.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    return;
  }
  uiState.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        uiState.revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
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

function populateTipCategories() {
  refs.tipCategory.innerHTML = TIP_CATEGORIES.filter((item) => item !== "Tutti").map((item) => `
    <option value="${escapeAttribute(item)}">${escapeHtml(item)}</option>
  `).join("");
}

function handleGameActionSet(action) {
  if (action.startsWith("set-guided-")) {
    handleGuidedImageryAction(action);
  }
}

function startThoughtParticles() {
  const canvas = document.getElementById("cr-particles");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  const particles = uiState.gameState.particles;
  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
      const id = requestAnimationFrame(frame);
      uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
    };
  frame();
  uiState.gameVisualRuntime.push(() => ctx.clearRect(0, 0, canvas.width, canvas.height));
}

function createThoughtParticles() {
  return Array.from({ length: 30 }, () => ({
    x: Math.random() * 1200,
    y: Math.random() * 720,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    size: 3 + Math.random() * 6,
    alpha: 0.28 + Math.random() * 0.38,
    color: Math.random() > 0.5 ? "rgba(255,120,104,0.9)" : "rgba(244,179,107,0.88)"
  }));
}

function toggleDistortion(id, button) {
  const current = new Set(uiState.gameState.distortions);
  if (current.has(id)) current.delete(id);
  else current.add(id);
  uiState.gameState.distortions = [...current];
  button.classList.add("vibrate");
  setTimeout(() => button.classList.remove("vibrate"), 260);
  renderGame();
}

function createRiverLeaves() {
  return Array.from({ length: 12 }, () => ({
    x: Math.random() * 1.1,
    y: 0.35 + Math.random() * 0.3,
    size: 0.65 + Math.random() * 0.7,
    angle: Math.random() * Math.PI * 2,
    speed: 0.0007 + Math.random() * 0.0012,
    glow: false,
    color: ["#7ea861", "#926646", "#c09d58"][Math.floor(Math.random() * 3)]
  }));
}

function startLeavesAnimation() {
  const canvas = document.getElementById("stream-canvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  const draw = (time) => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.4);
    sky.addColorStop(0, "#203248");
    sky.addColorStop(1, "#24384f");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.34);
    drawRiver(ctx, width, height, time / 1000);
    drawBanks(ctx, width, height);
    const allLeaves = [...uiState.gameState.leaves, ...uiState.gameState.customLeaves];
    allLeaves.forEach((leaf) => {
      leaf.x -= leaf.speed;
      leaf.angle += 0.01;
      if (leaf.x < -0.2) {
        leaf.x = 1.15;
        leaf.y = 0.38 + Math.random() * 0.24;
      }
      drawLeaf(ctx, width, height, leaf);
    });
    const id = requestAnimationFrame(draw);
    uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
  };
  draw(0);
}

function drawRiver(ctx, width, height, t) {
  const yBase = height * 0.54;
  const layers = [
    { amp: 18, speed: 1, color: "rgba(47,102,132,0.96)" },
    { amp: 22, speed: 1.4, color: "rgba(38,122,143,0.72)" },
    { amp: 30, speed: 1.9, color: "rgba(19,165,162,0.26)" }
  ];
  layers.forEach((layer, index) => {
    ctx.beginPath();
    ctx.moveTo(0, yBase + index * 16);
    for (let x = 0; x <= width; x += 12) {
      const y = yBase + index * 20 + Math.sin((x / width) * Math.PI * 4 + t * layer.speed) * layer.amp;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = layer.color;
    ctx.fill();
  });
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  for (let i = 0; i < 18; i += 1) {
    const y = yBase + 30 + Math.sin(t * 1.2 + i) * 12;
    ctx.beginPath();
    ctx.moveTo((i * width) / 18, y);
    ctx.lineTo((i * width) / 18 + 36, y + 5);
    ctx.stroke();
  }
}

function drawBanks(ctx, width, height) {
  ctx.fillStyle = "#294127";
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, height * 0.55);
  ctx.quadraticCurveTo(width * 0.12, height * 0.6, width * 0.16, height);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(width, height);
  ctx.lineTo(width, height * 0.52);
  ctx.quadraticCurveTo(width * 0.85, height * 0.56, width * 0.8, height);
  ctx.closePath();
  ctx.fill();
}

function drawLeaf(ctx, width, height, leaf) {
  const x = leaf.x * width;
  const y = leaf.y * height;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(leaf.angle);
  ctx.scale(leaf.size, leaf.size);
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.quadraticCurveTo(10, -4, 0, 12);
  ctx.quadraticCurveTo(-10, -4, 0, -12);
  ctx.closePath();
  ctx.fillStyle = leaf.color;
  ctx.shadowBlur = leaf.glow ? 18 : 0;
  ctx.shadowColor = leaf.glow ? "rgba(99,212,213,0.8)" : "transparent";
  ctx.fill();
  ctx.shadowBlur = 0;
  if (leaf.text) {
    ctx.fillStyle = "#122229";
    ctx.font = "600 9px Manrope";
    ctx.textAlign = "center";
    wrapCanvasText(ctx, leaf.text, 0, 2, 68, 10);
  }
  ctx.restore();
}

function startLeavesTimer() {
  stopGameTimer("streamTimer");
  uiState.gameRuntime.push(stopAudioLoops);
  const timer = window.setInterval(() => {
    uiState.gameState.remaining -= 1;
    if (uiState.gameState.remaining <= 0) {
      clearInterval(timer);
      uiState.gameState.running = false;
      uiState.gameState.summary = true;
      stopAudioLoops();
      renderGame();
      return;
    }
    const label = refs.gameModalBody.querySelector(".game-panel strong");
    if (label) {
      renderGame();
    }
  }, 1000);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function startBodyScanProgress() {
  stopGameTimer("bodyScanTimer");
  uiState.gameState.zoneIndex = 0;
  uiState.gameState.visited = [];
  renderGame();
  const timer = window.setInterval(() => {
    uiState.gameState.visited.push(BODY_ZONES[uiState.gameState.zoneIndex].id);
    uiState.gameState.zoneIndex += 1;
    if (uiState.gameState.zoneIndex >= BODY_ZONES.length) {
      clearInterval(timer);
      uiState.gameState.zoneIndex = BODY_ZONES.length - 1;
      uiState.gameState.summary = true;
    }
    renderGame();
  }, 3200);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function renderBodySvg(game) {
  return `
    <svg class="zone-svg" viewBox="0 0 240 520">
      <circle class="body-zone ${zoneClass(game, "testa")}" data-zone="testa" cx="120" cy="46" r="32"></circle>
      <rect class="body-zone ${zoneClass(game, "collo")}" data-zone="collo" x="100" y="80" width="40" height="34" rx="16"></rect>
      <rect class="body-zone ${zoneClass(game, "spalle")}" data-zone="spalle" x="56" y="112" width="128" height="34" rx="18"></rect>
      <rect class="body-zone ${zoneClass(game, "petto")}" data-zone="petto" x="78" y="148" width="84" height="70" rx="22"></rect>
      <rect class="body-zone ${zoneClass(game, "addome")}" data-zone="addome" x="88" y="220" width="64" height="70" rx="18"></rect>
      <rect class="body-zone ${zoneClass(game, "braccia")}" data-zone="braccia" x="34" y="150" width="36" height="128" rx="18"></rect>
      <rect class="body-zone ${zoneClass(game, "braccia")}" data-zone="braccia" x="170" y="150" width="36" height="128" rx="18"></rect>
      <rect class="body-zone ${zoneClass(game, "mani")}" data-zone="mani" x="28" y="280" width="48" height="48" rx="22"></rect>
      <rect class="body-zone ${zoneClass(game, "mani")}" data-zone="mani" x="164" y="280" width="48" height="48" rx="22"></rect>
      <rect class="body-zone ${zoneClass(game, "bacino")}" data-zone="bacino" x="82" y="294" width="76" height="56" rx="20"></rect>
      <rect class="body-zone ${zoneClass(game, "gambe")}" data-zone="gambe" x="82" y="354" width="30" height="120" rx="16"></rect>
      <rect class="body-zone ${zoneClass(game, "gambe")}" data-zone="gambe" x="128" y="354" width="30" height="120" rx="16"></rect>
      <rect class="body-zone ${zoneClass(game, "piedi")}" data-zone="piedi" x="72" y="472" width="46" height="24" rx="12"></rect>
      <rect class="body-zone ${zoneClass(game, "piedi")}" data-zone="piedi" x="122" y="472" width="46" height="24" rx="12"></rect>
    </svg>
  `;
}

function renderCloudMode(game) {
  return `
    <canvas id="cloud-canvas"></canvas>
    <div class="game-ui-layer" style="place-items:center;">
      <div class="game-panel">
        <p style="font-size:1.4rem;">${escapeHtml(game.thought || "Il pensiero apparirà qui.")}</p>
        <p>${game.acted ? "La nuvola si sta dissolvendo nello spazio." : "Osserva il pensiero senza fonderti con lui."}</p>
      </div>
    </div>
  `;
}

function renderSongMode(game) {
  const words = (game.thought || "Scrivi un pensiero e scegli la modalità canzone").split(" ");
  return `
    <div class="game-ui-layer" style="align-content:center; justify-items:center;">
      <div class="game-panel">
        <div class="pill-row">
          ${words.map((word, index) => `<span style="display:inline-block; margin:6px; font-size:1.8rem; font-weight:800; color:${["#ffd98b", "#f1c9e6", "#c7e8f3", "#d7f0c4"][index % 4]}; ${game.acted ? `transform:translateY(${Math.sin(index * 1.6 + Date.now() / 220) * 8}px); transition:transform 120ms linear;` : ""}">${escapeHtml(word)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderTickerMode(game) {
  const neutral = ["Ho bevuto acqua", "Ho risposto a un messaggio", "Il cielo era più chiaro", "Il telefono ha vibrato", "Ho sentito una porta chiudersi", "La giornata è andata avanti", "Ho guardato l'orologio", "C'era rumore in strada", "Mi sono seduto", "Ho fatto un respiro"];
  const items = [...neutral.slice(0, 5), game.thought || "Il tuo pensiero apparirà qui", ...neutral.slice(5)];
  return `
    <div class="game-ui-layer" style="align-content:end;">
      <div class="ticker-bar">
        <div class="ticker-track">
          ${items.concat(items).map((item) => `<span class="${item === game.thought ? "active" : ""}">${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function startCloudAnimation() {
  const canvas = document.getElementById("cloud-canvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  let scale = 1;
  let opacity = 1;
  const draw = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + Math.sin(time / 900) * 12;
    if (uiState.gameState.acted) {
      scale += 0.012;
      opacity = Math.max(0, opacity - 0.012);
    }
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "rgba(160,176,188,0.8)";
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.arc((i - 3) * 22, Math.sin(i) * 8, 34 + (i % 2) * 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    if (opacity > 0.02) {
      const id = requestAnimationFrame(draw);
      uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
    }
  };
  draw(0);
}

function startEmotionWheel() {
  const canvas = document.getElementById("emotion-wheel");
  if (!canvas) {
    return;
  }
  const emotions = [
    ["rabbia", "#ff7777"], ["paura", "#a98cff"], ["tristezza", "#79a8ff"], ["vergogna", "#f7a8d1"],
    ["colpa", "#f4b36b"], ["disgusto", "#82d38a"], ["invidia", "#f6dd69"], ["amore", "#ff78ce"]
  ];
  fitCanvas(canvas);
  const ctx = canvas.getContext("2d");
  const radius = Math.min(canvas.width, canvas.height) * 0.36;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emotions.forEach(([emotion, color], index) => {
      const start = -Math.PI / 2 + index * ((Math.PI * 2) / emotions.length);
      const end = start + ((Math.PI * 2) / emotions.length);
      const active = uiState.gameState.emotion === emotion;
      const grow = active ? 16 : 0;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius + grow, start, end);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      const angle = (start + end) / 2;
      ctx.fillStyle = "#102028";
      ctx.font = "700 14px Manrope";
      ctx.textAlign = "center";
      ctx.fillText(capitalize(emotion), cx + Math.cos(angle) * (radius * 0.62), cy + Math.sin(angle) * (radius * 0.62));
    });
  }
  draw();
  canvas.onclick = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - cx;
    const y = event.clientY - rect.top - cy;
    const angle = Math.atan2(y, x);
    let normalized = angle + Math.PI / 2;
    if (normalized < 0) normalized += Math.PI * 2;
    const index = Math.floor(normalized / ((Math.PI * 2) / emotions.length));
    uiState.gameState.emotion = emotions[index][0];
    if (!uiState.gameState.impulse) {
      uiState.gameState.impulse = getDefaultImpulse(uiState.gameState.emotion);
    }
    playClickTone();
    renderGame();
  };
}

function renderThermometer(value) {
  const height = 180;
  const fill = ((value / 100) * 140);
  return `
    <svg class="thermometer-svg" viewBox="0 0 100 220">
      <rect x="38" y="20" width="24" height="150" rx="12" fill="rgba(22,59,147,0.06)" stroke="rgba(22,59,147,0.12)"></rect>
      <circle cx="50" cy="182" r="22" fill="rgba(22,59,147,0.06)" stroke="rgba(22,59,147,0.12)"></circle>
      <rect x="42" y="${30 + (140 - fill)}" width="16" height="${fill}" rx="8" fill="url(#grad)"></rect>
      <circle cx="50" cy="182" r="16" fill="url(#grad)"></circle>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff8e8e"></stop>
          <stop offset="100%" stop-color="#8ed2a5"></stop>
        </linearGradient>
      </defs>
      <text x="50" y="214" text-anchor="middle" fill="#163b93">${value}</text>
    </svg>
  `;
}

function startTippSequence() {
  const game = uiState.gameState;
  stopGameTimer("tippTimer");
  game.running = true;
  if (game.mode === "intenso") {
    const timer = window.setInterval(() => {
      game.count += 1;
      game.energy = Math.min(100, game.energy + 4);
      playTone("square", 88 + (game.count % 4) * 10, 0.03, 0.018);
      if (game.count >= 48) {
        clearInterval(timer);
        game.running = false;
        game.ended = true;
      }
      renderGame();
    }, 500);
    uiState.gameRuntime.push(() => clearInterval(timer));
    return;
  }
  if (game.mode === "respiro") {
    const timer = window.setInterval(() => {
      game.remaining -= 1;
      const cycle = 14;
      const mod = ((24 - game.remaining) % cycle);
      game.phase = mod < 4 ? "Inspira" : mod < 8 ? "Trattieni" : "Espira";
      if (game.remaining <= 0) {
        clearInterval(timer);
        game.running = false;
        game.ended = true;
      }
      renderGame();
    }, 1000);
    uiState.gameRuntime.push(() => clearInterval(timer));
    return;
  }
  if (game.mode === "rilassamento") {
    game.phase = "contrai";
    game.stageIndex = 0;
    game.remaining = 5;
    const timer = window.setInterval(() => {
      game.remaining -= 1;
      if (game.remaining <= 0) {
        if (game.phase === "contrai") {
          game.phase = "rilascia";
          game.remaining = 5;
        } else {
          game.stageIndex += 1;
          if (game.stageIndex >= 6) {
            clearInterval(timer);
            game.running = false;
            game.ended = true;
          } else {
            game.phase = "contrai";
            game.remaining = 5;
          }
        }
      }
      renderGame();
    }, 1000);
    uiState.gameRuntime.push(() => clearInterval(timer));
    return;
  }
  const timer = window.setInterval(() => {
    game.remaining -= 1;
    if (game.remaining <= 0) {
      clearInterval(timer);
      game.running = false;
      game.ended = true;
    }
    renderGame();
  }, 1000);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function startTippBreathCanvas() {
  const canvas = document.getElementById("tipp-breath-canvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  const draw = (time) => {
    const t = (time / 1000) % 14;
    const size = t < 4 ? lerp(50, 140, t / 4) : t < 8 ? 140 : lerp(140, 70, (t - 8) / 6);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "rgba(99,212,213,0.2)";
    ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#163b93";
    ctx.font = "700 28px Sora";
    ctx.textAlign = "center";
    ctx.fillText(t < 4 ? "Inspira" : t < 8 ? "Trattieni" : "Espira", canvas.width / 2, canvas.height / 2 + 10);
    const id = requestAnimationFrame(draw);
    uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
  };
  draw(0);
}

function renderMiniPmrSvg(index) {
  return `
    <svg class="zone-svg" viewBox="0 0 240 320">
      ${Array.from({ length: 6 }).map((_, itemIndex) => `
        <rect x="${30 + itemIndex * 30}" y="${80 + Math.abs(3 - itemIndex) * 10}" width="22" height="${120 - Math.abs(3 - itemIndex) * 12}" rx="10" fill="${itemIndex === index ? "#63d4d5" : "rgba(255,255,255,0.15)"}"></rect>
      `).join("")}
    </svg>
  `;
}

function startBreathingStudioCanvas() {
  const canvas = document.getElementById("breathing-studio-canvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  const draw = (time) => {
    const t = time / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const phase = getBreathingTechniquePhase(uiState.gameState.technique, t);
    const size = phase.size;
    ctx.beginPath();
    ctx.fillStyle = "rgba(99,212,213,0.18)";
    ctx.arc(cx, cy, size + 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = phase.color;
    ctx.arc(cx, cy, size, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 8; i += 1) {
      const angle = t * phase.orbitSpeed + (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.fillStyle = "rgba(22,59,147,0.48)";
      ctx.arc(cx + Math.cos(angle) * (size + 34), cy + Math.sin(angle) * (size + 34), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    if (uiState.gameState.technique === "box") {
      ctx.strokeStyle = "rgba(22,59,147,0.34)";
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 110, cy - 110, 220, 220);
    }
    if (uiState.gameState.technique === "478") {
      drawStar(ctx, cx, cy, 92, 42, 8, t * 0.5);
    }
    if (uiState.gameState.technique === "coerenza") {
      drawHeart(ctx, cx, cy - 18, 54 + Math.sin(t * 1.2) * 6, "rgba(22,59,147,0.16)");
    }
    if (uiState.gameState.technique === "diaframmatica") {
      drawTorso(ctx, cx, cy, 1 + Math.sin(t * 0.8) * 0.08);
    }
    ctx.fillStyle = "#163b93";
    ctx.font = "700 28px Sora";
    ctx.textAlign = "center";
    ctx.fillText(phase.label, cx, cy + 10);
    const id = requestAnimationFrame(draw);
    uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
  };
  draw(0);
}

function startBreathingStudio() {
  stopGameTimer("breathingStudioTimer");
  uiState.gameState.running = true;
  const phases = getBreathingPattern(uiState.gameState.technique);
  uiState.gameState.phaseIndex = 0;
  uiState.gameState.phaseRemaining = phases[0].seconds;
  const timer = window.setInterval(() => {
    uiState.gameState.remaining -= 1;
    uiState.gameState.phaseRemaining -= 1;
    if (uiState.gameState.phaseRemaining <= 0) {
      uiState.gameState.phaseIndex = (uiState.gameState.phaseIndex + 1) % phases.length;
      uiState.gameState.phaseRemaining = phases[uiState.gameState.phaseIndex].seconds;
      if (uiState.gameState.phaseIndex === 0) {
        uiState.gameState.cycles += 1;
        if (uiState.gameState.technique === "coerenza") {
          playTone("sine", 120, 0.1, 0.04);
        }
      }
    }
    if (uiState.gameState.remaining <= 0) {
      clearInterval(timer);
      uiState.gameState.running = false;
      uiState.gameState.ended = true;
    }
    renderGame();
  }, 1000);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function startExposureTimer() {
  stopGameTimer("exposureTimer");
  uiState.gameState.running = true;
  uiState.gameState.currentAnxiety = uiState.gameState.currentAnxiety || uiState.gameState.situations.find((item) => item.id === uiState.gameState.selectedId)?.intensity || 40;
  const timer = window.setInterval(() => {
    uiState.gameState.countdown -= 1;
    if ((180 - uiState.gameState.countdown) % 30 === 0) {
      uiState.gameState.graph.push({ t: 180 - uiState.gameState.countdown, v: uiState.gameState.currentAnxiety || 0 });
    }
    if (uiState.gameState.countdown <= 0) {
      clearInterval(timer);
      uiState.gameState.running = false;
      uiState.gameState.summary = true;
    }
    renderGame();
  }, 1000);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function startPmrSequence() {
  stopGameTimer("pmrTimer");
  uiState.gameState.index = 0;
  uiState.gameState.phase = "contrai";
  uiState.gameState.remaining = 6;
  const timer = window.setInterval(() => {
    uiState.gameState.remaining -= 1;
    if (uiState.gameState.remaining <= 0) {
      if (uiState.gameState.phase === "contrai") {
        uiState.gameState.phase = "pausa";
        uiState.gameState.remaining = 2;
      } else if (uiState.gameState.phase === "pausa") {
        uiState.gameState.phase = "rilascio";
        uiState.gameState.remaining = 8;
      } else {
        uiState.gameState.index += 1;
        if (uiState.gameState.index >= PMR_GROUPS.length) {
          clearInterval(timer);
          uiState.gameState.index = PMR_GROUPS.length - 1;
          uiState.gameState.summary = true;
        } else {
          uiState.gameState.phase = "contrai";
          uiState.gameState.remaining = 6;
        }
      }
    }
    renderGame();
  }, 1000);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function startGuidedSession() {
  stopGameTimer("guidedTimer");
  uiState.gameState.running = true;
  const timer = window.setInterval(() => {
    uiState.gameState.remaining -= 1;
    uiState.gameState.scriptIndex = (uiState.gameState.scriptIndex + 1) % 6;
    if (uiState.gameState.remaining <= 0) {
      clearInterval(timer);
      uiState.gameState.running = false;
      uiState.gameState.summary = true;
      stopAudioLoops();
    }
    renderGame();
  }, 5000);
  uiState.gameRuntime.push(() => clearInterval(timer));
  playAmbientLoop(uiState.gameState.scenario);
}

function startGuidedCanvas() {
  const canvas = document.getElementById("guided-canvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  fitCanvas(canvas);
  const draw = (time) => {
    drawScenario(ctx, canvas.width, canvas.height, time / 1000, uiState.gameState.scenario);
    const id = requestAnimationFrame(draw);
    uiState.gameVisualRuntime.push(() => cancelAnimationFrame(id));
  };
  draw(0);
}

function stopGameTimer(nameFragment) {
  const cleanup = [...uiState.gameRuntime];
  cleanup.forEach((fn) => {
    if (typeof fn === "function") {
      fn();
    }
  });
  uiState.gameRuntime = [];
}

function cleanupGameVisualRuntime() {
  uiState.gameVisualRuntime.forEach((cleanup) => {
    if (typeof cleanup === "function") cleanup();
  });
  uiState.gameVisualRuntime = [];
}

function cleanupGameRuntime() {
  stopGameTimer("all");
  cleanupGameVisualRuntime();
  stopAudioLoops();
}

function drawScenario(ctx, width, height, t, scenario) {
  ctx.clearRect(0, 0, width, height);
  if (scenario === "spiaggia") {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, `hsl(${200 + Math.sin(t * 0.1) * 20}, 46%, 26%)`);
    grad.addColorStop(1, "#0f1d29");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,208,120,0.8)";
    const sunX = width * 0.2 + Math.sin(t * 0.08) * width * 0.28;
    const sunY = height * 0.22 - Math.cos(t * 0.08) * 44;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
    ctx.fill();
    for (let layer = 0; layer < 3; layer += 1) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.56 + layer * 0.07));
      for (let x = 0; x <= width; x += 10) {
        ctx.lineTo(x, height * (0.56 + layer * 0.07) + Math.sin(x / 60 + t * (1 + layer * 0.4)) * (10 + layer * 3));
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = ["rgba(74,176,188,0.46)", "rgba(44,132,155,0.52)", "rgba(16,88,108,0.7)"][layer];
      ctx.fill();
    }
  } else if (scenario === "foresta") {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#15222f");
    grad.addColorStop(1, "#081116");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,240,160,0.12)";
    ctx.fillRect(width * (0.45 + Math.sin(t * 0.3) * 0.08), 0, 90, height);
    for (let layer = 0; layer < 3; layer += 1) {
      ctx.fillStyle = ["#152f23", "#10301f", "#0b2416"][layer];
      for (let i = 0; i < 10; i += 1) {
        const x = (i * width) / 9 - (t * (10 + layer * 8)) % 80;
        ctx.fillRect(x, height * (0.3 + layer * 0.1), 22, height);
        ctx.beginPath();
        ctx.moveTo(x - 40, height * (0.35 + layer * 0.1));
        ctx.lineTo(x + 11, height * (0.05 + layer * 0.08));
        ctx.lineTo(x + 62, height * (0.35 + layer * 0.1));
        ctx.closePath();
        ctx.fill();
      }
    }
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#0a1020");
    grad.addColorStop(1, "#061116");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 80; i += 1) {
      const x = (i * 83) % width;
      const y = (i * 49) % (height * 0.6);
      const alpha = 0.2 + Math.sin(t + i) * 0.2;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = "rgba(240,247,255,0.84)";
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.18, 32, 0, Math.PI * 2);
    ctx.fill();
    for (let layer = 0; layer < 3; layer += 1) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.78 - layer * 0.09));
      for (let i = 0; i < 5; i += 1) {
        ctx.lineTo((i + 0.5) * width / 4, height * (0.48 + layer * 0.06) + Math.sin(i + layer) * 22);
        ctx.lineTo((i + 1) * width / 4, height * (0.78 - layer * 0.09));
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = ["#162238", "#101a2b", "#0b1421"][layer];
      ctx.fill();
    }
  }
}

function renderLadderSvg(items) {
  const width = 220;
  const height = 360;
  return `
    <svg viewBox="0 0 ${width} ${height}" width="220" height="360" aria-label="Scala dell'esposizione">
      <line x1="60" y1="20" x2="60" y2="340" stroke="rgba(22,59,147,0.20)" stroke-width="6"></line>
      <line x1="160" y1="20" x2="160" y2="340" stroke="rgba(22,59,147,0.20)" stroke-width="6"></line>
      ${items.map((item, index) => {
        const y = 320 - index * 44;
        return `<line x1="60" y1="${y}" x2="160" y2="${y}" stroke="${ladderColor(item.intensity)}" stroke-width="8"></line>`;
      }).join("")}
    </svg>
  `;
}

function renderExposureChart(points) {
  if (!points.length) {
    return `<div class="empty-state">Registra i livelli di ansia per vedere la curva in tempo reale.</div>`;
  }
  const width = 360;
  const height = 180;
  const padding = 20;
  const x = (value) => padding + (value / 180) * (width - padding * 2);
  const y = (value) => height - padding - (value / 100) * (height - padding * 2);
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${x(point.t)} ${y(point.v)}`).join(" ");
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Curva dell'ansia">
      <line class="chart-grid-line" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"></line>
      <line class="chart-grid-line" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}"></line>
      <path class="chart-line" d="${path}"></path>
      ${points.map((point) => `<circle class="chart-dot" cx="${x(point.t)}" cy="${y(point.v)}" r="4"></circle>`).join("")}
    </svg>
  `;
}

function renderCountdownCircle(value, total) {
  const circumference = 282.6;
  const progress = Math.max(0, circumference - ((value / total) * circumference));
  return `
    <svg class="circular-timer" viewBox="0 0 100 100">
      <circle class="circular-bg" cx="50" cy="50" r="45"></circle>
      <circle class="circular-fill" cx="50" cy="50" r="45" stroke-dasharray="${circumference}" stroke-dashoffset="${progress}"></circle>
      <text x="50" y="56" text-anchor="middle" fill="#163b93" font-size="18">${value}</text>
    </svg>
  `;
}

function renderPmrBodySvg(game) {
  const colorFor = (group) => {
    const index = PMR_GROUPS.indexOf(group);
    if (game.summary || index < game.index) return "rgba(142,210,165,0.84)";
    if (index === game.index && game.phase === "contrai") return "rgba(255,120,120,0.86)";
    if (index === game.index && game.phase === "pausa") return "rgba(244,179,107,0.86)";
    if (index === game.index && game.phase === "rilascio") return "rgba(142,210,165,0.9)";
    return "rgba(22,59,147,0.10)";
  };
  return `
    <svg class="zone-svg" viewBox="0 0 240 520">
      <circle cx="120" cy="46" r="32" fill="${colorFor("viso")}"></circle>
      <rect x="100" y="80" width="40" height="34" rx="16" fill="${colorFor("collo")}"></rect>
      <rect x="56" y="112" width="128" height="34" rx="18" fill="${colorFor("spalle")}"></rect>
      <rect x="78" y="148" width="84" height="70" rx="22" fill="${colorFor("petto")}"></rect>
      <rect x="88" y="220" width="64" height="70" rx="18" fill="${colorFor("addome")}"></rect>
      <rect x="34" y="150" width="36" height="128" rx="18" fill="${colorFor("braccia")}"></rect>
      <rect x="170" y="150" width="36" height="128" rx="18" fill="${colorFor("braccia")}"></rect>
      <rect x="28" y="280" width="48" height="48" rx="22" fill="${colorFor("mani")}"></rect>
      <rect x="164" y="280" width="48" height="48" rx="22" fill="${colorFor("mani")}"></rect>
      <rect x="82" y="294" width="76" height="56" rx="20" fill="${colorFor("glutei")}"></rect>
      <rect x="82" y="354" width="30" height="120" rx="16" fill="${colorFor("gambe")}"></rect>
      <rect x="128" y="354" width="30" height="120" rx="16" fill="${colorFor("gambe")}"></rect>
      <rect x="72" y="472" width="46" height="24" rx="12" fill="${colorFor("piedi")}"></rect>
      <rect x="122" y="472" width="46" height="24" rx="12" fill="${colorFor("piedi")}"></rect>
    </svg>
  `;
}

function getPmrInstruction(game) {
  if (game.summary) {
    return "Il corpo è passato gradualmente dalla contrazione al rilascio. Resta qualche istante ad ascoltare cosa è cambiato.";
  }
  if (game.phase === "contrai") {
    return "CONTRAI: attiva il gruppo muscolare con intenzione, senza farti male, e nota il carico che sale.";
  }
  if (game.phase === "pausa") {
    return "RILASCIA ORA... lascia che il corpo esca dalla presa e preparati a sentire la differenza.";
  }
  return "RILASCIA: resta qualche secondo nella morbidezza che arriva, senza forzare nulla.";
}

function getDailyChallenge() {
  return DAILY_CHALLENGES[new Date().getDate() % DAILY_CHALLENGES.length];
}

function getRadarValues(patient, days, offset = 0) {
  const now = new Date();
  const end = new Date(now);
  end.setDate(now.getDate() - offset);
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  const slice = patient.exerciseHistory.filter((item) => {
    const date = new Date(item.completedAt);
    return date >= start && date <= end;
  });
  const map = {
    "Respirazione": slice.filter((item) => item.category === "Respirazione").length,
    "Mindfulness": slice.filter((item) => item.category === "Mindfulness").length,
    "CBT": slice.filter((item) => item.category === "CBT").length,
    "Regolazione": slice.filter((item) => item.category === "Regolazione").length,
    "Esposizione": slice.filter((item) => item.category === "Esposizione").length,
    "PMR": slice.filter((item) => item.category === "PMR").length,
    "Homework": slice.filter((item) => item.source === "homework").length,
    "Streak": patient.stats.streak
  };
  return Object.values(map).map((value) => Math.min(10, value));
}

function buildHeatmapCounts(history) {
  const days = [];
  const byDate = new Map();
  history.forEach((item) => {
    const key = item.completedAt.slice(0, 10);
    byDate.set(key, (byDate.get(key) || 0) + 1);
  });
  for (let i = 363; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = formatDateInput(date);
    days.push({ date: key, value: byDate.get(key) || 0 });
  }
  return days;
}

function startGameTimer(name, callback, interval = 1000) {
  stopGameTimer(name);
  const timer = window.setInterval(callback, interval);
  uiState.gameRuntime.push(() => clearInterval(timer));
}

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(300, Math.floor(rect.width));
  canvas.height = Math.max(240, Math.floor(rect.height));
}

function resizeCelebrationCanvas() {
  refs.celebrationCanvas.width = window.innerWidth;
  refs.celebrationCanvas.height = window.innerHeight;
}

function triggerConfetti() {
  const ctx = refs.celebrationCanvas.getContext("2d");
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * refs.celebrationCanvas.width,
    y: -20 - Math.random() * 200,
    vx: (Math.random() - 0.5) * 6,
    vy: 2 + Math.random() * 5,
    size: 4 + Math.random() * 8,
    color: ["#63d4d5", "#ffd98b", "#f1c9e6", "#8ed2a5", "#cbb7ff"][Math.floor(Math.random() * 5)],
    rot: Math.random() * Math.PI * 2
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, refs.celebrationCanvas.width, refs.celebrationCanvas.height);
    particles.forEach((item) => {
      item.x += item.vx;
      item.y += item.vy;
      item.rot += 0.08;
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rot);
      ctx.fillStyle = item.color;
      ctx.fillRect(-item.size / 2, -item.size / 2, item.size, item.size * 0.66);
      ctx.restore();
    });
    frame += 1;
    if (frame < 90) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, refs.celebrationCanvas.width, refs.celebrationCanvas.height);
    }
  }
  draw();
}

function animateXpReward(xp, sourceRect) {
  const float = document.createElement("div");
  float.className = "xp-float";
  float.textContent = `+${xp} XP`;
  const startX = sourceRect ? sourceRect.left + sourceRect.width / 2 : window.innerWidth / 2;
  const startY = sourceRect ? sourceRect.top : window.innerHeight * 0.5;
  float.style.left = `${startX}px`;
  float.style.top = `${startY}px`;
  refs.xpFloatLayer.appendChild(float);
  setTimeout(() => float.remove(), 1400);
}

function showLevelUp(level) {
  const banner = document.createElement("div");
  banner.className = "levelup-banner";
  banner.textContent = `LEVEL UP! · Livello ${level}`;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 1600);
}

function createWaveBlast(element) {
  if (!element) {
    return;
  }
  const blast = document.createElement("span");
  blast.className = "wave-blast";
  element.appendChild(blast);
  setTimeout(() => blast.remove(), 820);
}

function playTone(type, frequency, duration, volume) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  oscillator.stop(ctx.currentTime + duration);
}

function playMelody(notes, duration) {
  notes.forEach((note, index) => {
    setTimeout(() => playTone("triangle", note, duration, 0.035), index * duration * 1000);
  });
}

function playClickTone() {
  playTone("triangle", 620, 0.09, 0.03);
}

function playBellTone() {
  playTone("sine", 440, 0.12, 0.05);
  setTimeout(() => playTone("sine", 660, 0.18, 0.035), 80);
}

function playVictoryMelody() {
  playMelody([392, 494, 587, 784], 0.16);
}

function playWaterLoop() {
  stopAudioLoops();
  const interval = window.setInterval(() => {
    playTone("triangle", 180 + Math.random() * 30, 0.16, 0.01);
  }, 320);
  uiState.audioNodes.push(interval);
}

function playAmbientLoop(scenario) {
  stopAudioLoops();
  const config = {
    spiaggia: { note: 220, spread: 30, speed: 1200 },
    foresta: { note: 180, spread: 26, speed: 1500 },
    montagna: { note: 260, spread: 36, speed: 1800 }
  }[scenario];
  const interval = window.setInterval(() => {
    playTone("sine", config.note + Math.random() * config.spread, 0.34, 0.01);
  }, config.speed);
  uiState.audioNodes.push(interval);
}

function stopAudioLoops() {
  uiState.audioNodes.forEach((node) => clearInterval(node));
  uiState.audioNodes = [];
}

function getAudioContext() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    return null;
  }
  if (!uiState.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    uiState.audioContext = new AudioCtx();
  }
  if (uiState.audioContext.state === "suspended") {
    uiState.audioContext.resume();
  }
  return uiState.audioContext;
}

function renderMoodChart() {
  const dates = [];
  for (let i = 13; i >= 0; i -= 1) {
    dates.push(dateOffset(-i));
  }
  const stats = dates.map((date) => {
    const matches = getSelectedPatient()?.entries.filter((item) => item.date === date) || [];
    return {
      date,
      mood: matches.length ? Number((matches.reduce((sum, item) => sum + item.mood, 0) / matches.length).toFixed(1)) : null
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
  if (!points.length) {
    refs.moodChart.innerHTML = `<div class="empty-state">Il grafico si popolerà automaticamente quando saranno disponibili compilazioni recenti.</div>`;
    return;
  }
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${path} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;
  refs.moodChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafico dell'umore degli ultimi 14 giorni">
      ${[1, 3, 5, 7, 10].map((tick) => `
        <line class="chart-grid-line" x1="${padding.left}" y1="${y(tick)}" x2="${width - padding.right}" y2="${y(tick)}"></line>
        <text class="chart-label" x="8" y="${y(tick) + 4}">${tick}</text>
      `).join("")}
      <path class="chart-area" d="${area}"></path>
      <path class="chart-line" d="${path}"></path>
      ${points.map((point) => `
        <circle class="chart-dot" cx="${point.x}" cy="${point.y}" r="5.5"></circle>
        <text class="chart-point" x="${point.x}" y="${point.y - 12}" text-anchor="middle">${point.mood}</text>
      `).join("")}
      ${stats.map((item, index) => `<text class="chart-label" x="${x(index)}" y="${height - 16}" text-anchor="middle">${shortDayMonth(item.date)}</text>`).join("")}
    </svg>
  `;
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y + size * 1.4);
  ctx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y);
  ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
  ctx.fill();
  ctx.restore();
}

function drawStar(ctx, x, y, outerRadius, innerRadius, points, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI / points) * i;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(22,59,147,0.05)";
  ctx.fill();
  ctx.restore();
}

function drawTorso(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgba(22,59,147,0.14)";
  ctx.beginPath();
  ctx.moveTo(-60, -100);
  ctx.quadraticCurveTo(-90, -20, -60, 100);
  ctx.lineTo(60, 100);
  ctx.quadraticCurveTo(90, -20, 60, -100);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(99,212,213,0.24)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 44, 68, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getBreathingTechniquePhase(technique, time) {
  const patterns = {
    box: [
      { label: "Inspira", seconds: 4, color: "rgba(99,212,213,0.7)", sizeFrom: 54, sizeTo: 110, orbitSpeed: 1.4 },
      { label: "Trattieni", seconds: 4, color: "rgba(255,217,139,0.72)", sizeFrom: 110, sizeTo: 110, orbitSpeed: 0.8 },
      { label: "Espira", seconds: 4, color: "rgba(139,200,248,0.74)", sizeFrom: 110, sizeTo: 62, orbitSpeed: 1.8 },
      { label: "Pausa", seconds: 4, color: "rgba(22,59,147,0.16)", sizeFrom: 62, sizeTo: 62, orbitSpeed: 0.6 }
    ],
    478: [
      { label: "Inspira", seconds: 4, color: "rgba(99,212,213,0.7)", sizeFrom: 54, sizeTo: 120, orbitSpeed: 1.1 },
      { label: "Trattieni", seconds: 7, color: "rgba(255,217,139,0.72)", sizeFrom: 120, sizeTo: 120, orbitSpeed: 0.6 },
      { label: "Espira", seconds: 8, color: "rgba(139,200,248,0.74)", sizeFrom: 120, sizeTo: 56, orbitSpeed: 1.6 }
    ],
    coerenza: [
      { label: "Inspira", seconds: 5, color: "rgba(99,212,213,0.7)", sizeFrom: 58, sizeTo: 118, orbitSpeed: 1.2 },
      { label: "Espira", seconds: 5, color: "rgba(139,200,248,0.74)", sizeFrom: 118, sizeTo: 58, orbitSpeed: 1.4 }
    ],
    diaframmatica: [
      { label: "Inspira", seconds: 4, color: "rgba(99,212,213,0.7)", sizeFrom: 54, sizeTo: 120, orbitSpeed: 1.2 },
      { label: "Trattieni", seconds: 2, color: "rgba(255,217,139,0.72)", sizeFrom: 120, sizeTo: 120, orbitSpeed: 0.8 },
      { label: "Espira", seconds: 6, color: "rgba(139,200,248,0.74)", sizeFrom: 120, sizeTo: 60, orbitSpeed: 1.7 }
    ]
  };
  const phases = patterns[technique] || patterns.box;
  const total = phases.reduce((sum, item) => sum + item.seconds, 0);
  let value = time % total;
  for (const phase of phases) {
    if (value <= phase.seconds) {
      const progress = value / phase.seconds;
      return {
        label: phase.label,
        color: phase.color,
        orbitSpeed: phase.orbitSpeed,
        size: lerp(phase.sizeFrom, phase.sizeTo, progress)
      };
    }
    value -= phase.seconds;
  }
  return { label: "Inspira", color: "rgba(99,212,213,0.7)", orbitSpeed: 1.2, size: 80 };
}

function getBreathingPattern(technique) {
  if (technique === "478") {
    return [
      { label: "Inspira", seconds: 4 },
      { label: "Trattieni", seconds: 7 },
      { label: "Espira", seconds: 8 }
    ];
  }
  if (technique === "coerenza") {
    return [
      { label: "Inspira", seconds: 5 },
      { label: "Espira", seconds: 5 }
    ];
  }
  if (technique === "diaframmatica") {
    return [
      { label: "Inspira", seconds: 4 },
      { label: "Trattieni", seconds: 2 },
      { label: "Espira", seconds: 6 }
    ];
  }
  return [
    { label: "Inspira", seconds: 4 },
    { label: "Trattieni", seconds: 4 },
    { label: "Espira", seconds: 4 },
    { label: "Pausa", seconds: 4 }
  ];
}

function zoneClass(game, zoneId) {
  const classes = [];
  if (BODY_ZONES[game.zoneIndex]?.id === zoneId && !game.summary) classes.push("active");
  if (game.visited.includes(zoneId)) classes.push("visited");
  if (game.tensionZones.includes(zoneId)) classes.push("tension");
  if (game.summary && !game.tensionZones.includes(zoneId)) classes.push("relaxed");
  return classes.join(" ");
}

function timelineColor(category) {
  return {
    "CBT": "#ff8e8e",
    "Mindfulness": "#63d4d5",
    "Respirazione": "#8bc8f8",
    "Regolazione": "#ffd98b",
    "Esposizione": "#f4b36b",
    "PMR": "#8ed2a5"
  }[category] || "#cbb7ff";
}

function heatColor(value) {
  if (value === 0) return "rgba(22,59,147,0.08)";
  if (value === 1) return "rgba(99,212,213,0.26)";
  if (value === 2) return "rgba(99,212,213,0.44)";
  if (value === 3) return "rgba(99,212,213,0.66)";
  return "rgba(99,212,213,0.92)";
}

function ladderColor(value) {
  if (value < 30) return "#8ed2a5";
  if (value < 60) return "#ffd98b";
  if (value < 80) return "#f4b36b";
  return "#ff8e8e";
}

function getDefaultImpulse(emotion) {
  return {
    rabbia: "Urlare, attaccare, isolarsi",
    paura: "Scappare, evitare, chiudermi",
    tristezza: "Ritirarmi, spegnermi, fermarmi",
    vergogna: "Nascondermi, sparire, non farmi vedere",
    colpa: "Punirmi, rimuginare, chiedere scusa in eccesso",
    disgusto: "Allontanarmi subito, chiudermi",
    invidia: "Confrontarmi, criticarmi, svalutarmi",
    amore: "Avvicinarmi troppo o perdere i confini"
  }[emotion] || "";
}

function labelForTipp(mode) {
  return {
    temperatura: "Temperatura",
    intenso: "Esercizio intenso",
    respiro: "Paced breathing",
    rilassamento: "Progressive relaxation"
  }[mode] || mode;
}

function labelForBreathingTechnique(id) {
  return {
    box: "Box Breathing 4-4-4-4",
    478: "Respirazione 4-7-8",
    coerenza: "Coerenza Cardiaca 5-5",
    diaframmatica: "Respirazione Diaframmatica"
  }[id] || id;
}

function getScenarioText(scenario) {
  return {
    spiaggia: "Onde morbide, luce che cambia lentamente e respiro più disteso.",
    foresta: "Alberi in profondità, foglie in caduta e luce che filtra.",
    montagna: "Silenzio notturno, stelle sottili e aria fresca che rallenta."
  }[scenario];
}

function getGuidedScript(scenario, index) {
  const scripts = {
    spiaggia: [
      "Immagina la luce che si posa sulla spiaggia mentre il mare trova il suo ritmo.",
      "Senti le onde arrivare e ritirarsi, come un respiro che non deve dimostrare nulla.",
      "Lascia che i suoni del paesaggio ti ricordino che puoi appoggiarti al presente.",
      "Ogni espirazione rende il corpo un poco più pesante e sostenuto.",
      "Resta ancora qui, con il tempo largo e il corpo accolto.",
      "Quando sarà il momento, potrai tornare lentamente con ciò che ti ha fatto bene."
    ],
    foresta: [
      "Immagina una foresta calma, con aria fresca e spazio tra gli alberi.",
      "Le foglie si muovono appena e la luce cambia con delicatezza.",
      "Ogni passo interno può essere lento, prudente e sufficiente.",
      "Lascia che il corpo ascolti il sostegno del terreno sotto di sé.",
      "Anche nel silenzio possono esserci presenza, appoggio e orientamento.",
      "Quando vorrai, potrai riportare con te questa qualità di calma."
    ],
    montagna: [
      "Immagina un paesaggio di montagna sotto un cielo profondo e quieto.",
      "L'aria è nitida e il ritmo della scena è ampio, stabile, essenziale.",
      "Le stelle restano lì senza fretta, come punti fermi nel buio.",
      "Lascia che il respiro diventi più ordinato e il corpo più saldo.",
      "C'è spazio per rallentare e rimanere con ciò che senti, un poco alla volta.",
      "Quando ti sentirai pronto, potrai tornare conservando questa ampiezza."
    ]
  };
  return scripts[scenario][index % scripts[scenario].length];
}

function findGame(id) {
  return GAME_LIBRARY.find((item) => item.id === id);
}

function sectionLabel(id) {
  return {
    patientHome: "Home",
    patientSheet: "Scheda giornaliera",
    patientTips: "Tips",
    patientGames: "Mini-giochi",
    patientHomework: "Homework",
    patientTasks: "Attività",
    patientAchievements: "Achievement",
    patientHistory: "Storico",
    therapistDashboard: "Dashboard psicologo",
    therapistPatients: "Pazienti",
    therapistHomework: "Assegnazione homework",
    therapistProgress: "Timeline progressi",
    therapistRecords: "Schede compilate",
    therapistTips: "Gestione tips",
    therapistSession: "Impostazione seduta",
    therapistQuestions: "Schede personalizzate"
  }[id] || "MindLog";
}

function getTipActionLabel(type) {
  if (type === "Audio") return "Ascolta";
  if (type === "Video") return "Guarda";
  if (type === "Testo") return "Leggi";
  return "Apri";
}

function labelForQuestionType(type) {
  return {
    testo: "Testo",
    textarea: "Area di testo",
    "scelta-singola": "Scelta singola",
    "scelta-multipla": "Scelta multipla",
    scala: "Scala 1-10"
  }[type] || type;
}

function getMotivationFromEntry(entry) {
  if (entry.mood <= 4) return "Hai già fatto qualcosa di importante: fermarti e osservarti con sincerità. Anche oggi possiamo partire da qui, con calma.";
  if (entry.mood >= 7) return "Ci sono segnali di maggiore respiro. Prenderti un momento per notarli può aiutarti a renderli più stabili.";
  return MOTIVATIONS[(entry.mood + entry.emotions.length) % MOTIVATIONS.length];
}

function getMostFrequent(items) {
  if (!items.length) return "";
  const counts = new Map();
  items.forEach((item) => counts.set(item, (counts.get(item) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function getTopItems(items, count) {
  const map = new Map();
  items.forEach((item) => {
    if (!item) return;
    map.set(item, (map.get(item) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, count).map(([item]) => item);
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let offsetY = 0;
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, y + offsetY);
      line = `${word} `;
      offsetY += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line.trim(), x, y + offsetY);
}

function daysBetween(start, end) {
  const a = new Date(`${start}T12:00:00`);
  const b = new Date(`${end}T12:00:00`);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function sameDate(dateIsoA, dateIsoB) {
  return formatDateInput(new Date(dateIsoA)) === formatDateInput(new Date(dateIsoB));
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

function getSessionDate(session) {
  if (!session?.date || !session?.time) {
    return null;
  }
  return new Date(`${session.date}T${session.time}:00`);
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateOffset(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return formatDateInput(date);
}

function makePreview(value, length) {
  const trimmed = value.trim();
  if (trimmed.length <= length) return trimmed;
  return `${trimmed.slice(0, length).trim()}…`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatClock(seconds) {
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
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
