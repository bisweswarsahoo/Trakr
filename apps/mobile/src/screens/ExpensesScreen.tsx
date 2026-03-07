import React, { useState, useCallback } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { api } from "../services/api";
import { Transaction } from "@trakr/types";
import { colors, spacing, borderRadius } from "@trakr/design-system";

export const ExpensesScreen = ({ navigation }: any) => {
	const [expenses, setExpenses] = useState<Transaction[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const fetchExpenses = async () => {
		try {
			const res = await api.get("/expenses");
			setExpenses(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchExpenses();
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchExpenses();
		setRefreshing(false);
	};

	const renderItem = ({ item }: { item: Transaction }) => {
		const formattedDate = new Date(item.date).toLocaleDateString();
		return (
			<View style={styles.itemCard}>
				<View style={styles.itemInfo}>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<Text style={styles.itemDate}>
						{formattedDate} • {item.payment_method}
					</Text>
				</View>
				<Text style={styles.itemAmount}>-${item.amount.toFixed(2)}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Expenses</Text>
			</View>

			<FlatList
				data={expenses}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={styles.listContainer}
				ListEmptyComponent={
					<Text style={styles.emptyText}>No expenses found.</Text>
				}
			/>

			<TouchableOpacity
				style={styles.fab}
				onPress={() => console.log("Add Expense placeholder")}
			>
				<Plus
					color="#fff"
					size={24}
				/>
			</TouchableOpacity>
		</View>
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
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
	},
	listContainer: {
		padding: spacing.md,
	},
	itemCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: colors.surface,
		padding: spacing.md,
		borderRadius: borderRadius.md,
		marginBottom: spacing.sm,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 1 },
		elevation: 2,
	},
	itemInfo: {
		flex: 1,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.xs,
	},
	itemDate: {
		fontSize: 12,
		color: colors.textSecondary,
	},
	itemAmount: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.error,
	},
	emptyText: {
		textAlign: "center",
		color: colors.textSecondary,
		marginTop: spacing.xl,
	},
	fab: {
		position: "absolute",
		width: 56,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		right: spacing.lg,
		bottom: spacing.lg,
		backgroundColor: colors.primary,
		borderRadius: 28,
		elevation: 8,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
	},
});
