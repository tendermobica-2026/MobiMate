# MobiMate — Mobica Material Price List (PWA)

Single-file PWA. Same stack as MT-Track: HTML + Firebase Realtime Database + GitHub → Vercel + versioned service-worker cache. Orange scheme, MT-Track-style interface.

## Files (upload ALL of these to GitHub)
```
index.html      ← the whole app (UI + logic + 165-material price list embedded)
sw.js           ← service worker (offline cache)
manifest.json   ← PWA manifest
icons/icon-192.png
icons/icon-512.png
icons/icon-maskable-512.png
```

## Your workflow (what you asked for)
1. You tell me the change.
2. I edit and send you back **only the files that changed** + the exact filenames.
3. You upload those files to the GitHub repo. Vercel auto-deploys. Done — no other steps.

On every version bump I change all three version strings for you so the phones auto-update:
- `APP_VERSION` in `index.html`
- `CACHE_NAME` in `index.html`
- `CACHE` in `sw.js`
(All three must match. Current = `v1.00` / `mobimate-v2026.07.24`.)

## Interface (matches the MT-Track screenshot, orange)
- **Row 1:** MobiMate name + logo → Live-sync pill → Refresh → 🔔 bell / ↩️ undo / 👁️ view-as icons → user chip with role badge.
- **Row 2:** Welcome message (same greeting logic as MT-Track: "Good morning, Nourhan!" + a rotating line per role).
- **Pages (pill tabs):** Dashboard, then **one page per Main Classification from the Excel** (18 categories), then Activity, Bin, Lists.
- Each category page shows its materials in Excel-style columns: Material · Notes/Specs · Unit · Price Before (USD) · **Price Now (USD)** · **Price (EGP = USD × FX)** · % change · Supplier · Actions.

## Price-change alerts (requirement 3)
A price edit broadcasts a 💲 alert to **everyone** only when done by:
- **Admin** (any admin user), or
- **Eng. Ahmed Ibrahim**, or
- **Purchasing** role.

Anyone else can still save a price (per their role) but it will **not** broadcast — they get a quiet "no broadcast" toast. Add more auto-alert names by editing `PRICE_ALERTERS` at the top of `index.html`.

## Roles & default logins
| Role | User | Password | Can do |
|---|---|---|---|
| 👑 Admin | Nourhan Mohamed | 1111 | everything |
| 👑 Admin | Eng. Ahmed Ibrahim | 1111 | everything + price alerts |
| 📐 Tender | Eng. Yosry Faltas / Arsany Ezzat / Maram / Eman Essam | 2222 | add + edit name/price/unit |
| 🛒 Purchasing | Purchasing Dept. | 3333 | edit price + notes, **price alerts** |
| 👔 Executive | Rania Ahmed | 4444 | view only |

> Only Admin password (1111) was specified by you. Tender/Purchasing/Executive passwords (2222/3333/4444) are placeholders — change them in **Lists → Users** any time.

## First run
1. Serve the folder (SW needs http, not file://):  `python -m http.server 8000`  → open `http://localhost:8000`
2. Login Admin / Nourhan Mohamed / 1111.
3. Tap **🌱 Load Price List** to import the 165 materials (already embedded from your Excel). Edit the FX rate in **Lists → FX Rate** (default 50).

## Turn on team sync (Firebase)
1. In `index.html` paste MT-Track's Firebase config into `FIREBASE_CONFIG` (keep `DB_ROOT='mobimate'` so it stays separate from MT-Track data in the same database).
2. Firebase console → Realtime Database → Rules:
```json
{ "rules": { "mobimate": { ".read": true, ".write": true } } }
```
Until you paste the config the app runs on this browser's local storage (single device).

## Deploy (GitHub → Vercel)
```bash
git add . && git commit -m "MobiMate v1.00" && git push
```
Vercel: New Project → import repo → Framework **Other** → Output dir `.` → Deploy → open URL on phone → **Add to Home Screen**.

## Features
Universal search (Ctrl/⌘-K) with jump-to-row · category-grouped autocomplete from the master list · 🔔 notifications + push · ↩️ 20-step undo (admin, Ctrl-Z) · 👁️ view-as any role · per-material chat + price history · activity log with filters + CSV · dashboard (materials-by-category + price-change split) · CSV export (all / per category / activity) · JSON backup & restore · print · offline PWA with auto-update toast.
