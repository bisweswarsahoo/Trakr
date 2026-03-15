import React from "react";
import { StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import { BaseCard } from "@trakr/ui";
import { colors, spacing, typography } from "@trakr/design-system";

interface NetProfitCardProps {
	label: string;
	value: string;
	amount: number;
	style?: StyleProp<ViewStyle>;
}

export const NetProfitCard = ({
	label,
	value,
	amount,
	style,
}: NetProfitCardProps) => {
	return (
		<BaseCard style={[styles.card, style]}>
			<Text style={styles.label}>{label}</Text>
			<Text
				style={[
					styles.value,
					{
						color: amount >= 0 ? colors.success : colors.error,
						fontSize: 24,
					},
				]}
			>
				{value}
			</Text>
		</BaseCard>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: spacing.xs,
		alignItems: "center",
		paddingVertical: spacing.lg,
		backgroundColor: colors.surface,
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
