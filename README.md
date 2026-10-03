# Treen Ecosystem — Web Sanctuary

The official web experience for the **Treen Ecosystem** — a suite of quiet, offline-first digital utilities built around Japanese stationery aesthetics, local SQLite persistence, and absolute data sovereignty. No internet permission. No storage permissions. No tracking.

---

## Architecture & Design Tokens

- **Aesthetic**: Broadsheet & stationery minimalism.
- **Canvas**: `#FAF9F6` (Warm paper)
- **Ink / Typography**: `#18181B` (Deep charcoal), `#52525C` (Body copy), `#71717B` (Muted metadata)
- **Accent**: `#54B16C` (Sole green accent for completion markers and full-bleed footer)
- **Structure**: 1px borders (`#E5E5E5`), zero heavy drop shadows, 10px–14px corner radii.

---

## Site Pages

1. **Ecosystem Manifesto (`index.html`)**: Introduces the local-first philosophy, zero-telemetry architecture, and cryptographic backup model (`.popvault`).
2. **Applications Hub (`suite.html`)**: A 4-card overview featuring the live flagship module (**Treen Task**) alongside upcoming locked utilities.
3. **Treen Task Showcase (`task.html`)**: Deep-dive product showcase featuring daily checkpoint workflows, midnight milestone evaluations, and direct APK installation.

---

## Deployment & Local Setup

This project is built using vanilla HTML5, CSS3, and modern ES modules with zero build steps or external bundler dependencies.

### Local Development
Open any `.html` file directly in a modern web browser or serve locally:
```bash
npx serve .
```
