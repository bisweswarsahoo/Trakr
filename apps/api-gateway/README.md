# Trakr — Node.js Backend (API Gateway)

API Gateway and authentication service for Trakr. Built with Express.js and PostgreSQL (Supabase).

## Tech Stack

- **Express.js** — Web framework
- **PostgreSQL (Supabase)** — Shared database
- **JSON Web Tokens (JWT)** — Authentication
- **bcryptjs** — Password hashing
- **Axios** — HTTP proxy to FastAPI
- **dotenv** — Environment variable management
- **morgan** — HTTP request logging

## Features

- 🔐 **User Authentication** — Register, login, and logout with hashed passwords and JWT tokens
- 👤 **User Profiles** — View and update user profile (name, shop name)
- 🏠 **Shop Management** — CRUD for shop records
- 🔔 **Notifications** — User notification endpoints
- 🔀 **API Gateway Proxy** — Forwards `/expenses`, `/income`, `/categories`, `/reports`, `/dashboard` to FastAPI
- 🛡️ **Protected Routes** — All data endpoints require a valid JWT token

## Project Structure

```
node-backend/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js         # Register / Login / Logout
│   │   ├── userRoutes.js         # GET/PUT /users/me
│   │   ├── shopRoutes.js         # Shop management
│   │   └── notificationRoutes.js # Notifications
│   ├── controllers/              # Route handler logic
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── gatewayProxy.js       # FastAPI proxy with retry logic
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection
│   ├── utils/
│   │   └── generateToken.js      # JWT helper
│   ├── app.js                    # Express app + proxy route setup
│   └── server.js                 # Entry point
├── package.json
├── .env                          # Local secrets (git-ignored)
└── .env.example                  # Template for environment variables
```

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase or local)
- FastAPI service running (for proxied routes)

### 1. Install dependencies

```bash
cd node-backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres.xxx:password@aws-x.pooler.supabase.com:6543/postgres
JWT_SECRET=your_jwt_secret_here
FASTAPI_SERVICE_URL=http://localhost:8000
INTERNAL_SERVICE_KEY=your_shared_key_here
```

Generate a secure `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start the development server

```bash
npm run dev
```

API available at: `http://localhost:5000`

---

## Environment Variables

| Variable               | Required | Default                 | Description                             |
| ---------------------- | -------- | ----------------------- | --------------------------------------- |
| `PORT`                 | No       | `5000`                  | Server port                             |
| `DATABASE_URL`         | ✅ Yes   | —                       | PostgreSQL connection string (Supabase) |
| `JWT_SECRET`           | ✅ Yes   | —                       | Secret for signing JWT tokens           |
| `FASTAPI_SERVICE_URL`  | No       | `http://localhost:8000` | FastAPI backend URL                     |
| `INTERNAL_SERVICE_KEY` | No       | —                       | Shared key for secure FastAPI proxy     |

---

## API Endpoints

### Handled Directly

| Method | Path                 | Auth | Description         |
| ------ | -------------------- | ---- | ------------------- |
| POST   | `/api/auth/register` | No   | Register new user   |
| POST   | `/api/auth/login`    | No   | Login (returns JWT) |
| POST   | `/api/auth/logout`   | Yes  | Logout              |
| GET    | `/api/users/me`      | Yes  | Get user profile    |
| PUT    | `/api/users/me`      | Yes  | Update user profile |

### Proxied to FastAPI

| Path Prefix       | Proxied to           | Description       |
| ----------------- | -------------------- | ----------------- |
| `/api/expenses`   | `/api/v1/expenses`   | Expense CRUD      |
| `/api/income`     | `/api/v1/income`     | Income CRUD       |
| `/api/categories` | `/api/v1/categories` | Category CRUD     |
| `/api/reports`    | `/api/v1/reports`    | Financial reports |
| `/api/dashboard`  | `/api/v1/dashboard`  | Dashboard data    |

---

## Production Deployment

```bash
npm install --production
NODE_ENV=production npm start
```

**Using PM2 (recommended):**

```bash
npm install -g pm2
pm2 start src/server.js --name trakr-node-api
pm2 save
pm2 startup
```

**Production checklist:**

- [ ] Use Supabase PostgreSQL for `DATABASE_URL`
- [ ] Use a strong, randomly generated `JWT_SECRET`
- [ ] Set `FASTAPI_SERVICE_URL` to your deployed FastAPI URL
- [ ] Set `NODE_ENV=production`
- [ ] Put behind Nginx as a reverse proxy
- [ ] Enable HTTPS
