# Trakr — Mobile Frontend (React Native / Expo)

Cross-platform mobile app for Trakr. Built with React Native, Expo, and Zustand.

## Tech Stack

- **React Native** — Cross-platform mobile framework
- **Expo SDK ~54** — Toolchain and native module bridge
- **Zustand** — Lightweight global state management
- **React Hook Form** — Form handling and validation
- **Axios** — HTTP client for API calls
- **React Navigation** — Screen navigation
- **AsyncStorage** — Persistent local token storage

## Features

- 🔐 **Authentication** — Register and login with JWT-based session management
- 📊 **Dashboard** — At-a-glance view of total income, expenses, and net profit with a pie chart breakdown by category
- 💸 **Expense Tracking** — View and manage your expense records with pull-to-refresh
- 💰 **Income Tracking** — Record and browse income entries
- 📈 **Reports** — Visual financial reports with charts
- ⚙️ **Settings** — Manage account preferences and sign out
- 🔄 **Auto-reload** — Screens refresh data every time they gain focus

## Project Structure

```
mobile-frontend/
├── src/
│   ├── components/              # Reusable UI components (Button, Card, Input)
│   ├── navigation/              # React Navigation stack setup
│   ├── screens/
│   │   ├── LoginScreen.tsx      # Login form
│   │   ├── RegisterScreen.tsx   # Registration form
│   │   ├── DashboardScreen.tsx  # Summary + charts
│   │   ├── ExpensesScreen.tsx   # Expense list
│   │   ├── IncomeScreen.tsx     # Income list
│   │   ├── ReportsScreen.tsx    # Extended reports
│   │   └── SettingsScreen.tsx   # App settings / logout
│   ├── services/
│   │   └── api.ts               # Axios instance with auth interceptor
│   ├── store/
│   │   └── index.ts             # Zustand auth store
│   ├── theme/                   # Colors, spacing, typography
│   └── types/                   # TypeScript interfaces
├── app.json                     # Expo configuration
├── package.json
├── .env                         # Local config (git-ignored)
└── .env.example                 # Template for environment variables
```

## Development Setup

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### 1. Install dependencies

```bash
cd mobile-frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with the correct API URL:

| Scenario                    | `EXPO_PUBLIC_API_URL` value            |
| --------------------------- | -------------------------------------- |
| Android Emulator            | `http://10.0.2.2:8000/api/v1`          |
| iOS Simulator               | `http://localhost:8000/api/v1`         |
| Physical Device (same WiFi) | `http://<your-machine-ip>:8000/api/v1` |

Find your machine's local IP:

```bash
ip route get 1.1.1.1 | grep -oP 'src \K[^ ]+'   # Linux
ipconfig getifaddr en0                             # macOS
```

### 3. Start the backend

Make sure the Python backend is running with `--host 0.0.0.0`:

```bash
cd ../python-backend
uvicorn app.main:app --reload --host 0.0.0.0
```

### 4. Start the Expo dev server

```bash
npm start
```

Scan the QR code with:

- **Android**: Expo Go app
- **iOS**: Camera app

> ⚠️ Your phone and computer must be on the **same WiFi network**.

---

## Environment Variables

| Variable              | Required | Description                                           |
| --------------------- | -------- | ----------------------------------------------------- |
| `EXPO_PUBLIC_API_URL` | ✅ Yes   | Base URL for the backend API (must include `/api/v1`) |

All `EXPO_PUBLIC_*` variables are bundled into the app at build time and are visible to users — do not put secrets here.

---

## Production Build

Update `EXPO_PUBLIC_API_URL` in `.env` to your deployed backend URL, then:

```bash
# Android APK / AAB
npx expo build:android

# iOS IPA
npx expo build:ios

# Or with EAS Build (recommended for new projects)
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

**Production checklist:**

- [ ] Set `EXPO_PUBLIC_API_URL` to your production backend URL (HTTPS)
- [ ] Ensure the backend has CORS configured for your app
- [ ] Use EAS Build for proper app store submissions
