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
import { PieChart, BarChart } from "react-native-chart-kit";
import { BaseCard } from "../components/ui/BaseCard";
import { api } from "../services/api";
import { colors, spacing, borderRadius, typography } from "../theme";
import { SummaryReport } from "../types";

const screenWidth = Dimensions.get("window").width;

export const DashboardScreen = () => {
	const [summary, setSummary] = useState<SummaryReport>({
		total_income: 0,
		total_expense: 0,
		net_profit: 0,
	});
	const [categoryExpenses, setCategoryExpenses] = useState<any[]>([]);
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

			const mappedCategories = (data.charts?.category_breakdown || []).map(
				(c: any) => ({
					name: c.name || "Other",
					population: c.value,
					color:
						c.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
					legendFontColor: colors.textSecondary,
					legendFontSize: 12,
				}),
			);
			setCategoryExpenses(mappedCategories);
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
						${summary.total_income.toFixed(2)}
					</Text>
				</BaseCard>

				<BaseCard
					style={[styles.summaryCard, { backgroundColor: colors.error + "20" }]}
				>
					<Text style={styles.summaryLabel}>Expense</Text>
					<Text style={[styles.summaryValue, { color: colors.error }]}>
						${summary.total_expense.toFixed(2)}
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
					${summary.net_profit.toFixed(2)}
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
					<Text style={styles.noData}>No expense data available</Text>
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
