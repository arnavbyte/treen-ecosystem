# Treen Ecosystem Web Experience

> **Quiet, sovereign utilities for deliberate work.**  
> Built around Japanese stationery traditions, local SQLite persistence, and cryptographic data sovereignty.

---

## 1. Site Routing & Page Structure

```
/
├── index.html       # PAGE 1: Ecosystem (Home & Manifesto)
├── suite.html       # PAGE 2: Applications Hub / Suite (4-Card Broadsheet Grid)
├── task.html        # PAGE 3: Treen Task (Deep Dive Product Page)
├── styles.css       # Unified Design Tokens & Broadsheet Stylesheet
├── app.js           # Multi-Page Client Interactions
└── assets/
    └── brand/
        ├── treen-wordmark.png     # Primary Wordmark (Nav & Mockup Watermark)
        ├── treen-suite-logo.png    # Full Brand Logo with Subtitle (Hero Lockup)
        └── treen-mark-square.png   # Square Avatar / App Icon
```

---

## 2. Pages Breakdown

### PAGE 1: Ecosystem (Home) — [`index.html`](index.html)
- **Manifesto & Hero:** Features the official brand lockup (*Treen — OFFLINE UTILITY SUITE*).
- **Three Foundational Pillars:**
  1. *Offline by Default (SQLite):* Embedded SQLite 3.45 with WAL mode. All state writes execute instantly on local metal with zero background telemetry beacons.
  2. *Data Ownership (.popvault):* Backups are encrypted via AES-256-CBC and authenticated with HMAC-SHA256 signatures. Modifications outside the app invalidate the signature immediately.
  3. *Calm Interfaces:* Warm archival paper surface (`#FAF9F6`) designed to reduce screen fatigue, eliminate notification friction, and restore an analog cadence.
- **Suite Hub Navigation:** Direct entry to the Applications Suite (`suite.html`).

### PAGE 2: Applications Hub / Suite — [`suite.html`](suite.html)
- **Broadsheet 4-Card Grid:**
  - **Card 1 — Treen Task (Live / Active):**
    - Status: `"AVAILABLE NOW"` (subtle `#54B16C` green accent pill).
    - Summary: Offline-first task manager with simple checkpoints.
    - Actions: Direct links to "View Details →" (`task.html`) and "Download APK".
  - **Card 2 — Mystery Utility 02 (Locked):**
    - Status: `"COMING LATE NOVEMBER"` (muted grey pill).
    - Visual: Minimalist locked card with lock icon (🔒).
    - Teaser: *"A quiet offline utility currently in development."*
  - **Card 3 — Mystery Utility 03 (Locked):**
    - Status: `"COMING SOON"` (muted grey pill).
    - Visual: Dashed hairline border (`#E5E5E5`).
    - Teaser: *"Under active development."*
  - **Card 4 — Mystery Utility 04 (Locked):**
    - Status: `"COMING SOON"` (muted grey pill).
    - Visual: Dashed hairline border (`#E5E5E5`).
    - Teaser: *"Under active development."*

### PAGE 3: Treen Task — Deep Dive — [`task.html`](task.html)
- **Product Overview:** Quiet, distraction-free daily planning interface.
- **Embedded UI Mockup:**
  - Paper canvas `#FAF9F6`, streak card, progress capsule, today's tasks, completed list, and subtle Treen watermark (`opacity: 0.04`).
  - Interactive checkboxes with completion timestamps and green `#54B16C` ticks.
- **Core Mechanics (Factually stated, no hype):**
  - *Checkpoints & Sub-tasks:* Task breakdowns with completion timestamps.
  - *Habit Continuity:* Completing $\ge 3$ daily tasks logs a milestone badge.
  - *Curated Sets:* 6 themed milestone packs (Batman/DC, Marvel, Shonen, Manhwa, Cyberpunk, Anti-Heroes).
- **Download Action:** Filled ink button (`#18181B`) for direct APK download (`8.4 MB`).

---

## 3. Design System Tokens

| Token | Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#FAF9F6` | Warm Japanese stationery paper background |
| `--bg-card` | `#FFFFFF` | Flat card surface |
| `--ink-primary` | `#18181B` | Headings, brand wordmarks, primary actions |
| `--ink-body` | `#52525C` | Neutral body copy |
| `--ink-muted` | `#71717B` | Muted section labels & timestamps |
| `--accent-green` | `#54B16C` | Reserved strictly for completion ticks & full-width footer |
| `--border-hairline`| `1px solid #E5E5E5` | Clean broadsheet rules and dividers |
| `--radius-btn` | `10px` | Strict radius for buttons, badges, and pills |
| `--radius-card` | `14px` | Strict radius for content cards and mockups |
| `--tracking-label`| `0.2em` | Uppercase section labels with wide tracking |

---

## 4. Local Execution

Run the built-in HTTP server:
```bash
python -m http.server 8080
```
- **Page 1 (Ecosystem):** [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Page 2 (Suite Hub):** [http://localhost:8080/suite.html](http://localhost:8080/suite.html)
- **Page 3 (Treen Task):** [http://localhost:8080/task.html](http://localhost:8080/task.html)
