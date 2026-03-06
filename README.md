# Trakr — Shop Expense Manager

A full-stack expense tracking application for small shop owners to manage income, expenses, and view financial reports.

## Project Structure

```
Trakr/
├── mobile-frontend/    # React Native (Expo) — iOS & Android app
├── web-frontend/       # React + Vite — Web dashboard
├── python-backend/     # FastAPI + PostgreSQL — Financial Service
└── node-backend/       # Express + PostgreSQL — API Gateway & Auth
```

> Both frontends communicate **only** with the Node.js API Gateway (`:5000/api`).  
> The gateway handles auth directly and proxies financial requests to FastAPI.

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

### 2. Node Backend (API Gateway)

```bash
cd node-backend
npm install
cp .env.example .env        # Edit DATABASE_URL, JWT_SECRET, FASTAPI_SERVICE_URL
npm start
```

Gateway runs at: `http://localhost:5000`

### 3. Mobile Frontend (Expo)

```bash
cd mobile-frontend
npm install
cp .env.example .env        # Set EXPO_PUBLIC_API_URL to http://<your-ip>:5000/api
npx expo start
```

Scan the QR code with Expo Go on your phone (ensure phone and PC are on the same WiFi).

### 4. Web Frontend

```bash
cd web-frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm run dev
```

Web dashboard at: `http://localhost:5173`

---

## Environment Variables Summary

| Sub-project       | Variable               | Description                                       |
| ----------------- | ---------------------- | ------------------------------------------------- |
| `python-backend`  | `DATABASE_URL`         | PostgreSQL connection string (Supabase)           |
| `python-backend`  | `SECRET_KEY`           | Internal security key                             |
| `python-backend`  | `INTERNAL_SERVICE_KEY` | Shared key for gateway auth                       |
| `node-backend`    | `DATABASE_URL`         | PostgreSQL connection string (Supabase)           |
| `node-backend`    | `JWT_SECRET`           | JWT signing secret                                |
| `node-backend`    | `FASTAPI_SERVICE_URL`  | FastAPI URL (default: http://localhost:8000)      |
| `node-backend`    | `INTERNAL_SERVICE_KEY` | Shared key for FastAPI auth                       |
| `mobile-frontend` | `EXPO_PUBLIC_API_URL`  | Node.js gateway URL (e.g. http://\<ip\>:5000/api) |
| `web-frontend`    | `VITE_API_URL`         | Node.js gateway URL (http://localhost:5000/api)   |

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

### Node Backend (API Gateway)

```bash
npm install --production
NODE_ENV=production npm start
```

- Set `DATABASE_URL` to your Supabase PostgreSQL URI
- Set `FASTAPI_SERVICE_URL` to your deployed FastAPI URL
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

| Layer       | Technology                                          |
| ----------- | --------------------------------------------------- |
| Mobile App  | React Native, Expo, Zustand, React Hook Form        |
| Web App     | React 19, Vite, Material UI, Recharts               |
| Finance API | FastAPI, SQLAlchemy, Alembic, PostgreSQL (Supabase) |
| API Gateway | Express.js, PostgreSQL, JWT, Axios (proxy)          |
| Database    | PostgreSQL (shared, hosted on Supabase)             |
