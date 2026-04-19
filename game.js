const CHARACTERS = [
  {
    id: "thomas",
    name: "Mr Thomas",
    photoFile: "thomas.jpg",
    title: "Head of Boys' Games",
    style: "Quick-footed pressure fighter who keeps the pace high.",
    abilityName: "Touchline Charge",
    abilityText: "Bursts forward with a driving shoulder rush and bonus damage.",
    color: "#77d0ff",
    accent: "#1a7cea",
    speed: 392,
    jump: 842,
    maxHealth: 100,
    jabDamage: 5,
    hookDamage: 9,
    skin: "#d6a17f",
    hair: "#3e2a20",
    shorts: "#1d3553",
    shoes: "#111b27",
    hairStyle: "parted",
    build: 1,
    blockReduction: 0.52,
    specialCooldown: 7,
    specialType: "dash"
  },
  {
    id: "brightman",
    name: "Mr Brightman",
    photoFile: "brightman.jpg",
    title: "Director of Sport",
    style: "Power-first boxer who punishes openings with big shots.",
    abilityName: "Sports Hall Smash",
    abilityText: "Launches a heavy uppercut that stuns opponents on impact.",
    color: "#f7c35f",
    accent: "#ff7a46",
    speed: 340,
    jump: 800,
    maxHealth: 110,
    jabDamage: 6,
    hookDamage: 10,
    skin: "#aa7153",
    hair: "#181818",
    shorts: "#5d241c",
    shoes: "#19110f",
    hairStyle: "buzz",
    build: 1.08,
    blockReduction: 0.48,
    specialCooldown: 8,
    specialType: "uppercut"
  },
  {
    id: "pears",
    name: "Mr Pears",
    photoFile: "pears.jpg",
    title: "Headteacher",
    style: "Calm, balanced boxer who controls the tempo and absorbs pressure.",
    abilityName: "Assembly Order",
    abilityText: "Projects a brief shield that steadies him and restores health.",
    color: "#8fe6b7",
    accent: "#27b07f",
    speed: 352,
    jump: 805,
    maxHealth: 102,
    jabDamage: 5,
    hookDamage: 8,
    skin: "#d8b08f",
    hair: "#5a4c42",
    shorts: "#193744",
    shoes: "#101b22",
    hairStyle: "swept",
    build: 1.02,
    blockReduction: 0.66,
    specialCooldown: 9,
    specialType: "shield"
  }
];

const KEYS = {
  player1: {
    left: ["a"],
    right: ["d"],
    jump: ["w"],
    jab: ["f"],
    hook: ["g"],
    block: ["s"],
    special: ["h"]
  },
  player2: {
    left: ["arrowleft", "j"],
    right: ["arrowright", "l"],
    jump: ["arrowup", "i"],
    jab: ["n", ","],
    hook: ["m", "."],
    block: ["arrowdown", "k"],
    special: ["u", "/"]
  },
  player3: {
    left: ["c", "4"],
    right: ["b", "6"],
    jump: ["v", "8"],
    jab: ["z", "1"],
    hook: ["r", "2"],
    block: ["x", "5"],
    special: ["t", "3"]
  }
};

const PLAYER_SLOTS = {
  player1: {
    label: "Player 1",
    shortLabel: "P1",
    buttonClass: "player1",
    controls: "Move `A/D`, Jump `W`, Block `S`, Jab `F`, Hook `G`, Special `H`."
  },
  player2: {
    label: "Player 2",
    shortLabel: "P2",
    buttonClass: "player2",
    controls: "Move `J/L` or arrows, Jump `I` or `Arrow Up`, Block `K` or `Arrow Down`, Jab `N`, Hook `M`, Special `U`."
  },
  player3: {
    label: "Player 3",
    shortLabel: "P3",
    buttonClass: "player3",
    controls: "Move `C/B` or `4/6`, Jump `V` or `8`, Block `X` or `5`, Jab `Z` or `1`, Hook `R` or `2`, Special `T` or `3`."
  }
};

const MODE_SLOTS = {
  1: ["player1", "player2"],
  2: ["player1", "player2"],
  3: ["player1", "player2", "player3"]
};

const AI_DIFFICULTIES = {
  easy: {
    label: "Easy",
    moveMultiplier: 0.78,
    damageMultiplier: 0.58,
    receivedDamageMultiplier: 1.42,
    blockChance: 0.28,
    lowHealthThreshold: 0.45,
    pressureRange: 24,
    pressureWindow: 0.56,
    retreatDistance: 195,
    approachDistance: 188,
    closeRetreatChance: 0.06,
    jumpChance: 0.04,
    jumpCooldown: 1.35,
    jumpMinDistance: 124,
    closeAttackDistance: 104,
    specialRollMin: 0.97,
    hookRollMin: 0.82,
    jabRollMin: 0.46,
    rangedSpecialChance: 0.05,
    decisionBase: 0.62,
    decisionVariance: 0.32,
    stunMultiplier: 0.66
  },
  medium: {
    label: "Medium",
    moveMultiplier: 0.9,
    damageMultiplier: 0.74,
    receivedDamageMultiplier: 1.24,
    blockChance: 0.52,
    lowHealthThreshold: 0.34,
    pressureRange: 36,
    pressureWindow: 0.64,
    retreatDistance: 170,
    approachDistance: 176,
    closeRetreatChance: 0.14,
    jumpChance: 0.09,
    jumpCooldown: 1.15,
    jumpMinDistance: 112,
    closeAttackDistance: 118,
    specialRollMin: 0.9,
    hookRollMin: 0.64,
    jabRollMin: 0.24,
    rangedSpecialChance: 0.14,
    decisionBase: 0.42,
    decisionVariance: 0.26,
    stunMultiplier: 0.82
  },
  hard: {
    label: "Hard",
    moveMultiplier: 1.02,
    damageMultiplier: 0.92,
    receivedDamageMultiplier: 1.06,
    blockChance: 0.72,
    lowHealthThreshold: 0.28,
    pressureRange: 52,
    pressureWindow: 0.76,
    retreatDistance: 145,
    approachDistance: 158,
    closeRetreatChance: 0.18,
    jumpChance: 0.14,
    jumpCooldown: 0.92,
    jumpMinDistance: 96,
    closeAttackDistance: 132,
    specialRollMin: 0.78,
    hookRollMin: 0.44,
    jabRollMin: 0.12,
    rangedSpecialChance: 0.24,
    decisionBase: 0.24,
    decisionVariance: 0.18,
    stunMultiplier: 0.94
  }
};

const MATCH_RULES = {
  defaultRounds: 3,
  minRounds: 1,
  maxRounds: 5,
  roundTimeLimit: 60
};

const FIGHTER_RENDER_SCALE = 1.18;

const DEFAULT_VENUE_ORDER = [
  "sports-pitch",
  "indoor-sports-hall",
  "pre-prep-exterior",
  "front-drive",
  "manor-lawn",
  "playing-fields"
];

const STATE = {
  currentScreen: "splash",
  playerCount: null,
  aiDifficulty: null,
  selections: {
    player1: null,
    player2: null,
    player3: null
  },
  wins: {
    player1: 0,
    player2: 0,
    player3: 0
  },
  totalRounds: MATCH_RULES.defaultRounds,
  round: 1,
  roundVenues: [],
  roundTimeLimit: MATCH_RULES.roundTimeLimit,
  roundTimeElapsed: 0,
  message: "Touch gloves and get ready.",
  inMatch: false,
  resultLocked: false
};

const VENUES = [
  {
    id: "sports-pitch",
    label: "Sports Pitch",
    imagePath: "./assets/venues/sports-pitch.jpeg",
    image: loadImage("./assets/venues/sports-pitch.jpeg"),
    focusX: 0.5,
    focusY: 0.5
  },
  {
    id: "indoor-sports-hall",
    label: "Indoor Sports Hall",
    imagePath: "./assets/venues/indoor-sports-hall.jpeg",
    image: loadImage("./assets/venues/indoor-sports-hall.jpeg"),
    focusX: 0.5,
    focusY: 0.5
  },
  {
    id: "pre-prep-exterior",
    label: "Pre-Prep Exterior",
    imagePath: "./assets/venues/pre-prep-exterior.jpeg",
    image: loadImage("./assets/venues/pre-prep-exterior.jpeg"),
    focusX: 0.52,
    focusY: 0.48
  },
  {
    id: "front-drive",
    label: "Front Drive",
    imagePath: "./assets/rounds/front-drive.jpg",
    image: loadImage("./assets/rounds/front-drive.jpg"),
    focusX: 0.56,
    focusY: 0.48
  },
  {
    id: "manor-lawn",
    label: "Manor Lawn",
    imagePath: "./assets/rounds/manor-lawn.jpg",
    image: loadImage("./assets/rounds/manor-lawn.jpg"),
    focusX: 0.5,
    focusY: 0.48
  },
  {
    id: "playing-fields",
    label: "Playing Fields",
    imagePath: "./assets/rounds/playing-fields.jpg",
    image: loadImage("./assets/rounds/playing-fields.jpg"),
    focusX: 0.5,
    focusY: 0.45
  }
];

const TEACHER_PORTRAITS = Object.fromEntries(
  CHARACTERS.map((character) => [character.id, loadImage(`./assets/teachers/${character.photoFile}`)])
);

