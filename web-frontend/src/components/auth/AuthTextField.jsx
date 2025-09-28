import { TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
	const config = {
		login: {
			iconColor: "#667eea",
			shadowColor: "rgba(102, 126, 234, 0.15)",
			focusShadowColor: "rgba(102, 126, 234, 0.25)",
		},
		register: {
			iconColor: "#f093fb",
			shadowColor: "rgba(240, 147, 251, 0.15)",
			focusShadowColor: "rgba(240, 147, 251, 0.25)",
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
					background: "rgba(255,255,255,0.8)",
					backdropFilter: "blur(10px)",
					transition: "all 0.3s ease",
					"&:hover": {
						background: "rgba(255,255,255,0.9)",
						transform: "translateY(-2px)",
						boxShadow: `0 8px 25px ${currentConfig.shadowColor}`,
					},
					"&.Mui-focused": {
						background: "rgba(255,255,255,1)",
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
