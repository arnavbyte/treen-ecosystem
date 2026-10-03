/**
 * TREEN ECOSYSTEM — CLIENT SCRIPT ENGINE
 * Pillars: Quiet Editorial Stationery, .popvault WebCrypto, 3-Task Milestone Engine
 */

// ============================================================================
// 1. TACTILE STATIONERY AUDIO ENGINE (Web Audio API Synthesizer)
// ============================================================================
class StationeryAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Gentle mechanical switch click for task check
  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  // Resonant stationery stamp sound for rollover / milestone reveal
  playStamp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }
}

const audio = new StationeryAudio();

// ============================================================================
// 2. THE 3-TASK MILESTONE ENGINE (SIMULATOR STATE & LOGIC)
// ============================================================================
const initialTasks = [
  { id: 1, text: "Morning review: 20m analog notebook journaling", completed: true, tag: "RITUAL" },
  { id: 2, text: "Deep work: Ship SQLite migration for .popvault v2", completed: true, tag: "CORE" },
  { id: 3, text: "Read 25 pages of Frank Miller Daredevil / Shonen", completed: false, tag: "STUDY" },
  { id: 4, text: "Physical conditioning: 5km run at dusk", completed: false, tag: "BODY" }
];

let tasks = [...initialTasks];
let currentStreak = 14;
let isGateUnlocked = false;

function renderTasks() {
  const container = document.getElementById("interactiveTaskList");
  if (!container) return;

  container.innerHTML = "";
  tasks.forEach((task) => {
    const el = document.createElement("div");
    el.className = `task-item ${task.completed ? "completed" : ""}`;
    el.innerHTML = `
      <div class="task-left">
        <div class="task-checkbox" data-id="${task.id}" aria-label="Toggle task">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="task-label">${escapeHtml(task.text)}</span>
      </div>
      <span class="task-tag">${task.tag}</span>
    `;

    el.addEventListener("click", () => {
      toggleTask(task.id);
    });

    container.appendChild(el);
  });

  updateCapsuleGauge();
}

function toggleTask(id) {
  audio.playClick();
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  renderTasks();
}

function addNewTask(text) {
  if (!text || text.trim() === "") return;
  audio.playClick();
  tasks.push({
    id: Date.now(),
    text: text.trim(),
    completed: false,
    tag: "CUSTOM"
  });
  renderTasks();
}

function updateCapsuleGauge() {
  const completedCount = tasks.filter(t => t.completed).length;
  const target = 3;
  const fillPct = Math.min(100, Math.round((completedCount / target) * 100));

  const fillEl = document.getElementById("capsuleFill");
  const countEl = document.getElementById("capsuleCount");
  const stateBadge = document.getElementById("capsuleStateBadge");
  const feedbackEl = document.getElementById("capsuleFeedback");
  const heroBadge = document.getElementById("heroCapsuleMiniStatus");

  if (countEl) countEl.textContent = completedCount;
  if (fillEl) {
    fillEl.style.height = `${fillPct}%`;
    if (completedCount >= target) {
      fillEl.classList.add("gate-unlocked");
      isGateUnlocked = true;
    } else {
      fillEl.classList.remove("gate-unlocked");
      isGateUnlocked = false;
    }
  }

  if (stateBadge) {
    if (completedCount >= target) {
      stateBadge.className = "capsule-state-badge unlocked";
      stateBadge.innerHTML = `<span class="pill-dot"></span> Gate Unlocked · Streak Armed`;
    } else {
      const remaining = target - completedCount;
      stateBadge.className = "capsule-state-badge";
      stateBadge.innerHTML = `Gate Locked · ${remaining} Task${remaining > 1 ? 's' : ''} Remaining`;
    }
  }

  if (feedbackEl) {
    if (completedCount >= target) {
      feedbackEl.innerHTML = `<strong>Day Certified:</strong> At 23:59:59 rollover, streak advances to <strong>${currentStreak + 1}</strong> and grants your daily universe sticker.`;
    } else {
      feedbackEl.innerHTML = `Hardcore broadsheet discipline: You must finish at least 3 tasks before midnight or the streak resets to zero.`;
    }
  }

  if (heroBadge) {
    if (completedCount >= target) {
      heroBadge.textContent = "3/3 GATE READY";
      heroBadge.style.color = "#54B16C";
    } else {
      heroBadge.textContent = `${completedCount}/3 IN PROGRESS`;
      heroBadge.style.color = "#71717A";
    }
  }
}

function simulateMidnightRollover() {
  const completedCount = tasks.filter(t => t.completed).length;
  audio.playStamp();

  if (completedCount >= 3) {
    // Passed the 3-Task Gate!
    currentStreak += 1;
    document.getElementById("currentStreakDisplay").textContent = currentStreak;
    openMorningRevealModal(true, currentStreak);
  } else {
    // Gate missed! Streak resets to 0 (hardcore broadsheet rule)
    const prevStreak = currentStreak;
    currentStreak = 0;
    document.getElementById("currentStreakDisplay").textContent = currentStreak;
    openMorningRevealModal(false, prevStreak);
  }
}

