import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	Container,
	CircularProgress,
	Alert,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import DashboardHeader from "../components/DashboardHeader";
import SummarySection from "../components/SummarySection";
import ChartsSection from "../components/ChartsSection";
import API from "../api";

const Dashboard = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

	const fetchDashboardData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await API.get("/dashboard");
			setDashboardData(response.data);
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
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
							boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
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
			<DashboardHeader />
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
