import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddExpenseForm = ({ onAddExpense }) => {
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
		setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
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
				elevation={6}
				sx={{
					padding: 3,
					width: { xs: "90%", sm: 500 },
					margin: "20px auto",
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
					<AddCircleIcon sx={{ fontSize: 30, color: "primary.main", mr: 1 }} />
					<Typography
						variant="h5"
						gutterBottom
					>
						Add New Expense
					</Typography>
				</Box>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField
						label="Expense Title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						error={!!errors.title}
						helperText={errors.title}
						fullWidth
						InputProps={{
							startAdornment: <TitleIcon />,
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
						InputProps={{
							startAdornment: <AttachMoneyIcon />,
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
						InputProps={{
							startAdornment: <CategoryIcon />,
						}}
					/>
					<TextField
						label="Date"
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
						error={!!errors.date}
						helperText={errors.date}
						fullWidth
						InputProps={{
							startAdornment: <DateRangeIcon />,
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}
					>
						{loading ? "Adding..." : "Add Expense"}
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddExpenseForm;
