import { Grid, useTheme, useMediaQuery } from "@mui/material";
import ChartContainer from "./ChartContainer";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Legend,
	LineChart,
	Line,
} from "recharts";

const ChartsSection = ({ charts }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const COLORS = [
		theme.palette.primary.main,
		theme.palette.primary.dark,
		theme.palette.secondary.main,
		theme.palette.secondary.dark,
		theme.palette.success.main,
		theme.palette.success.dark,
	];

	return (
		<Grid
			container
			spacing={isMobile ? 2 : 3}
		>
			{/* Pie Chart */}
			<Grid size={{ xs: 12, md: 6 }}>
				<ChartContainer
					title="💰 Spending by Category"
					data={charts?.pieData}
					emptyIcon={CategoryIcon}
					emptyText="No categories to display"
					emptySubtext="Add some expenses to see your spending breakdown by category"
					gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
				>
					<PieChart>
						<Pie
							data={charts?.pieData}
							dataKey="value"
							nameKey="name"
							outerRadius={isMobile ? 85 : 110}
							innerRadius={isMobile ? 40 : 50}
							fill="#8884d8"
							label={
								isMobile
									? false
									: ({ name, percent }) =>
											`${name} (${(percent * 100).toFixed(0)}%)`
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
							contentStyle={{
								backgroundColor: "rgba(255,255,255,0.95)",
								border: "1px solid #e0e0e0",
								borderRadius: "8px",
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						/>
					</PieChart>
				</ChartContainer>
			</Grid>

			{/* Bar Chart */}
			<Grid size={{ xs: 12, md: 6 }}>
				<ChartContainer
					title="📊 Recent Expenses"
					data={charts?.barData}
					emptyIcon={TrendingUpIcon}
					emptyText="No recent expenses"
					emptySubtext="Add some expenses to see your recent spending trends"
					gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
				>
					<BarChart data={charts?.barData}>
						<XAxis
							dataKey="name"
							tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }}
							angle={isMobile ? -30 : -45}
							textAnchor="end"
							height={isMobile ? 60 : 80}
							interval={0}
						/>
						<YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }} />
						<Tooltip
							formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
							contentStyle={{
								backgroundColor: "rgba(255,255,255,0.95)",
								border: "1px solid #e0e0e0",
								borderRadius: "8px",
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						/>
						<Legend />
						<Bar
							dataKey="amount"
							fill="url(#barGradient)"
							radius={[6, 6, 0, 0]}
						/>
						<defs>
							<linearGradient
								id="barGradient"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#f093fb"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#f5576c"
									stopOpacity={0.8}
								/>
							</linearGradient>
						</defs>
					</BarChart>
				</ChartContainer>
			</Grid>

			{/* Line Chart */}
			<Grid size={{ xs: 12 }}>
				<ChartContainer
					title="📈 Monthly Spending Trends"
					data={charts?.monthlyData}
					emptyIcon={TrendingUpIcon}
					emptyText="No trend data available"
					emptySubtext="Start adding expenses to see your spending patterns over time"
					gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
				>
					<LineChart data={charts?.monthlyData}>
						<XAxis
							dataKey="month"
							tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }}
							angle={isMobile ? -30 : 0}
							textAnchor={isMobile ? "end" : "middle"}
							height={isMobile ? 60 : 40}
							interval={0}
						/>
						<YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: "#666" }} />
						<Tooltip
							formatter={(value) => [`₹${value}`, "Amount"]}
							contentStyle={{
								backgroundColor: "rgba(255,255,255,0.95)",
								border: "1px solid #e0e0e0",
								borderRadius: "8px",
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						/>
						<Legend />
						<Line
							type="monotone"
							dataKey="amount"
							stroke="url(#lineGradient)"
							strokeWidth={isMobile ? 3 : 4}
							dot={{
								fill: "#4facfe",
								strokeWidth: 2,
								r: isMobile ? 5 : 7,
							}}
							activeDot={{
								r: isMobile ? 7 : 9,
								fill: "#00f2fe",
								strokeWidth: 2,
								stroke: "#4facfe",
							}}
						/>
						<defs>
							<linearGradient
								id="lineGradient"
								x1="0"
								y1="0"
								x2="1"
								y2="0"
							>
								<stop
									offset="5%"
									stopColor="#4facfe"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#00f2fe"
									stopOpacity={0.8}
								/>
							</linearGradient>
						</defs>
					</LineChart>
				</ChartContainer>
			</Grid>
		</Grid>
	);
};

export default ChartsSection;
