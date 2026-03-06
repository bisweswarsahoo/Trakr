import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	RefreshControl,
} from "react-native";
import { BaseCard } from "../components/ui/BaseCard";
import { api } from "../services/api";
import { colors, spacing, typography } from "../theme";
import { SummaryReport } from "../types";
import { useFocusEffect } from "@react-navigation/native";

export const ReportsScreen = () => {
	const [summary, setSummary] = useState<SummaryReport>({
		total_income: 0,
		total_expense: 0,
		net_profit: 0,
	});
	const [refreshing, setRefreshing] = useState(false);

	const fetchReports = async () => {
		try {
			const summaryRes = await api.get("/reports/summary");
			setSummary(summaryRes.data);
		} catch (e) {
			console.error(e);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			fetchReports();
		}, []),
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

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Total Income</Text>
				<Text style={[styles.amount, { color: colors.success }]}>
					${summary.total_income.toFixed(2)}
				</Text>
			</BaseCard>

			<BaseCard style={styles.card}>
				<Text style={styles.cardTitle}>Total Expenses</Text>
				<Text style={[styles.amount, { color: colors.error }]}>
					${summary.total_expense.toFixed(2)}
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
					${summary.net_profit.toFixed(2)}
				</Text>
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
});
