import React from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";
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
} from "recharts";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";

const Dashboard = ({ expenses }) => {
	// Group expenses by category
	const categoryData = (expenses || []).reduce((acc, exp) => {
		acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
		return acc;
	}, {});

	const pieData = Object.keys(categoryData).map((key) => ({
		name: key,
		value: categoryData[key],
	}));

	const barData = (expenses || []).map((exp) => ({
		name: exp.title,
		amount: parseFloat(exp.amount),
	}));

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

	return (
		<Box
			sx={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				padding: 2,
			}}
		>
			<Container maxWidth="xl">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 4,
					}}
				>
					<TrackChangesIcon sx={{ fontSize: 40, color: "white", mr: 2 }} />
					<Typography
						variant="h3"
						align="center"
						gutterBottom
						sx={{ color: "white", fontWeight: "bold" }}
					>
						Dashboard
					</Typography>
				</Box>
				<Grid
					container
					spacing={3}
				>
					{/* Summary Cards */}
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
					>
						<Paper
							sx={{
								padding: 3,
								textAlign: "center",
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<ReceiptIcon
								sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
							/>
							<Typography
								variant="h6"
								color="primary"
							>
								Total Expenses
							</Typography>
							<Typography
								variant="h4"
								color="primary.main"
								sx={{ fontWeight: "bold" }}
							>
								₹
								{(expenses || [])
									.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
									.toFixed(2)}
							</Typography>
						</Paper>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}
					>
						<Paper
							sx={{
								padding: 3,
								textAlign: "center",
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<TrendingUpIcon
								sx={{ fontSize: 40, color: "success.main", mb: 1 }}
							/>
							<Typography
								variant="h6"
								color="success.main"
							>
								Number of Expenses
							</Typography>
							<Typography
								variant="h4"
								color="success.main"
								sx={{ fontWeight: "bold" }}
							>
								{(expenses || []).length}
							</Typography>
						</Paper>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}
					>
						<Paper
							sx={{
								padding: 3,
								textAlign: "center",
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<CategoryIcon
								sx={{ fontSize: 40, color: "warning.main", mb: 1 }}
							/>
							<Typography
								variant="h6"
								color="warning.main"
							>
								Categories
							</Typography>
							<Typography
								variant="h4"
								color="warning.main"
								sx={{ fontWeight: "bold" }}
							>
								{Object.keys(categoryData).length}
							</Typography>
						</Paper>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={3}
					>
						<Paper
							sx={{
								padding: 3,
								textAlign: "center",
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<TrackChangesIcon
								sx={{ fontSize: 40, color: "info.main", mb: 1 }}
							/>
							<Typography
								variant="h6"
								color="info.main"
							>
								Average Expense
							</Typography>
							<Typography
								variant="h4"
								color="info.main"
								sx={{ fontWeight: "bold" }}
							>
								₹
								{expenses && expenses.length > 0
									? (
											expenses.reduce(
												(sum, exp) => sum + parseFloat(exp.amount),
												0
											) / expenses.length
									  ).toFixed(2)
									: "0.00"}
							</Typography>
						</Paper>
					</Grid>

					{/* Pie Chart */}
					<Grid
						item
						xs={12}
						md={6}
					>
						<Paper
							sx={{
								padding: 3,
								height: 400,
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<Typography
								variant="h6"
								sx={{
									mb: 2,
									fontWeight: "bold",
									color: "primary.main",
									textAlign: "center",
								}}
							>
								Spending by Category
							</Typography>
							{expenses && expenses.length > 0 ? (
								<ResponsiveContainer
									width="100%"
									height="85%"
								>
									<PieChart>
										<Pie
											data={pieData}
											dataKey="value"
											nameKey="name"
											outerRadius={100}
											fill="#8884d8"
											label={({ name, percent }) =>
												`${name} ${(percent * 100).toFixed(0)}%`
											}
											labelLine={false}
										>
											{pieData.map((_, index) => (
												<Cell
													key={index}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
										/>
									</PieChart>
								</ResponsiveContainer>
							) : (
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										height: "85%",
									}}
								>
									<CategoryIcon
										sx={{ fontSize: 60, color: "grey.400", mb: 2 }}
									/>
									<Typography
										variant="h6"
										color="text.secondary"
									>
										No expenses to display
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										Add some expenses to see your spending breakdown
									</Typography>
								</Box>
							)}
						</Paper>
					</Grid>

					{/* Bar Chart */}
					<Grid
						item
						xs={12}
						md={6}
					>
						<Paper
							sx={{
								padding: 3,
								height: 400,
								borderRadius: 3,
								backgroundColor: "rgba(255, 255, 255, 0.95)",
								boxShadow: 3,
							}}
						>
							<Typography
								variant="h6"
								sx={{
									mb: 2,
									fontWeight: "bold",
									color: "primary.main",
									textAlign: "center",
								}}
							>
								Expenses Breakdown
							</Typography>
							{expenses && expenses.length > 0 ? (
								<ResponsiveContainer
									width="100%"
									height="85%"
								>
									<BarChart data={barData}>
										<XAxis
											dataKey="name"
											tick={{ fontSize: 12 }}
											angle={-45}
											textAnchor="end"
											height={80}
										/>
										<YAxis tick={{ fontSize: 12 }} />
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
								</ResponsiveContainer>
							) : (
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										height: "85%",
									}}
								>
									<TrendingUpIcon
										sx={{ fontSize: 60, color: "grey.400", mb: 2 }}
									/>
									<Typography
										variant="h6"
										color="text.secondary"
									>
										No expenses to display
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										Add some expenses to see your spending trends
									</Typography>
								</Box>
							)}
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Dashboard;
