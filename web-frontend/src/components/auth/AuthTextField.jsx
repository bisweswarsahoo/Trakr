import { TextField, IconButton, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createAlphaColor } from "../../theme/utils";

const AuthTextField = ({
	label,
	name,
	type,
	value,
	onChange,
	required = false,
	helperText,
	startIcon: StartIcon,
	variant = "login",
	isPassword = false,
	showPassword = false,
	onTogglePassword,
	...props
}) => {
	const theme = useTheme();
	const config = {
		login: {
			iconColor: theme.palette.primary.main,
			shadowColor: createAlphaColor(theme.palette.primary.main, 0.15),
			focusShadowColor: createAlphaColor(theme.palette.primary.main, 0.25),
		},
		register: {
			iconColor: theme.palette.secondary.main,
			shadowColor: createAlphaColor(theme.palette.secondary.main, 0.15),
			focusShadowColor: createAlphaColor(theme.palette.secondary.main, 0.25),
		},
	};

	const currentConfig = config[variant];

	const inputProps = {
		startAdornment: StartIcon && (
			<StartIcon
				sx={{
					color: currentConfig.iconColor,
					mr: 1.5,
					fontSize: {
						xs: "1.3rem",
						sm: "1.5rem",
					},
				}}
			/>
		),
	};

	if (isPassword && onTogglePassword) {
		inputProps.endAdornment = (
			<IconButton
				onClick={onTogglePassword}
				edge="end"
				sx={{ color: currentConfig.iconColor }}
			>
				{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
			</IconButton>
		);
	}

	return (
		<TextField
			label={label}
			name={name}
			type={isPassword ? (showPassword ? "text" : "password") : type}
			value={value}
			onChange={onChange}
			required={required}
			fullWidth
			variant="outlined"
			helperText={helperText}
			slotProps={{
				input: inputProps,
			}}
			sx={{
				"& .MuiOutlinedInput-root": {
					borderRadius: 3,
					fontSize: {
						xs: "1rem",
						sm: "1.1rem",
					},
					background:
						theme.palette.mode === "light"
							? createAlphaColor(theme.palette.background.paper, 0.8)
							: createAlphaColor(theme.palette.background.paper, 0.9),
					backdropFilter: "blur(10px)",
					transition: "all 0.3s ease",
					"&:hover": {
						background:
							theme.palette.mode === "light"
								? createAlphaColor(theme.palette.background.paper, 0.9)
								: theme.palette.background.paper,
						transform: "translateY(-2px)",
						boxShadow: `0 8px 25px ${currentConfig.shadowColor}`,
					},
					"&.Mui-focused": {
						background: theme.palette.background.paper,
						transform: "translateY(-2px)",
						boxShadow: `0 8px 25px ${currentConfig.focusShadowColor}`,
					},
				},
				"& .MuiInputLabel-root": {
					fontSize: {
						xs: "1rem",
						sm: "1.1rem",
					},
				},
				"& .MuiFormHelperText-root": {
					fontSize: {
						xs: "0.8rem",
						sm: "0.85rem",
					},
				},
			}}
			{...props}
		/>
	);
};

export default AuthTextField;
