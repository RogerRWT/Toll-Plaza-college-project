# Toll Plaza Operator Dashboard

A full-stack toll plaza application: operators view recent vehicle entries, see automatically calculated toll fees, filter records, simulate new entries, and flag violations.

**Repository:** https://github.com/RogerRWT/Toll-Plaza-college-project

## Project Structure

```
Toll-Plaza-college-project/
├── backend/     # NestJS API (fee calculator + in-memory data store)
├── frontend/    # Angular operator dashboard
└── README.md
```

---

## Prerequisites

Install these before running the project:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 18 or higher | https://nodejs.org |
| **npm** | Included with Node.js | — |
| **Git** | Any recent version | https://git-scm.com (to clone the repo) |

Verify installation:

```bash
node -v    # should print v18.x.x or higher
npm -v
```

---

## How to Run Locally

You need **two terminal windows** (or tabs): one for the **server**, one for the **client**.

### Step 1 — Clone the repository

```bash
git clone https://github.com/RogerRWT/Toll-Plaza-college-project.git
cd Toll-Plaza-college-project
```

Or download the ZIP from GitHub and extract it, then open a terminal in that folder.

### Step 2 — Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend** (open a new terminal, or return to the project root first):

```bash
cd frontend
npm install
```

### Step 3 — Start the server (backend)

From the `backend` folder:

```bash
npm run start:dev
```

Wait until you see a message that the API is running.

- **API URL:** http://localhost:3000  
- **Test:** open http://localhost:3000/logs in a browser — you should see JSON toll records.

Leave this terminal **open** while testing.

### Step 4 — Start the client (frontend)

In a **second** terminal, from the `frontend` folder:

```bash
npm start
```

Wait until the build finishes and the dev server is ready.

- **Dashboard URL:** http://localhost:4200  

Open that address in Chrome, Edge, or Firefox.

### Step 5 — Quick functional check

1. The dashboard table shows sample vehicles (license plate, type, time, fee, status).
2. Use **Search by License Plate** or **Filter by Vehicle Type**.
3. Submit **New Vehicle Entry** — a new row appears with the correct toll fee.
4. Click **Flag** on a row — status changes to **Violation**.

---

## Ports Summary

| Service | Port | URL |
|---------|------|-----|
| Backend (NestJS) | 3000 | http://localhost:3000 |
| Frontend (Angular) | 4200 | http://localhost:4200 |

The frontend calls the backend at `http://localhost:3000`. Start the **backend first**, then the **frontend**.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm` is not recognized | Install Node.js from https://nodejs.org and restart the terminal. |
| Port 3000 or 4200 already in use | Stop other apps using that port, or close old terminal sessions still running the app. |
| Dashboard shows a connection error | Ensure the backend is running (`npm run start:dev` in `backend/`). |
| Blank page at localhost:4200 | Wait for `npm start` to finish compiling; check the terminal for errors. |

---

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

New entries default to **Pending**. Operators can flag a record as **Violation** from the dashboard.

### Frontend (Angular)

- Responsive table: License Plate, Vehicle Type, Timestamp, Toll Fee (USD), Status
- Search by license plate
- Filter by vehicle type
- Manual entry form (license plate, vehicle type, official/government checkbox)
- `TollLogService` and TypeScript interfaces for API communication

---

## Example API Requests (optional)

**Create entry**

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d "{\"licensePlate\":\"NEW-555\",\"vehicleType\":\"Car\"}"
```

**Official vehicle (zero fee)**

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d "{\"licensePlate\":\"GOV-777\",\"vehicleType\":\"Truck\",\"isOfficial\":true}"
```

**Flag violation** (replace `<LOG_ID>` with an id from `GET /logs`)

```bash
curl -X PATCH http://localhost:3000/logs/<LOG_ID>/flag \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"Violation\"}"
```

---

## Tech Stack

- **Backend:** NestJS 10, class-validator, in-memory persistence
- **Frontend:** Angular 18 (standalone components), HttpClient

## Author

RogerRWT — Toll Plaza college project

## License

MIT
