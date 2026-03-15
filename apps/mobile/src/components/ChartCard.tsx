import React from "react";
import { StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import { BaseCard } from "@trakr/ui";
import { colors, spacing, typography } from "@trakr/design-system";

interface ChartCardProps {
	title: string;
	isEmpty?: boolean;
	emptyText?: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

export const ChartCard = ({
	title,
	isEmpty = false,
	emptyText = "No data available",
	children,
	style,
}: ChartCardProps) => {
	return (
		<BaseCard style={style}>
			<Text style={styles.chartTitle}>{title}</Text>
			{isEmpty ? <Text style={styles.noData}>{emptyText}</Text> : children}
		</BaseCard>
	);
};

const styles = StyleSheet.create({
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
