import React from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TextInputProps,
} from "react-native";
import { colors, spacing, borderRadius } from "@trakr/design-system";

export interface InputProps extends Omit<TextInputProps, "style"> {
	label: string;
	error?: string;
	style?: any;
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
				onFocus={(e: any) => {
					setIsFocused(true);
					props.onFocus?.(e);
				}}
				onBlur={(e: any) => {
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
	container: { marginBottom: spacing.md },
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: spacing.xs,
		letterSpacing: 0.3,
	},
	labelFocused: { color: colors.primary },
	input: {
		borderWidth: 1,
		borderColor: colors.borderStrong,
		borderRadius: borderRadius.lg,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.md,
		fontSize: 16,
		color: colors.text,
		backgroundColor: colors.surface,
	},
	inputFocused: {
		borderColor: colors.primary,
		borderWidth: 2,
		paddingHorizontal: spacing.md - 1,
		paddingVertical: spacing.md - 1,
	},
	inputError: { borderColor: colors.error },
	errorText: {
		color: colors.error,
		fontSize: 12,
		marginTop: spacing.xs,
	},
});
