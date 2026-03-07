import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	RefreshControl,
	Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { BaseCard } from "@trakr/ui";
import { api } from "../services/api";
import { colors, spacing, typography } from "@trakr/design-system";
import { SummaryReport } from "@trakr/types";
import { formatCurrency, transformDashboardCharts } from "@trakr/utils";

const screenWidth = Dimensions.get("window").width;

export const DashboardScreen = () => {
	const [summary, setSummary] = useState<SummaryReport>({
		total_income: 0,
		total_expense: 0,
		net_profit: 0,
	});
	const [categoryExpenses, setCategoryExpenses] = useState<any[]>([]);
	const [barData, setBarData] = useState<any>(null);
	const [lineData, setLineData] = useState<any>(null);
	const [refreshing, setRefreshing] = useState(false);

	const fetchDashboardData = async () => {
		try {
			const res = await api.get("/dashboard");
			const data = res.data;

			setSummary({
				total_income: data.monthly.income,
				total_expense: data.monthly.expense,
				net_profit: data.monthly.net,
			});

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

	useFocusEffect(
		useCallback(() => {
			fetchDashboardData();
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchDashboardData();
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
			<View style={styles.header}>
				<Text style={styles.title}>Dashboard</Text>
			</View>

			<View style={styles.summaryRow}>
				<BaseCard
					style={[
						styles.summaryCard,
						{ backgroundColor: colors.success + "20" },
					]}
				>
					<Text style={styles.summaryLabel}>Income</Text>
					<Text style={[styles.summaryValue, { color: colors.success }]}>
						{formatCurrency(summary.total_income)}
					</Text>
				</BaseCard>

				<BaseCard
					style={[styles.summaryCard, { backgroundColor: colors.error + "20" }]}
				>
					<Text style={styles.summaryLabel}>Expense</Text>
					<Text style={[styles.summaryValue, { color: colors.error }]}>
						{formatCurrency(summary.total_expense)}
					</Text>
				</BaseCard>
			</View>

			<BaseCard style={styles.netCard}>
				<Text style={styles.summaryLabel}>Net Profit</Text>
				<Text
					style={[
						styles.summaryValue,
						{
							color: summary.net_profit >= 0 ? colors.success : colors.error,
							fontSize: 24,
						},
					]}
				>
					{formatCurrency(summary.net_profit)}
				</Text>
			</BaseCard>

			<BaseCard>
				<Text style={styles.chartTitle}>Expense per Category</Text>
				{categoryExpenses.length > 0 ? (
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
				) : (
					<Text style={styles.noData}>No category data available</Text>
				)}
			</BaseCard>

			<BaseCard style={{ marginTop: spacing.md }}>
				<Text style={styles.chartTitle}>Recent Expenses</Text>
				{barData ? (
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
				) : (
					<Text style={styles.noData}>No recent expenses data</Text>
				)}
			</BaseCard>

			<BaseCard style={{ marginTop: spacing.md }}>
				<Text style={styles.chartTitle}>Monthly Spending Trends</Text>
				{lineData ? (
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
				) : (
					<Text style={styles.noData}>No trend data available</Text>
				)}
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
	header: {
		marginBottom: spacing.md,
		marginTop: spacing.xl,
	},
	title: {
		...typography.h1,
		color: colors.text,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	summaryCard: {
		flex: 1,
		marginHorizontal: spacing.xs,
		alignItems: "center",
		paddingVertical: spacing.lg,
	},
	netCard: {
		marginHorizontal: spacing.xs,
		alignItems: "center",
		paddingVertical: spacing.lg,
		backgroundColor: colors.surface,
	},
	summaryLabel: {
		fontSize: 14,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
		fontWeight: "600",
	},
	summaryValue: {
		...typography.h3,
		fontWeight: "bold",
	},
	chartTitle: {
		...typography.body,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.md,
	},
	noData: {
		textAlign: "center",
		color: colors.textSecondary,
		marginVertical: spacing.xl,
	},
});
