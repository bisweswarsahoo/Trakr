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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
	const [expenses, setExpenses] = useState([]);

	// Fetch expenses from backend
	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const { data } = await API.get("/expenses");
				setExpenses(data);
			} catch (err) {
				console.error("Error fetching expenses", err);
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
		<Container>
			<Typography
				variant="h3"
				align="center"
				gutterBottom
			>
				Trakr - Expense Tracker
			</Typography>

			<AddExpenseForm onAddExpense={handleAddExpense} />

			<Paper
				elevation={2}
				sx={{ marginTop: 4, padding: 2 }}
			>
				<Typography variant="h6">Expenses</Typography>
				<List>
					{expenses.map((exp) => (
						<ListItem
							key={exp._id}
							divider
							secondaryAction={
								<IconButton
									edge="end"
									onClick={() => handleDeleteExpense(exp._id)}
								>
									<DeleteIcon />
								</IconButton>
							}
						>
							<ListItemText
								primary={`${exp.title} - ₹${exp.amount}`}
								secondary={`${exp.category} | ${new Date(
									exp.date
								).toLocaleDateString()}`}
							/>
						</ListItem>
					))}
				</List>
			</Paper>
		</Container>
	);
};

export default Home;
