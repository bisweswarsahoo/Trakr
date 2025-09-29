import { useState } from "react";
import {
	TextField,
	Button,
	Box,
	Typography,
	Paper,
	useTheme,
	useMediaQuery,
	Modal,
	IconButton,
	Backdrop,
	Avatar,
	Divider,
	MenuItem,
	Slide,
	CircularProgress,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
	getCategoryColor,
	getGradientByName,
	createAlphaColor,
} from "../theme/utils";

const AddExpenseForm = ({ open, onClose, onAddExpense }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [formData, setFormData] = useState({
		title: "",
		amount: "",
		category: "",
		date: "",
	});

	const [errors, setErrors] = useState({});

	const categories = [
		{ name: "Food", icon: "🍽️", key: "food" },
		{ name: "Transport", icon: "🚗", key: "transport" },
		{ name: "Entertainment", icon: "🎬", key: "entertainment" },
		{ name: "Shopping", icon: "🛍️", key: "shopping" },
		{ name: "Health", icon: "🏥", key: "healthcare" },
		{ name: "Utilities", icon: "💡", key: "utilities" },
		{ name: "Education", icon: "📚", key: "education" },
		{ name: "Other", icon: "💰", key: "other" },
	];

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validate = () => {
		let newErrors = {};
		if (!formData.title) newErrors.title = "Title is required";
		if (!formData.amount || formData.amount <= 0)
			newErrors.amount = "Enter a valid amount";
		if (!formData.category) newErrors.category = "Category is required";
		if (!formData.date) newErrors.date = "Select a date";
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		onAddExpense(formData);
		setFormData({ title: "", amount: "", category: "", date: "" });
		setLoading(false);
		onClose(); // Close modal after successful submission
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{
				backdrop: Backdrop,
			}}
			slotProps={{
				backdrop: {
					timeout: 500,
					sx: {
						backgroundColor: createAlphaColor(
							theme.palette.background.default,
							0.7
						),
						backdropFilter: "blur(8px)",
					},
				},
			}}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Slide
				direction="up"
				in={open}
				mountOnEnter
				unmountOnExit
			>
				<Box
					sx={{
						position: "relative",
						width: {
							xs: "95%",
							sm: "90%",
							md: 550,
						},
						maxWidth: 550,
						maxHeight: "95vh",
						overflow: "auto",
						outline: "none",
						borderRadius: 3,
					}}
				>
					<Paper
						elevation={24}
						sx={{
							background: theme.palette.background.paper,
							position: "relative",
							overflow: "hidden",
							border: `1px solid ${theme.palette.divider}`,
						}}
					>
						<Box
							sx={{
								background: getGradientByName("primary", theme),
								color: theme.palette.primary.contrastText,
								p: isMobile ? 2.5 : 3,
								position: "relative",
								overflow: "hidden",
								"&::before": {
									content: '""',
									position: "absolute",
									top: -20,
									right: -20,
									width: 100,
									height: 100,
									background: createAlphaColor(theme.palette.common.white, 0.1),
									borderRadius: "50%",
								},
								"&::after": {
									content: '""',
									position: "absolute",
									bottom: -30,
									left: -30,
									width: 80,
									height: 80,
									background: createAlphaColor(
										theme.palette.common.white,
										0.05
									),
									borderRadius: "50%",
								},
							}}
						>
							<IconButton
								onClick={onClose}
								sx={{
									position: "absolute",
									right: 12,
									top: 12,
									color: theme.palette.primary.contrastText,
									backgroundColor: createAlphaColor(
										theme.palette.common.white,
										0.15
									),
									zIndex: 2,
									"&:hover": {
										backgroundColor: createAlphaColor(
											theme.palette.common.white,
											0.25
										),
									},
								}}
							>
								<CloseIcon />
							</IconButton>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									position: "relative",
									zIndex: 1,
								}}
							>
								<Avatar
									sx={{
										bgcolor: createAlphaColor(theme.palette.common.white, 0.2),
										color: theme.palette.primary.contrastText,
										width: isMobile ? 50 : 60,
										height: isMobile ? 50 : 60,
										mr: 2,
									}}
								>
									<AddCircleIcon fontSize="large" />
								</Avatar>
								<Box>
									<Typography
										variant={isMobile ? "h5" : "h4"}
										sx={{
											fontSize: isMobile ? "1.4rem" : "1.8rem",
											fontWeight: "bold",
											lineHeight: 1.2,
										}}
									>
										Add New Expense
									</Typography>
									<Typography
										variant="body2"
										sx={{
											opacity: 0.9,
											fontSize: isMobile ? "0.85rem" : "0.9rem",
											mt: 0.5,
										}}
									>
										Track your spending effortlessly
									</Typography>
								</Box>
							</Box>
						</Box>

						{/* Enhanced Content Section */}
						<Box sx={{ p: isMobile ? 2.5 : 3.5 }}>
							<Box
								component="form"
								onSubmit={handleSubmit}
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: isMobile ? 2.5 : 3,
								}}
							>
								<TextField
									label="Expense Title"
									name="title"
									value={formData.title}
									onChange={handleChange}
									error={!!errors.title}
									helperText={errors.title}
									fullWidth
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											borderRadius: theme.shape.borderRadius,
											backgroundColor:
												theme.palette.mode === "light"
													? theme.palette.grey[50]
													: theme.palette.grey[900],
											"&:hover": {
												backgroundColor:
													theme.palette.mode === "light"
														? theme.palette.grey[100]
														: theme.palette.grey[800],
											},
											"&.Mui-focused": {
												backgroundColor: theme.palette.background.paper,
											},
										},
									}}
									slotProps={{
										input: {
											startAdornment: (
												<TitleIcon sx={{ color: "primary.main", mr: 1 }} />
											),
										},
									}}
								/>
								<TextField
									label="Amount"
									type="number"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									error={!!errors.amount}
									helperText={errors.amount}
									fullWidth
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											borderRadius: theme.shape.borderRadius,
											backgroundColor:
												theme.palette.mode === "light"
													? theme.palette.grey[50]
													: theme.palette.grey[900],
											"&:hover": {
												backgroundColor:
													theme.palette.mode === "light"
														? theme.palette.grey[100]
														: theme.palette.grey[800],
											},
											"&.Mui-focused": {
												backgroundColor: theme.palette.background.paper,
											},
										},
									}}
									slotProps={{
										input: {
											startAdornment: (
												<AttachMoneyIcon
													sx={{ color: "success.main", mr: 1 }}
												/>
											),
										},
									}}
								/>
								<TextField
									select
									label="Category"
									name="category"
									value={formData.category}
									onChange={handleChange}
									error={!!errors.category}
									helperText={errors.category}
									fullWidth
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											borderRadius: theme.shape.borderRadius,
											backgroundColor:
												theme.palette.mode === "light"
													? theme.palette.grey[50]
													: theme.palette.grey[900],
											"&:hover": {
												backgroundColor:
													theme.palette.mode === "light"
														? theme.palette.grey[100]
														: theme.palette.grey[800],
											},
											"&.Mui-focused": {
												backgroundColor: theme.palette.background.paper,
											},
										},
									}}
									slotProps={{
										input: {
											startAdornment: (
												<CategoryIcon sx={{ color: "warning.main", mr: 1 }} />
											),
										},
									}}
								>
									{categories.map((cat) => (
										<MenuItem
											key={cat.name}
											value={cat.name}
										>
											<Box
												sx={{ display: "flex", alignItems: "center", gap: 1 }}
											>
												<span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
												<Typography>{cat.name}</Typography>
											</Box>
										</MenuItem>
									))}
								</TextField>
								<TextField
									label="Date"
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									error={!!errors.date}
									helperText={errors.date}
									fullWidth
									variant="outlined"
									sx={{
										"& .MuiOutlinedInput-root": {
											borderRadius: theme.shape.borderRadius,
											backgroundColor:
												theme.palette.mode === "light"
													? theme.palette.grey[50]
													: theme.palette.grey[900],
											"&:hover": {
												backgroundColor:
													theme.palette.mode === "light"
														? theme.palette.grey[100]
														: theme.palette.grey[800],
											},
											"&.Mui-focused": {
												backgroundColor: theme.palette.background.paper,
											},
										},
									}}
									slotProps={{
										input: {
											startAdornment: (
												<DateRangeIcon sx={{ color: "info.main", mr: 1 }} />
											),
										},
										inputLabel: {
											shrink: true,
										},
									}}
								/>
								{/* Enhanced Submit Section */}
								<Divider sx={{ my: 2, borderStyle: "dashed" }} />

								<Button
									type="submit"
									variant="contained"
									size="large"
									disabled={loading}
									startIcon={loading ? null : <SaveIcon />}
									sx={{
										py: isMobile ? 1.5 : 2,
										fontSize: isMobile ? "1rem" : "1.1rem",
										fontWeight: "bold",
										borderRadius: theme.shape.borderRadius,
										background: loading
											? theme.palette.action.disabledBackground
											: getGradientByName("primary", theme),
										boxShadow: loading ? "none" : theme.shadows[2],
										textTransform: "none",
										transition: theme.transitions.create([
											"transform",
											"box-shadow",
										]),
										"&:hover": loading
											? {}
											: {
													transform: "translateY(-2px)",
													boxShadow: theme.shadows[4],
											  },
										"&:disabled": {
											color: theme.palette.primary.contrastText,
										},
									}}
								>
									{loading ? (
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<CircularProgress
												size={20}
												sx={{ color: theme.palette.primary.contrastText }}
											/>
											Adding Expense...
										</Box>
									) : (
										"Add Expense"
									)}
								</Button>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Slide>
		</Modal>
	);
};

export default AddExpenseForm;
