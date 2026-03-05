# Trakr — Shop Expense Manager

A full-stack expense tracking application for small shop owners to manage income, expenses, and view financial reports.

## Project Structure

```
Trakr/
├── mobile-frontend/    # React Native (Expo) — iOS & Android app
├── web-frontend/       # React + Vite — Web dashboard
├── python-backend/     # FastAPI + PostgreSQL — Main REST API
└── node-backend/       # Express + MongoDB — Supplementary API
```

---

## Quick Start (Development)

### 1. Python Backend (Main API)

```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # Edit with your Supabase credentials
uvicorn app.main:app --reload --host 0.0.0.0
```

API runs at: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### 2. Node Backend

```bash
cd node-backend
npm install
cp .env.example .env        # Edit MONGO_URI and JWT_SECRET
npm run dev
```

API runs at: `http://localhost:5000`

### 3. Mobile Frontend (Expo)

```bash
cd mobile-frontend
npm install
cp .env.example .env        # Set EXPO_PUBLIC_API_URL
npx expo start
```

Scan the QR code with Expo Go on your phone (ensure phone and PC are on the same WiFi).

### 4. Web Frontend

```bash
cd web-frontend
npm install
cp .env.example .env        # Set VITE_API_URL
npm run dev
```

Web dashboard at: `http://localhost:5173`

---

## Environment Variables Summary

| Sub-project       | Variable              | Description                                                                                    |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| `python-backend`  | `DATABASE_URL`        | PostgreSQL connection string (Supabase pooler)                                                 |
| `python-backend`  | `SECRET_KEY`          | JWT signing secret (generate with `python3 -c "import secrets; print(secrets.token_hex(32))"`) |
| `node-backend`    | `MONGO_URI`           | MongoDB connection string                                                                      |
| `node-backend`    | `JWT_SECRET`          | JWT signing secret                                                                             |
| `node-backend`    | `PORT`                | Server port (default: 5000)                                                                    |
| `mobile-frontend` | `EXPO_PUBLIC_API_URL` | Backend API base URL                                                                           |
| `web-frontend`    | `VITE_API_URL`        | Backend API base URL                                                                           |

---

## Production Deployment

### Python Backend

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

- Set strong `SECRET_KEY` in `.env`
- Use a managed Postgres instance (e.g., Supabase)
- Put behind a reverse proxy (Nginx / Caddy)

### Node Backend

```bash
npm install --production
NODE_ENV=production npm start
```

- Set `MONGO_URI` to your cloud MongoDB Atlas URI
- Use PM2 for process management: `pm2 start src/server.js`

### Mobile Frontend

Update `EXPO_PUBLIC_API_URL` in `.env` to point to your deployed backend, then:

```bash
npx expo build:android    # Android APK
npx expo build:ios        # iOS IPA
```

### Web Frontend

Update `VITE_API_URL` in `.env` to your production backend URL, then:

```bash
npm run build             # Outputs to dist/
```

Host the `dist/` folder on Vercel, Netlify, or any static host.

---

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Mobile App | React Native, Expo, Zustand, React Hook Form        |
| Web App    | React 19, Vite, Material UI, Recharts               |
| Python API | FastAPI, SQLAlchemy, Alembic, PostgreSQL (Supabase) |
| Node API   | Express.js, MongoDB, Mongoose, JWT                  |
