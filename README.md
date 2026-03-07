# Trakr — Shop Expense Manager

A full-stack expense tracking application for small shop owners to manage income, expenses, and view financial reports.

## Project Structure

This project is structured as a **Turborepo monorepo** using **pnpm workspaces**.

```text
Trakr/
├── apps/
│   ├── mobile/           # React Native (Expo) — iOS & Android app
│   ├── web/              # React + Vite — Web dashboard
│   ├── finance-service/  # FastAPI + PostgreSQL — Financial Service
│   └── api-gateway/      # Express + PostgreSQL — API Gateway & Auth
├── packages/
│   ├── ui/               # Shared React Native & Web components
│   ├── design-system/    # Shared design tokens & themes
│   ├── api-client/       # Shared Axios API client
│   ├── validation/       # Zod schemas for validation
│   ├── config/           # ESLint/TypeScript configurations
│   ├── types/            # Shared TypeScript definitions
│   └── utils/            # Shared helper functions
```

> Both frontends communicate **only** with the Node.js API Gateway (`:5000/api`).  
> The gateway handles auth directly and proxies financial requests to FastAPI.

---

## Quick Start (Development)

### Prerequisites

- Node.js (v20+)
- Python (3.12+)
- pnpm

Install all Node dependencies from the root:

```bash
pnpm install
```

### 1. Python Backend (Finance Service)

```bash
cd apps/finance-service
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
cd apps/api-gateway
cp .env.example .env        # Edit DATABASE_URL, JWT_SECRET, FASTAPI_SERVICE_URL
npm start
```

Gateway runs at: `http://localhost:5000`

### 3. Mobile Frontend (Expo)

```bash
cd apps/mobile
cp .env.example .env        # Set EXPO_PUBLIC_API_URL to http://<your-ip>:5000/api
npx expo start -c
```

Scan the QR code with Expo Go on your phone (ensure phone and PC are on the same WiFi).

### 4. Web Frontend

```bash
cd apps/web
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
pnpm run dev
```

Web dashboard at: `http://localhost:5173`

---

## Monorepo Commands

You can run commands across the entire monorepo from the root directory using `turbo` and `pnpm`:

- `pnpm run build` - Build all packages and applications (TypeScript, Vite, UI components)
- `pnpm run dev` - Start development servers where applicable
- `pnpm run lint` - Lint all code using ESLint

---

## Environment Variables Summary

| Sub-project       | Variable               | Description                                       |
| ----------------- | ---------------------- | ------------------------------------------------- |
| `finance-service` | `DATABASE_URL`         | PostgreSQL connection string (Supabase)           |
| `finance-service` | `SECRET_KEY`           | Internal security key                             |
| `finance-service` | `INTERNAL_SERVICE_KEY` | Shared key for gateway auth                       |
| `api-gateway`     | `DATABASE_URL`         | PostgreSQL connection string (Supabase)           |
| `api-gateway`     | `JWT_SECRET`           | JWT signing secret                                |
| `api-gateway`     | `FASTAPI_SERVICE_URL`  | FastAPI URL (default: http://localhost:8000)      |
| `api-gateway`     | `INTERNAL_SERVICE_KEY` | Shared key for FastAPI auth                       |
| `mobile`          | `EXPO_PUBLIC_API_URL`  | Node.js gateway URL (e.g. http://\<ip\>:5000/api) |
| `web`             | `VITE_API_URL`         | Node.js gateway URL (http://localhost:5000/api)   |

---

## Production Deployment

### Python Backend (`apps/finance-service`)

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

- Set strong `SECRET_KEY` in `.env`
- Use a managed Postgres instance (e.g., Supabase)
- Put behind a reverse proxy (Nginx / Caddy)

### Node Backend (`apps/api-gateway`)

```bash
npm install --production
NODE_ENV=production npm start
```

- Set `DATABASE_URL` to your Supabase PostgreSQL URI
- Set `FASTAPI_SERVICE_URL` to your deployed FastAPI URL
- Use PM2 for process management: `pm2 start src/server.js`

### Mobile Frontend (`apps/mobile`)

Update `EXPO_PUBLIC_API_URL` in `.env` to point to your deployed backend, then:

```bash
npx expo build:android    # Android APK
npx expo build:ios        # iOS IPA
```

### Web Frontend (`apps/web`)

Update `VITE_API_URL` in `.env` to your production backend URL, then:

```bash
pnpm run build             # Outputs to dist/
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