const screens = {
  splash: document.getElementById("splash-screen"),
  mode: document.getElementById("mode-screen"),
  select: document.getElementById("select-screen"),
  match: document.getElementById("match-screen")
};

const roster = document.getElementById("roster");
const selectionPlayers = document.getElementById("selection-players");
const venuePanel = document.getElementById("venue-panel");
const selectSubtitle = document.getElementById("select-subtitle");
const difficultyPanel = document.getElementById("difficulty-panel");
const difficultyButtons = [...document.querySelectorAll("#difficulty-panel .difficulty-button")];
const roundCountButtons = [...document.querySelectorAll(".round-count-button")];
const startMatchButton = document.getElementById("start-match-button");
const changeModeButton = document.getElementById("change-mode-button");
const enterButton = document.getElementById("enter-button");
const modeBackButton = document.getElementById("mode-back-button");
const messageBanner = document.getElementById("message-banner");
const venueLabel = document.getElementById("venue-label");
const roundLabel = document.getElementById("round-label");
const timerLabel = document.getElementById("timer-label");
const overlay = document.getElementById("match-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayCopy = document.getElementById("overlay-copy");
const rematchButton = document.getElementById("rematch-button");
const backButton = document.getElementById("back-button");
const soundToggleButton = document.getElementById("sound-toggle");
const hudPlayers = document.getElementById("hud-players");
const controlsStrip = document.getElementById("controls-strip");
const modeButtons = [...document.querySelectorAll(".mode-button")];

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const pressedKeys = new Set();
let fighters = [];
let hudElements = {};
let lastTimestamp = 0;
let loopActive = false;
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const AUDIO = {
  ctx: null,
  master: null,
  enabled: true,
  unlocked: false,
  currentTrack: null
};

const MUSIC_TRACKS = {
  splash: createMusicTrack("./assets/audio/title-theme.wav", 0.66),
  lobby: createMusicTrack("./assets/audio/menu-theme.wav", 0.62)
};

function updateSoundToggleUI() {
  if (!soundToggleButton) {
    return;
  }

  soundToggleButton.textContent = AUDIO.enabled ? "Sound: On" : "Sound: Off";
  soundToggleButton.setAttribute("aria-pressed", String(AUDIO.enabled));
}

function ensureAudio() {
  if (!AudioContextClass) {
    return null;
  }

  if (!AUDIO.ctx || AUDIO.ctx.state === "closed") {
    AUDIO.ctx = new AudioContextClass();
    AUDIO.master = AUDIO.ctx.createGain();
    AUDIO.master.gain.value = 0.24;
    AUDIO.master.connect(AUDIO.ctx.destination);
    AUDIO.unlocked = false;
  }

  if (AUDIO.ctx.state !== "running") {
    AUDIO.ctx.resume().catch(() => {});
  }

  return AUDIO.ctx;
}

function primeAudioOutput() {
  if (!AUDIO.ctx || !AUDIO.master || AUDIO.unlocked) {
    return;
  }

  const startAt = AUDIO.ctx.currentTime;
  const osc = AUDIO.ctx.createOscillator();
  const amp = AUDIO.ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(440, startAt);
  amp.gain.setValueAtTime(0.00001, startAt);

  osc.connect(amp);
  amp.connect(AUDIO.master);
  osc.start(startAt);
  osc.stop(startAt + 0.01);

  AUDIO.unlocked = true;
}

async function unlockAudioFromGesture() {
  const ctxInstance = ensureAudio();
  if (!ctxInstance) {
    return null;
  }

  if (ctxInstance.state !== "running") {
    try {
      await ctxInstance.resume();
    } catch {
      return ctxInstance;
    }
  }

  if (ctxInstance.state === "running") {
    primeAudioOutput();
  }

  return ctxInstance;
}

function getThemeForCurrentScreen() {
  if (STATE.currentScreen === "splash") {
    return "splash";
  }

  if (STATE.currentScreen === "mode" || STATE.currentScreen === "select") {
    return "lobby";
  }

  return null;
}

function stopTheme(resetPosition = true) {
  Object.values(MUSIC_TRACKS).forEach((track) => {
    track.pause();
    if (resetPosition) {
      track.currentTime = 0;
    }
  });
  AUDIO.currentTrack = null;
}

async function requestAudioUnlock() {
  if (!AUDIO.enabled) {
    return;
  }

  const ctxInstance = await unlockAudioFromGesture();
  if (!ctxInstance) {
    return;
  }

  if (getThemeForCurrentScreen()) {
    syncScreenAudio();
  }
}

function playTone({
  frequency,
  frequencyEnd = frequency,
  duration = 0.1,
  gain = 0.04,
  type = "square",
  attack = 0.004,
  release = 0.08,
  delay = 0,
  pan = 0
}) {
  const ctxInstance = ensureAudio();
  if (!ctxInstance || !AUDIO.enabled) {
    return;
  }

  const startAt = ctxInstance.currentTime + delay;
  const osc = ctxInstance.createOscillator();
  const amp = ctxInstance.createGain();
  const hasStereo = typeof ctxInstance.createStereoPanner === "function";
  const panner = hasStereo ? ctxInstance.createStereoPanner() : null;

  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(1, frequency), startAt);
  if (frequencyEnd !== frequency) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, frequencyEnd), startAt + duration);
  }

  amp.gain.setValueAtTime(0.0001, startAt);
  amp.gain.linearRampToValueAtTime(gain, startAt + attack);
  amp.gain.exponentialRampToValueAtTime(0.0001, startAt + Math.max(attack + 0.02, duration + release));

  if (panner) {
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), startAt);
    osc.connect(amp);
    amp.connect(panner);
    panner.connect(AUDIO.master);
  } else {
    osc.connect(amp);
    amp.connect(AUDIO.master);
  }

  osc.start(startAt);
  osc.stop(startAt + duration + release + 0.04);
}

function createMusicTrack(src, volume) {
  const track = new Audio(src);
  track.loop = true;
  track.preload = "auto";
  track.volume = volume;
  return track;
}

function playTheme(themeName) {
  const track = MUSIC_TRACKS[themeName];
  if (!track || !AUDIO.enabled) {
    return;
  }

  Object.entries(MUSIC_TRACKS).forEach(([name, otherTrack]) => {
    if (name === themeName) {
      return;
    }
    otherTrack.pause();
    otherTrack.currentTime = 0;
  });

  if (AUDIO.currentTrack !== themeName) {
    track.currentTime = 0;
  }

  AUDIO.currentTrack = themeName;
  track.play().catch(() => {});
}

function syncScreenAudio() {
  const themeName = getThemeForCurrentScreen();
  if (themeName && AUDIO.enabled) {
    playTheme(themeName);
    return;
  }

  stopTheme();
}

function playSound(name) {
  if (!AUDIO.enabled) {
    return;
  }

  switch (name) {
    case "menu-open":
      playTone({ frequency: 520, frequencyEnd: 760, duration: 0.11, gain: 0.035, type: "triangle" });
      playTone({ frequency: 860, duration: 0.06, gain: 0.02, type: "sine", delay: 0.03 });
      break;
    case "select":
      playTone({ frequency: 420, frequencyEnd: 540, duration: 0.07, gain: 0.03, type: "triangle" });
      playTone({ frequency: 680, duration: 0.06, gain: 0.02, type: "sine", delay: 0.04 });
      break;
    case "back":
      playTone({ frequency: 440, frequencyEnd: 260, duration: 0.11, gain: 0.03, type: "triangle" });
      break;
    case "bell":
      playTone({ frequency: 900, duration: 0.18, gain: 0.04, type: "sine" });
      playTone({ frequency: 1350, duration: 0.26, gain: 0.03, type: "sine", delay: 0.02 });
      playTone({ frequency: 630, duration: 0.24, gain: 0.025, type: "triangle", delay: 0.01 });
      break;
    case "jab":
      playTone({ frequency: 260, frequencyEnd: 150, duration: 0.045, gain: 0.024, type: "square" });
      break;
    case "hook":
      playTone({ frequency: 210, frequencyEnd: 110, duration: 0.08, gain: 0.04, type: "square" });
      break;
    case "special":
      playTone({ frequency: 380, frequencyEnd: 180, duration: 0.14, gain: 0.04, type: "sawtooth" });
      playTone({ frequency: 720, duration: 0.08, gain: 0.022, type: "triangle", delay: 0.03 });
      break;
    case "shield":
      playTone({ frequency: 310, duration: 0.18, gain: 0.028, type: "triangle" });
      playTone({ frequency: 520, frequencyEnd: 760, duration: 0.22, gain: 0.024, type: "sine", delay: 0.02 });
      break;
    case "hit":
      playTone({ frequency: 180, frequencyEnd: 75, duration: 0.07, gain: 0.04, type: "triangle" });
      break;
    case "heavy-hit":
      playTone({ frequency: 140, frequencyEnd: 48, duration: 0.14, gain: 0.065, type: "square" });
      break;
    case "block":
      playTone({ frequency: 920, frequencyEnd: 510, duration: 0.04, gain: 0.022, type: "square" });
      playTone({ frequency: 260, duration: 0.05, gain: 0.016, type: "triangle", delay: 0.01 });
      break;
    case "ko":
      playTone({ frequency: 260, frequencyEnd: 60, duration: 0.42, gain: 0.07, type: "sawtooth" });
      playTone({ frequency: 980, duration: 0.18, gain: 0.028, type: "sine", delay: 0.06 });
      break;
    case "draw":
      playTone({ frequency: 620, duration: 0.16, gain: 0.03, type: "triangle" });
      playTone({ frequency: 470, duration: 0.22, gain: 0.025, type: "triangle", delay: 0.12 });
      break;
    default:
      break;
  }
}

