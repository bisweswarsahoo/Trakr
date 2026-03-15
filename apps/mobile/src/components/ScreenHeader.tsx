import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colors, spacing, typography } from "@trakr/design-system";

interface ScreenHeaderProps {
	title: string;
	style?: StyleProp<ViewStyle>;
}

export const ScreenHeader = ({ title, style }: ScreenHeaderProps) => {
	return (
		<View style={[styles.header, style]}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		marginBottom: spacing.md,
		marginTop: spacing.xl,
	},
	title: {
		...typography.h1,
		color: colors.text,
	},
});
