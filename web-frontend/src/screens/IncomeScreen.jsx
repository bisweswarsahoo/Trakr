import React, { useState, useEffect } from "react";
import AddIncomeForm from "../components/forms/AddIncomeForm";
import IncomeList from "../components/lists/IncomeList";
import API from "../services/api";
import { useTheme, useMediaQuery, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const IncomePage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [income, setIncome] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [summaryLoading, setSummaryLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const fetchIncome = async () => {
			try {
				const { data } = await API.get("/income");
				setIncome(data);
			} catch (err) {
				console.error("Error fetching income", err);
			} finally {
				setLoading(false);
			}
		};
		fetchIncome();
	}, []);

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				const { data } = await API.get("/dashboard");
				const incomeEntries =
					data.recent_transactions?.filter((t) => t.type === "income") || [];
				setSummary({
					totalAmount: data.monthly?.income?.toFixed(2) || "0.00",
					totalEntries: incomeEntries.length,
				});
			} catch (err) {
				console.error("Error fetching summary", err);
			} finally {
				setSummaryLoading(false);
			}
		};
		fetchSummary();
	}, []);

	const handleAddIncome = async (incomeData) => {
		try {
			const { data } = await API.post("/income/", {
				title: incomeData.title,
				amount: parseFloat(incomeData.amount),
				date: incomeData.date
					? new Date(incomeData.date).toISOString()
					: new Date().toISOString(),
				type: "income",
				payment_method: incomeData.payment_method || "cash",
			});
			setIncome((prev) => [data, ...prev]);
		} catch (err) {
			console.error("Error adding income", err);
		}
	};

	const handleDeleteIncome = async (id) => {
		try {
			await API.delete(`/income/${id}`);
			setIncome((prev) => prev.filter((entry) => entry.id !== id));
		} catch (err) {
			console.error("Error deleting income", err);
		}
	};

	return (
		<>
			<AddIncomeForm
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onAddIncome={handleAddIncome}
			/>
			<IncomeList
				income={income}
				summary={summary}
				loading={loading}
				summaryLoading={summaryLoading}
				onDeleteIncome={handleDeleteIncome}
			/>
			<Fab
				color="secondary"
				aria-label="add income"
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

export default IncomePage;
