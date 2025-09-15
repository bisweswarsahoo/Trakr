import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
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
		<Box sx={{ padding: 3 }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Dashboard
			</Typography>
			<Grid
				container
				spacing={3}
			>
				{/* Summary Card */}
				<Grid
					item
					xs={12}
					sm={4}
				>
					<Paper sx={{ padding: 2, textAlign: "center" }}>
						<Typography variant="h6">Total Expenses</Typography>
						<Typography
							variant="h4"
							color="error"
						>
							{/* ₹{expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)} */}
						</Typography>
					</Paper>
				</Grid>

				{/* Pie Chart */}
				<Grid
					item
					xs={12}
					md={6}
				>
					<Paper sx={{ padding: 2, height: 300 }}>
						<Typography variant="h6">Spending by Category</Typography>
						<ResponsiveContainer
							width="100%"
							height="100%"
						>
							<PieChart>
								<Pie
									data={pieData}
									dataKey="value"
									nameKey="name"
									outerRadius={100}
									fill="#8884d8"
									label
								>
									{pieData.map((_, index) => (
										<Cell
											key={index}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>

				{/* Bar Chart */}
				<Grid
					item
					xs={12}
					md={6}
				>
					<Paper sx={{ padding: 2, height: 300 }}>
						<Typography variant="h6">Expenses Breakdown</Typography>
						<ResponsiveContainer
							width="100%"
							height="100%"
						>
							<BarChart data={barData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar
									dataKey="amount"
									fill="#82ca9d"
								/>
							</BarChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
