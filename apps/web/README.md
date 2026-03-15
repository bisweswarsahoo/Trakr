# Trakr — Web Frontend (React + Vite)

Web dashboard for the Trakr expense manager. Built with React, Vite, and Material UI.

## Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool and dev server
- **Material UI (MUI)** — Component library
- **Recharts / Chart.js** — Data visualizations
- **Axios** — HTTP client for API calls
- **React Router** — Client-side navigation

## Features

- 🔐 **Authentication** — Login and register with JWT token persistence via localStorage
- 📊 **Dashboard** — Visual overview with period selector (daily/weekly/monthly/yearly), income/expense/net profit summary cards, interactive charts, and category breakdown
- 💸 **Expense Management** — View, add, and delete expense records with category mapping
- 💰 **Income Management** — Track and manage income entries
- ⚙️ **Profile** — View/edit user profile and logout
- 🌙 **Theme Toggle** — Dark and light mode support
- 📱 **Responsive Design** — Works on desktop and mobile browsers

## Project Structure

```
web-frontend/
├── src/
│   ├── api.js                   # Axios instance → Node.js gateway (:5000/api)
│   ├── components/
│   │   ├── auth/                # AuthForm, AuthButton, AuthTextField, etc.
│   │   ├── Navbar.jsx           # Navigation (Dashboard, Expenses, Income, Profile)
│   │   ├── AddExpenseForm.jsx   # Expense creation modal
│   │   ├── AddIncomeForm.jsx    # Income creation modal
│   │   ├── ExpenseList.jsx      # Expense list with summary
│   │   ├── IncomeList.jsx       # Income list with summary
│   │   ├── SummarySection.jsx   # Dashboard summary cards
│   │   ├── ChartsSection.jsx    # Dashboard charts
│   │   ├── CategoryBreakdownSection.jsx  # Category spending breakdown
│   │   └── ThemeToggle.jsx      # Dark/light mode switch
│   ├── pages/
│   │   ├── ExpensePage.jsx      # Expenses page
│   │   ├── IncomePage.jsx       # Income page
│   │   ├── Dashboard.jsx        # Dashboard with charts, reports & category breakdown
│   │   ├── ProfileScreen.jsx    # User profile + logout
│   │   ├── LoginPage.jsx        # Login
│   │   └── Register.jsx         # Registration
│   └── main.jsx                 # App entry point
├── index.html
├── vite.config.js
├── package.json
├── .env                         # Local config (git-ignored)
└── .env.example                 # Template for environment variables
```

## Development Setup

### Prerequisites

- Node.js 18+

### 1. Install dependencies

```bash
cd web-frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> All requests go through the Node.js API Gateway. Do **not** point directly to FastAPI.

### 3. Start the dev server

```bash
npm run dev
```

Web app available at: `http://localhost:5173`

---

## Environment Variables

| Variable       | Required | Description                  |
| -------------- | -------- | ---------------------------- |
| `VITE_API_URL` | ✅ Yes   | Base URL for the backend API |

> ℹ️ All Vite env variables must be prefixed with `VITE_` to be accessible in code as `import.meta.env.VITE_API_URL`.

---

## Production Build

Update `VITE_API_URL` in `.env` to your deployed backend URL, then:

```bash
npm run build
```

This outputs a static `dist/` folder ready to deploy.

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Deploy to a VPS with Nginx

```bash
npm run build
# Copy dist/ to your server:
scp -r dist/ user@your-server:/var/www/trakr/
```

Nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/trakr;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Production checklist:**

- [ ] Set `VITE_API_URL` to your production HTTPS backend URL
- [ ] Ensure CSP headers allow connections to your backend domain
- [ ] Enable gzip compression in your web server
