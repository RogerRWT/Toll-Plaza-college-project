````md
# Toll Plaza Operator Dashboard

A mini full-stack Toll Plaza Management System built using Angular and NestJS.

This project allows toll plaza operators to:
- View recent vehicle entries
- Calculate toll fees automatically
- Search and filter records
- Add new vehicle entries
- Flag vehicles as violations

---

# Live Demo

## Frontend (Angular UI)
https://fascinating-pika-e72922.netlify.app/

## Backend API (NestJS)
https://toll-plaza-college-project.onrender.com/

## GitHub Repository
https://github.com/RogerRWT/Toll-Plaza-college-project

---

# Tech Stack

## Frontend
- Angular 18
- TypeScript
- HttpClient

## Backend
- NestJS
- Node.js
- REST API
- In-memory data storage

---

# Features

## Dashboard
- Responsive toll logs table
- Vehicle details display
- Timestamp display
- Automatic toll fee calculation
- Status tracking

## Filtering
- Search by License Plate
- Filter by Vehicle Type

## Vehicle Entry Form
- Add new vehicle records
- Official/Government vehicle support

## Violation Management
- Flag vehicles as "Violation"

---

# Toll Fee Rules

| Vehicle Type | Fee |
|--------------|-----|
| Car | $5 |
| Motorcycle | $2 |
| Truck | $10 |
| Official/Government Vehicle | $0 |

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/logs` | Fetch all toll logs |
| POST | `/logs` | Create new vehicle entry |
| PATCH | `/logs/:id/flag` | Flag vehicle as violation |

---

# Run Locally

## Prerequisites

Install these before running the project:

- Node.js (v18 or higher)
- npm
- Git

Download Node.js:
https://nodejs.org/

Check installation:

```bash
node -v
npm -v
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/RogerRWT/Toll-Plaza-college-project.git
cd Toll-Plaza-college-project
```

---

# Run Backend Server

Open a terminal inside the project folder:

```bash
cd backend
npm install
npm run start:dev
```

Backend will run on:

```bash
http://localhost:3000
```

Test API:

```bash
http://localhost:3000/logs
```

---

# Run Frontend Client

Open a SECOND terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run on:

```bash
http://localhost:4200
```

Open this URL in your browser.

---

# Important

- Start the backend first
- Then start the frontend
- Keep both terminals running while using the project

---

# Project Structure

```bash
Toll-Plaza-college-project/
│
├── backend/
├── frontend/
└── README.md
```

---

# Author

RogerRWT  
College Mini Project
````
