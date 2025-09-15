import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import API from "../api";

const Login = ({ onLogin }) => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await API.post("/auth/login", form);
			localStorage.setItem("token", data.token); // store JWT
			onLogin(data.user); // send user data up
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Paper
				elevation={4}
				sx={{ padding: 4, width: 400 }}
			>
				<Typography
					variant="h4"
					align="center"
					gutterBottom
				>
					Trakr Login
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label="Email"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						required
					/>
					{error && <Typography color="error">{error}</Typography>}
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Login
					</Button>
				</Box>
				<Typography
					variant="body2"
					align="center"
					sx={{ marginTop: 2 }}
				>
					Don’t have an account?{" "}
					<span
						style={{ color: "blue", cursor: "pointer" }}
						onClick={() => (window.location.href = "/register")}
					>
						Register here
					</span>
				</Typography>
			</Paper>
		</Box>
	);
};

export default Login;