async function toggleSound() {
  AUDIO.enabled = !AUDIO.enabled;
  updateSoundToggleUI();

  if (AUDIO.enabled) {
    void unlockAudioFromGesture();
    playSound("select");
  }

  syncScreenAudio();
}

function loadImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function drawCoverImage(image, x, y, width, height, focusX = 0.5, focusY = 0.5) {
  if (!image || !image.complete || !image.naturalWidth) {
    return false;
  }

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = x + (width - drawWidth) * focusX;
  const drawY = y + (height - drawHeight) * focusY;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  return true;
}

function hasLoadedImage(image) {
  return Boolean(image && image.complete && image.naturalWidth);
}

function getInitials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}

function getTeacherPhoto(character) {
  return TEACHER_PORTRAITS[character.id];
}

function getTeacherPhotoPath(character) {
  return `./assets/teachers/${character.photoFile}`;
}

function buildPortraitMarkup(character, className) {
  return `
    <div class="${className} photo-frame" style="background:${character.color}; box-shadow: inset 0 0 0 3px rgba(255,255,255,0.16);">
      <img class="portrait-photo" src="${getTeacherPhotoPath(character)}" alt="${character.name} portrait" />
      <span class="portrait-fallback">${getInitials(character.name)}</span>
    </div>
  `;
}

function wirePortraitFrames(root) {
  if (!root) {
    return;
  }

  root.querySelectorAll(".photo-frame").forEach((frame) => {
    const image = frame.querySelector(".portrait-photo");
    if (!image) {
      return;
    }

    const syncState = () => {
      frame.classList.toggle("photo-ready", image.complete && image.naturalWidth > 0);
    };

    if (image.complete) {
      syncState();
      return;
    }

    image.addEventListener("load", syncState, { once: true });
    image.addEventListener("error", syncState, { once: true });
  });
}

function isPressed(binding) {
  return binding.some((key) => pressedKeys.has(key));
}

function matchesKey(binding, key) {
  return binding.includes(key);
}

function formatElapsedTime(seconds) {
  const totalSeconds = Math.max(0, Math.min(STATE.roundTimeLimit, Math.floor(seconds)));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function clampRoundCount(count) {
  return Math.max(MATCH_RULES.minRounds, Math.min(MATCH_RULES.maxRounds, count));
}

function buildDefaultRoundVenues(totalRounds = STATE.totalRounds) {
  return Array.from({ length: clampRoundCount(totalRounds) }, (_, index) => DEFAULT_VENUE_ORDER[index % DEFAULT_VENUE_ORDER.length]);
}

function getVenueById(venueId) {
  return VENUES.find((venue) => venue.id === venueId) || VENUES[0];
}

function getVenueImagePath(venue) {
  return venue.imagePath;
}

function getRoundVenueId(round = STATE.round) {
  return STATE.roundVenues[Math.max(0, Math.min(STATE.totalRounds - 1, round - 1))] || DEFAULT_VENUE_ORDER[0];
}

function getCurrentRoundBackdrop() {
  return getVenueById(getRoundVenueId());
}

function getRoundLabelText() {
  return `Round ${STATE.round} of ${STATE.totalRounds}`;
}

function isGameplayKey(key) {
  return Object.values(KEYS).some((bindings) =>
    Object.values(bindings).some((binding) => binding.includes(key))
  );
}

function getRequiredSlotIds() {
  return MODE_SLOTS[STATE.playerCount] ? [...MODE_SLOTS[STATE.playerCount]] : [];
}

function isAISlot(slotId) {
  return STATE.playerCount === 1 && slotId === "player2";
}

function getAIDifficultyProfile() {
  return AI_DIFFICULTIES[STATE.aiDifficulty] || AI_DIFFICULTIES.medium;
}

function getSlotMeta(slotId) {
  const base = PLAYER_SLOTS[slotId];
  if (!base) {
    return null;
  }

  if (isAISlot(slotId)) {
    const aiProfile = getAIDifficultyProfile();
    return {
      ...base,
      label: "Computer",
      shortLabel: "AI",
      buttonClass: "ai",
      controls: `${aiProfile.label} difficulty. AI controlled opponent that advances, blocks, and throws specials when it sees an opening.`
    };
  }

  return { ...base };
}

function updateDifficultyUI() {
  const showDifficulty = STATE.playerCount === 1;
  if (difficultyPanel) {
    difficultyPanel.hidden = !showDifficulty;
  }

  difficultyButtons.forEach((button) => {
    button.classList.toggle("active", showDifficulty && button.dataset.difficulty === STATE.aiDifficulty);
  });
}

function updateRoundCountUI() {
  roundCountButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.roundCount) === STATE.totalRounds);
  });
}

function resetSelections() {
  Object.keys(STATE.selections).forEach((slotId) => {
    STATE.selections[slotId] = null;
  });
}

function resetWins() {
  Object.keys(STATE.wins).forEach((slotId) => {
    STATE.wins[slotId] = 0;
  });
}

function resetRoundVenues() {
  STATE.roundVenues = buildDefaultRoundVenues();
}

function setRoundCount(count) {
  STATE.totalRounds = clampRoundCount(count);
  STATE.round = 1;
  STATE.roundTimeElapsed = 0;
  resetRoundVenues();
  updateSelectionUI();
}

function startSeries() {
  STATE.round = 1;
  STATE.roundTimeElapsed = 0;
  resetWins();
  beginMatch();
}

function getHealthLeader() {
  const aliveFighters = fighters.filter(isAliveFighter);
  if (!aliveFighters.length) {
    return null;
  }

  const maxHealth = Math.max(...aliveFighters.map((fighter) => fighter.health));
  const leaders = aliveFighters.filter((fighter) => fighter.health === maxHealth);
  return leaders.length === 1 ? leaders[0] : null;
}

function getMatchLeaders() {
  const slotIds = getRequiredSlotIds();
  if (!slotIds.length) {
    return [];
  }

  const topScore = Math.max(...slotIds.map((slotId) => STATE.wins[slotId]));
  return slotIds.filter((slotId) => STATE.wins[slotId] === topScore);
}

function showScreen(target) {
  Object.entries(screens).forEach(([name, screen]) => {
    screen.classList.toggle("active", name === target);
  });
  STATE.currentScreen = target;
  syncScreenAudio();
}

function renderSelectionPanels() {
  const slotIds = getRequiredSlotIds();
  selectionPlayers.innerHTML = slotIds.map((slotId) => {
    const meta = getSlotMeta(slotId);
    const character = STATE.selections[slotId];
    const emptyCopy = isAISlot(slotId) ? "Choose the computer opponent" : "Choose a teacher";

    return `
      <article class="selection-panel">
        <h3>${meta.label}</h3>
        <div class="player-preview ${character ? "" : "empty"}">
          ${character ? `
            <div>
              ${buildPortraitMarkup(character, "preview-badge")}
              <p class="preview-name">${character.name}</p>
              <p class="preview-style">${character.style}</p>
              <p class="preview-ability"><strong>${character.abilityName}:</strong> ${character.abilityText}</p>
            </div>
          ` : `<p>${emptyCopy}</p>`}
        </div>
        <p class="controls-label">${isAISlot(slotId) ? "Fighter Type" : "Controls"}</p>
        <p class="controls-copy">${meta.controls}</p>
      </article>
    `;
  }).join("");

  wirePortraitFrames(selectionPlayers);
}

function renderVenuePanel() {
  if (!venuePanel) {
    return;
  }

  const roundCards = Array.from({ length: STATE.totalRounds }, (_, index) => {
    const roundNumber = index + 1;
    const selectedVenue = getVenueById(getRoundVenueId(roundNumber));
    const buttonsMarkup = VENUES.map((venue) => {
      const isSelected = selectedVenue.id === venue.id;
      return `
        <button
          class="venue-button${isSelected ? " selected" : ""}"
          type="button"
          data-round="${roundNumber}"
          data-venue="${venue.id}"
        >
          <img class="venue-thumb" src="${getVenueImagePath(venue)}" alt="${venue.label}" />
          <span>${venue.label}</span>
        </button>
      `;
    }).join("");

    return `
      <article class="venue-round-card">
        <p class="eyebrow">Round ${roundNumber}</p>
        <h3>${selectedVenue.label}</h3>
        <div class="venue-choice-grid">
          ${buttonsMarkup}
        </div>
      </article>
    `;
  }).join("");

  venuePanel.innerHTML = `
    <div class="venue-panel-header">
      <div>
        <p class="eyebrow">Choose the Venues</p>
        <h3>Pick where each round happens</h3>
      </div>
      <p class="venue-panel-copy">Set the order for all ${STATE.totalRounds} rounds. You can reuse the same place or mix them up.</p>
    </div>
    <div class="venue-round-grid">
      ${roundCards}
    </div>
  `;

  venuePanel.querySelectorAll(".venue-button").forEach((button) => {
    button.addEventListener("click", () => {
      void requestAudioUnlock();
      playSound("select");
      const roundIndex = Number(button.dataset.round) - 1;
      STATE.roundVenues[roundIndex] = button.dataset.venue;
      renderVenuePanel();
    });
  });
}

