import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.post("/auth/register", form);
			navigate("/login"); // redirect to login after success
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
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
					Create Account
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label="Name"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
					/>
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
						Register
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default Register;
