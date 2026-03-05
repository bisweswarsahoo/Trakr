import React from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TextInputProps,
} from "react-native";
import { colors, spacing, borderRadius } from "../theme";

interface InputProps extends TextInputProps {
	label: string;
	error?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	style,
	...props
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[styles.input, error && styles.inputError, style]}
				placeholderTextColor={colors.textSecondary}
				{...props}
			/>
			{error ? <Text style={styles.errorText}>{error}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: spacing.md,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: colors.text,
		marginBottom: spacing.xs,
	},
	input: {
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.md,
		fontSize: 16,
		color: colors.text,
		backgroundColor: colors.surface,
	},
	inputError: {
		borderColor: colors.error,
	},
	errorText: {
		color: colors.error,
		fontSize: 12,
		marginTop: spacing.xs,
	},
});