function getSelectionSubtitle() {
  if (STATE.playerCount === 1) {
    return "Pick your fighter, choose the AI difficulty, then choose which teacher the computer will control.";
  }

  if (STATE.playerCount === 2) {
    return "Each player picks one teacher, then the fight starts as normal.";
  }

  if (STATE.playerCount === 3) {
    return "All three players pick a teacher, then the match becomes a three-way brawl.";
  }

  return "Pick the fighters for the next match.";
}

function renderRoster() {
  const slotIds = getRequiredSlotIds();
  roster.innerHTML = "";

  CHARACTERS.forEach((character) => {
    const card = document.createElement("article");
    card.className = "fighter-card";
    const buttonsMarkup = slotIds.map((slotId) => {
      const meta = getSlotMeta(slotId);
      const selected = STATE.selections[slotId] && STATE.selections[slotId].id === character.id;
      const label = selected ? `${meta.shortLabel} ready` : `Pick for ${meta.shortLabel}`;
      return `<button class="picker-button ${meta.buttonClass}${selected ? " selected" : ""}" data-player="${slotId}" data-character="${character.id}">${label}</button>`;
    }).join("");

    card.innerHTML = `
      <div class="card-top">
        ${buildPortraitMarkup(character, "portrait")}
        <div>
          <p class="eyebrow">${character.title}</p>
          <h3>${character.name}</h3>
          <p>${character.style}</p>
        </div>
      </div>
      <p class="ability"><strong>${character.abilityName}:</strong> ${character.abilityText}</p>
      <div class="card-actions">${buttonsMarkup}</div>
    `;
    roster.appendChild(card);
  });

  wirePortraitFrames(roster);

  roster.querySelectorAll(".picker-button").forEach((button) => {
    button.addEventListener("click", () => {
      void requestAudioUnlock();
      playSound("select");
      const slotId = button.dataset.player;
      const character = CHARACTERS.find((entry) => entry.id === button.dataset.character);
      STATE.selections[slotId] = character;
      updateSelectionUI();
    });
  });
}

function renderControlCards() {
  const slotIds = getRequiredSlotIds();
  const cards = slotIds.map((slotId) => {
    const meta = getSlotMeta(slotId);
    const title = isAISlot(slotId) ? "Computer Opponent" : `${meta.label} Controls`;
    return `
      <div class="tip-card">
        <h3>${title}</h3>
        <p>${meta.controls}</p>
      </div>
    `;
  }).join("");

  const roundLabelText = `${STATE.totalRounds} one-minute round${STATE.totalRounds === 1 ? "" : "s"}`;
  const rulesText = slotIds.length === 3
    ? `${roundLabelText}. Last fighter standing takes the round. If the bell rings, the fighter with the most health takes it.`
    : `${roundLabelText}. A knockout takes the round instantly. If the bell rings, the fighter with more health takes the round.`;

  controlsStrip.innerHTML = `
    ${cards}
    <div class="tip-card">
      <h3>Round Rules</h3>
      <p>${rulesText}</p>
    </div>
  `;
}

function updateSelectionUI() {
  const slotIds = getRequiredSlotIds();
  updateDifficultyUI();
  updateRoundCountUI();
  if (!slotIds.length) {
    selectionPlayers.innerHTML = "";
    if (venuePanel) {
      venuePanel.innerHTML = "";
    }
    roster.innerHTML = "";
    controlsStrip.innerHTML = "";
    startMatchButton.disabled = true;
    return;
  }

  selectSubtitle.textContent = getSelectionSubtitle();
  renderSelectionPanels();
  renderVenuePanel();
  renderRoster();
  renderControlCards();
  startMatchButton.disabled = slotIds.some((slotId) => !STATE.selections[slotId]);
}

function renderHudShell() {
  const slotIds = getRequiredSlotIds();
  hudPlayers.innerHTML = "";
  hudElements = {};

  slotIds.forEach((slotId) => {
    const meta = getSlotMeta(slotId);
    const card = document.createElement("article");
    card.className = `hud-player-card ${meta.buttonClass}`;
    card.innerHTML = `
      <p class="eyebrow">${meta.label}</p>
      <p class="hud-name">${meta.label}</p>
      <div class="meter">
        <div class="meter-fill health"></div>
      </div>
      <p class="meter-label">Special ready</p>
      <p class="score-label">Rounds: 0</p>
    `;
    hudPlayers.appendChild(card);
    hudElements[slotId] = {
      name: card.querySelector(".hud-name"),
      health: card.querySelector(".meter-fill"),
      special: card.querySelector(".meter-label"),
      score: card.querySelector(".score-label")
    };
  });
}

function updateHud() {
  const slotIds = getRequiredSlotIds();
  if (!slotIds.length) {
    return;
  }

  if (slotIds.some((slotId) => !hudElements[slotId])) {
    renderHudShell();
  }

  slotIds.forEach((slotId) => {
    const meta = getSlotMeta(slotId);
    const fighter = fighters.find((entry) => entry.slotId === slotId);
    const elements = hudElements[slotId];
    if (!elements) {
      return;
    }

    elements.name.textContent = fighter ? `${meta.label}: ${fighter.character.name}` : meta.label;
    elements.health.style.width = fighter ? `${Math.max(0, (fighter.health / fighter.character.maxHealth) * 100)}%` : "100%";
    elements.special.textContent = fighter
      ? fighter.health <= 0
        ? "Out"
        : fighter.specialCooldown <= 0
          ? "Special ready"
          : `Special in ${fighter.specialCooldown.toFixed(1)}s`
      : "Special ready";
    elements.score.textContent = `Rounds: ${STATE.wins[slotId]}`;
  });

  if (venueLabel) {
    venueLabel.textContent = getCurrentRoundBackdrop().label;
  }
  roundLabel.textContent = getRoundLabelText();
  timerLabel.textContent = `Time ${formatElapsedTime(STATE.roundTimeElapsed)} / ${formatElapsedTime(STATE.roundTimeLimit)}`;
  messageBanner.textContent = STATE.message;
}

function setMessage(text) {
  STATE.message = text;
  messageBanner.textContent = text;
}

function setPlayerCount(count) {
  STATE.playerCount = count;
  STATE.aiDifficulty = count === 1 ? "medium" : null;
  STATE.round = 1;
  STATE.roundTimeLimit = MATCH_RULES.roundTimeLimit;
  STATE.roundTimeElapsed = 0;
  STATE.inMatch = false;
  STATE.resultLocked = false;
  fighters = [];
  resetSelections();
  resetWins();
  resetRoundVenues();
  pressedKeys.clear();
  overlay.classList.add("hidden");
  setMessage(`${STATE.totalRounds} one-minute round${STATE.totalRounds === 1 ? "" : "s"}. Touch gloves and get ready.`);
  renderHudShell();
  updateSelectionUI();
  showScreen("select");
}

function getSpawnPositions(count) {
  if (count === 3) {
    return [72, 588, 1000];
  }

  return [238, 938];
}

function createFighter(character, slotId, startX) {
  const aiProfile = isAISlot(slotId) ? getAIDifficultyProfile() : null;
  return {
    character,
    slotId,
    isAI: isAISlot(slotId),
    aiDifficulty: aiProfile ? aiProfile.label : null,
    aiMoveMultiplier: aiProfile ? aiProfile.moveMultiplier : 1,
    aiDamageMultiplier: aiProfile ? aiProfile.damageMultiplier : 1,
    aiReceivedDamageMultiplier: aiProfile ? aiProfile.receivedDamageMultiplier : 1,
    aiBlockChance: aiProfile ? aiProfile.blockChance : 0,
    aiLowHealthThreshold: aiProfile ? aiProfile.lowHealthThreshold : 0,
    aiPressureRange: aiProfile ? aiProfile.pressureRange : 0,
    aiPressureWindow: aiProfile ? aiProfile.pressureWindow : 0,
    aiRetreatDistance: aiProfile ? aiProfile.retreatDistance : 0,
    aiApproachDistance: aiProfile ? aiProfile.approachDistance : 0,
    aiCloseRetreatChance: aiProfile ? aiProfile.closeRetreatChance : 0,
    aiJumpChance: aiProfile ? aiProfile.jumpChance : 0,
    aiJumpCooldownValue: aiProfile ? aiProfile.jumpCooldown : 0,
    aiJumpMinDistance: aiProfile ? aiProfile.jumpMinDistance : 0,
    aiAttackDistance: aiProfile ? aiProfile.closeAttackDistance : 0,
    aiSpecialRollMin: aiProfile ? aiProfile.specialRollMin : 1,
    aiHookRollMin: aiProfile ? aiProfile.hookRollMin : 1,
    aiJabRollMin: aiProfile ? aiProfile.jabRollMin : 1,
    aiRangedSpecialChance: aiProfile ? aiProfile.rangedSpecialChance : 0,
    aiDecisionBase: aiProfile ? aiProfile.decisionBase : 0,
    aiDecisionVariance: aiProfile ? aiProfile.decisionVariance : 0,
    aiStunMultiplier: aiProfile ? aiProfile.stunMultiplier : 1,
    x: startX,
    y: 520,
    width: 104,
    height: 168,
    vx: 0,
    vy: 0,
    facing: slotId === "player2" ? -1 : 1,
    health: character.maxHealth,
    blockReduction: character.blockReduction,
    isBlocking: false,
    stunTimer: 0,
    invulnerableTimer: 0,
    shieldTimer: 0,
    speedBuffTimer: 0,
    attackTimer: 0,
    attackCooldown: 0,
    currentAttack: null,
    specialCooldown: 0,
    onGround: true,
    afterImage: 0,
    hitFlash: 0,
    aiDecisionTimer: 0,
    aiJumpCooldown: 0
  };
}

