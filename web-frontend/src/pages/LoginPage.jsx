import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import API from "../api";

const Login = ({ onLogin }) => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await API.post("/auth/login", form);
			localStorage.setItem("token", data.token);
			onLogin(data.user);
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",

				width: "100vw",
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			}}
		>
			<Paper
				elevation={10}
				sx={{
					padding: 4,
					width: { xs: "90%", sm: 400, md: 600 },
					borderRadius: 3,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 2,
					}}
				>
					<TrackChangesIcon
						sx={{ fontSize: 40, color: "primary.main", mr: 1 }}
					/>
					<Typography
						variant="h4"
						align="center"
						gutterBottom
					>
						Trakr Login
					</Typography>
				</Box>
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
						InputProps={{
							startAdornment: <EmailIcon />,
						}}
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						required
						InputProps={{
							startAdornment: <LockIcon />,
						}}
					/>
					{error && <Typography color="error">{error}</Typography>}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</Box>
				<Typography
					variant="body2"
					align="center"
					sx={{ marginTop: 1, cursor: "pointer", color: "blue" }}
					onClick={() =>
						alert("Forgot password functionality not implemented yet")
					}
				>
					Forgot Password?
				</Typography>
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
