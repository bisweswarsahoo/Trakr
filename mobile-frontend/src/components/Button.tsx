import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator,
	ViewStyle,
	TextStyle,
} from "react-native";
import { colors, spacing, borderRadius } from "../theme";

interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "outline" | "danger";
	loading?: boolean;
	disabled?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	loading = false,
	disabled = false,
	style,
	textStyle,
}) => {
	const getBackgroundColor = () => {
		if (disabled) return colors.border;
		switch (variant) {
			case "primary":
				return colors.primary;
			case "secondary":
				return colors.secondary;
			case "danger":
				return colors.error;
			case "outline":
				return "transparent";
			default:
				return colors.primary;
		}
	};

	const getTextColor = () => {
		if (disabled) return colors.textSecondary;
		if (variant === "outline") return colors.primary;
		return colors.surface;
	};

	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: getBackgroundColor() },
				variant === "outline" && {
					borderWidth: 1,
					borderColor: colors.primary,
				},
				style,
			]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{loading ? (
				<ActivityIndicator color={getTextColor()} />
			) : (
				<Text style={[styles.text, { color: getTextColor() }, textStyle]}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
});
