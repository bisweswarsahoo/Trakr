# Trakr Web Frontend

This is the web-based frontend client for the **Trakr** application. It provides small shop owners with a clean, responsive desktop/web interface to track income, manage expenses, and generate real-time financial reports.

## Features ✨

- **Authentication**: JWT-based login, registration, and persistent sessions.
- **Financial Dashboard**: Real-time overview of net profit, total income, and total expenses.
- **Data Visualization**: Dynamic charts using Recharts and Chart.js for visualizing financial metrics.
- **Expense & Income Tracking**: Manage daily transactions with full CRUD capabilities.
- **Responsive UI**: Built with Material UI (MUI) for a clean, accessible, and responsive user experience.

## Tech Stack 🚀

This application is built with a modern React stack:

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **UI Library**: [Material UI (MUI)](https://mui.com/material-ui/)
- **Data Visualization**: [Recharts](https://recharts.org/) & [Chart.js](https://www.chartjs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started 🛠️

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Running

1. Clone the repository and navigate to the `web-frontend` directory:

   ```bash
   cd web-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173/`).

## Building for Production 📦

To create a production-ready build of the application:

```bash
npm run build
```

This will generate a `dist/` directory containing the optimized static assets. You can preview the production build locally using:

```bash
npm run preview
```

## Backend Connection

This frontend application relies on the Trakr Backend API (either the Python or Node.js version) to function. Ensure that the backend server is running and accessible. Update your API base URL configuration if necessary to point to the correct backend port (e.g., `8000` for FastAPI or `5000` for Express).
