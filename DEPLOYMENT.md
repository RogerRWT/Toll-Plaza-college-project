# Deploy Toll Plaza Online (Free)

Run the app on the internet so anyone can open a link — not only `localhost`.

You deploy **two parts**:

| Part | Host (free tier) | Example URL |
|------|------------------|-------------|
| **Backend** (NestJS API) | [Render](https://render.com) | `https://toll-plaza-api.onrender.com` |
| **Frontend** (Angular UI) | [Netlify](https://netlify.com) or [Vercel](https://vercel.com) | `https://toll-plaza-dashboard.netlify.app` |

> **Note:** The backend uses in-memory storage. Data resets when the server restarts (fine for demos/college).

---

## Part 1 — Deploy the backend (API)

### A. Push code to GitHub

Your repo: https://github.com/RogerRWT/Toll-Plaza-college-project

### B. Create a Render web service

1. Sign up at https://render.com (GitHub login).
2. **New +** → **Web Service**.
3. Connect repository `Toll-Plaza-college-project`.
4. Settings:

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start:prod` |
| **Instance type** | Free |

5. **Environment variables** (optional for now):

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `http://localhost:4200` *(update after frontend deploy)* |

6. Click **Create Web Service**.
7. Wait until status is **Live**.
8. Copy your API URL, e.g. `https://toll-plaza-api-xxxx.onrender.com`
9. Test in browser: `https://YOUR-API-URL.onrender.com/logs` → should show JSON.

---

## Part 2 — Point the frontend to the live API

Edit `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-API-URL.onrender.com/logs',  // ← your Render URL + /logs
};
```

Commit and push to GitHub:

```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Set production API URL for online deployment"
git push
```

---

## Part 3 — Deploy the frontend (dashboard)

### Option A — Netlify (recommended)

1. Sign up at https://netlify.com (GitHub login).
2. **Add new site** → **Import an existing project** → GitHub → select `Toll-Plaza-college-project`.
3. Settings:

| Setting | Value |
|---------|--------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist/toll-plaza-frontend/browser` |

4. Deploy. Copy your site URL, e.g. `https://random-name.netlify.app`.

### Option B — Vercel

1. https://vercel.com → **Add New Project** → import repo.
2. **Root Directory:** `frontend`
3. Build/output are read from `frontend/vercel.json`.
4. Deploy and copy the URL.

---

## Part 4 — Allow the frontend to call the API (CORS)

On **Render**, open your backend service → **Environment**:

| Key | Value |
|-----|--------|
| `CORS_ORIGIN` | `https://YOUR-NETLIFY-URL.netlify.app` |

(No trailing slash. If you use Vercel, use that URL instead.)

Click **Save Changes** — Render will redeploy.

---

## Part 5 — Test the live app

1. Open your **Netlify/Vercel URL** in a browser.
2. You should see the toll table and be able to add entries.
3. If you see a connection error, check:
   - `environment.prod.ts` has the correct API URL ending in `/logs`
   - `CORS_ORIGIN` on Render matches your frontend URL exactly
   - Backend on Render is **Live** (free tier may sleep — first load can take ~30s)

---

## What to submit to college (online demo)

| Item | Example |
|------|---------|
| GitHub repo | https://github.com/RogerRWT/Toll-Plaza-college-project |
| Live dashboard | `https://your-site.netlify.app` |
| Live API (optional) | `https://your-api.onrender.com/logs` |

Mention in README that the instructor can use **either** local setup (README) **or** the live link.

---

## Costs

Render, Netlify, and Vercel free tiers are enough for a college project. Free backends may **spin down** after inactivity; the first request after sleep is slow.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend loads but no data | Wrong `apiUrl` in `environment.prod.ts` or CORS not set |
| CORS error in browser console | Set `CORS_ORIGIN` on Render to your exact frontend URL |
| API very slow first time | Render free tier waking up — wait and refresh |
| 404 on Netlify routes | `netlify.toml` redirects are included — redeploy |
