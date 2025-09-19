import React, { useState } from "react";
import {
	TextField,
	Button,
	Box,
	Typography,
	Paper,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddExpenseForm = ({ onAddExpense }) => {
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
	};

	return (
		<>
			<Paper
				elevation={6}
				sx={{
					padding: isMobile ? 2 : 3,
					width: {
						xs: "90%",
						sm: "85%",
						lg: 500,
					},
					maxWidth: 500,
					margin: isMobile ? "10px auto" : "20px auto",
					borderRadius: 3,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: isMobile ? 1.5 : 2,
					}}
				>
					<AddCircleIcon
						sx={{
							fontSize: isMobile ? 25 : 30,
							color: "primary.main",
							mr: 1,
						}}
					/>
					<Typography
						variant={isMobile ? "h5" : "h5"}
						sx={{
							fontSize: isMobile ? "1.3rem" : "1.5rem",
							fontWeight: "bold",
						}}
					>
						Add New Expense
					</Typography>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: isMobile ? 1.5 : 2,
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
						size={isMobile ? "small" : "medium"}
						slotProps={{
							input: {
								startAdornment: (
									<TitleIcon sx={{ color: "action.active", mr: 1 }} />
								),
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
							inputLabel: {
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
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
						size={isMobile ? "small" : "medium"}
						slotProps={{
							input: {
								startAdornment: (
									<AttachMoneyIcon sx={{ color: "action.active", mr: 1 }} />
								),
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
							inputLabel: {
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
						}}
					/>
					<TextField
						label="Category"
						name="category"
						value={formData.category}
						onChange={handleChange}
						error={!!errors.category}
						helperText={errors.category}
						fullWidth
						size={isMobile ? "small" : "medium"}
						slotProps={{
							input: {
								startAdornment: (
									<CategoryIcon sx={{ color: "action.active", mr: 1 }} />
								),
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
							inputLabel: {
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
						}}
					/>
					<TextField
						label="Date"
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						error={!!errors.date}
						helperText={errors.date}
						fullWidth
						size={isMobile ? "small" : "medium"}
						slotProps={{
							input: {
								startAdornment: (
									<DateRangeIcon sx={{ color: "action.active", mr: 1 }} />
								),
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
							inputLabel: {
								shrink: true,
								style: { fontSize: isMobile ? "0.9rem" : "1rem" },
							},
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
						sx={{
							mt: 1,
							py: isMobile ? 1 : 1.5,
							fontSize: isMobile ? "0.9rem" : "1rem",
							fontWeight: "bold",
						}}
					>
						{loading ? "Adding..." : "Add Expense"}
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default AddExpenseForm;
