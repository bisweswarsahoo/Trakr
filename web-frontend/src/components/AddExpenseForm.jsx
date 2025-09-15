import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const AddExpenseForm = ({ onAddExpense }) => {
	const [formData, setFormData] = useState({
		title: "",
		amount: "",
		category: "",
		date: "",
	});

	const [errors, setErrors] = useState({});

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

		onAddExpense(formData);
		setFormData({ title: "", amount: "", category: "", date: "" });
	};

	return (
		<Paper
			elevation={3}
			sx={{ padding: 3, maxWidth: 500, margin: "20px auto" }}
		>
			<Typography
				variant="h5"
				gutterBottom
			>
				Add New Expense
			</Typography>
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
				/>
				<TextField
					label="Category"
					name="category"
					value={formData.category}
					onChange={handleChange}
					error={!!errors.category}
					helperText={errors.category}
					fullWidth
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
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Add Expense
				</Button>
			</Box>
		</Paper>
	);
};

export default AddExpenseForm;
