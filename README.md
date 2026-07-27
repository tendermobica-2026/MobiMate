# MobiMate — Mobica Material Price List (PWA)

Single-file PWA. Same stack as MT-Track: HTML + Firebase Realtime Database + GitHub → Vercel + versioned service-worker cache. Logo-based peach/orange + brown scheme, MT-Track-style interface, fully responsive (desktop / laptop / mobile / iPhone).

**Current version:** `v1.02` / cache `mobimate-v2026.07.27-2`

## Files (full set in GitHub)
```
index.html   sw.js   manifest.json
icons/icon-192.png  icons/icon-512.png  icons/icon-maskable-512.png  icons/logo-mark.png
```
**This update (v1.02) — only these changed, upload just them:** `index.html`, `sw.js`

## What changed in v1.02
- **Logo fixed** — embedded inside `index.html` (base64), always shows: top-bar mark, login mark, and PWA/home-screen icon.
- **Material Categories dropdown fixed** — the collapse button beside Dashboard opens a floating menu (Dashboard + all 18 headers with counts) on every page; no longer clipped by the tab bar.
- **All collapse panels start closed** — every collapsible card opens on tap and closes again; nothing forced open.
- **Laptop layout** — content centered at 1320px max width, MT-Track proportions.
- **Top-bar icons & user menu (MT-Track style):**
  - ↻ Refresh — reloads/redraws the app.
  - 🔔 Alerts — badge count; every change notifies all users; tapping a notification jumps to that item and highlights it.
  - ↩️ Undo — admin only, badge shows stacked steps; undoes last actions one by one.
  - 👤 User chip → **Current User** panel (Name / Title / Access) with:
    - 🔑 Change Passwords (admins change anyone; others change own)
    - 👷 Manage Tender Engineers List — add/remove names + auto-titles (admins only)
    - 🛒 Manage Purchasing Engineers List — add/remove names + auto-titles (admins only)
    - 👑 Manage Top Management Auto-Titles — add/remove names + auto-titles (admins only)
    - 🔔 Notifications: ON/OFF toggle
    - Close / Sign Out

## Going online (different users, different places, same data) — needs one thing from you
The app is built for Firebase Realtime Database and syncs automatically **once your Firebase config is pasted in.** Until then each device uses its own local storage.
1. Paste your MT-Track Firebase config into `FIREBASE_CONFIG` at the top of `index.html` (keep `DB_ROOT='mobimate'` so it stays separate from MT-Track).
2. Firebase console → Realtime Database → Rules:
```json
{ "rules": { "mobimate": { ".read": true, ".write": true } } }
```
Send me the config object and I'll wire it in and return the file.

## Roles & default logins
| Role | User | Password |
|---|---|---|
| 👑 Admin | Nourhan Mohamed (Deputy Director) | 1111 |
| 👑 Admin | Eng. Ahmed Ibrahim (Department Manager) | 1111 |
| 📐 Tender | Eng. Yosry Faltas / Arsany Ezzat / Maram / Eman Essam | 2222 |
| 🛒 Purchasing | Purchasing Dept. | 3333 |
| 👔 Executive | Rania Ahmed (Commercial Manager) | 4444 |

Passwords are changeable in-app via 👤 → 🔑 Change Passwords.

## Price-change alerts
A price edit broadcasts a 💲 alert to everyone only when done by Admin, Eng. Ahmed Ibrahim, or Purchasing.

## Your workflow
1. You tell me the change.
2. I edit and send back only the files that changed + exact filenames.
3. You upload those files to GitHub. Vercel auto-deploys. No other steps.
Version strings are bumped every change so installed phones auto-update.
