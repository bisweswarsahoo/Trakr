import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator,
	ViewStyle,
	TextStyle,
	View,
} from "react-native";
import { colors, spacing, borderRadius } from "@trakr/design-system";
import { LinearGradient } from "expo-linear-gradient";

export interface ButtonProps {
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

	const buttonContent = (
		<>
			{loading ? (
				<ActivityIndicator color={getTextColor()} />
			) : (
				<Text style={[styles.text, { color: getTextColor() }, textStyle]}>
					{title}
				</Text>
			)}
		</>
	);

	return (
		<TouchableOpacity
			style={[
				styles.buttonContainer,
				variant === "outline" && {
					borderWidth: 1,
					borderColor: colors.primary,
				},
				variant !== "primary" &&
					!disabled && { backgroundColor: getBackgroundColor() },
				disabled && { backgroundColor: colors.border },
				style,
			]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{variant === "primary" && !disabled ? (
				<LinearGradient
					colors={colors.gradients.primary as any}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradient}
				>
					{buttonContent}
				</LinearGradient>
			) : (
				<View style={styles.gradient}>{buttonContent}</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: borderRadius.lg,
		overflow: "hidden",
	},
	gradient: {
		paddingVertical: 10,
		paddingHorizontal: spacing.lg,
		alignItems: "center",
		justifyContent: "center",
		minHeight: 44,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
		letterSpacing: 0.3,
	},
});