// ============================================================================
// 3. THE 6 COMIC MILESTONE UNIVERSES (STICKER DATA & ISOLATION SYSTEM)
// ============================================================================
const universes = {
  batman_dc: {
    id: "batman_dc",
    name: "Batman & DC Vigilante",
    icon: "🦇",
    tagline: "The Gotham Discipline Archive",
    lore: "Forged in the shadow of Crime Alley and perfected in the solitary quiet of the Batcave. Every rep, every entry, every vow strictly logged without compromise.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "Initiation at Dusk",
        quote: "“The bell tolls at midnight. The city requires resolve.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><path d="M10 50 C25 25, 35 45, 45 35 C48 30, 50 15, 50 15 C50 15, 52 30, 55 35 C65 45, 75 25, 90 50 C75 58, 65 85, 50 75 C35 85, 25 58, 10 50 Z" fill="#18181B"/></svg>`,
        weight: "9.2 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "Batcave Terminal",
        quote: "“Cold crt monitors, encrypted logs, zero outside telemetry.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="15" y="20" width="70" height="45" rx="6"/><line x1="30" y1="80" x2="70" y2="80"/><line x1="50" y1="65" x2="50" y2="80"/><circle cx="28" cy="32" r="3" fill="#18181B"/><circle cx="38" cy="32" r="3" fill="#18181B"/><line x1="28" y1="44" x2="72" y2="44" stroke-dasharray="4 2"/></svg>`,
        weight: "10.4 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "Gargoyle Solitude",
        quote: "“Looking down upon the rain-slick streets. Unwavering focus.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="50,15 70,45 85,45 65,70 75,90 50,78 25,90 35,70 15,45 30,45" fill="none"/><circle cx="50" cy="50" r="12" fill="#18181B"/></svg>`,
        weight: "8.7 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "Wayne Manor Seal",
        quote: "“Inheritance means nothing without deliberate daily architecture.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><circle cx="50" cy="50" r="38"/><path d="M30 35 L50 70 L70 35 L50 48 Z" fill="#18181B"/></svg>`,
        weight: "11.1 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "The Pit Ascent",
        quote: "“You make the climb without the rope. Absolute accountability.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><circle cx="50" cy="50" r="35" stroke-dasharray="6 3"/><polyline points="30 65 50 35 70 65" stroke-width="3"/><line x1="50" y1="35" x2="50" y2="75" stroke-width="2"/></svg>`,
        weight: "9.5 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "The Dark Knight Broadsheet",
        quote: "“A symbol cannot be destroyed because it is etched in immutable code.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="50,10 62,35 90,38 68,58 75,85 50,70 25,85 32,58 10,38 38,35" fill="#18181B"/></svg>`,
        weight: "11.6 KB"
      }
    ]
  },
  marvel_spiderman: {
    id: "marvel_spiderman",
    name: "Marvel & Spider-Man",
    icon: "🕷️",
    tagline: "Queens Grit & The Great Responsibility",
    lore: "Built on late nights in Queens, patched-together chemistry gear, and the moral certainty that talent is useless without daily follow-through.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "Web-Shooter Blueprint",
        quote: "“Formula #4: high tensile fluid, mechanical wrist triggers.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="16"/><line x1="50" y1="10" x2="50" y2="90"/><line x1="10" y1="50" x2="90" y2="50"/></svg>`,
        weight: "8.9 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "The Fire Escape",
        quote: "“Homework balanced on a metal railing high above 2nd Avenue.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><line x1="20" y1="20" x2="80" y2="20"/><line x1="20" y1="50" x2="80" y2="50"/><line x1="20" y1="80" x2="80" y2="80"/><line x1="30" y1="20" x2="70" y2="50"/><line x1="70" y1="50" x2="30" y2="80"/></svg>`,
        weight: "9.3 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "Spider-Sense Focus",
        quote: "“The noise recedes. Only the present problem remains.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><path d="M50 20 Q50 40 30 30 M50 20 Q50 40 70 30 M50 15 Q50 35 20 20 M50 15 Q50 35 80 20"/><circle cx="50" cy="65" r="18" fill="#18181B"/></svg>`,
        weight: "10.1 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "The Daily Bugle Darkroom",
        quote: "“Developing truth under amber safelights. Craft takes patience.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="25" y="25" width="50" height="50" rx="4"/><circle cx="50" cy="50" r="14"/><rect x="35" y="18" width="12" height="7"/></svg>`,
        weight: "8.6 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "Lifting the Rubble",
        quote: "“Anyone can win when it’s easy. This is where character is cast.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><polygon points="15,40 50,20 85,40 85,80 15,80" fill="none"/><line x1="50" y1="20" x2="50" y2="80" stroke-width="2"/></svg>`,
        weight: "10.7 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "Friendly Neighborhood Monument",
        quote: "“365 days of responsibility. The mask is permanent.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M25 40 Q50 20 75 40 Q85 75 50 88 Q15 75 25 40 Z" fill="#18181B"/><ellipse cx="40" cy="50" rx="6" ry="12" fill="#FFFFFF" transform="rotate(-15 40 50)"/><ellipse cx="60" cy="50" rx="6" ry="12" fill="#FFFFFF" transform="rotate(15 60 50)"/></svg>`,
        weight: "11.2 KB"
      }
    ]
  },
  shonen_manga: {
    id: "shonen_manga",
    name: "Japanese Shonen Manga",
    icon: "⚔️",
    tagline: "The Unyielding Training Arc",
    lore: "Inspired by vintage Shonen Jump pulp ink, heavy wooden training swords, and the philosophy that talent is an illusion; only reps compound.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "Wooden Bokken Practice",
        quote: "“One thousand vertical swings before the morning tea cools.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><line x1="20" y1="80" x2="80" y2="20"/><line x1="26" y1="86" x2="34" y2="78"/><rect x="25" y="75" width="10" height="10" fill="#18181B"/></svg>`,
        weight: "8.4 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "Waterfall Meditation",
        quote: "“The weight of falling water disciplines the racing mind.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M25 15 C30 35, 20 65, 25 85 M50 15 C55 35, 45 65, 50 85 M75 15 C80 35, 70 65, 75 85"/></svg>`,
        weight: "7.9 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "Weights Dropped",
        quote: "“When the ankle weights hit the stone, the speed shocks the arena.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="30" y="30" width="40" height="40" rx="8" fill="#18181B"/><line x1="15" y1="85" x2="85" y2="85" stroke-width="3"/></svg>`,
        weight: "9.1 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "Spiritual Aura Barrier",
        quote: "“Tenacity is not enthusiasm. It is calm, silent density.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><circle cx="50" cy="50" r="36" stroke-dasharray="4 4"/><circle cx="50" cy="50" r="22" stroke-width="2.5"/><circle cx="50" cy="50" r="8" fill="#18181B"/></svg>`,
        weight: "10.0 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "Black Flame Katana",
        quote: "“The edge tempered by nine months of unyielding heat.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M15 85 Q45 55 85 15 L80 15 Q40 50 10 80 Z" fill="#18181B"/></svg>`,
        weight: "9.8 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "Hokage / Master Scroll",
        quote: "“The village recognizes what the broadsheet proved: 365 daily victories.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="25" y="20" width="50" height="60" rx="6"/><circle cx="50" cy="50" r="14" fill="#18181B"/></svg>`,
        weight: "10.9 KB"
      }
    ]
  },
  korean_manhwa: {
    id: "korean_manhwa",
    name: "Korean Manhwa",
    icon: "👑",
    tagline: "The Solo Sovereign System",
    lore: "A holographic system interface visible only to you. Daily quests are not suggestions; they are the difference between stagnation and monarch status.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "[DAILY QUEST: PREPARATION]",
        quote: "“Push-ups: 100. Running: 10km. Penalties await the indolent.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="15" y="25" width="70" height="50" rx="6"/><line x1="25" y1="40" x2="65" y2="40"/><line x1="25" y1="52" x2="75" y2="52"/><line x1="25" y1="64" x2="50" y2="64"/></svg>`,
        weight: "9.4 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "Dagger of Kasaka",
        quote: "“Blue venom along the blade. Precision strikes only.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M50 15 L62 45 L50 85 L38 45 Z" fill="#18181B"/><line x1="50" y1="15" x2="50" y2="85" stroke="#FFFFFF" stroke-width="1.5"/></svg>`,
        weight: "10.2 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "System Window Awakening",
        quote: "“Level up: Strength +5, Vitality +8. The gap widens.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none"/><polyline points="35 50 45 60 65 40" stroke-width="2.5"/></svg>`,
        weight: "9.9 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "Shadow Extraction Command",
        quote: "“Arise. What was once unfinished duty now obeys your will.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><path d="M50 15 Q30 40 40 60 Q20 70 30 90 Q60 85 70 65 Q80 40 50 15 Z" fill="#18181B"/></svg>`,
        weight: "10.8 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "The Demon King's Castle",
        quote: "“Conquering floor 100 alone in the subterranean dark.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="50,15 65,30 80,45 65,85 35,85 20,45 35,30" fill="none"/><circle cx="50" cy="55" r="10" fill="#18181B"/></svg>`,
        weight: "11.0 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "Crown of the Shadow Monarch",
        quote: "“The entire realm bows to 365 unbroken quest logs.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><polygon points="15,65 25,25 50,45 75,25 85,65" fill="#18181B"/><line x1="15" y1="72" x2="85" y2="72" stroke-width="3"/></svg>`,
        weight: "11.7 KB"
      }
    ]
  },
  cyberpunk_anime: {
    id: "cyberpunk_anime",
    name: "Anime Classic & Cyberpunk",
    icon: "🏙️",
    tagline: "Neo-Tokyo Wireframe & Cybernetic Will",
    lore: "Red tail-lights streaking through high-speed expressways, cold synthetic memory chips, and the human ghost resisting systemic entropy.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "Neural Jack Interface",
        quote: "“Direct cortical link: clean signal, zero dropped packets.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="10" fill="#18181B"/><line x1="50" y1="10" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="90"/><line x1="10" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="90" y2="50"/></svg>`,
        weight: "8.8 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "The Red Capsule Pill",
        quote: "“Good for health, bad for education.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="25" y="38" width="50" height="24" rx="12"/><line x1="50" y1="38" x2="50" y2="62"/><path d="M25 38 A12 12 0 0 0 25 62 Z" fill="#18181B"/></svg>`,
        weight: "8.1 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "Cybernetic Arm Actuator",
        quote: "“Titanium servos replace fatigue with calculated torque.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="30,25 70,25 60,75 40,75" fill="none"/><line x1="45" y1="35" x2="45" y2="65"/><line x1="55" y1="35" x2="55" y2="65"/></svg>`,
        weight: "9.6 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "Thermoptic Camouflage",
        quote: "“Moving invisibly through the megacity crowd. Pure execution.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><polygon points="50,15 85,50 50,85 15,50" stroke-dasharray="5 3"/><circle cx="50" cy="50" r="16" fill="none"/></svg>`,
        weight: "9.3 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "Ghost In The Shell Core",
        quote: "“Whispering in the wires. The biological vessel yields to purpose.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="18" stroke-dasharray="4 2"/><path d="M50 30 L50 70 M30 50 L70 50"/></svg>`,
        weight: "10.4 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "Neo-Tokyo Monolith",
        quote: "“Rising above the crater. 365 days of cybernetic sovereignty.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><rect x="35" y="15" width="30" height="70" fill="#18181B"/><line x1="15" y1="85" x2="85" y2="85" stroke-width="3"/></svg>`,
        weight: "11.5 KB"
      }
    ]
  },
  antiheroes_noir: {
    id: "antiheroes_noir",
    name: "Graphic Novels & Anti-Heroes",
    icon: "🕶️",
    tagline: "The Cynic's Watch & Stark Realism",
    lore: "Drawn from Rorschach's uncompromising journal, Sin City rainy gutters, and the quiet dignity of doing the necessary work without applause.",
    stickers: [
      {
        tier: "Rookie",
        days: "Days 1–7",
        title: "Rorschach Inkblot Log",
        quote: "“October 12th. Dog carcass in alley this morning. Work began anyway.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M50 20 C40 30, 25 35, 30 55 C35 75, 45 65, 50 80 C55 65, 65 75, 70 55 C75 35, 60 30, 50 20 Z" fill="#18181B"/></svg>`,
        weight: "9.0 KB"
      },
      {
        tier: "Cadet",
        days: "Days 8–21",
        title: "The Doomsday Clock (11:55 PM)",
        quote: "“Five minutes to midnight. No time for half measures.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><circle cx="50" cy="50" r="35"/><line x1="50" y1="50" x2="50" y2="22" stroke-width="3"/><line x1="50" y1="50" x2="38" y2="28" stroke-width="2.5"/></svg>`,
        weight: "9.7 KB"
      },
      {
        tier: "Momentum",
        days: "Days 22–45",
        title: "Sin City Trench Coat",
        quote: "“The rain beats down. You keep your collar turned up and move.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M30 25 L50 45 L70 25 L80 85 L20 85 Z" fill="none"/><line x1="50" y1="45" x2="50" y2="85"/></svg>`,
        weight: "9.2 KB"
      },
      {
        tier: "Habit",
        days: "Days 46–90",
        title: "The Smiley Face with Splatter",
        quote: "“It's all a joke until you build an unbreakable system.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><circle cx="50" cy="50" r="36"/><circle cx="38" cy="40" r="4" fill="#18181B"/><circle cx="62" cy="40" r="4" fill="#18181B"/><path d="M36 60 Q50 74 64 60"/><line x1="30" y1="25" x2="42" y2="45" stroke="#18181B" stroke-width="3"/></svg>`,
        weight: "10.5 KB"
      },
      {
        tier: "Iron Will",
        days: "Days 91–180",
        title: "Guy Fawkes Porcelain Mask",
        quote: "“Behind this broadsheet there is more than flesh. There is discipline.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2"><path d="M25 35 Q50 15 75 35 Q80 75 50 85 Q20 75 25 35 Z" fill="#18181B"/><path d="M35 60 Q50 68 65 60" stroke="#FFFFFF" stroke-width="2"/></svg>`,
        weight: "10.3 KB"
      },
      {
        tier: "Legend",
        days: "Days 181–365",
        title: "Never Compromise (The Journal)",
        quote: "“Even in the face of Armageddon. 365 days of absolute integrity.”",
        iconSvg: `<svg viewBox="0 0 100 100" fill="none" stroke="#18181B" stroke-width="2.5"><rect x="25" y="20" width="50" height="65" rx="4" fill="#18181B"/><line x1="35" y1="35" x2="65" y2="35" stroke="#FAF9F6" stroke-width="2"/><line x1="35" y1="48" x2="65" y2="48" stroke="#FAF9F6" stroke-width="2"/><line x1="35" y1="61" x2="55" y2="61" stroke="#FAF9F6" stroke-width="2"/></svg>`,
        weight: "11.4 KB"
      }
    ]
  }
};

let activeUniverseKey = "batman_dc";
let activeTierFilter = "all";

function renderUniversesNav() {
  const container = document.getElementById("universeNav");
  if (!container) return;

  container.innerHTML = "";
  Object.keys(universes).forEach((key) => {
    const u = universes[key];
    const btn = document.createElement("button");
    btn.className = `universe-tab-btn ${key === activeUniverseKey ? "active" : ""}`;
    btn.innerHTML = `<span>${u.icon}</span> <span>${u.name}</span>`;
    btn.addEventListener("click", () => {
      audio.playClick();
      activeUniverseKey = key;
      renderUniversesNav();
      renderStickers();
    });
    container.appendChild(btn);
  });
}

function renderStickers() {
  const u = universes[activeUniverseKey];
  const grid = document.getElementById("stickerGrid");
  const loreTitle = document.getElementById("universeLoreTitle");
  const loreDesc = document.getElementById("universeLoreDesc");

  if (loreTitle) loreTitle.textContent = `${u.icon} ${u.name} — ${u.tagline}`;
  if (loreDesc) loreDesc.textContent = u.lore;

  if (!grid) return;
  grid.innerHTML = "";

  u.stickers.forEach((sticker, index) => {
    // If filter is active
    if (activeTierFilter !== "all" && sticker.tier.toLowerCase() !== activeTierFilter.toLowerCase()) {
      return;
    }

    // Determine lock status based on simulated streak (currentStreak: 14)
    // Tier 1 (Rookie): Unlocked (days 1-7)
    // Tier 2 (Cadet): Unlocked (days 8-21, current streak is 14)
    // Tier 3+: Locked unless unlocked in demo
    let isUnlocked = false;
    if (index === 0) isUnlocked = true;
    else if (index === 1 && currentStreak >= 8) isUnlocked = true;
    else if (index === 2 && currentStreak >= 22) isUnlocked = true;
    else if (index === 3 && currentStreak >= 46) isUnlocked = true;
    else if (index === 4 && currentStreak >= 91) isUnlocked = true;
    else if (index === 5 && currentStreak >= 181) isUnlocked = true;

    const card = document.createElement("div");
    card.className = `sticker-card ${isUnlocked ? "" : "locked"}`;
    card.innerHTML = `
      <div class="sticker-header">
        <span class="sticker-tier-badge">${sticker.tier} · ${sticker.days}</span>
        <span class="sticker-lock-status">
          ${isUnlocked 
            ? `<span style="color:#54B16C">● UNLOCKED</span>` 
            : `<span>🔒 LOCKED</span>`
          }
        </span>
      </div>
      <div class="sticker-artwork-frame">
        ${sticker.iconSvg}
      </div>
      <div class="sticker-info">
        <h4 class="sticker-title">${sticker.title}</h4>
        <p class="sticker-quote">${sticker.quote}</p>
      </div>
      <div class="sticker-footer-meta">
        <span>ASSET OPT: ${sticker.weight}</span>
        <span>AOT VECTOR</span>
      </div>
    `;

    card.addEventListener("click", () => {
      audio.playClick();
      openStickerDetailModal(u, sticker, isUnlocked);
    });

    grid.appendChild(card);
  });
}

function setupTierFilter() {
  const steps = document.querySelectorAll(".tier-step-card");
  steps.forEach(step => {
    step.addEventListener("click", () => {
      audio.playClick();
      steps.forEach(s => s.classList.remove("active"));
      step.classList.add("active");
      activeTierFilter = step.getAttribute("data-tier") || "all";
      renderStickers();
    });
  });
}

// ============================================================================
// 4. THE TAMPER-PROOF VAULT (.POPVAULT PROTOCOL) CRYPTO SANDBOX
// ============================================================================
const authenticPayload = {
  header: "POPV-2026-X1",
  device_uuid: "hw-9a8f4-e0c2-7718",
  created_at: "2026-10-03T04:15:00Z",
  engine_version: "1.4.2",
  streak_count: 14,
  tasks_certified: 42,
  active_universe: "batman_dc",
  tier_state: "Cadet",
  unlocked_stickers: ["Initiation at Dusk", "Batcave Terminal"],
  checksum_seed: "0x7F4A88B2"
};

let isTamperedMode = false;
let currentPayload = JSON.parse(JSON.stringify(authenticPayload));

// Real in-browser HMAC-SHA256 calculation via Web Crypto API
async function computeRealHmac(messageStr, secretKeyStr) {
  try {
    const enc = new TextEncoder();
    const keyData = enc.encode(secretKeyStr);
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      key,
      enc.encode(messageStr)
    );
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    // Fallback pseudo-sha for older sandboxes
    return "8f9d6c34b12a8790c3e456d8123abef049281745263a8b4c9e1029384756ab12";
  }
}

const DEVICE_SECRET = "DEVICE_HARDWARE_ENTROPY_KEY_DO_NOT_EXPOSE";
let authenticSignature = "";

async function initCryptoSandbox() {
  const jsonStr = JSON.stringify(authenticPayload, null, 2);
  authenticSignature = await computeRealHmac(jsonStr, DEVICE_SECRET);
  updateCryptoUI();
}

async function updateCryptoUI() {
  const codeEl = document.getElementById("payloadCodePreview");
  const cipherEl = document.getElementById("ciphertextPreview");
  const sigEl = document.getElementById("signaturePreview");
  const resultBox = document.getElementById("verifyResultBox");

  const payloadString = JSON.stringify(currentPayload, null, 2);
  if (codeEl) {
    if (isTamperedMode) {
      codeEl.innerHTML = escapeHtml(payloadString).replace(
        '"streak_count": 999',
        '<span class="tampered-highlight">"streak_count": 999  // &lt;-- FRAUDULENT INJECTION</span>'
      );
    } else {
      codeEl.innerHTML = escapeHtml(payloadString).replace(
        '"streak_count": 14',
        '<span class="authentic-highlight">"streak_count": 14  // &lt;-- AUTHENTIC VALUE</span>'
      );
    }
  }

  // Simulated AES-256-CBC output
  if (cipherEl) {
    if (isTamperedMode) {
      cipherEl.textContent = "7e4b901a8df9037cba5511...[Tampered Ciphertext ByteStream]";
    } else {
      cipherEl.textContent = "2c90a184f7b2c918ee0421...[AES-256-CBC Encrypted Payload]";
    }
  }

  // Signature display (Header claims the authentic signature)
  if (sigEl) {
    sigEl.textContent = authenticSignature;
  }

  // Reset verification result display
  if (resultBox) {
    resultBox.className = "verify-result-box";
    resultBox.innerHTML = `
      <div class="verify-status-title" style="color: var(--ink-muted);">
        <span>⚙️ STATUS: IDLE</span>
      </div>
      <div class="verify-log">Click "Run Vault Verification Engine" below to execute HMAC-SHA256 signature check over payload.</div>
    `;
  }
}

async function toggleTamperMode() {
  audio.playClick();
  isTamperedMode = !isTamperedMode;
  if (isTamperedMode) {
    currentPayload.streak_count = 999;
    currentPayload.tier_state = "Legend (Forged)";
  } else {
    currentPayload.streak_count = 14;
    currentPayload.tier_state = "Cadet";
  }
  updateCryptoUI();
}

async function runVaultVerification() {
  audio.playStamp();
  const resultBox = document.getElementById("verifyResultBox");
  if (!resultBox) return;

  const payloadString = JSON.stringify(currentPayload, null, 2);
  const computedHash = await computeRealHmac(payloadString, DEVICE_SECRET);

  if (computedHash === authenticSignature && !isTamperedMode) {
    // Valid signature!
    resultBox.className = "verify-result-box pass";
    resultBox.innerHTML = `
      <div class="verify-status-title pass">
        <span>✓ [200 OK] INTEGRITY VERIFIED</span>
      </div>
      <div class="verify-log">
        HMAC-SHA256 matches header signature (${computedHash.substring(0, 16)}...).<br>
        Payload has NOT been altered in transit or text editor. Safe to restore into SQLite tasks.db.
      </div>
    `;
  } else {
    // Tamper detected!
    resultBox.className = "verify-result-box fail";
    resultBox.innerHTML = `
      <div class="verify-status-title fail">
        <span>✗ [ERR_SIGNATURE_MISMATCH] TAMPERING DETECTED</span>
      </div>
      <div class="verify-log">
        <strong>Expected HMAC:</strong> ${authenticSignature.substring(0, 24)}...<br>
        <strong>Computed HMAC:</strong> ${computedHash.substring(0, 24)}...<br>
        <span style="color:#DC2626;">Streak forged (+999). Signature validation failed. Engine rolled back to last trusted checkpoint.</span>
      </div>
    `;
  }
}

// ============================================================================
// 5. MODALS (STAMP REVEAL, STICKER LOUPE, DOWNLOAD APK)
// ============================================================================
function openMorningRevealModal(success, streak) {
  const modal = document.getElementById("morningRevealModal");
  const content = document.getElementById("morningRevealContent");
  if (!modal || !content) return;

  if (success) {
    content.innerHTML = `
      <div class="reveal-seal-badge">
        <span>💮</span>
      </div>
      <div style="text-align: center;">
        <span class="meta-label">MORNING VERIFICATION · 06:00 AM</span>
        <h3 style="font-size: 1.8rem; margin: 8px 0 6px;">Day Certified: Streak ${streak}</h3>
        <p style="font-size: 0.95rem; color: var(--ink-body);">
          The midnight rollover successfully validated $\ge 3$ tasks completed yesterday. Your daily Japanese stationery stamp is permanently embossed.
        </p>
      </div>
      <div style="background-color: var(--bg-tint-soft); border: var(--border-hairline); border-radius: var(--radius-sm); padding: 14px; text-align: center;">
        <span class="meta-label" style="font-size: 10px;">DAILY STICKER UNLOCKED</span>
        <div style="font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700; color: var(--ink-primary); margin-top: 4px;">
          🦇 Batcave Terminal (Cadet Tier)
        </div>
        <p style="font-size: 0.85rem; color: var(--ink-muted); margin-top: 4px; font-style: italic;">
          “Cold crt monitors, encrypted logs, zero outside telemetry.”
        </p>
      </div>
      <button class="btn btn-ink" onclick="closeAllModals()" style="width: 100%;">
        Acknowledge & Begin Today's Log
      </button>
    `;
  } else {
    content.innerHTML = `
      <div class="reveal-seal-badge" style="border-color: #EF4444; background: rgba(239, 68, 68, 0.1);">
        <span>⚠️</span>
      </div>
      <div style="text-align: center;">
        <span class="meta-label" style="color: #DC2626;">GATE MISSED · STREAK RESET</span>
        <h3 style="font-size: 1.8rem; margin: 8px 0 6px;">Streak Reset to 0</h3>
        <p style="font-size: 0.95rem; color: var(--ink-body);">
          Previous streak of ${streak} days ended. The 3-Task Gate requires at least 3 completed entries before 23:59:59. In Treen, paper does not lie.
        </p>
      </div>
      <div style="background-color: #FAFAFA; border: 1px dashed #E5E5E5; border-radius: var(--radius-sm); padding: 14px; text-align: center;">
        <p style="font-size: 0.88rem; color: var(--ink-muted);">
          “Discipline is forged in the return to the desk, not in vanity metrics.”
        </p>
      </div>
      <button class="btn btn-outline" onclick="closeAllModals()" style="width: 100%;">
        Return to the Desk
      </button>
    `;
  }

  modal.classList.add("open");
}

function openStickerDetailModal(universe, sticker, isUnlocked) {
  const modal = document.getElementById("stickerDetailModal");
  const content = document.getElementById("stickerDetailContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: var(--border-hairline); padding-bottom: 12px;">
      <span class="meta-label">${universe.name} · ${sticker.tier}</span>
      <span class="meta-pill ${isUnlocked ? 'accent' : ''}">
        ${isUnlocked ? '● ACTIVE REPOSITORY' : '🔒 CATEGORY ISOLATION'}
      </span>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; height: 160px; background: #FAF9F6; border: 1px dashed #E5E5E5; border-radius: var(--radius-sm); margin: 8px 0;">
      <div style="max-height: 100px; transform: scale(1.35);">
        ${sticker.iconSvg}
      </div>
    </div>

    <div>
      <h3 style="font-size: 1.5rem; margin-bottom: 6px;">${sticker.title}</h3>
      <p style="font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; color: var(--ink-primary); margin-bottom: 12px;">
        ${sticker.quote}
      </p>
      <p style="font-size: 0.92rem; color: var(--ink-body); line-height: 1.6;">
        ${universe.lore}
      </p>
    </div>

    <div style="background-color: var(--bg-tint-soft); border: var(--border-hairline); border-radius: var(--radius-sm); padding: 14px; font-family: var(--font-mono); font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <div><strong>CRITERIA:</strong> ${sticker.days}</div>
      <div><strong>ASSET FOOTPRINT:</strong> ${sticker.weight}</div>
      <div><strong>FORMAT:</strong> Lossless SVG Vector</div>
      <div><strong>PERMISSION:</strong> Zero Storage Req.</div>
    </div>

    <button class="btn btn-ink" onclick="closeAllModals()" style="width: 100%;">
      Close Inspector
    </button>
  `;

  modal.classList.add("open");
}

function openDownloadModal() {
  audio.playClick();
  const modal = document.getElementById("downloadModal");
  if (modal) modal.classList.add("open");
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
}

function copyAdbCommand() {
  const cmd = "adb install treen-task-v1.4.2-arm64-v8a.apk";
  navigator.clipboard.writeText(cmd).then(() => {
    const btn = document.getElementById("copyAdbBtn");
    if (btn) {
      btn.textContent = "COPIED TO CLIPBOARD!";
      setTimeout(() => {
        btn.textContent = "COPY ADB COMMAND";
      }, 2000);
    }
  });
}

function simulateApkDownload() {
  audio.playStamp();
  const btn = document.getElementById("primaryDownloadBtn");
  if (!btn) return;
  btn.textContent = "INITIALIZING BINARY STREAM...";
  setTimeout(() => {
    btn.textContent = "DOWNLOADING (8.4 MB)...";
    setTimeout(() => {
      btn.textContent = "DOWNLOAD COMPLETE · VERIFY SHA-256";
      alert("Treen Task APK v1.4.2 package generated! Checksum: 7f8a92c4... Build certified offline.");
    }, 900);
  }, 400);
}

// Helper to escape HTML strings
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 6. INITIALIZATION & EVENT LISTENERS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Render task list
  renderTasks();

  // Render universe nav & sticker gallery
  renderUniversesNav();
  setupTierFilter();
  renderStickers();

  // Initialize WebCrypto sandbox
  initCryptoSandbox();

  // Task form submission
  const taskForm = document.getElementById("addTaskForm");
  const taskInput = document.getElementById("taskInput");
  if (taskForm && taskInput) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addNewTask(taskInput.value);
      taskInput.value = "";
    });
  }

  // Rollover simulation button
  const rolloverBtn = document.getElementById("simulateRolloverBtn");
  if (rolloverBtn) {
    rolloverBtn.addEventListener("click", simulateMidnightRollover);
  }

  // Crypto tamper toggle
  const tamperToggle = document.getElementById("tamperToggle");
  if (tamperToggle) {
    tamperToggle.addEventListener("change", toggleTamperMode);
  }

  // Crypto verify button
  const verifyBtn = document.getElementById("runCryptoVerifyBtn");
  if (verifyBtn) {
    verifyBtn.addEventListener("click", runVaultVerification);
  }

  // Sound toggle button
  const soundBtn = document.getElementById("soundToggleBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const isSoundOn = audio.toggle();
      soundBtn.classList.toggle("active", isSoundOn);
      soundBtn.innerHTML = `<span>${isSoundOn ? '🔊' : '🔇'}</span> <span>SOUND: ${isSoundOn ? 'ON' : 'OFF'}</span>`;
      if (isSoundOn) audio.playClick();
    });
  }

  // Download APK modal triggers
  const downloadBtns = document.querySelectorAll(".trigger-download-modal");
  downloadBtns.forEach(b => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      openDownloadModal();
    });
  });

  // Modal overlay click to close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Modal close buttons
  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  // Reset tasks simulator button
  const resetBtn = document.getElementById("resetTasksBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      audio.playClick();
      tasks = JSON.parse(JSON.stringify(initialTasks));
      renderTasks();
    });
  }

  // Category Isolation check button
  const testSwitchBtn = document.getElementById("testUniverseSwitchBtn");
  if (testSwitchBtn) {
    testSwitchBtn.addEventListener("click", () => {
      audio.playStamp();
      const currentU = universes[activeUniverseKey];
      if (activeUniverseKey === "batman_dc") {
        alert(
          `✓ SECTOR VERIFIED: You are actively grounded in [${currentU.name}].\n` +
          `Progression: Cadet Tier (Day 14). Keep logging $\\ge 3$ tasks daily to unlock Momentum Tier (Day 22).`
        );
      } else {
        alert(
          `🔒 CATEGORY ISOLATION PROTOCOL ENGAGED:\n\n` +
          `Active Universe: Batman & DC Vigilante (Day 14, Cadet Tier).\n` +
          `Target Universe: ${currentU.name}.\n\n` +
          `Migration Rule: In Treen, you cannot jump between comic universes until completing Tier VI (Legend — 365 unbroken days). Frivolous theme switching is prohibited by system design.`
        );
      }
    });
  }

  // Mobile menu button & drawer links
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      audio.playClick();
      mobileNavDrawer.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
      });
    });
  }

  // Keyboard shortcut listeners: [T] for toggle task, [R] for rollover, [ESC] for modal
  document.addEventListener("keydown", (e) => {
    // Ignore shortcuts when user is focused on an input or textarea
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea") return;

    if (e.key === "Escape") {
      closeAllModals();
      if (mobileNavDrawer) mobileNavDrawer.classList.remove("open");
    } else if (e.key === "t" || e.key === "T") {
      // Toggle first incomplete task or first task
      const firstIncomplete = tasks.find(t => !t.completed);
      if (firstIncomplete) {
        toggleTask(firstIncomplete.id);
      } else if (tasks.length > 0) {
        toggleTask(tasks[0].id);
      }
    } else if (e.key === "r" || e.key === "R") {
      simulateMidnightRollover();
    }
  });
});
