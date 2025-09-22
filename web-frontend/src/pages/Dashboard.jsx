import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	Grid,
	Paper,
	Typography,
	Container,
	CircularProgress,
	Alert,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Legend,
	LineChart,
	Line,
} from "recharts";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import API from "../api";

// Reusable component for the summary cards
const SummaryCard = ({ icon: Icon, title, value, color }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Paper
			sx={{
				padding: isMobile ? 2 : 3,
				textAlign: "center",
				borderRadius: 3,
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				boxShadow: 3,
				transition: "transform 0.2s, box-shadow 0.2s",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: 6,
				},
			}}
		>
			<Icon
				sx={{
					fontSize: isMobile ? 35 : 40,
					color: `${color}.main`,
					mb: 1,
				}}
			/>
			<Typography
				variant="h6"
				color={`${color}.main`}
				sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
			>
				{title}
			</Typography>
			<Typography
				variant="h4"
				color={`${color}.main`}
				sx={{
					fontWeight: "bold",
					fontSize: isMobile ? "1.5rem" : "2.125rem",
				}}
			>
				{value}
			</Typography>
		</Paper>
	);
};

// Reusable component for the charts with a "no data" state
const ChartContainer = ({
	title,
	children,
	data,
	emptyIcon: EmptyIcon,
	emptyText,
	emptySubtext,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const hasData = data && data.length > 0;

	return (
		<Paper
			sx={{
				padding: isMobile ? 2 : 3,
				height: isMobile ? 350 : 400,
				borderRadius: 3,
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				boxShadow: 3,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography
				variant="h6"
				sx={{
					mb: 2,
					fontWeight: "bold",
					color: "primary.main",
					textAlign: "center",
					fontSize: isMobile ? "1.1rem" : "1.25rem",
				}}
			>
				{title}
			</Typography>
			{hasData ? (
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					{children}
				</ResponsiveContainer>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						flexGrow: 1,
						paddingBottom: 4,
					}}
				>
					<EmptyIcon
						sx={{
							fontSize: isMobile ? 50 : 60,
							color: "grey.400",
							mb: 2,
						}}
					/>
					<Typography
						variant="h6"
						color="text.secondary"
						align="center"
					>
						{emptyText}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						align="center"
					>
						{emptySubtext}
					</Typography>
				</Box>
			)}
		</Paper>
	);
};

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
					background: "transparent",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: isMobile ? 2 : 4,
				}}
			>
				<CircularProgress
					size={isMobile ? 50 : 60}
					sx={{ color: "white" }}
				/>
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				sx={{
					minHeight: "100vh",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					padding: isMobile ? 2 : 4,
				}}
			>
				<Container maxWidth="xl">
					<Alert
						severity="error"
						sx={{ mt: 4 }}
					>
						{error}
					</Alert>
				</Container>
			</Box>
		);
	}

	const { summary, charts } = dashboardData || {};

	return (
		<Container
			maxWidth="xl"
			sx={{ p: isMobile ? 2 : 4 }}
		>
			<Typography
				variant={isMobile ? "h4" : "h3"}
				align="center"
				sx={{
					color: "white",
					fontWeight: "bold",
					marginBottom: isMobile ? 3 : 4,
					textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
				}}
			>
				Expense Dashboard
			</Typography>

			{/* Summary Cards Grid */}
			<Grid
				container
				spacing={isMobile ? 2 : 3}
				sx={{ mb: 4 }}
			>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<SummaryCard
						icon={ReceiptIcon}
						title="Total Expenses"
						value={`₹${summary?.totalAmount || "0.00"}`}
						color="primary"
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<SummaryCard
						icon={TrendingUpIcon}
						title="Number of Expenses"
						value={summary?.totalExpenses || 0}
						color="success"
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<SummaryCard
						icon={CategoryIcon}
						title="Categories"
						value={summary?.categoryCount || 0}
						color="warning"
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<SummaryCard
						icon={TrackChangesIcon}
						title="Average Expense"
						value={`₹${summary?.averageExpense || "0.00"}`}
						color="info"
					/>
				</Grid>
			</Grid>

			{/* Charts Grid */}
			<Grid
				container
				spacing={isMobile ? 2 : 3}
			>
				<Grid size={{ xs: 12, md: 6 }}>
					<ChartContainer
						title="Spending by Category"
						data={charts?.pieData}
						emptyIcon={CategoryIcon}
						emptyText="No expenses to display"
						emptySubtext="Add some expenses to see your spending breakdown"
					>
						<PieChart>
							<Pie
								data={charts?.pieData}
								dataKey="value"
								nameKey="name"
								outerRadius={isMobile ? 80 : 100}
								fill="#8884d8"
								label={
									isMobile
										? false
										: ({ name, percent }) =>
												`${name} ${(percent * 100).toFixed(0)}%`
								}
								labelLine={false}
							>
								{charts?.pieData?.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
							/>
						</PieChart>
					</ChartContainer>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<ChartContainer
						title="Recent Expenses"
						data={charts?.barData}
						emptyIcon={TrendingUpIcon}
						emptyText="No expenses to display"
						emptySubtext="Add some expenses to see your spending trends"
					>
						<BarChart data={charts?.barData}>
							<XAxis
								dataKey="name"
								tick={{ fontSize: isMobile ? 10 : 12 }}
								angle={isMobile ? -30 : -45}
								textAnchor="end"
								height={isMobile ? 60 : 80}
								interval={0}
							/>
							<YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
							<Tooltip
								formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
							/>
							<Legend />
							<Bar
								dataKey="amount"
								fill="#82ca9d"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ChartContainer>
				</Grid>

				<Grid size={{ xs: 12 }}>
					<ChartContainer
						title="Monthly Spending Trends"
						data={charts?.monthlyData}
						emptyIcon={TrendingUpIcon}
						emptyText="No trend data available"
						emptySubtext="Start adding expenses to see your spending patterns over time"
					>
						<LineChart data={charts?.monthlyData}>
							<XAxis
								dataKey="month"
								tick={{ fontSize: isMobile ? 10 : 12 }}
								angle={isMobile ? -30 : 0}
								textAnchor={isMobile ? "end" : "middle"}
								height={isMobile ? 60 : 40}
								interval={0}
							/>
							<YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
							<Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
							<Legend />
							<Line
								type="monotone"
								dataKey="amount"
								stroke="#8884d8"
								strokeWidth={isMobile ? 2 : 3}
								dot={{
									fill: "#8884d8",
									strokeWidth: 2,
									r: isMobile ? 4 : 6,
								}}
								activeDot={{ r: isMobile ? 6 : 8 }}
							/>
						</LineChart>
					</ChartContainer>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Dashboard;
