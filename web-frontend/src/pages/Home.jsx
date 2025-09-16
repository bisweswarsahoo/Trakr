import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import API from "../api";
import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Container,
	Paper,
	IconButton,
	Box,
	CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Home = () => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch expenses from backend
	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const { data } = await API.get("/expenses");
				setExpenses(data);
			} catch (err) {
				console.error("Error fetching expenses", err);
			} finally {
				setLoading(false);
			}
		};
		fetchExpenses();
	}, []);

	// Add new expense
	const handleAddExpense = async (expense) => {
		try {
			const { data } = await API.post("/expenses", expense);
			setExpenses((prev) => [...prev, data]);
		} catch (err) {
			console.error("Error adding expense", err);
		}
	};

	// Delete expense
	const handleDeleteExpense = async (id) => {
		try {
			await API.delete(`/expenses/${id}`);
			setExpenses((prev) => prev.filter((exp) => exp._id !== id));
		} catch (err) {
			console.error("Error deleting expense", err);
		}
	};

	return (
		<>
			<AddExpenseForm onAddExpense={handleAddExpense} />
			<Paper
				elevation={6}
				sx={{
					marginTop: 4,
					padding: 3,
					borderRadius: 3,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
				}}
			>
				<Typography
					variant="h6"
					sx={{
						mb: 2,
						fontWeight: "bold",
						color: "primary.main",
					}}
				>
					Your Expenses
				</Typography>
				{!loading && expenses.length > 0 && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
							p: 2,
							backgroundColor: "primary.light",
							borderRadius: 2,
							color: "white",
						}}
					>
						<Typography variant="body1">
							Total Expenses: {expenses.length}
						</Typography>
						<Typography variant="body1">
							Total Amount: ₹
							{expenses
								.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
								.toFixed(2)}
						</Typography>
					</Box>
				)}
				{loading ? (
					<Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
						<CircularProgress />
					</Box>
				) : (
					<List>
						{expenses.length === 0 ? (
							<Box sx={{ textAlign: "center", py: 4 }}>
								<Typography
									variant="body1"
									color="text.secondary"
								>
									No expenses yet. Add your first expense above!
								</Typography>
							</Box>
						) : (
							expenses.map((exp) => (
								<ListItem
									key={exp._id}
									divider
									secondaryAction={
										<IconButton
											edge="end"
											onClick={() => handleDeleteExpense(exp._id)}
											sx={{ color: "error.main" }}
										>
											<DeleteIcon />
										</IconButton>
									}
								>
									<ReceiptIcon sx={{ mr: 2, color: "primary.main" }} />
									<ListItemText
										primary={`${exp.title} - ₹${exp.amount}`}
										secondary={`${exp.category} | ${new Date(
											exp.date
										).toLocaleDateString()}`}
									/>
								</ListItem>
							))
						)}
					</List>
				)}
			</Paper>
		</>
	);
};

export default Home;
