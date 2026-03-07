import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	TextField,
	Button,
	Avatar,
	Chip,
	CircularProgress,
	Alert,
	Snackbar,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import StoreIcon from "@mui/icons-material/Store";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import API from "../services/api";
import { getGradientByName } from "@trakr/design-system";
import { getInitials } from "@trakr/utils";

const SettingsPage = ({ onLogout }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const mode = theme.palette.mode;

	const [user, setUser] = useState(null);
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState({ name: "", shop_name: "" });
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await API.get("/users/me");
				setUser(data);
				setForm({ name: data.name || "", shop_name: data.shop_name || "" });
			} catch (err) {
				console.error("Error fetching user", err);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const handleSave = async () => {
		try {
			setSaving(true);
			const { data } = await API.put("/users/me", form);
			setUser(data);
			setEditing(false);
			setSnackbar({
				open: true,
				message: "Profile updated!",
				severity: "success",
			});
		} catch (err) {
			setSnackbar({
				open: true,
				message: err.response?.data?.error || "Failed to update",
				severity: "error",
			});
		} finally {
			setSaving(false);
		}
	};

	const handleLogout = async () => {
		try {
			await API.post("/auth/logout");
		} catch {
			/* ignore */
		}
		localStorage.removeItem("token");
		if (onLogout) onLogout();
	};

	if (loading) {
		return (
			<Box
				sx={{
					minHeight: "60vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	return (
		<Container
			maxWidth="sm"
			sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}
		>
			{/* Profile Card */}
			<Paper
				elevation={8}
				sx={{
					borderRadius: 3,
					overflow: "hidden",
					mb: 3,
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				{/* Header */}
				<Box
					sx={{
						background: getGradientByName("primary", mode),
						color: "white",
						p: isMobile ? 3 : 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: -30,
							right: -30,
							width: 120,
							height: 120,
							background: "rgba(255,255,255,0.1)",
							borderRadius: "50%",
						},
						"&::after": {
							content: '""',
							position: "absolute",
							bottom: -20,
							left: -20,
							width: 80,
							height: 80,
							background: "rgba(255,255,255,0.05)",
							borderRadius: "50%",
						},
					}}
				>
					<Avatar
						sx={{
							width: isMobile ? 80 : 100,
							height: isMobile ? 80 : 100,
							bgcolor: "rgba(255,255,255,0.2)",
							border: "3px solid rgba(255,255,255,0.4)",
							fontSize: isMobile ? "2rem" : "2.5rem",
							fontWeight: "bold",
							mb: 2,
							position: "relative",
							zIndex: 1,
						}}
					>
						{getInitials(user?.name)}
					</Avatar>
					<Typography
						variant="h5"
						sx={{
							fontWeight: "bold",
							position: "relative",
							zIndex: 1,
						}}
					>
						{user?.name || "User"}
					</Typography>
					<Typography
						variant="body2"
						sx={{ opacity: 0.9, position: "relative", zIndex: 1, mt: 0.5 }}
					>
						{user?.email}
					</Typography>
					{user?.shop_name && (
						<Chip
							icon={<StoreIcon sx={{ color: "white !important" }} />}
							label={user.shop_name}
							sx={{
								mt: 1.5,
								bgcolor: "rgba(255,255,255,0.2)",
								color: "white",
								border: "1px solid rgba(255,255,255,0.3)",
								fontWeight: 500,
								position: "relative",
								zIndex: 1,
							}}
						/>
					)}
				</Box>

				{/* Profile Details / Edit Form */}
				<Box sx={{ p: isMobile ? 2 : 3 }}>
					{editing ? (
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
							<TextField
								label="Full Name"
								value={form.name}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, name: e.target.value }))
								}
								fullWidth
								slotProps={{
									input: {
										startAdornment: (
											<PersonIcon sx={{ color: "primary.main", mr: 1 }} />
										),
									},
								}}
							/>
							<TextField
								label="Shop Name"
								value={form.shop_name}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shop_name: e.target.value,
									}))
								}
								fullWidth
								slotProps={{
									input: {
										startAdornment: (
											<StoreIcon sx={{ color: "primary.main", mr: 1 }} />
										),
									},
								}}
							/>
							<Box
								sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}
							>
								<Button
									variant="outlined"
									onClick={() => {
										setEditing(false);
										setForm({
											name: user?.name || "",
											shop_name: user?.shop_name || "",
										});
									}}
									sx={{ borderRadius: 2, textTransform: "none" }}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									startIcon={saving ? null : <SaveIcon />}
									onClick={handleSave}
									disabled={saving}
									sx={{
										borderRadius: 2,
										textTransform: "none",
										background: getGradientByName("primary", mode),
									}}
								>
									{saving ? (
										<CircularProgress
											size={20}
											sx={{ color: "white" }}
										/>
									) : (
										"Save Changes"
									)}
								</Button>
							</Box>
						</Box>
					) : (
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							{[
								{
									icon: <PersonIcon color="primary" />,
									label: "Name",
									value: user?.name,
								},
								{
									icon: <EmailIcon color="primary" />,
									label: "Email",
									value: user?.email,
								},
								{
									icon: <StoreIcon color="primary" />,
									label: "Shop",
									value: user?.shop_name,
								},
								{
									icon: <CalendarTodayIcon color="primary" />,
									label: "Member since",
									value: user?.created_at
										? new Date(user.created_at).toLocaleDateString()
										: "—",
								},
							].map((item, i) => (
								<Box
									key={i}
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 2,
										p: 1.5,
										borderRadius: 2,
										bgcolor:
											theme.palette.mode === "light"
												? theme.palette.grey[50]
												: theme.palette.grey[900],
									}}
								>
									{item.icon}
									<Box>
										<Typography
											variant="caption"
											color="text.secondary"
											sx={{ display: "block" }}
										>
											{item.label}
										</Typography>
										<Typography
											variant="body1"
											sx={{ fontWeight: 500 }}
										>
											{item.value || "—"}
										</Typography>
									</Box>
								</Box>
							))}
							<Button
								variant="outlined"
								startIcon={<EditIcon />}
								onClick={() => setEditing(true)}
								sx={{
									mt: 1,
									borderRadius: 2,
									textTransform: "none",
									fontWeight: 600,
								}}
							>
								Edit Profile
							</Button>
						</Box>
					)}
				</Box>
			</Paper>

			{/* Logout */}
			<Button
				variant="contained"
				fullWidth
				startIcon={<LogoutIcon />}
				onClick={handleLogout}
				sx={{
					py: 1.5,
					borderRadius: 3,
					fontWeight: "bold",
					textTransform: "none",
					fontSize: "1rem",
					background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
					"&:hover": {
						background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
						transform: "translateY(-2px)",
						boxShadow: "0 8px 20px rgba(239,68,68,0.3)",
					},
					transition: "all 0.3s ease",
				}}
			>
				Log Out
			</Button>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
					severity={snackbar.severity}
					sx={{ borderRadius: 2 }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default SettingsPage;