function beginMatch() {
  const slotIds = getRequiredSlotIds();
  if (slotIds.some((slotId) => !STATE.selections[slotId])) {
    return;
  }

  const positions = getSpawnPositions(slotIds.length);
  fighters = slotIds.map((slotId, index) => createFighter(STATE.selections[slotId], slotId, positions[index]));
  STATE.inMatch = true;
  STATE.resultLocked = false;
  STATE.roundTimeLimit = MATCH_RULES.roundTimeLimit;
  STATE.roundTimeElapsed = 0;
  const currentBackdrop = getCurrentRoundBackdrop();
  setMessage(
    STATE.playerCount === 1
      ? `${currentBackdrop.label}. Bell rings. Beat the computer.`
      : STATE.playerCount === 3
        ? `${currentBackdrop.label}. Three fighters enter. Win the round.`
        : `${currentBackdrop.label}. Bell rings. Fight!`
  );
  lastTimestamp = 0;
  renderHudShell();
  renderControlCards();
  updateHud();
  overlay.classList.add("hidden");
  showScreen("match");
  playSound("bell");
  if (!loopActive) {
    loopActive = true;
    requestAnimationFrame(gameLoop);
  }
}

function resetForRematch() {
  if (STATE.round >= STATE.totalRounds) {
    startSeries();
    return;
  }

  STATE.round += 1;
  beginMatch();
}

function backToSelection() {
  STATE.inMatch = false;
  STATE.round = 1;
  STATE.roundTimeElapsed = 0;
  fighters = [];
  overlay.classList.add("hidden");
  showScreen("select");
  updateSelectionUI();
  playSound("back");
}

