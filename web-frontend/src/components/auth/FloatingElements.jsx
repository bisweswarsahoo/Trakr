import { Box } from "@mui/material";

const FloatingElements = ({ variant = "login" }) => {
	const elements = {
		login: [
			{
				top: "10%",
				left: "10%",
				width: 100,
				height: 100,
				animation: "float 6s ease-in-out infinite",
			},
			{
				top: "70%",
				right: "15%",
				width: 80,
				height: 80,
				animation: "float 4s ease-in-out infinite reverse",
			},
		],
		register: [
			{
				top: "15%",
				right: "10%",
				width: 120,
				height: 120,
				animation: "float 5s ease-in-out infinite",
			},
			{
				top: "60%",
				left: "8%",
				width: 90,
				height: 90,
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
