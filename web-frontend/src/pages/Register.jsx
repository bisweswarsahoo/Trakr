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
	Fade,
	Slide,
	Avatar,
	IconButton,
} from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<>
			<Box
				sx={{
					position: "absolute",
					top: "15%",
					right: "10%",
					width: 120,
					height: 120,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.1)",
					animation: "float 5s ease-in-out infinite",
					"@keyframes float": {
						"0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
						"50%": { transform: "translateY(-25px) rotate(180deg)" },
					},
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					top: "60%",
					left: "8%",
					width: 90,
					height: 90,
					borderRadius: "50%",
					background: "rgba(255,255,255,0.08)",
					animation: "float 7s ease-in-out infinite reverse",
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
							lg: 550,
						},
						maxWidth: "580px",
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
							background:
								"linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)",
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
									width: 85,
									height: 85,
									mb: 2,
									background:
										"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
									boxShadow: "0 8px 24px rgba(240, 147, 251, 0.4)",
									animation: "bounce 2s ease-in-out infinite alternate",
									"@keyframes bounce": {
										"0%": { transform: "scale(1) rotate(0deg)" },
										"100%": { transform: "scale(1.08) rotate(5deg)" },
									},
								}}
							>
								<TrackChangesIcon sx={{ fontSize: 42, color: "white" }} />
							</Avatar>
							<Typography
								variant={isMobile ? "h4" : "h3"}
								align="center"
								sx={{
									fontWeight: 800,
									background:
										"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
								Join Trakr
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
								Create Your Account
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
							Start your expense tracking journey today
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
										"linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(245, 87, 108, 0.05) 100%)",
									border: "1px solid rgba(245, 87, 108, 0.2)",
									boxShadow: "0 4px 12px rgba(245, 87, 108, 0.15)",
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
													color: "#f093fb",
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
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.25)",
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
													color: "#f093fb",
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
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.25)",
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
								helperText="Minimum 6 characters"
								slotProps={{
									input: {
										startAdornment: (
											<LockIcon
												sx={{
													color: "#f093fb",
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
												sx={{ color: "#f093fb" }}
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
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.25)",
										},
									},
									"& .MuiInputLabel-root": {
										fontSize: {
											xs: "1rem",
											sm: "1.1rem",
										},
									},
									"& .MuiFormHelperText-root": {
										fontSize: {
											xs: "0.8rem",
											sm: "0.85rem",
										},
									},
								}}
							/>

							<TextField
								label="Confirm Password"
								name="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
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
													color: "#f093fb",
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
												onClick={toggleConfirmPasswordVisibility}
												edge="end"
												sx={{ color: "#f093fb" }}
											>
												{showConfirmPassword ? (
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
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.15)",
										},
										"&.Mui-focused": {
											background: "rgba(255,255,255,1)",
											transform: "translateY(-2px)",
											boxShadow: "0 8px 25px rgba(240, 147, 251, 0.25)",
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
										"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
									boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
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
											"linear-gradient(135deg, #e91e63 0%, #e53e3e 100%)",
										boxShadow: "0 12px 35px rgba(240, 147, 251, 0.5)",
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
								{loading ? "Creating Account..." : "Create Account"}
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
							}}
						>
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
								Already have an account?{" "}
								<Typography
									component="span"
									sx={{
										color: "#f093fb",
										cursor: "pointer",
										fontWeight: "bold",
										fontSize: {
											xs: "0.9rem",
											sm: "1rem",
										},
										transition: "all 0.3s ease",
										"&:hover": {
											textDecoration: "underline",
											color: "#e91e63",
										},
									}}
									onClick={() => navigate("/login")}
								>
									Sign in here
								</Typography>
							</Typography>
						</Box>
					</Fade>
				</Paper>
			</Fade>
		</>
	);
};

export default Register;
