import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import API from "../api";
import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Paper,
	IconButton,
	Box,
	CircularProgress,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [expenses, setExpenses] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [summaryLoading, setSummaryLoading] = useState(true);

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
			<AddExpenseForm onAddExpense={handleAddExpense} />
			<Paper
				elevation={6}
				sx={{
					marginY: isMobile ? 2 : 4,
					padding: isMobile ? 2 : 3,
					borderRadius: 3,
					backgroundColor: "rgba(255, 255, 255, 0.95)",
					marginX: isMobile ? 1 : "auto",
					maxWidth: isMobile ? "none" : "800px",
				}}
			>
				<Typography
					variant={isMobile ? "h6" : "h6"}
					sx={{
						mb: 2,
						fontWeight: "bold",
						color: "primary.main",
						fontSize: isMobile ? "1.1rem" : "1.25rem",
					}}
				>
					Your Expenses
				</Typography>
				{!summaryLoading && summary && (
					<Box
						sx={{
							display: "flex",
							flexDirection: isMobile ? "column" : "row",
							justifyContent: isMobile ? "center" : "space-between",
							alignItems: "center",
							mb: 2,
							p: isMobile ? 1.5 : 2,
							backgroundColor: "primary.light",
							borderRadius: 2,
							color: "white",
							gap: isMobile ? 0 : 1,
						}}
					>
						<Typography
							variant="body1"
							sx={{
								fontSize: isMobile ? "0.9rem" : "1rem",
								textAlign: isMobile ? "center" : "left",
							}}
						>
							Total Expenses: {summary.totalExpenses || 0}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: isMobile ? "0.9rem" : "1rem",
								textAlign: isMobile ? "center" : "right",
							}}
						>
							Total Amount: ₹{summary.totalAmount || "0.00"}
						</Typography>
					</Box>
				)}
				{loading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							py: isMobile ? 3 : 4,
						}}
					>
						<CircularProgress size={isMobile ? 40 : 48} />
					</Box>
				) : (
					<List>
						{expenses.length === 0 ? (
							<Box sx={{ textAlign: "center", py: isMobile ? 3 : 4 }}>
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
								>
									No expenses yet. Add your first expense above!
								</Typography>
							</Box>
						) : (
							expenses.map((exp) => (
								<ListItem
									key={exp._id}
									divider
									sx={{
										px: isMobile ? 1 : 2,
										py: isMobile ? 1.5 : 2,
									}}
									secondaryAction={
										<IconButton
											edge="end"
											onClick={() => handleDeleteExpense(exp._id)}
											sx={{
												color: "error.main",
												size: isMobile ? "small" : "medium",
											}}
										>
											<DeleteIcon fontSize={isMobile ? "small" : "medium"} />
										</IconButton>
									}
								>
									<ReceiptIcon
										sx={{
											mr: isMobile ? 1.5 : 2,
											color: "primary.main",
											fontSize: isMobile ? "1.2rem" : "1.5rem",
										}}
									/>
									<ListItemText
										primary={`${exp.title} - ₹${exp.amount}`}
										secondary={`${exp.category} | ${new Date(
											exp.date
										).toLocaleDateString()}`}
										slotProps={{
											primary: {
												fontSize: isMobile ? "0.95rem" : "1rem",
												fontWeight: 500,
											},
											secondary: {
												fontSize: isMobile ? "0.8rem" : "0.875rem",
											},
										}}
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
