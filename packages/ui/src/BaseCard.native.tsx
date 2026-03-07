import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { colors, spacing, borderRadius, shadows } from "@trakr/design-system";

export interface CardProps extends Omit<ViewProps, "style"> {
	children: React.ReactNode;
	style?: any;
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
		borderRadius: borderRadius.xl,
		padding: spacing.md,
		shadowColor: shadows.card.color,
		shadowOffset: {
			width: 0,
			height: shadows.card.height,
		},
		shadowOpacity: shadows.card.opacity,
		shadowRadius: shadows.card.radius,
		elevation: 4,
		marginBottom: spacing.md,
	},
});
