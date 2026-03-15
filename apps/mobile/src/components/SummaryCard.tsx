import React from "react";
import { StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import { BaseCard } from "@trakr/ui";
import { colors, spacing, typography } from "@trakr/design-system";

interface SummaryCardProps {
	label: string;
	value: string;
	type: "income" | "expense";
	style?: StyleProp<ViewStyle>;
}

export const SummaryCard = ({
	label,
	value,
	type,
	style,
}: SummaryCardProps) => {
	const isIncome = type === "income";
	const color = isIncome ? colors.success : colors.error;
	const backgroundColor = color + "20";

	return (
		<BaseCard style={[styles.card, { backgroundColor }, style]}>
			<Text style={styles.label}>{label}</Text>
			<Text style={[styles.value, { color }]}>{value}</Text>
		</BaseCard>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: spacing.xs,
		alignItems: "center",
		paddingVertical: spacing.lg,
	},
	label: {
		fontSize: 14,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
		fontWeight: "600",
	},
	value: {
		...typography.h3,
		fontWeight: "bold",
	},
});