function roundedRectPath(x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function fillRoundedRect(x, y, width, height, radius) {
  roundedRectPath(x, y, width, height, radius);
  ctx.fill();
}

function strokeRoundedRect(x, y, width, height, radius) {
  roundedRectPath(x, y, width, height, radius);
  ctx.stroke();
}

function isAliveFighter(fighter) {
  return Boolean(fighter && fighter.health > 0);
}

function getFighterCenter(fighter) {
  return fighter.x + fighter.width / 2;
}

function getLivingOpponents(fighter) {
  return fighters.filter((other) => other !== fighter && isAliveFighter(other));
}

function getNearestOpponent(fighter) {
  const opponents = getLivingOpponents(fighter);
  if (!opponents.length) {
    return null;
  }

  return opponents.reduce((closest, contender) => {
    const closestDistance = Math.abs(getFighterCenter(closest) - getFighterCenter(fighter));
    const contenderDistance = Math.abs(getFighterCenter(contender) - getFighterCenter(fighter));
    return contenderDistance < closestDistance ? contender : closest;
  });
}

function getSortedOpponents(fighter) {
  return getLivingOpponents(fighter).sort(
    (left, right) => Math.abs(getFighterCenter(left) - getFighterCenter(fighter)) - Math.abs(getFighterCenter(right) - getFighterCenter(fighter))
  );
}

function getHumanInputState(fighter) {
  const controls = KEYS[fighter.slotId];
  return {
    left: isPressed(controls.left),
    right: isPressed(controls.right),
    jump: isPressed(controls.jump),
    block: isPressed(controls.block)
  };
}

function getAIInputState(fighter, delta) {
  const input = {
    left: false,
    right: false,
    jump: false,
    block: false
  };
  const target = getNearestOpponent(fighter);
  fighter.aiDecisionTimer = Math.max(0, fighter.aiDecisionTimer - delta);
  fighter.aiJumpCooldown = Math.max(0, fighter.aiJumpCooldown - delta);

  if (!target) {
    return input;
  }

  const diff = getFighterCenter(target) - getFighterCenter(fighter);
  const distance = Math.abs(diff);
  const lowHealth = fighter.health < fighter.character.maxHealth * fighter.aiLowHealthThreshold;
  const underPressure =
    target.currentAttack &&
    distance < target.currentAttack.range + fighter.aiPressureRange &&
    target.attackTimer <= target.currentAttack.duration * fighter.aiPressureWindow;

  if (underPressure && Math.random() < fighter.aiBlockChance) {
    input.block = true;
  }

  if (fighter.attackTimer <= 0 && fighter.stunTimer <= 0) {
    if (lowHealth && distance < fighter.aiRetreatDistance) {
      if (diff < 0) {
        input.right = true;
      } else {
        input.left = true;
      }
    } else if (distance > fighter.aiApproachDistance) {
      if (diff < 0) {
        input.left = true;
      } else {
        input.right = true;
      }
    } else if (distance < 74 && Math.random() < fighter.aiCloseRetreatChance) {
      if (diff < 0) {
        input.right = true;
      } else {
        input.left = true;
      }
    }
  }

  if (
    fighter.onGround &&
    fighter.aiJumpCooldown <= 0 &&
    !input.block &&
    distance > fighter.aiJumpMinDistance &&
    !target.onGround &&
    Math.random() < fighter.aiJumpChance
  ) {
    input.jump = true;
    fighter.aiJumpCooldown = fighter.aiJumpCooldownValue;
  }

  if (fighter.aiDecisionTimer <= 0 && fighter.attackCooldown <= 0 && fighter.stunTimer <= 0 && !input.block) {
    if (distance <= fighter.aiAttackDistance) {
      const roll = Math.random();
      if (fighter.specialCooldown <= 0 && roll > fighter.aiSpecialRollMin) {
        attemptAttack(fighter, "special");
      } else if (roll > fighter.aiHookRollMin) {
        attemptAttack(fighter, "hook");
      } else if (roll > fighter.aiJabRollMin) {
        attemptAttack(fighter, "jab");
      }
      fighter.aiDecisionTimer = fighter.aiDecisionBase + Math.random() * fighter.aiDecisionVariance;
    } else if (distance <= 168 && fighter.specialCooldown <= 0 && Math.random() < fighter.aiRangedSpecialChance) {
      attemptAttack(fighter, "special");
      fighter.aiDecisionTimer = fighter.aiDecisionBase + 0.1 + Math.random() * fighter.aiDecisionVariance;
    }
  }

  return input;
}

function handleInputs(delta) {
  fighters.forEach((fighter) => {
    if (!isAliveFighter(fighter)) {
      fighter.isBlocking = false;
      fighter.vx *= 0.85;
      return;
    }

    const input = fighter.isAI ? getAIInputState(fighter, delta) : getHumanInputState(fighter);

    if (fighter.stunTimer > 0) {
      fighter.isBlocking = false;
      fighter.vx *= 0.9;
      return;
    }

    fighter.isBlocking = input.block;

    const moveLeft = input.left;
    const moveRight = input.right;
    const speedMultiplier = fighter.speedBuffTimer > 0 ? 1.35 : 1;
    const targetSpeed = fighter.character.speed * speedMultiplier * fighter.aiMoveMultiplier;

    if (fighter.attackTimer <= 0) {
      if (moveLeft && !moveRight) {
        fighter.vx = -targetSpeed;
      } else if (moveRight && !moveLeft) {
        fighter.vx = targetSpeed;
      } else {
        fighter.vx *= 0.76;
      }
    }

    if (input.jump && fighter.onGround) {
      fighter.vy = -fighter.character.jump;
      fighter.onGround = false;
    }
  });
}

function createSpecialAttack(fighter) {
  switch (fighter.character.specialType) {
    case "dash":
      return {
        name: fighter.character.abilityName,
        damage: 15,
        range: 176,
        duration: 0.42,
        push: 420,
        stun: 0.22,
        selfBuff: "dash"
      };
    case "uppercut":
      return {
        name: fighter.character.abilityName,
        damage: 18,
        range: 128,
        duration: 0.34,
        push: 250,
        stun: 0.8
      };
    case "shield":
      return {
        name: fighter.character.abilityName,
        damage: 0,
        range: 0,
        duration: 0.18,
        push: 0,
        stun: 0,
        selfBuff: "shield"
      };
    default:
      return {
        name: "Special",
        damage: 12,
        range: 150,
        duration: 0.4,
        push: 260,
        stun: 0.2
      };
  }
}

function attemptAttack(fighter, type) {
  if (!STATE.inMatch || !isAliveFighter(fighter) || fighter.attackCooldown > 0 || fighter.stunTimer > 0) {
    return;
  }

  const isSpecial = type === "special";
  if (isSpecial && fighter.specialCooldown > 0) {
    return;
  }

  let attack;
  if (type === "jab") {
    attack = { name: "Jab", damage: fighter.character.jabDamage, range: 120, duration: 0.18, push: 170, stun: 0, connected: false };
  } else if (type === "hook") {
    attack = { name: "Hook", damage: fighter.character.hookDamage, range: 140, duration: 0.28, push: 240, stun: 0.16, connected: false };
  } else {
    attack = { ...createSpecialAttack(fighter), connected: false };
  }

  fighter.currentAttack = attack;
  fighter.attackTimer = attack.duration;
  fighter.attackCooldown = type === "jab" ? 0.22 : type === "hook" ? 0.48 : 0.8;
  if (type === "special") {
    fighter.specialCooldown = fighter.character.specialCooldown;
  }

  if (!(type === "special" && attack.selfBuff === "shield")) {
    playSound(type === "special" ? "special" : type);
  }

  if (attack.selfBuff === "dash") {
    fighter.speedBuffTimer = 0.9;
    fighter.vx = fighter.facing * 620;
    fighter.afterImage = 0.45;
  }

  if (attack.selfBuff === "shield") {
    fighter.shieldTimer = 2.2;
    fighter.health = Math.min(fighter.character.maxHealth, fighter.health + 8);
    setMessage(`${fighter.character.name} activates ${fighter.character.abilityName}!`);
    playSound("shield");
    return;
  }

  tryHitOpponents(fighter);
}

function tryHit(attacker, defender) {
  if (!attacker.currentAttack || !isAliveFighter(defender) || defender.invulnerableTimer > 0) {
    return false;
  }

  const distance = Math.abs(getFighterCenter(attacker) - getFighterCenter(defender));
  const facingCorrectly = attacker.facing === 1
    ? defender.x >= attacker.x - 20
    : defender.x + defender.width <= attacker.x + attacker.width + 20;

  if (distance > attacker.currentAttack.range || !facingCorrectly) {
    return false;
  }

  let damage = attacker.currentAttack.damage;
  const push = attacker.currentAttack.push;
  let stun = attacker.currentAttack.stun;
  const defenderWasAlive = defender.health > 0;

  if (attacker.isAI) {
    damage *= attacker.aiDamageMultiplier;
    stun *= attacker.aiStunMultiplier;
  }

  if (defender.isAI) {
    damage *= defender.aiReceivedDamageMultiplier;
  }

  if (defender.isBlocking) {
    damage *= 1 - defender.blockReduction;
    stun *= 0.35;
  }

  if (defender.shieldTimer > 0) {
    damage *= 0.5;
  }

  defender.health = Math.max(0, defender.health - damage);
  defender.vx += attacker.facing * push;
  defender.hitFlash = 0.16;

  if (defender.isBlocking) {
    playSound("block");
  } else {
    playSound(damage >= 10 || stun >= 0.4 ? "heavy-hit" : "hit");
  }

  if (!defender.isBlocking) {
    defender.stunTimer = Math.max(defender.stunTimer, stun);
  }

  if (damage > 0) {
    if (defenderWasAlive && defender.health <= 0) {
      setMessage(`${attacker.character.name} knocks out ${defender.character.name}!`);
    } else {
      setMessage(`${attacker.character.name} lands ${attacker.currentAttack.name}!`);
    }
  }

  attacker.currentAttack.connected = true;
  defender.invulnerableTimer = 0.14;
  return true;
}

function tryHitOpponents(attacker) {
  for (const defender of getSortedOpponents(attacker)) {
    if (tryHit(attacker, defender)) {
      return true;
    }
  }

  return false;
}

function resolveAttacks(delta) {
  fighters.forEach((fighter) => {
    if (!fighter.currentAttack || !isAliveFighter(fighter)) {
      if (!isAliveFighter(fighter)) {
        fighter.currentAttack = null;
      }
      return;
    }

    fighter.attackTimer -= delta;
    if (fighter.attackTimer > 0) {
      if (!fighter.currentAttack.connected && fighter.attackTimer <= fighter.currentAttack.duration * 0.6) {
        tryHitOpponents(fighter);
      }
    } else {
      fighter.currentAttack = null;
    }
  });
}

function resolveFighterSpacing() {
  const livingFighters = fighters.filter(isAliveFighter);

  for (let i = 0; i < livingFighters.length; i += 1) {
    for (let j = i + 1; j < livingFighters.length; j += 1) {
      const fighterA = livingFighters[i];
      const fighterB = livingFighters[j];
      const distance = getFighterCenter(fighterB) - getFighterCenter(fighterA);
      const absDistance = Math.abs(distance);
      const minGap = 74;

      if (absDistance < minGap) {
        const direction = absDistance === 0 ? 1 : Math.sign(distance);
        const push = (minGap - absDistance) / 2;
        fighterA.x -= push * direction;
        fighterB.x += push * direction;
      }
    }
  }

  fighters.forEach((fighter) => {
    fighter.x = Math.max(80, Math.min(canvas.width - fighter.width - 80, fighter.x));
  });
}

function updateFighters(delta) {
  const gravity = 1800;
  fighters.forEach((fighter) => {
    fighter.specialCooldown = Math.max(0, fighter.specialCooldown - delta);
    fighter.attackCooldown = Math.max(0, fighter.attackCooldown - delta);
    fighter.stunTimer = Math.max(0, fighter.stunTimer - delta);
    fighter.invulnerableTimer = Math.max(0, fighter.invulnerableTimer - delta);
    fighter.shieldTimer = Math.max(0, fighter.shieldTimer - delta);
    fighter.speedBuffTimer = Math.max(0, fighter.speedBuffTimer - delta);
    fighter.afterImage = Math.max(0, fighter.afterImage - delta);
    fighter.hitFlash = Math.max(0, fighter.hitFlash - delta);

    if (!isAliveFighter(fighter)) {
      fighter.currentAttack = null;
      fighter.attackTimer = 0;
      fighter.isBlocking = false;
      fighter.vx *= 0.84;
      fighter.x += fighter.vx * delta;
      fighter.x = Math.max(80, Math.min(canvas.width - fighter.width - 80, fighter.x));
      fighter.y = 545;
      fighter.vy = 0;
      fighter.onGround = true;
      return;
    }

    fighter.vy += gravity * delta;
    fighter.x += fighter.vx * delta;
    fighter.y += fighter.vy * delta;

    fighter.x = Math.max(80, Math.min(canvas.width - fighter.width - 80, fighter.x));

    if (fighter.y >= 545) {
      fighter.y = 545;
      fighter.vy = 0;
      fighter.onGround = true;
    } else {
      fighter.onGround = false;
    }

    fighter.vx *= fighter.isBlocking ? 0.84 : 0.9;
  });

  resolveFighterSpacing();

  fighters.forEach((fighter) => {
    const target = getNearestOpponent(fighter);
    if (!target) {
      return;
    }

    fighter.facing = getFighterCenter(fighter) <= getFighterCenter(target) ? 1 : -1;
  });
}

function concludeRound(winner, copy) {
  STATE.resultLocked = true;
  STATE.inMatch = false;
  STATE.roundTimeElapsed = STATE.roundTimeLimit;

  if (winner) {
    STATE.wins[winner.slotId] += 1;
  }

  const finalRound = STATE.round >= STATE.totalRounds;
  if (finalRound) {
    const matchLeaders = getMatchLeaders();
    const matchWinnerSlotId = matchLeaders.length === 1 ? matchLeaders[0] : null;
    const matchWinner = matchWinnerSlotId ? fighters.find((fighter) => fighter.slotId === matchWinnerSlotId) : null;

    if (matchWinner) {
      overlayTitle.textContent = `${matchWinner.character.name} wins the match`;
      overlayCopy.textContent = `${matchWinner.character.name} takes ${STATE.wins[matchWinner.slotId]} of ${STATE.totalRounds} rounds across the school grounds.`;
      setMessage(`${matchWinner.character.name} wins the fight!`);
      playSound("ko");
    } else {
      overlayTitle.textContent = "Match Draw";
      overlayCopy.textContent = `${STATE.totalRounds} rounds are over, and the judges cannot split the fighters.`;
      setMessage(`The match ends level after ${STATE.totalRounds} rounds.`);
      playSound("draw");
    }

    rematchButton.textContent = "Play Again";
  } else if (winner) {
    overlayTitle.textContent = `${winner.character.name} takes Round ${STATE.round}`;
    overlayCopy.textContent = copy;
    setMessage(`${winner.character.name} wins the round.`);
    playSound("bell");
    rematchButton.textContent = "Next Round";
  } else {
    overlayTitle.textContent = `Round ${STATE.round} Draw`;
    overlayCopy.textContent = copy;
    setMessage(`Round ${STATE.round} ends level.`);
    playSound("draw");
    rematchButton.textContent = "Next Round";
  }

  updateHud();
  overlay.classList.remove("hidden");
}

function checkWinner() {
  if (STATE.resultLocked) {
    return;
  }

  const aliveFighters = fighters.filter(isAliveFighter);
  if (aliveFighters.length > 1) {
    return;
  }

  const venue = getCurrentRoundBackdrop().label;
  if (aliveFighters.length === 0) {
    concludeRound(null, `Nobody is left standing when the bell echoes around ${venue}.`);
    return;
  }

  const winner = aliveFighters[0];
  concludeRound(
    winner,
    STATE.playerCount === 3
      ? `${winner.character.name} is the last fighter standing at ${venue}.`
      : `${winner.character.name} forces a knockout at ${venue}.`
  );
}

function checkDraw() {
  if (STATE.resultLocked || !STATE.inMatch) {
    return;
  }

  if (STATE.roundTimeElapsed >= STATE.roundTimeLimit) {
    const venue = getCurrentRoundBackdrop().label;
    const leader = getHealthLeader();
    if (leader) {
      concludeRound(
        leader,
        `${leader.character.name} leads on health when the bell rings at ${venue}.`
      );
      return;
    }

    concludeRound(null, `The bell rings at ${venue}, but the judges cannot split the round.`);
  }
}

function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#79c8ff");
  gradient.addColorStop(0.34, "#d4f0ff");
  gradient.addColorStop(1, "#6c9e65");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillRect(110, 92, 170, 28);
  ctx.fillRect(850, 122, 150, 22);
  ctx.fillRect(890, 95, 210, 34);
  ctx.fillRect(820, 110, 180, 24);
}

