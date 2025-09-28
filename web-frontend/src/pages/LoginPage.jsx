import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Alert,
	Snackbar,
	useTheme,
	useMediaQuery,
	Fade,
	Slide,
	Avatar,
	IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await API.post("/users/login", form);
			localStorage.setItem("token", data.token);
			onLogin(data.token);
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = () => {
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<Box
				sx={{
					position: "absolute",
					top: "10%",
					left: "10%",
					width: 100,
					height: 100,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.1)",
					animation: "float 6s ease-in-out infinite",
					"@keyframes float": {
						"0%, 100%": { transform: "translateY(0px)" },
						"50%": { transform: "translateY(-20px)" },
					},
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					top: "70%",
					right: "15%",
					width: 80,
					height: 80,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.08)",
					animation: "float 4s ease-in-out infinite reverse",
				}}
			/>

			<Fade
				in
				timeout={800}
			>
				<Paper
					elevation={24}
					sx={{
						padding: isMobile ? 4 : 5,
						width: {
							xs: "90%",
							sm: "85%",
							lg: 500,
						},
						maxWidth: "520px",
						borderRadius: 4,
						background: "rgba(255, 255, 255, 0.95)",
						backdropFilter: "blur(20px)",
						boxShadow:
							"0 32px 64px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
						border: "1px solid rgba(255,255,255,0.2)",
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: 4,
							background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
						},
					}}
				>
					<Slide
						direction="down"
						in
						timeout={1000}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 3,
								flexDirection: "column",
								textAlign: "center",
							}}
						>
							<Avatar
								sx={{
									width: 80,
									height: 80,
									mb: 2,
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
									boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
									animation: "pulse 2s ease-in-out infinite alternate",
									"@keyframes pulse": {
										"0%": { transform: "scale(1)" },
										"100%": { transform: "scale(1.05)" },
									},
								}}
							>
								<TrackChangesIcon sx={{ fontSize: 40, color: "white" }} />
							</Avatar>
							<Typography
								variant={isMobile ? "h4" : "h3"}
								align="center"
								sx={{
									fontWeight: 800,
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									fontSize: {
										xs: "2rem",
										sm: "2.5rem",
										md: "3rem",
									},
									mb: 1,
								}}
							>
								Welcome Back
							</Typography>
							<Typography
								variant="h6"
								align="center"
								sx={{
									color: "text.secondary",
									fontSize: {
										xs: "1rem",
										sm: "1.1rem",
									},
									fontWeight: 400,
								}}
							>
								to Trakr
							</Typography>
						</Box>
					</Slide>

					<Slide
						direction="up"
						in
						timeout={1200}
					>
						<Typography
							variant="body1"
							align="center"
							sx={{
								mb: 4,
								color: "text.secondary",
								fontSize: {
									xs: "1rem",
									sm: "1.1rem",
								},
								fontStyle: "italic",
							}}
						>
							Sign in to continue your expense tracking journey
						</Typography>
					</Slide>

					{error && (
						<Slide
							direction="left"
							in
							timeout={600}
						>
							<Alert
								severity="error"
								sx={{
									mb: 3,
									borderRadius: 3,
									fontSize: {
										xs: "0.9rem",
										sm: "1rem",
									},
									background:
										"linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)",
									border: "1px solid rgba(244, 67, 54, 0.2)",
									boxShadow: "0 4px 12px rgba(244, 67, 54, 0.15)",
								}}
							>
								{error}
							</Alert>
						</Slide>
					)}

					<Fade
						in
						timeout={1400}
					>
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 3,
							}}
						>
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
													color: "#667eea",
													mr: 1.5,
													fontSize: {
														xs: "1.3rem",
														sm: "1.5rem",
													},
												}}
											/>
										),
									},
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: 3,
										fontSize: {
											xs: "1rem",
											sm: "1.1rem",
										},
										background: "rgba(255,255,255,0.8)",
										backdropFilter: "blur(10px)",
										transition: "all 0.3s ease",
										"&:hover": {
											background: "rgba(255,255,255,0.9)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(102, 126, 234, 0.25)",
										},
									},
									"& .MuiInputLabel-root": {
										fontSize: {
											xs: "1rem",
											sm: "1.1rem",
										},
									},
								}}
							/>

							<TextField
								label="Password"
								name="password"
								type={showPassword ? "text" : "password"}
								value={form.password}
								onChange={handleChange}
								required
								fullWidth
								variant="outlined"
								slotProps={{
									input: {
										startAdornment: (
											<LockIcon
												sx={{
													color: "#667eea",
													mr: 1.5,
													fontSize: {
														xs: "1.3rem",
														sm: "1.5rem",
													},
												}}
											/>
										),
										endAdornment: (
											<IconButton
												onClick={togglePasswordVisibility}
												edge="end"
												sx={{ color: "#667eea" }}
											>
												{showPassword ? (
													<VisibilityOffIcon />
												) : (
													<VisibilityIcon />
												)}
											</IconButton>
										),
									},
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: 3,
										fontSize: {
											xs: "1rem",
											sm: "1.1rem",
										},
										background: "rgba(255,255,255,0.8)",
										backdropFilter: "blur(10px)",
										transition: "all 0.3s ease",
										"&:hover": {
											background: "rgba(255,255,255,0.9)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(102, 126, 234, 0.25)",
										},
									},
									"& .MuiInputLabel-root": {
										fontSize: {
											xs: "1rem",
											sm: "1.1rem",
										},
									},
								}}
							/>

							<Button
								type="submit"
								variant="contained"
								disabled={loading}
								fullWidth
								sx={{
									mt: 2,
									py: 2,
									borderRadius: 3,
									fontSize: {
										xs: "1.1rem",
										sm: "1.2rem",
									},
									fontWeight: "bold",
									textTransform: "none",
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
									boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
									position: "relative",
									overflow: "hidden",
									"&::before": {
										content: '""',
										position: "absolute",
										top: 0,
										left: "-100%",
										width: "100%",
										height: "100%",
										background:
											"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
										transition: "left 0.5s",
									},
									"&:hover": {
										background:
											"linear-gradient(135deg, #5a67d8 0%, #6b5b95 100%)",
										boxShadow: "0 12px 35px rgba(102, 126, 234, 0.5)",
										transform: "translateY(-3px)",
										"&::before": {
											left: "100%",
										},
									},
									"&:active": {
										transform: "translateY(-1px)",
									},
									transition: "all 0.3s ease",
								}}
							>
								{loading ? "Signing in..." : "Sign In"}
							</Button>
						</Box>
					</Fade>

					<Fade
						in
						timeout={1600}
					>
						<Box
							sx={{
								mt: 4,
								textAlign: "center",
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							<Typography
								variant="body2"
								sx={{
									color: "#667eea",
									cursor: "pointer",
									fontSize: {
										xs: "0.95rem",
										sm: "1rem",
									},
									fontWeight: 500,
									transition: "all 0.3s ease",
									"&:hover": {
										textDecoration: "underline",
										color: "#5a67d8",
										transform: "translateY(-1px)",
									},
								}}
								onClick={handleForgotPassword}
							>
								Forgot your password?
							</Typography>

							<Typography
								variant="body2"
								sx={{
									color: "text.secondary",
									fontSize: {
										xs: "0.9rem",
										sm: "1rem",
									},
								}}
							>
								Don't have an account?{" "}
								<Typography
									component="span"
									sx={{
										color: "#667eea",
										cursor: "pointer",
										fontWeight: "bold",
										fontSize: {
											xs: "0.9rem",
											sm: "1rem",
										},
										transition: "all 0.3s ease",
										"&:hover": {
											textDecoration: "underline",
											color: "#5a67d8",
										},
									}}
									onClick={() => navigate("/register")}
								>
									Create one here
								</Typography>
							</Typography>
						</Box>
					</Fade>
				</Paper>
			</Fade>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				anchorOrigin={{
					vertical: isMobile ? "bottom" : "top",
					horizontal: "center",
				}}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity="info"
					sx={{
						width: "100%",
						fontSize: {
							xs: "0.9rem",
							sm: "1rem",
						},
						borderRadius: 3,
						background: "rgba(33, 150, 243, 0.1)",
						border: "1px solid rgba(33, 150, 243, 0.3)",
					}}
				>
					Password reset functionality will be available soon!
				</Alert>
			</Snackbar>
		</>
	);
};

export default Login;
