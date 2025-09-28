import { Button } from "@mui/material";

const AuthButton = ({
	children,
	loading = false,
	variant = "login",
	...props
}) => {
	const config = {
		login: {
			gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			hoverGradient: "linear-gradient(135deg, #5a67d8 0%, #6b5b95 100%)",
			shadowColor: "rgba(102, 126, 234, 0.4)",
			hoverShadowColor: "rgba(102, 126, 234, 0.5)",
		},
		register: {
			gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
			hoverGradient: "linear-gradient(135deg, #e91e63 0%, #e53e3e 100%)",
			shadowColor: "rgba(240, 147, 251, 0.4)",
			hoverShadowColor: "rgba(240, 147, 251, 0.5)",
		},
	};

	const currentConfig = config[variant];

	return (
		<Button
			type="submit"
			variant="contained"
			disabled={loading}
			fullWidth
			sx={{
				mt: 2,
				py: 2,
				borderRadius: 3,
				fontSize: {
					xs: "1.1rem",
					sm: "1.2rem",
				},
				fontWeight: "bold",
				textTransform: "none",
				background: currentConfig.gradient,
				boxShadow: `0 8px 25px ${currentConfig.shadowColor}`,
				position: "relative",
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: "-100%",
					width: "100%",
					height: "100%",
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
					transition: "left 0.5s",
				},
				"&:hover": {
					background: currentConfig.hoverGradient,
					boxShadow: `0 12px 35px ${currentConfig.hoverShadowColor}`,
					transform: "translateY(-3px)",
					"&::before": {
						left: "100%",
					},
				},
				"&:active": {
					transform: "translateY(-1px)",
				},
				transition: "all 0.3s ease",
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

export default AuthButton;
