# Trakr — Node.js Backend (Express)

Supplementary REST API for Trakr. Built with Express.js and MongoDB.

## Tech Stack

- **Express.js** — Web framework
- **MongoDB + Mongoose** — NoSQL database and ODM
- **JSON Web Tokens (JWT)** — Authentication
- **bcryptjs** — Password hashing
- **dotenv** — Environment variable management
- **morgan** — HTTP request logging

## Features

- 🔐 **User Authentication** — Register and login with hashed passwords and JWT tokens
- 💸 **Expense Tracking** — Create, read, and delete expense records
- 📊 **Dashboard Summary** — Aggregated financial summary per user
- 🛡️ **Protected Routes** — All data endpoints require a valid JWT token

## Project Structure

```
node-backend/
├── src/
│   ├── routes/
│   │   ├── userRoutes.js        # Auth routes
│   │   ├── expenseRoutes.js     # Expense CRUD
│   │   └── dashboardRoutes.js   # Dashboard data
│   ├── controllers/             # Route handler logic
│   ├── models/                  # Mongoose schemas
│   ├── middleware/              # Auth middleware
│   ├── utils/
│   │   └── generateToken.js     # JWT helper
│   ├── app.js                   # Express app setup
│   └── server.js                # Entry point + DB connection
├── package.json
├── .env                         # Local secrets (git-ignored)
└── .env.example                 # Template for environment variables
```

## Development Setup

### Prerequisites

- Node.js 18+
- MongoDB (local) or MongoDB Atlas (cloud)

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
MONGO_URI=mongodb://localhost:27017/trakr
JWT_SECRET=your_jwt_secret_here
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

| Variable     | Required | Default | Description                   |
| ------------ | -------- | ------- | ----------------------------- |
| `PORT`       | No       | `5000`  | Server port                   |
| `MONGO_URI`  | ✅ Yes   | —       | MongoDB connection string     |
| `JWT_SECRET` | ✅ Yes   | —       | Secret for signing JWT tokens |

---

## API Endpoints

| Method | Path                  | Auth | Description         |
| ------ | --------------------- | ---- | ------------------- |
| POST   | `/api/users/register` | No   | Register new user   |
| POST   | `/api/users/login`    | No   | Login (returns JWT) |
| GET    | `/api/expenses`       | Yes  | List expenses       |
| POST   | `/api/expenses`       | Yes  | Create expense      |
| DELETE | `/api/expenses/:id`   | Yes  | Delete expense      |
| GET    | `/api/dashboard`      | Yes  | Dashboard summary   |

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

- [ ] Use MongoDB Atlas for a managed cloud database
- [ ] Use a strong, randomly generated `JWT_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Put behind Nginx as a reverse proxy
- [ ] Enable HTTPS
