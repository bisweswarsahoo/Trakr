import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	Container,
	CircularProgress,
	Alert,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import SummarySection from "../components/sections/SummarySection";
import ChartsSection from "../components/sections/ChartsSection";
import API from "../services/api";
import { getGradientByName, createAlphaColor } from "../theme/utils";

const Dashboard = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const COLORS = [
		theme.palette.primary.main,
		theme.palette.success.main,
		theme.palette.warning.main,
		theme.palette.error.main,
		theme.palette.secondary.main,
	];

	const fetchDashboardData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await API.get("/dashboard");
			const raw = response.data;

			// Transform API response to match component expectations
			const transformed = {
				summary: {
					totalAmount: raw.monthly?.expense?.toFixed(2) || "0.00",
					totalExpenses:
						raw.recent_transactions?.filter((t) => t.type === "expense")
							.length || 0,
					categoryCount: raw.charts?.category_breakdown?.length || 0,
					averageExpense:
						raw.monthly?.expense && raw.recent_transactions?.length
							? (
									raw.monthly.expense /
									Math.max(
										raw.recent_transactions.filter((t) => t.type === "expense")
											.length,
										1,
									)
								).toFixed(2)
							: "0.00",
				},
				charts: {
					pieData: (raw.charts?.category_breakdown || []).map((c) => ({
						name: c.name || "Other",
						value: c.value || 0,
					})),
					barData: (raw.recent_transactions || [])
						.filter((t) => t.type === "expense")
						.slice(0, 7)
						.map((t) => ({
							name: t.title?.substring(0, 12) || "Expense",
							amount: t.amount || 0,
						})),
					monthlyData: (raw.charts?.monthly_trend || []).map((m) => ({
						month: m.month || "",
						amount: m.expense || 0,
					})),
				},
			};

			setDashboardData(transformed);
			setError(null);
		} catch (err) {
			console.error("Error fetching dashboard data:", err);
			setError("Failed to load dashboard data. Please try again.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);

	if (loading) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: isMobile ? 2 : 4,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 3,
					}}
				>
					<CircularProgress
						size={isMobile ? 60 : 80}
						sx={{
							color: "white",
							"& .MuiCircularProgress-circle": {
								strokeLinecap: "round",
							},
						}}
					/>
					<Box
						sx={{
							color: "white",
							textAlign: "center",
						}}
					>
						<Box
							component="div"
							sx={{
								fontSize: isMobile ? "1.2rem" : "1.5rem",
								fontWeight: "bold",
								mb: 1,
							}}
						>
							Loading Dashboard
						</Box>
						<Box
							component="div"
							sx={{
								fontSize: isMobile ? "0.9rem" : "1rem",
								opacity: 0.8,
							}}
						>
							Preparing your expense insights...
						</Box>
					</Box>
				</Box>
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					background: getGradientByName("primary", theme),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: isMobile ? 2 : 4,
				}}
			>
				<Container maxWidth="sm">
					<Alert
						severity="error"
						sx={{
							borderRadius: 3,
							boxShadow: theme.shadows[4],
							fontSize: isMobile ? "0.9rem" : "1rem",
						}}
					>
						{error}
					</Alert>
				</Container>
			</Box>
		);
	}

	const { summary, charts } = dashboardData || {};

	return (
		<Box>
			<Container
				maxWidth="xl"
				sx={{
					py: isMobile ? 3 : 5,
					px: isMobile ? 2 : 3,
					background: "transparent",
				}}
			>
				<SummarySection summary={summary} />
				<ChartsSection charts={charts} />
			</Container>
		</Box>
	);
};

export default Dashboard;
