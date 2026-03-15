import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	Container,
	CircularProgress,
	Alert,
	useTheme,
	useMediaQuery,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SummarySection from "../components/sections/SummarySection";
import ChartsSection from "../components/sections/ChartsSection";
import CategoryBreakdownSection from "../components/sections/CategoryBreakdownSection";
import API from "../services/api";
import { getGradientByName } from "@trakr/design-system";
import { transformDashboardCharts } from "@trakr/utils";
import { REPORT_PERIODS } from "@trakr/config";

const Dashboard = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [dashboardData, setDashboardData] = useState(null);
	const [categoryReport, setCategoryReport] = useState([]);
	const [period, setPeriod] = useState("monthly");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchDashboardData = useCallback(async () => {
		try {
			setLoading(true);
			const [dashboardRes, periodRes, categoryRes] = await Promise.all([
				API.get("/dashboard"),
				API.get(`/reports/${period}`),
				API.get("/reports/category"),
			]);
			const raw = dashboardRes.data;

			const transformed = {
				summary: periodRes.data,
				charts: transformDashboardCharts(raw),
			};

			setDashboardData(transformed);
			setCategoryReport(categoryRes.data);
			setError(null);
		} catch (err) {
			console.error("Error fetching dashboard data:", err);
			setError("Failed to load dashboard data. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [period]);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);

	const handlePeriodChange = (_, newPeriod) => {
		if (newPeriod) setPeriod(newPeriod);
	};

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
					background: getGradientByName("primary", theme.palette.mode),
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
				<Box
					sx={{
						mb: 3,
						display: "flex",
						justifyContent: isMobile ? "center" : "flex-start",
					}}
				>
					<ToggleButtonGroup
						value={period}
						exclusive
						onChange={handlePeriodChange}
						size={isMobile ? "small" : "medium"}
						sx={{
							"& .MuiToggleButton-root": {
								borderRadius: 2,
								px: isMobile ? 2 : 3,
								fontWeight: 600,
								textTransform: "none",
								"&.Mui-selected": {
									background: getGradientByName("primary", theme.palette.mode),
									color: "white",
									"&:hover": {
										background: getGradientByName("primary", theme.palette.mode),
									},
								},
							},
						}}
					>
						{REPORT_PERIODS.map((p) => (
							<ToggleButton
								key={p.value}
								value={p.value}
							>
								{p.value === "daily" && (
									<CalendarTodayIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
								)}
								{p.label}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Box>

				<SummarySection summary={summary} />
				<ChartsSection charts={charts} />
				<CategoryBreakdownSection categoryReport={categoryReport} />
			</Container>
		</Box>
	);
};

export default Dashboard;
