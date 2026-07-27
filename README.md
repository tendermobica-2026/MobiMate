# MobiMate — Mobica Material Price List (PWA)

Single-file PWA. Same stack as MT-Track: HTML + Firebase Realtime Database + GitHub → Vercel + versioned service-worker cache. Installable on laptop & mobile, logo as the app icon.

**Current version:** `v1.04` / cache `mobimate-v2026.07.27-4`

## Files in GitHub
```
index.html   sw.js   manifest.json
icons/icon-192.png  icons/icon-512.png  icons/icon-maskable-512.png  icons/logo-mark.png
```
**This update (v1.04) — upload these:** `index.html`, `sw.js` (only these changed).

## What changed in v1.04
- **Accessories added** — your accessories price list (8 categories, 112 items) is now in the app alongside materials, working the same way (same columns, prices, EGP, search, chat, history, notifications).
  - New **🧰 Accessories Categories** dropdown in the top bar, beside **📂 Material Categories**, before Activity.
  - New **Accessories Categories** collapsible card on the Dashboard, beside the Material Categories card, before the search box.
  - Accessories auto-load on first sign-in (total now 277 items = 165 materials + 112 accessories).
- **Search** now returns and shows material/accessory **name, measure unit, specs and note**, split into Materials and Accessories groups.
- **Users & Roles** card removed from the Lists tab (passwords are managed in 👤 → 🔑 Change Passwords; name/title lists in the Manage… screens).

## What changed in v1.03
- **New logo** — your attached icon is now the app icon (home screen / install), the top-bar mark, and the login mark. Embedded in `index.html` so it never breaks, and regenerated as the PWA icons.
- **Change Passwords → 4 group passwords, one Save:** 👑 Admin Password, 📐 Tender User Password, 🛒 Purchasing User Password, 👔 Top Management User Password. One password per group (applies to everyone in it), a single common Save. (The 4th login group `Executive` was renamed to **Top Management**.)
- **Every management screen has one common Save** — Change Passwords and all three "Manage … List" screens edit a working copy and commit with a single Save button.
- **Automatic notifications:**
  - **Any change anyone makes** in the app → notified to **admins**.
  - **Any price change (and FX change)** → notified to **every user**.
  - Notifications show the actor's **name + title** (e.g. "Eng. Ahmed Ibrahim · Department Manager"), and tapping one jumps to that item and highlights it.
- **Install + notifications:** 👤 → **Install App on this device** (or the browser's Add-to-Home-Screen), and **Notifications: ON/OFF**. The app asks for notification permission on sign-in.

## Install (laptop & mobile)
- **Laptop (Chrome/Edge):** open the Vercel URL → click the install icon in the address bar, or 👤 → Install App.
- **Android:** browser menu → Install app / Add to Home Screen.
- **iPhone/iPad (Safari):** Share → Add to Home Screen.
Once installed it runs full-screen with the logo icon and can show notifications.

## Roles & default logins
| Group | Users | Password |
|---|---|---|
| 👑 Admin | Nourhan Mohamed (Deputy Director), Eng. Ahmed Ibrahim (Department Manager) | 1111 |
| 📐 Tender | Eng. Yosry Faltas, Arsany Ezzat, Maram, Eman Essam | 2222 |
| 🛒 Purchasing | Purchasing Dept. | 3333 |
| 👔 Top Management | Rania Ahmed (Commercial Manager) | 4444 |
Change any group's password in-app: 👤 → 🔑 Change Passwords.

## Going online (different users / places, same data)
The app syncs automatically once your Firebase config is pasted into `FIREBASE_CONFIG` at the top of `index.html` (keep `DB_ROOT='mobimate'`), then set DB rules:
```json
{ "rules": { "mobimate": { ".read": true, ".write": true } } }
```
Send me your MT-Track Firebase config and I'll wire it in and return the file. Until then each device is local.

## Your workflow
Tell me the change → I send back only the changed files + names → you upload to GitHub → Vercel auto-deploys. Version strings bumped each time so installed devices auto-update.
