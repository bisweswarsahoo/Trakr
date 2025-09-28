import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import API from "../api";
import { useTheme, useMediaQuery, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [expenses, setExpenses] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [summaryLoading, setSummaryLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

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

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				const { data } = await API.get("/dashboard");
				setSummary(data.summary);
			} catch (err) {
				console.error("Error fetching summary data", err);
			} finally {
				setSummaryLoading(false);
			}
		};
		fetchSummary();
	}, []);

	const handleAddExpense = async (expense) => {
		try {
			const { data } = await API.post("/expenses/", expense);
			setExpenses((prev) => [...prev, data]);
			const summaryResponse = await API.get("/dashboard");
			setSummary(summaryResponse.data.summary);
		} catch (err) {
			console.error("Error adding expense", err);
		}
	};

	const handleDeleteExpense = async (id) => {
		try {
			await API.delete(`/expenses/${id}`);
			setExpenses((prev) => prev.filter((exp) => exp._id !== id));
			const summaryResponse = await API.get("/dashboard");
			setSummary(summaryResponse.data.summary);
		} catch (err) {
			console.error("Error deleting expense", err);
		}
	};

	return (
		<>
			<AddExpenseForm
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onAddExpense={handleAddExpense}
			/>
			<ExpenseList
				expenses={expenses}
				summary={summary}
				loading={loading}
				summaryLoading={summaryLoading}
				onDeleteExpense={handleDeleteExpense}
			/>
			<Fab
				color="primary"
				aria-label="add expense"
				onClick={() => setModalOpen(true)}
				sx={{
					position: "fixed",
					bottom: isMobile ? 16 : 24,
					right: isMobile ? 16 : 24,
					zIndex: 1000,
				}}
			>
				<AddIcon />
			</Fab>
		</>
	);
};

export default Home;
