import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Alert,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const Register = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		if (form.password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}
		setLoading(true);
		try {
			await API.post("/users/register", {
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
		<>
			<Paper
				elevation={12}
				sx={{
					padding: isMobile ? 3 : 4,
					width: {
						xs: "90%",
						sm: "85%",
						lg: 500,
					},
					maxWidth: "550px",
					borderRadius: 4,
					backgroundColor: "rgba(255, 255, 255, 0.98)",
					backdropFilter: "blur(10px)",
					boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 2,
						flexDirection: isMobile ? "column" : "row",
						textAlign: "center",
					}}
				>
					<TrackChangesIcon
						sx={{
							fontSize: isMobile ? 36 : 40,
							color: "primary.main",
							mr: isMobile ? 0 : 1,
							mb: isMobile ? 1 : 0,
						}}
					/>
					<Typography
						variant={isMobile ? "h5" : "h4"}
						align="center"
						sx={{
							fontWeight: "bold",
							color: "primary.main",
							fontSize: {
								xs: "1.5rem",
								sm: "1.75rem",
								md: "2rem",
							},
						}}
					>
						Create Account
					</Typography>
				</Box>

				<Typography
					variant="body1"
					align="center"
					sx={{
						mb: 4,
						color: "text.secondary",
						fontSize: {
							xs: "0.9rem",
							sm: "1rem",
						},
					}}
				>
					Join Trakr to start tracking your expenses
				</Typography>

				{error && (
					<Alert
						severity="error"
						sx={{
							mb: 2,
							borderRadius: 2,
							fontSize: {
								xs: "0.85rem",
								sm: "0.9rem",
							},
						}}
					>
						{error}
					</Alert>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2.5,
					}}
				>
					<TextField
						label="Full Name"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
						fullWidth
						variant="outlined"
						slotProps={{
							input: {
								startAdornment: (
									<PersonIcon
										sx={{
											color: "action.active",
											mr: 1,
											fontSize: {
												xs: "1.2rem",
												sm: "1.4rem",
											},
										}}
									/>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								fontSize: {
									xs: "0.9rem",
									sm: "1rem",
								},
							},
						}}
					/>
					<TextField
						label="Email Address"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						required
						fullWidth
						variant="outlined"
						slotProps={{
							input: {
								startAdornment: (
									<EmailIcon
										sx={{
											color: "action.active",
											mr: 1,
											fontSize: {
												xs: "1.2rem",
												sm: "1.4rem",
											},
										}}
									/>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								fontSize: {
									xs: "0.9rem",
									sm: "1rem",
								},
							},
						}}
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						required
						fullWidth
						variant="outlined"
						helperText="Minimum 6 characters"
						slotProps={{
							input: {
								startAdornment: (
									<LockIcon
										sx={{
											color: "action.active",
											mr: 1,
											fontSize: {
												xs: "1.2rem",
												sm: "1.4rem",
											},
										}}
									/>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								fontSize: {
									xs: "0.9rem",
									sm: "1rem",
								},
							},
						}}
					/>
					<TextField
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						value={form.confirmPassword}
						onChange={handleChange}
						required
						fullWidth
						variant="outlined"
						slotProps={{
							input: {
								startAdornment: (
									<LockIcon
										sx={{
											color: "action.active",
											mr: 1,
											fontSize: {
												xs: "1.2rem",
												sm: "1.4rem",
											},
										}}
									/>
								),
							},
						}}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								fontSize: {
									xs: "0.9rem",
									sm: "1rem",
								},
							},
						}}
					/>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
						fullWidth
						sx={{
							mt: 1,
							py: 1.5,
							borderRadius: 2,
							fontSize: {
								xs: "1rem",
								sm: "1.1rem",
							},
							fontWeight: "bold",
							textTransform: "none",
							boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
							"&:hover": {
								boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
								transform: "translateY(-1px)",
							},
							transition: "all 0.2s ease-in-out",
						}}
					>
						{loading ? "Creating Account..." : "Create Account"}
					</Button>
				</Box>

				<Box
					sx={{
						mt: 3,
						textAlign: "center",
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "text.secondary",
							fontSize: {
								xs: "0.85rem",
								sm: "0.9rem",
							},
						}}
					>
						Already have an account?{" "}
						<Typography
							component="span"
							sx={{
								color: "primary.main",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: {
									xs: "0.85rem",
									sm: "0.9rem",
								},
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							onClick={() => navigate("/login")}
						>
							Sign in here
						</Typography>
					</Typography>
				</Box>
			</Paper>
		</>
	);
};

export default Register;
