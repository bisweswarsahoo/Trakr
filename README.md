# Trakr

A comprehensive, production-ready full-stack application for small shop owners to track income, manage expenses, and generate real-time financial reports.

## Features ✨

- **Authentication System**: Secure JWT-based login, registration, and persistent sessions.
- **Financial Dashboard**: Real-time overview of net profit, total income, total expenses, and a dynamic pie chart visualizing expenses by category.
- **Expense & Income Tracking**: Complete CRUD functionality for recording daily transactions.
- **Receipt Management**: Attach and store receipt images for expenses.
- **Customizable Categories**: Organize spending into predefined and custom categories.
- **Automated Summary Reports**: Clean UI for generating financial metrics.

## Tech Stack 🚀

The project provides multiple implementations for both the frontend and backend:

### Frontends

- **Mobile App (`mobile-frontend`)**: Built with React Native (Expo) and TypeScript.
- **Web App (`web-frontend`)**: Web client interface.

### Backends

- **Python API (`python-backend`)**: Built with FastAPI, PostgreSQL, and SQLAlchemy.
- **Node.js API (`node-backend`)**: Built with Express.js and MongoDB.

---

## Getting Started 🛠️

Choose the backend and frontend you want to run. You can mix and match depending on your needs.

### 1. Backend Setup

#### Option A: Python Backend (FastAPI + PostgreSQL)

Navigate to the `python-backend` directory, set up your Python virtual environment, install dependencies, and run the server.

```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API Documentation: `http://127.0.0.1:8000/docs`

#### Option B: Node.js Backend (Express + MongoDB)

Navigate to the `node-backend` directory, install dependencies, setup `.env`, and run the server.

```bash
cd node-backend
npm install
cp .env.example .env
npm run dev
```

API: `http://localhost:5000`

### 2. Frontend Setup

#### Option A: Mobile App (React Native Expo)

In a new terminal, navigate to the `mobile-frontend` directory, install dependencies, and start the Expo bundler.

```bash
cd mobile-frontend
npm install
npx expo start
```

_Run on iOS Simulator (`i`), Android Emulator (`a`), or via the Expo Go app._

#### Option B: Web App

Navigate to the `web-frontend` directory, install dependencies, and start the development server.

```bash
cd web-frontend
npm install
npm run dev
```

---

## Directory Structure 📂

```text
Trakr/
├── mobile-frontend/          # React Native Expo Application
├── web-frontend/             # React Web Application
├── python-backend/           # FastAPI Application with PostgreSQL
└── node-backend/             # Express Application with MongoDB
```

_Note: Please check the `README.md` inside each specific directory for more detailed instructions and configurations._

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
