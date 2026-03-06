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
	const [categories, setCategories] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [summaryLoading, setSummaryLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	// Fetch categories for name-to-id mapping
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data } = await API.get("/categories");
				setCategories(data);
			} catch (err) {
				console.error("Error fetching categories", err);
			}
		};
		fetchCategories();
	}, []);

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
				setSummary({
					totalAmount: data.monthly?.expense?.toFixed(2) || "0.00",
					totalExpenses:
						data.recent_transactions?.filter((t) => t.type === "expense")
							.length || 0,
					categoryCount: data.charts?.category_breakdown?.length || 0,
					averageExpense:
						data.monthly?.expense && data.recent_transactions?.length
							? (
									data.monthly.expense /
									Math.max(
										data.recent_transactions.filter((t) => t.type === "expense")
											.length,
										1,
									)
								).toFixed(2)
							: "0.00",
				});
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
			// Map category name to category_id
			const category = categories.find(
				(c) =>
					c.name.toLowerCase() === expense.category?.toLowerCase() &&
					c.type === "expense",
			);

			const { data } = await API.post("/expenses/", {
				title: expense.title,
				amount: parseFloat(expense.amount),
				date: expense.date
					? new Date(expense.date).toISOString()
					: new Date().toISOString(),
				type: "expense",
				payment_method: "cash",
				category_id: category?.id || categories[0]?.id || 1,
				notes: expense.category || "",
			});
			setExpenses((prev) => [data, ...prev]);
		} catch (err) {
			console.error("Error adding expense", err);
		}
	};

	const handleDeleteExpense = async (id) => {
		try {
			await API.delete(`/expenses/${id}`);
			setExpenses((prev) => prev.filter((exp) => exp.id !== id));
		} catch (err) {
			console.error("Error deleting expense", err);
		}
	};

	// Build a category lookup map for ExpenseList
	const categoryMap = {};
	categories.forEach((c) => {
		categoryMap[c.id] = c.name;
	});

	// Enrich expenses with category name from the map
	const enrichedExpenses = expenses.map((exp) => ({
		...exp,
		category: categoryMap[exp.category_id] || exp.notes || "Other",
	}));

	return (
		<>
			<AddExpenseForm
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onAddExpense={handleAddExpense}
			/>
			<ExpenseList
				expenses={enrichedExpenses}
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
