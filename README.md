# Treen Ecosystem Web Experience

> **Quiet, sovereign utilities for deliberate work.**
> Built around Japanese stationery traditions, local SQLite persistence, and cryptographic data sovereignty.

---

## 1. Core Direction & Philosophy

A clean, minimal **3-page website** embodying the Treen Ecosystem:
- **Tone:** Quiet, confident, editorial, and functional.
- **Restraint:** Tasks and milestones are treated as quiet product utilities rather than hyped gamification loops.
- **Visual Style:** Broadsheet stationery aesthetic (warm paper `#FAF9F6`, deep charcoal ink `#18181B`, muted grey text `#71717B` / `#52525C`, 1px borders `#E5E5E5`, zero heavy drop shadows). The footer uses full-bleed green `#54B16C`.

---

## 2. Multi-Page Architecture

```
/
├── index.html       # PAGE 1: Ecosystem (Home & Manifesto)
├── task.html        # PAGE 2: Modules — Treen Task (Product Showcase & Mockup)
├── vault.html       # PAGE 3: The Vault (Technical Architecture & Specifications)
├── styles.css       # Unified Design Tokens & Broadsheet Stylesheet
├── app.js           # Multi-Page Interactivity & WebCrypto Engine
└── assets/
    └── brand/
        ├── treen-wordmark.png     # Primary Wordmark (Nav & Subtle Watermark)
        ├── treen-suite-logo.png    # Full Brand Logo with Subtitle
        └── treen-mark-square.png   # Square Avatar / App Icon
```

### Page Breakdown

### PAGE 1: Ecosystem (Home) — [`index.html`](index.html)
- **Manifesto & Hero:** Features the official brand lockup (*Treen — OFFLINE UTILITY SUITE*).
- **Three Foundational Tenets:**
  1. *Offline by Default:* Embedded SQLite 3.45 with WAL mode. Zero network calls, zero telemetry SDKs.
  2. *Complete Data Ownership:* Cryptographically signed `.popvault` backups (AES-256-CBC + HMAC-SHA256).
  3. *Calm Interfaces:* Archival paper surface (`#FAF9F6`) designed to eliminate notification fatigue.
- **Module Directory:** Concise cards linking directly to Treen Task and The Vault.

### PAGE 2: Modules — Treen Task — [`task.html`](task.html)
- **Product Overview:** A quiet daily planner built around small, consistent execution.
- **Product Highlights:**
  - *Daily Planning:* Simple, focused lists with sub-checkpoints and completion timestamps.
  - *Streak & Habit Logic:* Factually states the rule (3+ daily tasks maintain momentum and log a milestone badge).
  - *Themed Collections:* 6 curated milestone sets (Batman/DC, Marvel, Shonen, Manhwa, Cyberpunk, Anti-Heroes) locked until completed.
- **Visual Interface Preview:**
  - Clean stationery mockup (`#FAF9F6`) with an ultra-subtle background watermark (`opacity: 0.04`).
  - Interactive checkboxes with completion ticks turning `#54B16C` and logging completion timestamps.

### PAGE 3: The Vault — [`vault.html`](vault.html)
- **Technical Overview:** Transparent specifications for verification over trust.
- **Core Subsystems:**
  - *Local Database:* SQLite 3.45 with scoped Android storage (`/data/user/0/com.treen.task/`). Zero external permissions.
  - *Tamper-Proof Vault:* Authenticated Encrypt-then-MAC pipeline (AES-256-CBC + HMAC-SHA256).
  - *Binary Footprint:* AOT compiled native executable under 25MB (8.4 MB core).
- **Interactive Verification Console:** Live Web Crypto API sandbox demonstrating that modifying a streak record outside the app immediately invalidates the HMAC signature upon restore.
- **Production Schema:** DDL table definitions for `tasks`, `daily_capsules`, and `vault_snapshots`.

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
Then navigate to:
- **Ecosystem (Home):** [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Treen Task:** [http://localhost:8080/task.html](http://localhost:8080/task.html)
- **The Vault:** [http://localhost:8080/vault.html](http://localhost:8080/vault.html)
