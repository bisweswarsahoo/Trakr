import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./screens/LoginScreen";
import Home from "./screens/ExpensesScreen";
import Dashboard from "./screens/DashboardScreen";
import IncomePage from "./screens/IncomeScreen";
import ReportsPage from "./screens/ReportsScreen";
import SettingsPage from "./screens/SettingsScreen";
import Navbar from "./components/layout/Navbar";
import Register from "./screens/RegisterScreen";

const App = () => {
	const [user, setUser] = useState(localStorage.getItem("token"));

	const handleLogin = (token) => {
		localStorage.setItem("token", token);
		setUser(token);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<Router>
			{user && <Navbar onLogout={handleLogout} />}
			<Box sx={{ pt: user ? 8 : 0 }}>
				<Routes>
					<Route
						path="/login"
						element={
							user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
						}
					/>
					<Route
						path="/register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
					<Route
						path="/"
						element={user ? <Home /> : <Navigate to="/login" />}
					/>
					<Route
						path="/dashboard"
						element={user ? <Dashboard /> : <Navigate to="/login" />}
					/>
					<Route
						path="/income"
						element={user ? <IncomePage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/reports"
						element={user ? <ReportsPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/settings"
						element={
							user ? (
								<SettingsPage onLogout={handleLogout} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="*"
						element={<Navigate to={user ? "/" : "/login"} />}
					/>
				</Routes>
			</Box>
		</Router>
	);
};

export default App;
