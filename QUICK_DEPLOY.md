# Deploy online in ~10 minutes (easiest path)

## Step 1 — Backend on Render (~5 min)

1. Open: **https://dashboard.render.com/**
2. Sign in with **GitHub** → authorize.
3. Click **New +** → **Web Service**.
4. Connect repo: **Toll-Plaza-college-project**.
5. Use these settings:

| Field | Value |
|-------|--------|
| Name | `toll-plaza-api` |
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start:prod` |
| Plan | **Free** |

6. Click **Create Web Service** → wait until **Live**.
7. Copy the URL at the top, e.g. `https://toll-plaza-api-abc123.onrender.com`

Test: open `https://YOUR-URL.onrender.com/logs` — you should see JSON.

---

## Step 2 — Link backend to Netlify (1 edit)

1. In your project, open **`netlify.toml`** (repo root).
2. Replace `REPLACE-WITH-YOUR-RENDER-URL.onrender.com` with your real Render host  
   (example: `toll-plaza-api-abc123.onrender.com`).
3. Push to GitHub (GitHub Desktop → Commit → Push).

---

## Step 3 — Frontend on Netlify (~5 min)

1. Open: **https://app.netlify.com/**
2. Sign in with **GitHub**.
3. **Add new site** → **Import an existing project**.
4. Choose **Toll-Plaza-college-project**.
5. Netlify reads `netlify.toml` automatically — click **Deploy**.
6. Wait until **Published**.
7. Open your site URL, e.g. `https://sparkly-name.netlify.app`

**That URL is your live app** — share it with your teacher.

---

## Checklist

- [ ] Render backend **Live**
- [ ] `netlify.toml` has your real Render URL
- [ ] Pushed to GitHub
- [ ] Netlify deploy **Published**
- [ ] Live site shows the toll table

---

## If the dashboard is empty

1. Confirm Render `/logs` works in the browser.
2. Confirm `netlify.toml` proxy URL is correct (no `https://` in the `to =` host — only the hostname in our template; the file uses full URL in `to =` line).
3. Netlify → **Deploys** → **Trigger deploy** after fixing `netlify.toml`.

---

## Submit to college

| Item | Link |
|------|------|
| GitHub | https://github.com/RogerRWT/Toll-Plaza-college-project |
| Live app | Your `https://….netlify.app` URL |
