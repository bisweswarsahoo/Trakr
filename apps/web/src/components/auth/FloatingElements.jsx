import { Box, useTheme } from "@mui/material";
import { createAlphaColor } from "../../theme/utils";

const FloatingElements = ({ variant = "login" }) => {
	const theme = useTheme();

	const createFloatingElement = (position, size, opacity) => ({
		position: "absolute",
		...position,
		width: size,
		height: size,
		background: createAlphaColor(theme.palette.common.white, opacity),
		borderRadius: "50%",
		pointerEvents: "none",
	});

	const elements = {
		login: [
			{
				...createFloatingElement({ top: "10%", left: "10%" }, 100, 0.1),
				animation: "float 6s ease-in-out infinite",
			},
			{
				...createFloatingElement({ top: "70%", right: "15%" }, 80, 0.05),
				animation: "float 4s ease-in-out infinite reverse",
			},
		],
		register: [
			{
				...createFloatingElement({ top: "15%", right: "10%" }, 120, 0.1),
				animation: "float 5s ease-in-out infinite",
			},
			{
				...createFloatingElement({ top: "60%", left: "8%" }, 90, 0.05),
				animation: "float 7s ease-in-out infinite reverse",
			},
		],
	};

	const keyframes = {
		login: {
			"@keyframes float": {
				"0%, 100%": { transform: "translateY(0px)" },
				"50%": { transform: "translateY(-20px)" },
			},
		},
		register: {
			"@keyframes float": {
				"0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
				"50%": { transform: "translateY(-25px) rotate(180deg)" },
			},
		},
	};

	return (
		<>
			{elements[variant].map((element, index) => (
				<Box
					key={index}
					sx={{
						position: "absolute",
						...element,
						borderRadius: "50%",
						background:
							index === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)",
						...keyframes[variant],
					}}
				/>
			))}
		</>
	);
};

export default FloatingElements;
