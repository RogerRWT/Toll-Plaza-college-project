# Toll Plaza Operator Dashboard

A mini full-stack application for toll plaza operators to monitor vehicle entries, view automatically calculated toll fees, filter records, simulate new entries, and manually flag violations.

## Project Structure

```
toll-plaza-app/
├── backend/     # NestJS API (fee calculator + in-memory store)
├── frontend/    # Angular dashboard
└── README.md
```

## Features

### Backend (NestJS)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/logs` | `GET` | Fetch all toll records (newest first) |
| `/logs` | `POST` | Record a new vehicle entry |
| `/logs/:id/flag` | `PATCH` | Manually flag a vehicle (e.g. Violation) |

**Automatic fee calculation**

| Vehicle Type | Fee |
|--------------|-----|
| Car | $5.00 |
| Motorcycle | $2.00 |
| Truck | $10.00 |
| Official / Government | $0.00 |

New entries default to **Pending** status. Operators can flag a record as **Violation** from the dashboard.

### Frontend (Angular)

- Responsive data table: License Plate, Vehicle Type, Timestamp, Toll Fee (USD), Status
- Search by license plate
- Dropdown filter by vehicle type
- Manual entry form (license plate, vehicle type, official/government checkbox)
- Angular `TollLogService` + TypeScript interfaces for strict typing

## Prerequisites

- **Node.js** 18+ and **npm** (see setup below if `npm` is not found)
- **Git** (optional; on macOS run `xcode-select --install` if `git` is missing)

### First-time setup (macOS without Homebrew)

```bash
bash scripts/setup-node.sh
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
cd backend && npm install
cd ../frontend && npm install
```

Add the `export PATH=...` line to `~/.zshrc` so `node` and `npm` work in every terminal.

## Running Locally

**Option A — one command (both servers):**

```bash
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
bash scripts/dev.sh
```

**Option B — two terminals:**

Backend (port 3000):

```bash
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
cd backend && npm run start:dev
```

Frontend (port 4200):

```bash
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
cd frontend && npm start
```

Open **http://localhost:4200** in your browser.

## Example API Usage

**Create entry**

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d '{"licensePlate":"NEW-555","vehicleType":"Car"}'
```

**Official vehicle (zero fee)**

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d '{"licensePlate":"GOV-777","vehicleType":"Truck","isOfficial":true}'
```

**Flag violation**

```bash
curl -X PATCH http://localhost:3000/logs/<LOG_ID>/flag \
  -H "Content-Type: application/json" \
  -d '{"status":"Violation"}'
```

## GitHub Submission (College Project)

Your repo already has the required layout:

- `frontend/` — Angular client
- `backend/` — NestJS server
- `README.md` — run instructions (this file)

Submit this URL to your instructor:

**https://github.com/RogerRWT/Toll-Plaza-college-project**

### Step 1 — Install Git (required on your Mac)

Open **Terminal** and run:

```bash
xcode-select --install
```

Click **Install** in the dialog, wait until it finishes, then verify:

```bash
git --version
```

### Step 2 — Create a GitHub account and repository

1. Go to [https://github.com](https://github.com) and sign up or log in.
2. Click **+** (top right) → **New repository**.
3. Repository name: `toll-plaza-app` (or any name you prefer).
4. Set visibility to **Public** (so your instructor can open the link).
5. **Do not** check “Add a README” (you already have one locally).
6. Click **Create repository**.
7. Copy the repository URL GitHub shows, e.g.  
   `https://github.com/yourname/toll-plaza-app.git`

### Step 3 — Push your project from Terminal

Push to your repository:

```bash
cd /Users/kamalroy/Projects/toll-plaza-app
bash scripts/push-to-roger-repo.sh
```

Or manually:

```bash
cd /Users/kamalroy/Projects/toll-plaza-app
git init
git add .
git commit -m "Toll Plaza college project: NestJS backend and Angular frontend"
git branch -M main
git remote add origin https://github.com/RogerRWT/Toll-Plaza-college-project.git
git pull origin main --allow-unrelated-histories --no-edit
git push -u origin main
```

GitHub will ask you to sign in the first time. Use one of these:

- **Browser login** (recommended): follow the `gh auth login` or GitHub credential prompt.
- **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens → create a token with `repo` scope, and use it as the password when `git push` asks.

### Step 4 — Verify before you submit

Open your repo in the browser and confirm you see:

- [ ] `frontend/` folder
- [ ] `backend/` folder
- [ ] `README.md` at the root
- [ ] No `node_modules/` folders (they are ignored by `.gitignore`)

### Alternative — GitHub Desktop (no Terminal commands)

1. Install [GitHub Desktop](https://desktop.github.com/).
2. **File → Add Local Repository** → choose `/Users/kamalroy/Projects/toll-plaza-app`.
3. If asked to create a repo, click **create a repository**.
4. Write a summary, click **Commit to main**.
5. **Publish repository** to your GitHub account (name: `toll-plaza-app`).
6. Copy the browser URL and submit that link.

### What to hand in

| Requirement | What you submit |
|-------------|-----------------|
| GitHub link with `frontend` and `backend` | `https://github.com/YOUR_USERNAME/toll-plaza-app` |
| README with local run steps | Already in this file (sections above) |

## Tech Stack

- **Backend:** NestJS 10, class-validator, in-memory persistence
- **Frontend:** Angular 18 (standalone components), HttpClient, reactive signals

## License

MIT
