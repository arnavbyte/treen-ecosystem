# Treen Ecosystem Web Experience

> **Quiet discipline, crafted in paper and code.**
> An offline-first, tamper-proof, Japanese stationery-inspired task & habit engine.

---

## 1. Design System & Broadsheet Aesthetics

The web experience merges two core pillars:
1. **Treen Core Soul:** Quiet editorial stationery (`#FAF9F6`), zero cloud permissions, authenticated `.popvault` backups, and comic-themed milestone gamification (Batman, Marvel, Shonen, Manhwa, Cyberpunk, Anti-Heroes).
2. **Sparkles Broadsheet Style:** Near-monochrome broadsheet layout, dense chunky serif headlines (*Fraunces* / *Newsreader* / *Lora*), wide-tracked sans labels (*Inter* with `letter-spacing: 0.28em`), 1.0px hairline borders (`#E5E5E5`), flat non-elevated cards, and a singular green accent band (`#54B16C`).

### Design Tokens Summary
| Token | Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#FAF9F6` | Warm Japanese stationery paper white |
| `--bg-pure` | `#FFFFFF` | Flat card surface |
| `--bg-tint-soft` | `#FAFAFA` / `#F4F4F5` | Alternating broadsheet section tint |
| `--ink-primary` | `#0A0A0A` | Dense broadsheet serif display headlines |
| `--ink-zinc` | `#18181B` | Zinc ink, universal interactive surface |
| `--ink-body` | `#52525C` | Editorial sans-serif prose |
| `--accent-green` | `#54B16C` | Sole chromatic UI band (Capsule pass & Footer) |
| `--border-hairline` | `1.0px solid #E5E5E5` | Clean broadsheet rules & grid divisions |
| `--radius-sm / md` | `10px – 14px` | Strict container and button geometry |
| `--tracking-wide` | `0.28em` | Signature uppercase editorial badges |

---

## 2. Interactive Features & Architecture

### A. The 3-Task Milestone Engine
- **The 3-Task Gate:** No fractional credit for finishing 1 or 2 tasks. The gate demands $\ge 3$ tasks daily to qualify for streak progression and daily stickers.
- **Dynamic Capsule Gauge:** Dynamically calculates progress percentage and fills with `#54B16C` once 3/3 tasks are achieved.
- **Midnight Rollover Simulator (11:59 PM):** Evaluates daily performance; increments streak if $\ge 3$, or resets to 0 (hardcore broadsheet accountability).
- **Next-Day Reveal:** Celebratory morning modal displaying embossed stationery stamps and newly unlocked stickers.

### B. The 6 Comic Milestone Universes & Category Isolation
- 6 Universes:
  1. 🦇 **Batman & DC Vigilante** (The Gotham Discipline Archive)
  2. 🕷️ **Marvel & Spider-Man** (Queens Grit & Great Responsibility)
  3. ⚔️ **Japanese Shonen Manga** (The Unyielding Training Arc)
  4. 👑 **Korean Manhwa** (The Solo Sovereign System)
  5. 🏙️ **Anime Classic & Cyberpunk** (Neo-Tokyo Wireframe & Cybernetic Will)
  6. 🕶️ **Graphic Novels & Anti-Heroes** (The Cynic's Watch & Stark Realism)
- **Category Isolation:** Users commit to one universe and progress through 6 tiers (Rookie, Cadet, Momentum, Habit, Iron Will, Legend). Theme migration is locked until 365-day Legend completion.
- **36 Optimized Stickers:** 75.5% downsampled lossless SVG vectors with lore quotes and specification loupe modal.

### C. The `.popvault` Protocol & Cryptographic Sandbox
- Formulated as:
  $$\text{Payload} \xrightarrow{\text{AES-256 (CBC)}} \text{Ciphertext} \xrightarrow{\text{HMAC-SHA256}} \text{Signature}$$
- Built with the native **Web Crypto API** (`window.crypto.subtle`).
- Includes a live **Tamper Attack Simulator** where users can inject a fraudulent streak (`+999`) and watch the cryptographic validator catch the HMAC mismatch in real time.

### D. Tactile Stationery Audio Engine
- Synthesized in real time using the **Web Audio API** (zero audio file downloads).
- Produces quiet typewriter switches on task toggle and resonant stationery stamps on rollover.

---

## 3. Local Development

Run the lightweight local server:
```bash
python -m http.server 8080
```
Open your browser at `http://localhost:8080/`.

### Keyboard Shortcuts
- `[T]`: Toggle the next incomplete task in the 3-Task Gate simulator.
- `[R]`: Fast-forward to 11:59 PM midnight rollover.
- `[ESC]`: Dismiss open modals and navigation drawers.
