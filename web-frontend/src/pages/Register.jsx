import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const Register = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			await API.post("/auth/register", {
				name: form.name,
				email: form.email,
				password: form.password,
			});
			navigate("/login");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
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
					width: { xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
					maxWidth: 500,
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
						Create Account
					</Typography>
				</Box>
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
						InputProps={{
							startAdornment: <PersonIcon />,
						}}
					/>
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
					<TextField
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						value={form.confirmPassword}
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
						{loading ? "Registering..." : "Register"}
					</Button>
				</Box>
				<Typography
					variant="body2"
					align="center"
					sx={{ marginTop: 2 }}
				>
					Already have an account?{" "}
					<span
						style={{ color: "blue", cursor: "pointer" }}
						onClick={() => navigate("/login")}
					>
						Login here
					</span>
				</Typography>
			</Paper>
		</Box>
	);
};

export default Register;
