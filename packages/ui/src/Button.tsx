import React from "react";
import {
	Button as MuiButton,
	ButtonProps as MuiButtonProps,
	CircularProgress,
} from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "title"> {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "outline" | "danger";
	loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	loading = false,
	disabled = false,
	...props
}) => {
	const mapVariantToMui = () => {
		if (variant === "outline") return "outlined";
		return "contained";
	};

	const mapColorToMui = () => {
		if (variant === "secondary") return "secondary";
		if (variant === "danger") return "error";
		return "primary";
	};

	return (
		<MuiButton
			variant={mapVariantToMui()}
			color={mapColorToMui()}
			onClick={onPress}
			disabled={disabled || loading}
			startIcon={
				loading ? (
					<CircularProgress
						size={20}
						color="inherit"
					/>
				) : (
					props.startIcon
				)
			}
			{...props}
		>
			{title}
		</MuiButton>
	);
};
