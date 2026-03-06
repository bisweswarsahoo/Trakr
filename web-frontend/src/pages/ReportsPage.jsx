import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	CircularProgress,
	Alert,
	ToggleButton,
	ToggleButtonGroup,
	useTheme,
	useMediaQuery,
	Card,
	CardContent,
	Avatar,
	Chip,
	LinearProgress,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BalanceIcon from "@mui/icons-material/Balance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import API from "../api";
import { getGradientByName, createAlphaColor } from "../theme/utils";

const ReportsPage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [period, setPeriod] = useState("monthly");
	const [report, setReport] = useState(null);
	const [categoryReport, setCategoryReport] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchReport = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const [periodRes, categoryRes] = await Promise.all([
				API.get(`/reports/${period}`),
				API.get("/reports/category"),
			]);
			setReport(periodRes.data);
			setCategoryReport(categoryRes.data);
		} catch (err) {
			console.error("Error fetching reports:", err);
			setError("Failed to load reports. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [period]);

	useEffect(() => {
		fetchReport();
	}, [fetchReport]);

	const handlePeriodChange = (_, newPeriod) => {
		if (newPeriod) setPeriod(newPeriod);
	};

	const maxCategoryAmount = categoryReport.length
		? Math.max(...categoryReport.map((c) => c.total))
		: 1;

	if (loading) {
		return (
			<Box
				sx={{
					minHeight: "60vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
					}}
				>
					<CircularProgress size={60} />
					<Typography color="text.secondary">Loading reports...</Typography>
				</Box>
			</Box>
		);
	}

	if (error) {
		return (
			<Container
				maxWidth="sm"
				sx={{ py: 4 }}
			>
				<Alert
					severity="error"
					sx={{ borderRadius: 3 }}
				>
					{error}
				</Alert>
			</Container>
		);
	}

	return (
		<Container
			maxWidth="lg"
			sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}
		>
			{/* Header */}
			<Paper
				elevation={8}
				sx={{
					mb: 3,
					borderRadius: 3,
					overflow: "hidden",
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box
					sx={{
						background: getGradientByName("primary", theme),
						color: "white",
						p: isMobile ? 2 : 3,
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: -20,
							right: -20,
							width: 100,
							height: 100,
							background: "rgba(255,255,255,0.1)",
							borderRadius: "50%",
						},
					}}
				>
					<Typography
						variant={isMobile ? "h5" : "h4"}
						sx={{
							fontWeight: "bold",
							display: "flex",
							alignItems: "center",
							gap: 1.5,
							position: "relative",
							zIndex: 1,
						}}
					>
						<ReceiptIcon fontSize="large" />
						Financial Reports
					</Typography>
				</Box>

				<Box
					sx={{
						p: isMobile ? 1.5 : 2,
						display: "flex",
						justifyContent: "center",
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
									background: getGradientByName("primary", theme),
									color: "white",
									"&:hover": {
										background: getGradientByName("primary", theme),
									},
								},
							},
						}}
					>
						<ToggleButton value="daily">
							<CalendarTodayIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
							Daily
						</ToggleButton>
						<ToggleButton value="weekly">Weekly</ToggleButton>
						<ToggleButton value="monthly">Monthly</ToggleButton>
						<ToggleButton value="yearly">Yearly</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Paper>

			{/* Summary Cards */}
			{report && (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							sm: "1fr 1fr 1fr",
							md: "1fr 1fr 1fr 1fr",
						},
						gap: isMobile ? 1.5 : 2,
						mb: 3,
					}}
				>
					{[
						{
							label: "Total Income",
							value: `₹${report.total_income?.toFixed(2) || "0.00"}`,
							icon: <TrendingUpIcon />,
							color: theme.palette.success.main,
							gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
						},
						{
							label: "Total Expense",
							value: `₹${report.total_expense?.toFixed(2) || "0.00"}`,
							icon: <TrendingDownIcon />,
							color: theme.palette.error.main,
							gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
						},
						{
							label: "Net Profit",
							value: `₹${report.net_profit?.toFixed(2) || "0.00"}`,
							icon: <BalanceIcon />,
							color:
								report.net_profit >= 0
									? theme.palette.success.main
									: theme.palette.error.main,
							gradient:
								report.net_profit >= 0
									? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
									: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
						},
						{
							label: "Transactions",
							value: report.transaction_count || 0,
							icon: <ReceiptIcon />,
							color: theme.palette.info.main,
							gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
						},
					].map((card, i) => (
						<Card
							key={i}
							elevation={4}
							sx={{
								borderRadius: 3,
								overflow: "hidden",
								transition: "all 0.3s ease",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: `0 12px 30px ${createAlphaColor(card.color, 0.25)}`,
								},
							}}
						>
							<Box
								sx={{
									height: 4,
									background: card.gradient,
								}}
							/>
							<CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.5,
									}}
								>
									<Avatar
										sx={{
											bgcolor: createAlphaColor(card.color, 0.12),
											color: card.color,
											width: isMobile ? 44 : 50,
											height: isMobile ? 44 : 50,
										}}
									>
										{card.icon}
									</Avatar>
									<Box>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{ fontWeight: 500 }}
										>
											{card.label}
										</Typography>
										<Typography
											variant="h5"
											sx={{
												fontWeight: "bold",
												fontSize: isMobile ? "1.2rem" : "1.4rem",
												color: card.color,
											}}
										>
											{card.value}
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			{/* Category Breakdown */}
			<Paper
				elevation={4}
				sx={{
					borderRadius: 3,
					overflow: "hidden",
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box
					sx={{
						p: isMobile ? 2 : 3,
						borderBottom: `1px solid ${theme.palette.divider}`,
						display: "flex",
						alignItems: "center",
						gap: 1.5,
					}}
				>
					<CategoryIcon color="primary" />
					<Typography
						variant="h6"
						sx={{ fontWeight: 600 }}
					>
						Spending by Category
					</Typography>
				</Box>
				<Box sx={{ p: isMobile ? 1.5 : 2 }}>
					{categoryReport.length === 0 ? (
						<Box sx={{ py: 4, textAlign: "center" }}>
							<Typography color="text.secondary">
								No category data available for this period
							</Typography>
						</Box>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1.5,
							}}
						>
							{categoryReport.map((cat, i) => (
								<Card
									key={i}
									variant="outlined"
									sx={{
										borderRadius: 2,
										transition: "all 0.2s ease",
										"&:hover": {
											boxShadow: theme.shadows[2],
										},
									}}
								>
									<CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												mb: 1,
											}}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: 1.5,
												}}
											>
												<Avatar
													sx={{
														width: 36,
														height: 36,
														bgcolor: cat.color || theme.palette.primary.main,
														fontSize: "1rem",
													}}
												>
													{cat.icon || "📂"}
												</Avatar>
												<Box>
													<Typography
														variant="body1"
														sx={{ fontWeight: 600 }}
													>
														{cat.category_name}
													</Typography>
													<Typography
														variant="caption"
														color="text.secondary"
													>
														{cat.count}{" "}
														{cat.count === 1 ? "transaction" : "transactions"}
													</Typography>
												</Box>
											</Box>
											<Typography
												variant="h6"
												sx={{
													fontWeight: "bold",
													color: cat.color || "primary.main",
												}}
											>
												₹{cat.total?.toFixed(2)}
											</Typography>
										</Box>
										<LinearProgress
											variant="determinate"
											value={(cat.total / maxCategoryAmount) * 100}
											sx={{
												height: 6,
												borderRadius: 3,
												bgcolor: createAlphaColor(
													cat.color || theme.palette.primary.main,
													0.1,
												),
												"& .MuiLinearProgress-bar": {
													borderRadius: 3,
													bgcolor: cat.color || theme.palette.primary.main,
												},
											}}
										/>
									</CardContent>
								</Card>
							))}
						</Box>
					)}
				</Box>
			</Paper>
		</Container>
	);
};

export default ReportsPage;
