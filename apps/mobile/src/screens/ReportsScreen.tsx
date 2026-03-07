import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import { BaseCard } from "@trakr/ui";
import { api } from "../services/api";
import { colors, spacing, typography } from "@trakr/design-system";
import { SummaryReport } from "@trakr/types";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "@trakr/utils";

const periods = [
	{ label: "Daily", value: "daily" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Monthly", value: "monthly" },
	{ label: "Yearly", value: "yearly" },
];

export const ReportsScreen = () => {
	const [summary, setSummary] = useState<SummaryReport>({
		total_income: 0,
		total_expense: 0,
		net_profit: 0,
	});
	const [period, setPeriod] = useState("monthly");
	const [categoryReport, setCategoryReport] = useState<any[]>([]);
	const [refreshing, setRefreshing] = useState(false);

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
		React.useCallback(() => {
			fetchReports();
		}, [period]),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchReports();
		setRefreshing(false);
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
				<Text style={styles.title}>Financial Reports</Text>
			</View>

			<View style={styles.periodToggle}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
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
				</ScrollView>
			</View>

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Total Income</Text>
				<Text style={[styles.amount, { color: colors.success }]}>
					{formatCurrency(summary.total_income)}
				</Text>
			</BaseCard>

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Total Expenses</Text>
				<Text style={[styles.amount, { color: colors.error }]}>
					{formatCurrency(summary.total_expense)}
				</Text>
			</BaseCard>

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Net Profit</Text>
				<Text
					style={[
						styles.amount,
						{ color: summary.net_profit >= 0 ? colors.success : colors.error },
					]}
				>
					{formatCurrency(summary.net_profit)}
				</Text>
			</BaseCard>

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Spending by Category</Text>
				{categoryReport.length === 0 ? (
					<Text style={styles.emptyText}>No category data available</Text>
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
			</BaseCard>

			{/* Additional UI for exporting reports would go here */}
			<BaseCard style={styles.card}>
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
	},
	header: {
		padding: spacing.lg,
		paddingTop: spacing.xxl,
		backgroundColor: colors.surface,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginBottom: spacing.md,
	},
	title: {
		...typography.h2,
		color: colors.text,
	},
	card: {
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
		alignItems: "center",
		paddingVertical: spacing.xl,
	},
	cardTitle: {
		...typography.body,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	amount: {
		...typography.h1,
	},
	exportText: {
		color: colors.primary,
		fontWeight: "500",
		textAlign: "center",
	},
	periodToggle: {
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
		flexDirection: "row",
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
	emptyText: {
		color: colors.textSecondary,
		marginTop: spacing.md,
	},
});
