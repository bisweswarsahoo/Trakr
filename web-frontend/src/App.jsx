import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

const App = () => {
	const [user, setUser] = useState(localStorage.getItem("token"));

	const handleLogin = (userData) => {
		setUser(userData);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<Router>
			{user && <Navbar onLogout={handleLogout} />}
			<Routes>
				<Route
					path="/login"
					element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
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
					path="*"
					element={<Navigate to={user ? "/" : "/login"} />}
				/>
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
