import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	RefreshControl,
} from "react-native";
import { Card } from "../components/Card";
import { api } from "../services/api";
import { colors, spacing } from "../theme";
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

			<Card style={styles.card}>
				<Text style={styles.cardTitle}>Total Income</Text>
				<Text style={[styles.amount, { color: colors.success }]}>
					${summary.total_income.toFixed(2)}
				</Text>
			</Card>

			<Card style={styles.card}>
				<Text style={styles.cardTitle}>Total Expenses</Text>
				<Text style={[styles.amount, { color: colors.error }]}>
					${summary.total_expense.toFixed(2)}
				</Text>
			</Card>

			<Card style={styles.card}>
				<Text style={styles.cardTitle}>Net Profit</Text>
				<Text
					style={[
						styles.amount,
						{ color: summary.net_profit >= 0 ? colors.success : colors.error },
					]}
				>
					${summary.net_profit.toFixed(2)}
				</Text>
			</Card>

			{/* Additional UI for exporting reports would go here */}
			<Card style={styles.card}>
				<Text style={styles.exportText}>
					Export functionality (PDF / CSV) coming soon
				</Text>
			</Card>
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
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
	},
	card: {
		marginHorizontal: spacing.lg,
		marginBottom: spacing.md,
		alignItems: "center",
		paddingVertical: spacing.xl,
	},
	cardTitle: {
		fontSize: 16,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	amount: {
		fontSize: 32,
		fontWeight: "bold",
	},
	exportText: {
		color: colors.primary,
		fontWeight: "500",
		textAlign: "center",
	},
});
