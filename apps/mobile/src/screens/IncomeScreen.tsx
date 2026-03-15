import React, { useState, useCallback } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	RefreshControl,
	TouchableOpacity,
	Modal,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { api } from "../services/api";
import { Transaction } from "@trakr/types";
import {
	colors,
	spacing,
	borderRadius,
	typography,
} from "@trakr/design-system";
import { TextInputField, Button, BaseCard } from "@trakr/ui";
import { formatCurrency } from "@trakr/utils";
import { ScreenHeader } from "../components/ScreenHeader";
import { SummaryCard } from "../components/SummaryCard";

export const IncomeScreen = ({ navigation }: any) => {
	const [income, setIncome] = useState<Transaction[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [form, setForm] = useState({ title: "", amount: "" });
	const [saving, setSaving] = useState(false);

	const handleAddIncome = async () => {
		if (!form.title || !form.amount) return;
		try {
			setSaving(true);
			await api.post("/income/", {
				title: form.title,
				amount: parseFloat(form.amount),
				date: new Date().toISOString(),
				type: "income",
				payment_method: "cash",
			});
			setModalVisible(false);
			setForm({ title: "", amount: "" });
			fetchIncome();
		} catch (e) {
			console.error(e);
		} finally {
			setSaving(false);
		}
	};

	const fetchIncome = async () => {
		try {
			const res = await api.get("/income");
			setIncome(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchIncome();
		}, []),
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchIncome();
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
				<Text style={styles.itemAmount}>+{formatCurrency(item.amount)}</Text>
			</View>
		);
	};

	const totalIncome = income.reduce((sum, curr) => sum + curr.amount, 0);

	return (
		<View style={styles.container}>
			<ScreenHeader title="Income" />

			<SummaryCard
				label="Total Extracted Income"
				value={formatCurrency(totalIncome)}
				type="income"
			/>

			<FlatList
				data={income}
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
					<Text style={styles.emptyText}>No income found.</Text>
				}
			/>

			<TouchableOpacity
				style={styles.fab}
				onPress={() => setModalVisible(true)}
			>
				<Plus
					color="#fff"
					size={24}
				/>
			</TouchableOpacity>

			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.modalOverlay}
				>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Add Income</Text>

						<TextInputField
							label="Title"
							value={form.title}
							onChangeText={(t) => setForm({ ...form, title: t })}
							placeholder="Salary"
							autoCapitalize="words"
						/>
						<TextInputField
							label="Amount"
							value={form.amount}
							onChangeText={(t) => setForm({ ...form, amount: t })}
							placeholder="5000.00"
							keyboardType="numeric"
						/>

						<View style={styles.modalActions}>
							<Button
								title="Cancel"
								variant="outline"
								onPress={() => setModalVisible(false)}
								style={styles.modalButton}
							/>
							<Button
								title="Save"
								onPress={handleAddIncome}
								loading={saving}
								style={styles.modalButton}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: spacing.lg,
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
		color: colors.success,
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
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: colors.background,
		borderTopLeftRadius: borderRadius.lg,
		borderTopRightRadius: borderRadius.lg,
		padding: spacing.lg,
		paddingBottom: spacing.xxl,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: spacing.lg,
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: spacing.md,
	},
	modalButton: {
		flex: 1,
		marginLeft: spacing.xs,
	},
});
