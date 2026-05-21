# Deployment Guide

This project is deployed online using free hosting services.

## Live Links

### Frontend (Angular UI)
https://fascinating-pika-e72922.netlify.app/

### Backend API (NestJS)
https://toll-plaza-college-project.onrender.com/

### GitHub Repository
https://github.com/RogerRWT/Toll-Plaza-college-project

---

# Backend Deployment (Render)

1. Push project to GitHub
2. Go to https://render.com
3. Create a new **Web Service**
4. Connect the GitHub repository

Use these settings:

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start:prod` |

After deployment, Render provides a live API URL.

Example:

```bash
https://toll-plaza-college-project.onrender.com/logs
```

---

# Frontend Deployment (Netlify)

1. Go to https://netlify.com
2. Import the GitHub repository
3. Configure these settings:

| Setting | Value |
|---------|-------|
| Base Directory | `frontend` |
| Build Command | `npm run build` |
| Publish Directory | `dist/toll-plaza-frontend/browser` |

Deploy the site and Netlify will generate a live frontend URL.

---

# Production API Configuration

Update:

```bash
frontend/src/environments/environment.prod.ts
```

Example:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://toll-plaza-college-project.onrender.com/logs',
};
```

Push changes to GitHub after updating.

---

# Important Notes

- Backend uses in-memory storage
- Data resets whenever the server restarts
- Render free tier may sleep after inactivity
- First API request may take a few seconds

---

# Deployment Platforms Used

| Service | Purpose |
|---------|---------|
| Render | Backend Hosting |
| Netlify | Frontend Hosting |
| GitHub | Source Code Repository |
