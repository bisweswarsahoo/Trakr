import React from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TextInputProps,
} from "react-native";
import { colors, spacing, borderRadius } from "../../theme";

interface InputProps extends TextInputProps {
	label: string;
	error?: string;
}

export const TextInputField: React.FC<InputProps> = ({
	label,
	error,
	style,
	...props
}) => {
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<View style={styles.container}>
			<Text style={[styles.label, isFocused && styles.labelFocused]}>
				{label}
			</Text>
			<TextInput
				style={[
					styles.input,
					isFocused && styles.inputFocused,
					error && styles.inputError,
					style,
				]}
				placeholderTextColor={colors.textDisabled}
				onFocus={(e) => {
					setIsFocused(true);
					props.onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					props.onBlur?.(e);
				}}
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
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: spacing.xs,
		letterSpacing: 0.3,
	},
	labelFocused: {
		color: colors.primary,
	},
	input: {
		borderWidth: 1,
		borderColor: colors.borderStrong,
		borderRadius: borderRadius.lg, // 12px to match web
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.md,
		fontSize: 16,
		color: colors.text,
		backgroundColor: colors.surface,
	},
	inputFocused: {
		borderColor: colors.primary,
		borderWidth: 2,
		// Adjust padding to prevent layout shift due to border width increase
		paddingHorizontal: spacing.md - 1,
		paddingVertical: spacing.md - 1,
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
