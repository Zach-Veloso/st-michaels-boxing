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
  }
};

const STATE = {
  currentScreen: "splash",
  selections: {
    player1: null,
    player2: null
  },
  wins: {
    player1: 0,
    player2: 0
  },
  round: 1,
  roundTimeLimit: 180,
  roundTimeElapsed: 0,
  message: "Touch gloves and get ready.",
  inMatch: false,
  resultLocked: false
};

const PHOTO_BACKDROPS = {
  schoolExterior: loadImage("./assets/st-michaels-building.jpg")
};

const TEACHER_PORTRAITS = Object.fromEntries(
  CHARACTERS.map((character) => [character.id, loadImage(`./assets/teachers/${character.photoFile}`)])
);

const screens = {
  splash: document.getElementById("splash-screen"),
  select: document.getElementById("select-screen"),
  match: document.getElementById("match-screen")
};

const roster = document.getElementById("roster");
const startMatchButton = document.getElementById("start-match-button");
const enterButton = document.getElementById("enter-button");
const player1Preview = document.getElementById("player1-preview");
const player2Preview = document.getElementById("player2-preview");
const messageBanner = document.getElementById("message-banner");
const roundLabel = document.getElementById("round-label");
const timerLabel = document.getElementById("timer-label");
const overlay = document.getElementById("match-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayCopy = document.getElementById("overlay-copy");
const rematchButton = document.getElementById("rematch-button");
const backButton = document.getElementById("back-button");
const soundToggleButton = document.getElementById("sound-toggle");
const hud = {
  player1Name: document.getElementById("player1-name"),
  player2Name: document.getElementById("player2-name"),
  player1Health: document.getElementById("player1-health"),
  player2Health: document.getElementById("player2-health"),
  player1Special: document.getElementById("player1-special"),
  player2Special: document.getElementById("player2-special"),
  player1Score: document.getElementById("player1-score"),
  player2Score: document.getElementById("player2-score")
};

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const pressedKeys = new Set();
let fighters = [];
let lastTimestamp = 0;
let loopActive = false;
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const AUDIO = {
  ctx: null,
  master: null,
  enabled: true,
  menuMusicTimer: null,
  menuMusicToken: 0,
  unlocked: false
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
    AUDIO.master.gain.value = 0.28;
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
  const ctx = ensureAudio();
  if (!ctx) {
    return null;
  }

  if (ctx.state !== "running") {
    try {
      await ctx.resume();
    } catch {
      return ctx;
    }
  }

  if (ctx.state === "running") {
    primeAudioOutput();
  }

  return ctx;
}

async function requestAudioUnlock() {
  if (!AUDIO.enabled) {
    return;
  }

  const wasReady = Boolean(AUDIO.unlocked && AUDIO.ctx && AUDIO.ctx.state === "running");
  const ctx = await unlockAudioFromGesture();
  if (!ctx) {
    return;
  }

  if (STATE.currentScreen === "select" && (!wasReady || AUDIO.menuMusicTimer === null)) {
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
  const ctx = ensureAudio();
  if (!ctx || !AUDIO.enabled) {
    return;
  }

  const startAt = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  const hasStereo = typeof ctx.createStereoPanner === "function";
  const panner = hasStereo ? ctx.createStereoPanner() : null;

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

function stopMenuMusic() {
  AUDIO.menuMusicToken += 1;

  if (AUDIO.menuMusicTimer) {
    window.clearTimeout(AUDIO.menuMusicTimer);
    AUDIO.menuMusicTimer = null;
  }
}

function queueMenuMusic(loopToken) {
  if (!AUDIO.enabled || STATE.currentScreen !== "select" || AUDIO.menuMusicToken !== loopToken) {
    return;
  }

  // Keep the select screen feeling lively without overpowering the action effects.
  const leadNotes = [
    { frequency: 392, duration: 0.16, delay: 0.12 },
    { frequency: 440, duration: 0.16, delay: 0.42 },
    { frequency: 523.25, duration: 0.2, delay: 0.74 },
    { frequency: 440, duration: 0.16, delay: 1.1 },
    { frequency: 392, duration: 0.16, delay: 1.4 },
    { frequency: 523.25, duration: 0.18, delay: 1.74 },
    { frequency: 587.33, duration: 0.2, delay: 2.06 },
    { frequency: 523.25, duration: 0.22, delay: 2.42 }
  ];
  const bassNotes = [
    { frequency: 196, duration: 0.34, delay: 0.12 },
    { frequency: 220, duration: 0.3, delay: 0.74 },
    { frequency: 174.61, duration: 0.34, delay: 1.4 },
    { frequency: 196, duration: 0.38, delay: 2.06 }
  ];

  leadNotes.forEach((note, index) => {
    playTone({
      ...note,
      gain: index >= 6 ? 0.034 : 0.03,
      type: "triangle",
      pan: index % 2 === 0 ? -0.15 : 0.15,
      release: 0.12
    });
  });

  bassNotes.forEach((note, index) => {
    playTone({
      ...note,
      gain: 0.022,
      type: "sine",
      pan: index % 2 === 0 ? -0.08 : 0.08,
      release: 0.16
    });
  });

  AUDIO.menuMusicTimer = window.setTimeout(() => {
    if (AUDIO.menuMusicToken !== loopToken) {
      return;
    }
    queueMenuMusic(loopToken);
  }, 2900);
}

function syncScreenAudio() {
  if (STATE.currentScreen === "select" && AUDIO.enabled) {
    const ctx = ensureAudio();
    if (!ctx) {
      return;
    }

    stopMenuMusic();
    queueMenuMusic(AUDIO.menuMusicToken);
    return;
  }

  stopMenuMusic();
}

async function toggleSound() {
  AUDIO.enabled = !AUDIO.enabled;
  updateSoundToggleUI();

  if (AUDIO.enabled) {
    await unlockAudioFromGesture();
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

function isGameplayKey(key) {
  return Object.values(KEYS).some((bindings) =>
    Object.values(bindings).some((binding) => binding.includes(key))
  );
}

function showScreen(target) {
  Object.entries(screens).forEach(([name, screen]) => {
    screen.classList.toggle("active", name === target);
  });
  STATE.currentScreen = target;
  syncScreenAudio();
}

function renderRoster() {
  roster.innerHTML = "";

  CHARACTERS.forEach((character) => {
    const card = document.createElement("article");
    card.className = "fighter-card";
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
      <div class="card-actions">
        <button class="picker-button player1" data-player="player1" data-character="${character.id}">Pick for P1</button>
        <button class="picker-button player2" data-player="player2" data-character="${character.id}">Pick for P2</button>
      </div>
    `;
    roster.appendChild(card);
  });

  wirePortraitFrames(roster);

  roster.querySelectorAll(".picker-button").forEach((button) => {
    button.addEventListener("click", async () => {
      await requestAudioUnlock();
      playSound("select");
      const player = button.dataset.player;
      const character = CHARACTERS.find((entry) => entry.id === button.dataset.character);
      STATE.selections[player] = character;
      updateSelectionUI();
    });
  });
}

function renderPreview(container, character) {
  if (!character) {
    container.className = "player-preview empty";
    container.innerHTML = "<p>Choose a teacher</p>";
    return;
  }

  container.className = "player-preview";
  container.innerHTML = `
    <div>
      ${buildPortraitMarkup(character, "preview-badge")}
      <p class="preview-name">${character.name}</p>
      <p class="preview-style">${character.style}</p>
      <p class="preview-ability"><strong>${character.abilityName}:</strong> ${character.abilityText}</p>
    </div>
  `;
  wirePortraitFrames(container);
}

function updateSelectionUI() {
  renderPreview(player1Preview, STATE.selections.player1);
  renderPreview(player2Preview, STATE.selections.player2);
  startMatchButton.disabled = !(STATE.selections.player1 && STATE.selections.player2);
}

function createFighter(character, player, startX) {
  return {
    character,
    player,
    x: startX,
    y: 545,
    width: 88,
    height: 140,
    vx: 0,
    vy: 0,
    facing: player === "player1" ? 1 : -1,
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
    hitFlash: 0
  };
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

function beginMatch() {
  fighters = [
    createFighter(STATE.selections.player1, "player1", 330),
    createFighter(STATE.selections.player2, "player2", 950)
  ];
  STATE.inMatch = true;
  STATE.resultLocked = false;
  STATE.roundTimeElapsed = 0;
  STATE.message = "Bell rings. Fight!";
  lastTimestamp = 0;
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
  STATE.round += 1;
  roundLabel.textContent = `Round ${STATE.round}`;
  beginMatch();
}

function backToSelection() {
  STATE.inMatch = false;
  overlay.classList.add("hidden");
  showScreen("select");
  updateSelectionUI();
  playSound("back");
}

function updateHud() {
  if (fighters.length !== 2) {
    return;
  }

  const [fighter1, fighter2] = fighters;
  hud.player1Name.textContent = fighter1.character.name;
  hud.player2Name.textContent = fighter2.character.name;
  hud.player1Health.style.width = `${Math.max(0, (fighter1.health / fighter1.character.maxHealth) * 100)}%`;
  hud.player2Health.style.width = `${Math.max(0, (fighter2.health / fighter2.character.maxHealth) * 100)}%`;
  hud.player1Special.textContent = fighter1.specialCooldown <= 0 ? "Special ready" : `Special in ${fighter1.specialCooldown.toFixed(1)}s`;
  hud.player2Special.textContent = fighter2.specialCooldown <= 0 ? "Special ready" : `Special in ${fighter2.specialCooldown.toFixed(1)}s`;
  hud.player1Score.textContent = `Wins: ${STATE.wins.player1}`;
  hud.player2Score.textContent = `Wins: ${STATE.wins.player2}`;
  roundLabel.textContent = `Round ${STATE.round}`;
  timerLabel.textContent = `Time ${formatElapsedTime(STATE.roundTimeElapsed)} / 3:00`;
  messageBanner.textContent = STATE.message;
}

function setMessage(text) {
  STATE.message = text;
  messageBanner.textContent = text;
}

function handleInputs(delta) {
  fighters.forEach((fighter, index) => {
    const controls = index === 0 ? KEYS.player1 : KEYS.player2;

    if (fighter.stunTimer > 0) {
      fighter.vx *= 0.9;
      return;
    }

    fighter.isBlocking = isPressed(controls.block);

    const moveLeft = isPressed(controls.left);
    const moveRight = isPressed(controls.right);
    const speedMultiplier = fighter.speedBuffTimer > 0 ? 1.35 : 1;
    const targetSpeed = fighter.character.speed * speedMultiplier;

    if (fighter.attackTimer <= 0) {
      if (moveLeft && !moveRight) {
        fighter.vx = -targetSpeed;
      } else if (moveRight && !moveLeft) {
        fighter.vx = targetSpeed;
      } else {
        fighter.vx *= 0.76;
      }
    }

    if (isPressed(controls.jump) && fighter.onGround) {
      fighter.vy = -fighter.character.jump;
      fighter.onGround = false;
    }
  });
}

function attemptAttack(fighter, opponent, type) {
  if (!STATE.inMatch || fighter.attackCooldown > 0 || fighter.stunTimer > 0) {
    return;
  }

  const isSpecial = type === "special";
  if (isSpecial && fighter.specialCooldown > 0) {
    return;
  }

  let attack;
  if (type === "jab") {
    attack = { name: "Jab", damage: fighter.character.jabDamage, range: 120, duration: 0.18, push: 170, stun: 0 };
  } else if (type === "hook") {
    attack = { name: "Hook", damage: fighter.character.hookDamage, range: 140, duration: 0.28, push: 240, stun: 0.16 };
  } else {
    attack = createSpecialAttack(fighter);
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

  if (attack.multiHit) {
    attack.hitsLeft = 4;
    attack.hitInterval = 0.11;
    attack.intervalTimer = 0.02;
  }

  tryHit(fighter, opponent);
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
    case "flurry":
      return {
        name: fighter.character.abilityName,
        damage: 5,
        range: 132,
        duration: 0.55,
        push: 135,
        stun: 0.1,
        multiHit: true
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

function tryHit(attacker, defender) {
  if (!attacker.currentAttack || defender.invulnerableTimer > 0) {
    return;
  }

  const distance = Math.abs((attacker.x + attacker.width / 2) - (defender.x + defender.width / 2));
  const facingCorrectly =
    attacker.facing === 1
      ? defender.x >= attacker.x - 20
      : defender.x + defender.width <= attacker.x + attacker.width + 20;

  if (distance > attacker.currentAttack.range || !facingCorrectly) {
    return;
  }

  let damage = attacker.currentAttack.damage;
  const push = attacker.currentAttack.push;
  let stun = attacker.currentAttack.stun;

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
    setMessage(`${attacker.character.name} lands ${attacker.currentAttack.name}!`);
  }

  attacker.currentAttack.connected = true;
  defender.invulnerableTimer = attacker.currentAttack.multiHit ? 0.04 : 0.14;
}

function resolveAttacks(delta) {
  const [fighter1, fighter2] = fighters;

  fighters.forEach((fighter, index) => {
    const opponent = index === 0 ? fighter2 : fighter1;
    if (!fighter.currentAttack) {
      return;
    }

    fighter.attackTimer -= delta;
    if (fighter.attackTimer > 0) {
      if (fighter.currentAttack.multiHit) {
        fighter.currentAttack.intervalTimer -= delta;
        if (fighter.currentAttack.intervalTimer <= 0 && fighter.currentAttack.hitsLeft > 0) {
          fighter.currentAttack.intervalTimer = fighter.currentAttack.hitInterval;
          fighter.currentAttack.hitsLeft -= 1;
          tryHit(fighter, opponent);
        }
      } else if (!fighter.currentAttack.connected && fighter.attackTimer <= fighter.currentAttack.duration * 0.6) {
        tryHit(fighter, opponent);
      }
    } else {
      fighter.currentAttack = null;
    }
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

  const [fighter1, fighter2] = fighters;
  if (fighter1 && fighter2) {
    const fighter1Center = fighter1.x + fighter1.width / 2;
    const fighter2Center = fighter2.x + fighter2.width / 2;
    fighter1.facing = fighter1Center <= fighter2Center ? 1 : -1;
    fighter2.facing = fighter2Center >= fighter1Center ? -1 : 1;
  }
}

function checkWinner() {
  if (STATE.resultLocked || fighters.length !== 2) {
    return;
  }

  const [fighter1, fighter2] = fighters;
  if (fighter1.health <= 0 || fighter2.health <= 0) {
    STATE.resultLocked = true;
    STATE.inMatch = false;
    const winnerKey = fighter1.health > fighter2.health ? "player1" : "player2";
    const winner = winnerKey === "player1" ? fighter1 : fighter2;
    STATE.wins[winnerKey] += 1;
    overlayTitle.textContent = `${winner.character.name} wins by KO`;
    overlayCopy.textContent = `${winner.character.abilityName} shook the whole schoolyard.`;
    setMessage("KO!");
    playSound("ko");
    updateHud();
    overlay.classList.remove("hidden");
  }
}

function checkDraw() {
  if (STATE.resultLocked || !STATE.inMatch) {
    return;
  }

  if (STATE.roundTimeElapsed >= STATE.roundTimeLimit) {
    STATE.resultLocked = true;
    STATE.inMatch = false;
    STATE.roundTimeElapsed = STATE.roundTimeLimit;
    overlayTitle.textContent = "Draw";
    overlayCopy.textContent = "Three minutes are up. The bell saves both fighters.";
    setMessage("Draw! Time is up.");
    playSound("draw");
    updateHud();
    overlay.classList.remove("hidden");
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
  const focusX = STATE.round % 2 === 1 ? 0.24 : 0.68;
  const hasBackdrop = drawCoverImage(PHOTO_BACKDROPS.schoolExterior, 0, 0, canvas.width, canvas.height, focusX, 0.5);

  if (!hasBackdrop) {
    drawSky();
    drawSchool();
    return;
  }

  const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height);
  overlay.addColorStop(0, "rgba(7, 15, 28, 0.26)");
  overlay.addColorStop(0.45, "rgba(7, 15, 28, 0.10)");
  overlay.addColorStop(1, "rgba(7, 15, 28, 0.54)");
  ctx.fillStyle = overlay;
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

function drawFighter(fighter) {
  const appearance = fighter.character;
  const build = appearance.build || 1;
  const bob = fighter.onGround ? Math.sin(STATE.roundTimeElapsed * 6 + fighter.x * 0.03) * 1.5 : 0;
  const centerX = fighter.x + fighter.width / 2;
  const baseY = fighter.y + bob;
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

  if (fighter.afterImage > 0) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = trimColor;
    ctx.beginPath();
    ctx.ellipse(centerX - fighter.facing * 16, waistY - 12, 26, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(headX - fighter.facing * 16, headY + 5, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
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

  if (fighter.isBlocking) {
    ctx.strokeStyle = "rgba(255,255,255,0.58)";
    ctx.lineWidth = 3;
    strokeRoundedRect(fighter.x + 6, baseY + 8, fighter.width - 12, fighter.height - 14, 24);
  }

  if (fighter.stunTimer > 0.2) {
    drawStars(centerX, baseY - 12, fighter.stunTimer);
  }
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

function drawArena() {
  drawSchoolBackdrop();
  ctx.fillStyle = "rgba(8, 12, 20, 0.18)";
  fighters.forEach((fighter) => {
    ctx.beginPath();
    ctx.ellipse(fighter.x + fighter.width / 2, 690, 70, 20, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  fighters.forEach(drawFighter);
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
    ensureAudio();
  }

  pressedKeys.add(key);

  if (!STATE.inMatch || fighters.length !== 2) {
    return;
  }

  const [fighter1, fighter2] = fighters;
  if (matchesKey(KEYS.player1.jab, key)) {
    attemptAttack(fighter1, fighter2, "jab");
  }
  if (matchesKey(KEYS.player1.hook, key)) {
    attemptAttack(fighter1, fighter2, "hook");
  }
  if (matchesKey(KEYS.player1.special, key)) {
    attemptAttack(fighter1, fighter2, "special");
  }
  if (matchesKey(KEYS.player2.jab, key)) {
    attemptAttack(fighter2, fighter1, "jab");
  }
  if (matchesKey(KEYS.player2.hook, key)) {
    attemptAttack(fighter2, fighter1, "hook");
  }
  if (matchesKey(KEYS.player2.special, key)) {
    attemptAttack(fighter2, fighter1, "special");
  }
}

function handleKeyUp(event) {
  pressedKeys.delete(event.key.toLowerCase());
}

function init() {
  renderRoster();
  updateSelectionUI();
  showScreen("splash");
  updateSoundToggleUI();

  enterButton.addEventListener("click", async () => {
    await requestAudioUnlock();
    playSound("menu-open");
    showScreen("select");
  });
  startMatchButton.addEventListener("click", async () => {
    await requestAudioUnlock();
    beginMatch();
  });
  rematchButton.addEventListener("click", async () => {
    await requestAudioUnlock();
    resetForRematch();
  });
  backButton.addEventListener("click", async () => {
    await requestAudioUnlock();
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