function drawSchoolBackdrop() {
  const backdrop = getCurrentRoundBackdrop();
  const hasBackdrop = drawCoverImage(backdrop.image, 0, 0, canvas.width, canvas.height, backdrop.focusX, backdrop.focusY);

  if (!hasBackdrop) {
    drawSky();
    drawSchool();
    return;
  }

  const overlayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  overlayGradient.addColorStop(0, "rgba(7, 15, 28, 0.26)");
  overlayGradient.addColorStop(0.45, "rgba(7, 15, 28, 0.10)");
  overlayGradient.addColorStop(1, "rgba(7, 15, 28, 0.54)");
  ctx.fillStyle = overlayGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSchool() {
  ctx.fillStyle = "#d7b37a";
  ctx.fillRect(120, 210, 1040, 230);

  ctx.fillStyle = "#9e6a43";
  ctx.fillRect(150, 180, 990, 42);

  ctx.fillStyle = "#6f472f";
  for (let i = 0; i < 9; i += 1) {
    ctx.fillRect(190 + i * 105, 248, 58, 70);
    ctx.fillRect(190 + i * 105, 340, 58, 70);
  }

  ctx.fillStyle = "#3e2b22";
  ctx.fillRect(585, 295, 110, 145);

  ctx.fillStyle = "#f4d991";
  ctx.fillRect(520, 232, 240, 42);
  ctx.fillStyle = "#172a44";
  ctx.font = "bold 22px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText("ST. MICHAEL'S PREP", 640, 261);

  ctx.fillStyle = "#5b804f";
  ctx.fillRect(0, 440, canvas.width, 280);
  ctx.fillStyle = "#3f5f37";
  ctx.fillRect(0, 500, canvas.width, 220);
}

function drawGlove(x, y, color, angle, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-12, -4);
  ctx.quadraticCurveTo(-4, -14, 11, -11);
  ctx.quadraticCurveTo(20, -4, 18, 6);
  ctx.quadraticCurveTo(10, 15, -2, 13);
  ctx.quadraticCurveTo(-12, 10, -14, 1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.ellipse(-1, -4, 6, 3, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(10, 16, 25, 0.3)";
  fillRoundedRect(-12, 4, 11, 6, 3);
  ctx.restore();
}

function drawBoot(x, y, color, facing) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-16, -2);
  ctx.lineTo(2, -2);
  ctx.quadraticCurveTo(16, 0, 18, 8);
  ctx.lineTo(-12, 8);
  ctx.quadraticCurveTo(-18, 7, -16, -2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(-10, 0, 18, 2);
  ctx.restore();
}

function drawHair(headX, headY, appearance) {
  ctx.fillStyle = appearance.hair;
  ctx.beginPath();

  if (appearance.hairStyle === "buzz") {
    ctx.ellipse(headX, headY - 7, 21, 11, 0, Math.PI, 0, true);
  } else if (appearance.hairStyle === "swept") {
    ctx.moveTo(headX - 22, headY - 2);
    ctx.quadraticCurveTo(headX - 6, headY - 28, headX + 20, headY - 16);
    ctx.quadraticCurveTo(headX + 12, headY + 2, headX - 22, headY - 2);
  } else if (appearance.hairStyle === "long") {
    ctx.moveTo(headX - 22, headY - 3);
    ctx.quadraticCurveTo(headX, headY - 31, headX + 22, headY - 4);
    ctx.lineTo(headX + 18, headY + 18);
    ctx.quadraticCurveTo(headX, headY + 24, headX - 18, headY + 16);
    ctx.closePath();
  } else {
    ctx.moveTo(headX - 22, headY - 4);
    ctx.quadraticCurveTo(headX - 8, headY - 27, headX + 22, headY - 11);
    ctx.lineTo(headX + 12, headY + 1);
    ctx.quadraticCurveTo(headX - 2, headY - 4, headX - 22, headY - 4);
  }

  ctx.fill();
}

function drawTeacherHeadPhoto(headX, headY, character) {
  const portrait = getTeacherPhoto(character);
  if (!hasLoadedImage(portrait)) {
    return false;
  }

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(headX, headY + 6, 22, 26, 0, 0, Math.PI * 2);
  ctx.clip();
  drawCoverImage(portrait, headX - 24, headY - 24, 48, 60, 0.5, 0.24);
  ctx.restore();

  ctx.strokeStyle = "rgba(19, 34, 53, 0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(headX, headY + 6, 22, 26, 0, 0, Math.PI * 2);
  ctx.stroke();
  return true;
}

function drawStars(x, y, timer) {
  const points = [
    { x: x - 22, y: y + Math.sin(timer * 20) * 5 },
    { x, y: y - 10 + Math.cos(timer * 22) * 5 },
    { x: x + 22, y: y + Math.sin(timer * 18 + 1) * 5 }
  ];

  ctx.fillStyle = "#ffe16b";
  points.forEach((point) => {
    ctx.beginPath();
    ctx.moveTo(point.x, point.y - 8);
    ctx.lineTo(point.x + 4, point.y - 2);
    ctx.lineTo(point.x + 10, point.y - 1);
    ctx.lineTo(point.x + 5, point.y + 4);
    ctx.lineTo(point.x + 6, point.y + 10);
    ctx.lineTo(point.x, point.y + 7);
    ctx.lineTo(point.x - 6, point.y + 10);
    ctx.lineTo(point.x - 5, point.y + 4);
    ctx.lineTo(point.x - 10, point.y - 1);
    ctx.lineTo(point.x - 4, point.y - 2);
    ctx.closePath();
    ctx.fill();
  });
}

function drawFighter(fighter) {
  const appearance = fighter.character;
  const build = appearance.build || 1;
  const bob = fighter.onGround ? Math.sin(STATE.roundTimeElapsed * 6 + fighter.x * 0.03) * 1.5 : 0;
  const centerX = fighter.x + fighter.width / 2;
  const baseY = fighter.y + bob;
  const anchorY = fighter.y + fighter.height + 6;
  const attackLean = fighter.currentAttack ? fighter.facing * 7 : 0;
  const headX = centerX + attackLean;
  const headY = baseY + 23;
  const neckY = baseY + 42;
  const shoulderY = baseY + 58;
  const waistY = baseY + 101;
  const kneeY = baseY + 126;
  const ankleY = baseY + 146;
  const torsoWidth = 27 * build;
  const frontStep = fighter.currentAttack ? fighter.facing * 10 : 0;
  const rearStep = fighter.currentAttack ? fighter.facing * -4 : 0;
  const skinTone = fighter.hitFlash > 0 ? "#ffe6d4" : appearance.skin;
  const bodyColor = fighter.hitFlash > 0 ? "#fff5df" : appearance.color;
  const shortsColor = appearance.shorts;
  const trimColor = appearance.accent;

  let frontElbowX = centerX + fighter.facing * (28 + (fighter.currentAttack ? 16 : 0));
  let frontElbowY = shoulderY + (fighter.currentAttack ? 10 : 20);
  let frontHandX = centerX + fighter.facing * (42 + (fighter.currentAttack ? 30 : 6));
  let frontHandY = shoulderY + (fighter.currentAttack ? 13 : 24);
  let rearElbowX = centerX - fighter.facing * 10;
  let rearElbowY = shoulderY + 20;
  let rearHandX = centerX - fighter.facing * 18;
  let rearHandY = shoulderY + 28;

  if (fighter.isBlocking) {
    frontElbowX = centerX + fighter.facing * 18;
    frontElbowY = shoulderY + 4;
    frontHandX = headX + fighter.facing * 14;
    frontHandY = headY + 8;
    rearElbowX = centerX - fighter.facing * 6;
    rearElbowY = shoulderY + 8;
    rearHandX = headX - fighter.facing * 8;
    rearHandY = headY + 6;
  }

  ctx.save();
  if (!isAliveFighter(fighter)) {
    ctx.globalAlpha = 0.38;
  }

  ctx.translate(centerX, anchorY);
  ctx.scale(FIGHTER_RENDER_SCALE, FIGHTER_RENDER_SCALE);
  ctx.translate(-centerX, -anchorY);

  if (fighter.afterImage > 0) {
    ctx.globalAlpha = isAliveFighter(fighter) ? 0.16 : 0.1;
    ctx.fillStyle = trimColor;
    ctx.beginPath();
    ctx.ellipse(centerX - fighter.facing * 16, waistY - 12, 26, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headX - fighter.facing * 16, headY + 5, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = isAliveFighter(fighter) ? 1 : 0.38;
  }

  if (fighter.shieldTimer > 0) {
    ctx.strokeStyle = "rgba(134, 242, 198, 0.8)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + fighter.height / 2, 64, 96, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.beginPath();
  ctx.ellipse(centerX, fighter.y + fighter.height + 4, 34, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = shortsColor;
  ctx.lineCap = "round";
  ctx.lineWidth = 15 * build;
  ctx.beginPath();
  ctx.moveTo(centerX - 12, waistY + 10);
  ctx.lineTo(centerX - 18 + rearStep, kneeY + 1);
  ctx.moveTo(centerX + 12, waistY + 10);
  ctx.lineTo(centerX + 18 + frontStep, kneeY - 1);
  ctx.stroke();

  ctx.strokeStyle = skinTone;
  ctx.lineWidth = 12 * build;
  ctx.beginPath();
  ctx.moveTo(centerX - 18 + rearStep, kneeY + 1);
  ctx.lineTo(centerX - 16 + rearStep, ankleY);
  ctx.moveTo(centerX + 18 + frontStep, kneeY - 1);
  ctx.lineTo(centerX + 17 + frontStep, ankleY);
  ctx.stroke();

  ctx.strokeStyle = "#e7edf6";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(centerX - 16 + rearStep, ankleY - 12);
  ctx.lineTo(centerX - 16 + rearStep, ankleY - 1);
  ctx.moveTo(centerX + 17 + frontStep, ankleY - 12);
  ctx.lineTo(centerX + 17 + frontStep, ankleY - 1);
  ctx.stroke();

  drawBoot(centerX - 18 + rearStep, ankleY + 2, appearance.shoes, fighter.facing);
  drawBoot(centerX + 19 + frontStep, ankleY + 2, appearance.shoes, fighter.facing);

  const torsoGradient = ctx.createLinearGradient(centerX, shoulderY, centerX, waistY + 24);
  torsoGradient.addColorStop(0, bodyColor);
  torsoGradient.addColorStop(1, trimColor);

  ctx.fillStyle = torsoGradient;
  ctx.beginPath();
  ctx.moveTo(centerX - torsoWidth, shoulderY);
  ctx.lineTo(centerX + torsoWidth, shoulderY);
  ctx.quadraticCurveTo(centerX + 26 * build, shoulderY + 26, centerX + 20 * build, waistY);
  ctx.lineTo(centerX - 20 * build, waistY);
  ctx.quadraticCurveTo(centerX - 26 * build, shoulderY + 26, centerX - torsoWidth, shoulderY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  fillRoundedRect(centerX - 8, shoulderY + 8, 16, 42, 6);

  ctx.fillStyle = shortsColor;
  fillRoundedRect(centerX - 30, waistY - 4, 60, 24, 10);
  ctx.fillStyle = trimColor;
  fillRoundedRect(centerX - 30, waistY + 13, 60, 7, 3);

  ctx.fillStyle = skinTone;
  fillRoundedRect(headX - 9, neckY, 18, 16, 6);

  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 14 * build;
  ctx.beginPath();
  ctx.moveTo(centerX - fighter.facing * 18, shoulderY + 4);
  ctx.quadraticCurveTo(rearElbowX, rearElbowY - 2, rearElbowX, rearElbowY);
  ctx.lineTo(rearHandX, rearHandY);
  ctx.stroke();

  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 15 * build;
  ctx.beginPath();
  ctx.moveTo(centerX + fighter.facing * 18, shoulderY + 2);
  ctx.quadraticCurveTo(frontElbowX, frontElbowY, frontElbowX, frontElbowY);
  ctx.lineTo(frontHandX, frontHandY);
  ctx.stroke();

  if (!drawTeacherHeadPhoto(headX, headY, appearance)) {
    ctx.fillStyle = skinTone;
    ctx.beginPath();
    ctx.ellipse(headX, headY + 6, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(headX - fighter.facing * 21, headY + 6, 4, 0, Math.PI * 2);
    ctx.arc(headX + fighter.facing * 19, headY + 7, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath();
    ctx.ellipse(headX - fighter.facing * 8, headY - 4, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    drawHair(headX, headY, appearance);

    ctx.strokeStyle = "#241a18";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(headX - fighter.facing * 10, headY + 3);
    ctx.lineTo(headX - fighter.facing * 3, headY + 2);
    ctx.moveTo(headX + fighter.facing * 3, headY + 2);
    ctx.lineTo(headX + fighter.facing * 10, headY + 3);
    ctx.stroke();

    ctx.fillStyle = "#241a18";
    ctx.beginPath();
    ctx.arc(headX - fighter.facing * 7, headY + 7, 2, 0, Math.PI * 2);
    ctx.arc(headX + fighter.facing * 7, headY + 7, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#8e6856";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(headX + fighter.facing * 1, headY + 10);
    ctx.lineTo(headX + fighter.facing * 4, headY + 15);
    ctx.stroke();

    ctx.strokeStyle = "#6f3f3d";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(headX, headY + 18, 7, 0.25, Math.PI - 0.25);
    ctx.stroke();
  }

  drawGlove(rearHandX, rearHandY, trimColor, fighter.facing * -0.2, 0.92);
  drawGlove(frontHandX, frontHandY, trimColor, fighter.facing * 0.08, fighter.currentAttack ? 1.08 : 1);

  if (fighter.isBlocking && isAliveFighter(fighter)) {
    ctx.strokeStyle = "rgba(255,255,255,0.58)";
    ctx.lineWidth = 3;
    strokeRoundedRect(fighter.x + 6, baseY + 8, fighter.width - 12, fighter.height - 14, 24);
  }

  if (fighter.stunTimer > 0.2 && isAliveFighter(fighter)) {
    drawStars(centerX, baseY - 12, fighter.stunTimer);
  }

  ctx.restore();
}

function drawArena() {
  drawSchoolBackdrop();
  ctx.fillStyle = "rgba(8, 12, 20, 0.18)";
  fighters.forEach((fighter) => {
    ctx.beginPath();
    ctx.ellipse(
      fighter.x + fighter.width / 2,
      690,
      70 * FIGHTER_RENDER_SCALE,
      20 * FIGHTER_RENDER_SCALE,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  fighters
    .slice()
    .sort((left, right) => left.y - right.y)
    .forEach(drawFighter);
}

function gameLoop(timestamp) {
  if (!STATE.inMatch && overlay.classList.contains("hidden")) {
    loopActive = false;
    return;
  }

  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const delta = Math.min(0.033, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  if (STATE.inMatch) {
    STATE.roundTimeElapsed += delta;
    handleInputs(delta);
    resolveAttacks(delta);
    updateFighters(delta);
    checkWinner();
    checkDraw();
    updateHud();
  }

  drawArena();
  requestAnimationFrame(gameLoop);
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();

  if (isGameplayKey(key)) {
    event.preventDefault();
    void requestAudioUnlock();
  }

  pressedKeys.add(key);

  if (!STATE.inMatch) {
    return;
  }

  fighters.forEach((fighter) => {
    if (fighter.isAI || !isAliveFighter(fighter)) {
      return;
    }

    const controls = KEYS[fighter.slotId];
    if (matchesKey(controls.jab, key)) {
      attemptAttack(fighter, "jab");
    }
    if (matchesKey(controls.hook, key)) {
      attemptAttack(fighter, "hook");
    }
    if (matchesKey(controls.special, key)) {
      attemptAttack(fighter, "special");
    }
  });
}

function handleKeyUp(event) {
  pressedKeys.delete(event.key.toLowerCase());
}

function init() {
  resetRoundVenues();
  updateSelectionUI();
  renderHudShell();
  showScreen("splash");
  updateSoundToggleUI();

  enterButton.addEventListener("click", () => {
    void requestAudioUnlock();
    playSound("menu-open");
    showScreen("mode");
  });

  modeBackButton.addEventListener("click", () => {
    void requestAudioUnlock();
    playSound("back");
    showScreen("splash");
  });

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void requestAudioUnlock();
      playSound("select");
      setPlayerCount(Number(button.dataset.playerCount));
    });
  });

  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void requestAudioUnlock();
      playSound("select");
      STATE.aiDifficulty = button.dataset.difficulty;
      updateSelectionUI();
    });
  });

  roundCountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      void requestAudioUnlock();
      playSound("select");
      setRoundCount(Number(button.dataset.roundCount));
    });
  });

  changeModeButton.addEventListener("click", () => {
    void requestAudioUnlock();
    playSound("back");
    showScreen("mode");
  });

  startMatchButton.addEventListener("click", () => {
    void requestAudioUnlock();
    startSeries();
  });

  rematchButton.addEventListener("click", () => {
    void requestAudioUnlock();
    resetForRematch();
  });

  backButton.addEventListener("click", () => {
    void requestAudioUnlock();
    backToSelection();
  });

  soundToggleButton.addEventListener("click", toggleSound);
  window.addEventListener("pointerdown", () => {
    void requestAudioUnlock();
  }, { passive: true });
  window.addEventListener("touchend", () => {
    void requestAudioUnlock();
  }, { passive: true });
  window.addEventListener("keydown", () => {
    void requestAudioUnlock();
  });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "middle";
}

init();
