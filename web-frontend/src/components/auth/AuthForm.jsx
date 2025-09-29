import { useState } from "react";
import {
	Box,
	Paper,
	Alert,
	Snackbar,
	Fade,
	Slide,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import API from "../../api";
import AuthContainer from "./AuthContainer";
import AuthHeader from "./AuthHeader";
import AuthTextField from "./AuthTextField";
import AuthButton from "./AuthButton";
import FloatingElements from "./FloatingElements";
import { getGradientByName, createAlphaColor } from "../../theme/utils";

const AuthForm = ({ mode = "login", onLogin }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isRegister = mode === "register";

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const config = {
		login: {
			title: "Welcome Back",
			subtitle: "to Trakr",
			description: "Sign in to continue your expense tracking journey",
			buttonText: "Sign In",
			loadingText: "Signing in...",
			footerText: "Don't have an account?",
			footerLinkText: "Create one here",
			footerAction: () => navigate("/register"),
			borderGradient: getGradientByName("primary", theme),
		},
		register: {
			title: "Join Trakr",
			subtitle: "Create Your Account",
			description: "Start your expense tracking journey today",
			buttonText: "Create Account",
			loadingText: "Creating Account...",
			footerText: "Already have an account?",
			footerLinkText: "Sign in here",
			footerAction: () => navigate("/login"),
			borderGradient: getGradientByName("secondary", theme),
		},
	};

	const currentConfig = config[mode];

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isRegister) {
			if (form.password !== form.confirmPassword) {
				setError("Passwords do not match");
				return;
			}
			if (form.password.length < 6) {
				setError("Password must be at least 6 characters long");
				return;
			}
		}

		setLoading(true);
		try {
			if (isRegister) {
				await API.post("/users/register", {
					name: form.name,
					email: form.email,
					password: form.password,
				});
				navigate("/login");
			} else {
				const { data } = await API.post("/users/login", form);
				localStorage.setItem("token", data.token);
				onLogin(data.token);
				navigate("/");
			}
		} catch (err) {
			setError(
				err.response?.data?.message ||
					`${isRegister ? "Registration" : "Login"} failed`
			);
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = () => {
		setSnackbarOpen(true);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<AuthContainer variant={mode}>
			<FloatingElements variant={mode} />

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
							lg: isRegister ? 550 : 500,
						},
						maxWidth: isRegister ? "580px" : "520px",
						borderRadius: 4,
						background: createAlphaColor(theme.palette.background.paper, 0.95),
						backdropFilter: "blur(20px)",
						boxShadow: `0 32px 64px ${createAlphaColor(
							theme.palette.common.black,
							0.15
						)}, inset 0 1px 0 ${createAlphaColor(
							theme.palette.common.white,
							0.6
						)}`,
						border: `1px solid ${createAlphaColor(
							theme.palette.common.white,
							0.2
						)}`,
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: 4,
							background: currentConfig.borderGradient,
						},
					}}
				>
					<AuthHeader
						variant={mode}
						title={currentConfig.title}
						subtitle={currentConfig.subtitle}
						description={currentConfig.description}
					/>

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
									background: isRegister
										? "linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(245, 87, 108, 0.05) 100%)"
										: "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)",
									border: isRegister
										? "1px solid rgba(245, 87, 108, 0.2)"
										: "1px solid rgba(244, 67, 54, 0.2)",
									boxShadow: isRegister
										? "0 4px 12px rgba(245, 87, 108, 0.15)"
										: "0 4px 12px rgba(244, 67, 54, 0.15)",
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
							{isRegister && (
								<AuthTextField
									label="Full Name"
									name="name"
									value={form.name}
									onChange={handleChange}
									required
									startIcon={PersonIcon}
									variant={mode}
								/>
							)}

							<AuthTextField
								label="Email Address"
								name="email"
								type="email"
								value={form.email}
								onChange={handleChange}
								required
								startIcon={EmailIcon}
								variant={mode}
							/>

							<AuthTextField
								label="Password"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
								helperText={isRegister ? "Minimum 6 characters" : undefined}
								startIcon={LockIcon}
								variant={mode}
								isPassword
								showPassword={showPassword}
								onTogglePassword={togglePasswordVisibility}
							/>

							{isRegister && (
								<AuthTextField
									label="Confirm Password"
									name="confirmPassword"
									value={form.confirmPassword}
									onChange={handleChange}
									required
									startIcon={LockIcon}
									variant={mode}
									isPassword
									showPassword={showConfirmPassword}
									onTogglePassword={toggleConfirmPasswordVisibility}
								/>
							)}

							<AuthButton
								loading={loading}
								variant={mode}
							>
								{loading ? currentConfig.loadingText : currentConfig.buttonText}
							</AuthButton>
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
							{!isRegister && (
								<Typography
									variant="body2"
									sx={{
										color: theme.palette.primary.main,
										cursor: "pointer",
										fontSize: {
											xs: "0.95rem",
											sm: "1rem",
										},
										fontWeight: 500,
										transition: "all 0.3s ease",
										"&:hover": {
											textDecoration: "underline",
											color: theme.palette.primary.dark,
											transform: "translateY(-1px)",
										},
									}}
									onClick={handleForgotPassword}
								>
									Forgot your password?
								</Typography>
							)}

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
								{currentConfig.footerText}{" "}
								<Typography
									component="span"
									sx={{
										color: isRegister
											? theme.palette.secondary.main
											: theme.palette.primary.main,
										cursor: "pointer",
										fontWeight: "bold",
										fontSize: {
											xs: "0.9rem",
											sm: "1rem",
										},
										transition: "all 0.3s ease",
										"&:hover": {
											textDecoration: "underline",
											color: isRegister
												? theme.palette.secondary.dark
												: theme.palette.primary.dark,
										},
									}}
									onClick={currentConfig.footerAction}
								>
									{currentConfig.footerLinkText}
								</Typography>
							</Typography>
						</Box>
					</Fade>
				</Paper>
			</Fade>

			{!isRegister && (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={4000}
					onClose={() => setSnackbarOpen(false)}
					anchorOrigin={{
						vertical: isMobile ? "bottom" : "top",
						horizontal: "center",
					}}
				>
					<Alert
						onClose={() => setSnackbarOpen(false)}
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
			)}
		</AuthContainer>
	);
};

export default AuthForm;
