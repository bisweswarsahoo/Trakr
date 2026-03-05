# Trakr — Python Backend (FastAPI)

REST API for the Trakr expense manager. Built with FastAPI, SQLAlchemy, and PostgreSQL (Supabase).

## Tech Stack

- **FastAPI** — High-performance Python web framework
- **SQLAlchemy** — ORM for database access
- **alembic** — Database migrations

## Features

- 🔐 **JWT Authentication** — Secure register/login with Bearer token flow
- 👤 **Multi-user support** — Each user sees only their own data
- 💸 **Expense Management** — Full CRUD with categories, vendor, payment method, notes, and receipt URL
- 💰 **Income Management** — Track income entries with title, amount, date, and payment method
- 📂 **Category Management** — Organize expenses with custom or default categories
- 📊 **Reports API** — Summary (total income, expense, net profit) and per-category expense breakdown with optional date range filtering
- 🏥 **Health Check** — `/health/db` endpoint to verify database connectivity
- 📄 **Auto-generated Docs** — Interactive Swagger UI at `/docs` and ReDoc at `/redoc`
- **PostgreSQL** — Database (hosted on Supabase)
- **Passlib + bcrypt** — Password hashing
- **python-jose** — JWT authentication

## Project Structure

```
python-backend/
├── app/
│   ├── api/
│   │   ├── deps.py              # Auth dependencies
│   │   └── endpoints/
│   │       ├── auth.py          # Register / Login / Me
│   │       ├── expenses.py      # Expense CRUD
│   │       ├── income.py        # Income CRUD
│   │       ├── categories.py    # Category CRUD
│   │       └── reports.py       # Summary & chart data
│   ├── core/
│   │   ├── config.py            # Pydantic settings (reads from .env)
│   │   └── security.py          # JWT & bcrypt helpers
│   ├── models/                  # SQLAlchemy ORM models
│   ├── schemas/                 # Pydantic request/response schemas
│   ├── database.py              # Engine + session setup
│   └── main.py                  # FastAPI app entry point
├── alembic/                     # Database migration scripts
├── requirements.txt
├── .env                         # Local secrets (git-ignored)
└── .env.example                 # Template for environment variables
```

## Development Setup

### Prerequisites

- Python 3.11+
- PostgreSQL database (local or Supabase)
- `libpq-devel` (Fedora) or `libpq-dev` (Ubuntu/Debian) system package

### 1. Clone and set up virtual environment

```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://postgres.xxx:password@aws-x.pooler.supabase.com:6543/postgres
SECRET_KEY=your_secret_key_here
```

Generate a secure `SECRET_KEY`:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### 4. Run database migrations

```bash
alembic upgrade head
```

### 5. Start the development server

```bash
# Localhost only (for browser testing):
uvicorn app.main:app --reload

# All network interfaces (required for physical device testing):
uvicorn app.main:app --reload --host 0.0.0.0
```

API available at: `http://localhost:8000`  
Interactive docs (Swagger): `http://localhost:8000/docs`  
Alternative docs (ReDoc): `http://localhost:8000/redoc`

---

## Environment Variables

| Variable       | Required | Description                                                          |
| -------------- | -------- | -------------------------------------------------------------------- |
| `DATABASE_URL` | ✅ Yes   | PostgreSQL connection URI (use the Supabase pooler URL on port 6543) |
| `SECRET_KEY`   | ✅ Yes   | Random hex string used to sign JWTs                                  |

### Supabase Connection String

Use the **Connection Pooler** URL (not the direct connection), found at:  
**Supabase Dashboard → Settings → Database → Connection pooling → URI**

It looks like:

```
postgresql://postgres.project_ref:password@aws-0-region.pooler.supabase.com:6543/postgres
```

---

## API Endpoints

| Method | Path                                | Auth | Description                  |
| ------ | ----------------------------------- | ---- | ---------------------------- |
| POST   | `/api/v1/auth/register`             | No   | Register a new user          |
| POST   | `/api/v1/auth/login`                | No   | Login (returns JWT)          |
| GET    | `/api/v1/auth/me`                   | Yes  | Get current user             |
| GET    | `/api/v1/expenses/`                 | Yes  | List expenses                |
| POST   | `/api/v1/expenses/`                 | Yes  | Create expense               |
| GET    | `/api/v1/income/`                   | Yes  | List income records          |
| POST   | `/api/v1/income/`                   | Yes  | Create income record         |
| GET    | `/api/v1/categories/`               | Yes  | List categories              |
| GET    | `/api/v1/reports/summary`           | Yes  | Income/expense summary       |
| GET    | `/api/v1/reports/category-expenses` | Yes  | Expenses grouped by category |
| GET    | `/health/db`                        | No   | Database health check        |

---

## Production Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start with multiple workers
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Production checklist:**

- [ ] Use a strong, randomly generated `SECRET_KEY`
- [ ] Use Supabase pooler URL for `DATABASE_URL`
- [ ] Put behind Nginx or Caddy as a reverse proxy
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Set `allow_origins` in CORS to your actual frontend domain (not `["*"]`)
