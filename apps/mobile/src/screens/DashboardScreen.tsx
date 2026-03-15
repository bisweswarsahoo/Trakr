import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	RefreshControl,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { BaseCard } from "@trakr/ui";
import { api } from "../services/api";
import { colors, spacing, typography } from "@trakr/design-system";
import { SummaryReport } from "@trakr/types";
import { formatCurrency, transformDashboardCharts } from "@trakr/utils";
import { ScreenHeader } from "../components/ScreenHeader";
import { SummaryCard } from "../components/SummaryCard";
import { NetProfitCard } from "../components/NetProfitCard";
import { ChartCard } from "../components/ChartCard";

const screenWidth = Dimensions.get("window").width;

const periods = [
	{ label: "Daily", value: "daily" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Monthly", value: "monthly" },
	{ label: "Yearly", value: "yearly" },
];

export const DashboardScreen = () => {
	const [summary, setSummary] = useState<SummaryReport>({
		total_income: 0,
		total_expense: 0,
		net_profit: 0,
	});
	const [period, setPeriod] = useState("monthly");
	const [categoryExpenses, setCategoryExpenses] = useState<any[]>([]);
	const [categoryReport, setCategoryReport] = useState<any[]>([]);
	const [barData, setBarData] = useState<any>(null);
	const [lineData, setLineData] = useState<any>(null);
	const [refreshing, setRefreshing] = useState(false);

	const fetchDashboardData = async () => {
		try {
			const res = await api.get("/dashboard");
			const data = res.data;

			const charts = transformDashboardCharts(data);

			const mappedCategories = (charts.pieData || []).map((c: any) => ({
				name: c.name || "Other",
				population: c.value,
				color:
					c.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
				legendFontColor: colors.textSecondary,
				legendFontSize: 12,
			}));
			setCategoryExpenses(mappedCategories);

			if (charts.barData && charts.barData.length > 0) {
				setBarData({
					labels: charts.barData.map((d: any) => d.name),
					datasets: [{ data: charts.barData.map((d: any) => d.amount) }],
				});
			} else {
				setBarData(null);
			}

			if (charts.monthlyData && charts.monthlyData.length > 0) {
				setLineData({
					labels: charts.monthlyData.map((d: any) => d.month),
					datasets: [{ data: charts.monthlyData.map((d: any) => d.amount) }],
				});
			} else {
				setLineData(null);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const fetchReports = async () => {
		try {
			const [summaryRes, categoryRes] = await Promise.all([
				api.get(`/reports/${period}`),
				api.get("/reports/category"),
			]);
			setSummary(summaryRes.data);
			setCategoryReport(categoryRes.data);
		} catch (e) {
			console.error(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchDashboardData();
		}, []),
	);

	useFocusEffect(
		useCallback(() => {
			fetchReports();
		}, [period]),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchDashboardData();
		await fetchReports();
		setRefreshing(false);
	};

	const chartConfig = {
		backgroundGradientFrom: colors.surface,
		backgroundGradientTo: colors.surface,
		color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // primary
		strokeWidth: 2,
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional
	};

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
		>
			<ScreenHeader title="Dashboard" />

			<View style={styles.periodToggle}>
				{periods.map((p) => (
					<TouchableOpacity
						key={p.value}
						style={[
							styles.periodButton,
							period === p.value && styles.periodButtonActive,
						]}
						onPress={() => setPeriod(p.value)}
					>
						<Text
							style={[
								styles.periodButtonText,
								period === p.value && styles.periodButtonTextActive,
							]}
						>
							{p.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.summaryRow}>
				<SummaryCard
					label="Income"
					value={formatCurrency(summary.total_income)}
					type="income"
					style={styles.summaryCardOverride}
				/>

				<SummaryCard
					label="Expense"
					value={formatCurrency(summary.total_expense)}
					type="expense"
					style={styles.summaryCardOverride}
				/>
			</View>

			<NetProfitCard
				label="Net Profit"
				value={formatCurrency(summary.net_profit)}
				amount={summary.net_profit}
			/>

			<ChartCard
				title="Expense per Category"
				isEmpty={categoryExpenses.length === 0}
				emptyText="No category data available"
			>
				{categoryExpenses.length > 0 && (
					<PieChart
						data={categoryExpenses}
						width={screenWidth - spacing.lg * 2 - spacing.md * 2}
						height={200}
						chartConfig={chartConfig}
						accessor={"population"}
						backgroundColor={"transparent"}
						paddingLeft={"15"}
						center={[10, 0]}
						absolute
					/>
				)}

				<View style={{ marginTop: spacing.md }}>
					{categoryReport.length === 0 ? (
						<Text style={styles.noData}>No category breakdown available</Text>
					) : (
						categoryReport.map((cat, i) => (
							<View
								key={i}
								style={styles.categoryRow}
							>
								<Text style={styles.categoryName}>{cat.category_name}</Text>
								<Text style={styles.categoryAmount}>
									{formatCurrency(cat.total)}
								</Text>
							</View>
						))
					)}
				</View>
			</ChartCard>

			<ChartCard
				title="Recent Expenses"
				style={{ marginTop: spacing.md }}
				isEmpty={!barData}
				emptyText="No recent expenses data"
			>
				{barData && (
					<BarChart
						data={barData}
						width={screenWidth - spacing.lg * 2 - spacing.md * 2}
						height={220}
						yAxisLabel="₹"
						yAxisSuffix=""
						chartConfig={chartConfig}
						showValuesOnTopOfBars={true}
						withInnerLines={false}
						style={{ borderRadius: 8, marginVertical: 8 }}
					/>
				)}
			</ChartCard>

			<ChartCard
				title="Monthly Spending Trends"
				style={{ marginTop: spacing.md }}
				isEmpty={!lineData}
				emptyText="No trend data available"
			>
				{lineData && (
					<LineChart
						data={lineData}
						width={screenWidth - spacing.lg * 2 - spacing.md * 2}
						height={220}
						yAxisLabel="₹"
						yAxisSuffix=""
						chartConfig={chartConfig}
						bezier
						style={{ borderRadius: 8, marginVertical: 8 }}
					/>
				)}
			</ChartCard>

			<BaseCard style={{ marginTop: spacing.md, marginBottom: spacing.xl, paddingVertical: spacing.md, alignItems: "center" }}>
				<Text style={styles.exportText}>
					Export functionality (PDF / CSV) coming soon
				</Text>
			</BaseCard>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: spacing.lg,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	summaryCardOverride: {
		flex: 1,
	},
	periodToggle: {
		marginBottom: spacing.md,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	periodButton: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: 20,
		backgroundColor: colors.surface,
		marginRight: spacing.sm,
		borderWidth: 1,
		borderColor: colors.border,
	},
	periodButtonActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	periodButtonText: {
		color: colors.textSecondary,
		fontWeight: "600",
	},
	periodButtonTextActive: {
		color: colors.surface,
	},
	categoryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: spacing.sm,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		width: "100%",
	},
	categoryName: {
		...typography.body,
		color: colors.text,
	},
	categoryAmount: {
		...typography.body,
		fontWeight: "bold",
		color: colors.text,
	},
	exportText: {
		color: colors.primary,
		fontWeight: "500",
		textAlign: "center",
	},
	noData: {
		textAlign: "center",
		color: colors.textSecondary,
		marginVertical: spacing.xl,
	},
});
