import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { colors, spacing, borderRadius } from "../../theme";

interface CardProps extends ViewProps {
	children: React.ReactNode;
}

export const BaseCard: React.FC<CardProps> = ({
	children,
	style,
	...props
}) => {
	return (
		<View
			style={[styles.card, style]}
			{...props}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.xl, // 16px to match web
		padding: spacing.md,
		// Soft, diffused shadow matching web elevation=8
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 4,
		marginBottom: spacing.md,
	},
});
