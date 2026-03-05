# Trakr Mobile Frontend

This is the mobile frontend for **Trakr**, a comprehensive, production-ready full-stack application for small shop owners to track income, manage expenses, and generate real-time financial reports.

## Tech Stack 🚀

This application is built with modern mobile development technologies:

- **Framework**: [React Native](https://reactnative.dev/) powered by [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Bottom Tabs & Native Stack)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching & API**: [Axios](https://axios-http.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/)
- **Data Visualization**: [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- **Icons**: [Lucide React Native](https://lucide.dev/)

## Features ✨

- **Authentication**: Secure login, registration, and persistent sessions using JWT.
- **Financial Dashboard**: Real-time overview of net profit, total income, total expenses, and a pie chart visualizing expenses by category.
- **Expense & Income Tracking**: Manage daily transactions with full CRUD capabilities.
- **Receipt Management**: Attach and store receipt images for expenses using `expo-image-picker`.
- **Custom Categories**: Organize your spending into various categories.

## Getting Started 🛠️

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo Go app on your physical device, or an iOS Simulator / Android Emulator.

### Installation & Running

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Running the App**:
   - Press `i` to open in an iOS Simulator.
   - Press `a` to open in an Android Emulator.
   - Scan the QR code shown in the terminal with the Expo Go app on your physical Android or iOS device.

## Application Structure 📂

```
src/
├── components/       # Reusable UI components (Cards, Buttons, Inputs, etc.)
├── navigation/       # React Navigation setup (Stacks and Tabs)
├── screens/          # Main application screens (Home, Login, Settings, etc.)
├── services/         # API integration and Axios interceptors
├── store/            # Zustand global state management
├── theme/            # Theme configuration, typography, and standard colors
└── types/            # Global TypeScript interfaces and types
```

## Backend API

This front-end application relies on the Trakr Backend API (FastAPI) to function. Ensure that the backend server is running and accessible. Update your API base URL in the `services/` layer or via environment variables if necessary.
