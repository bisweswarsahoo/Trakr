import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../theme/ThemeProvider";

const ThemeToggle = ({ size = "medium", ...props }) => {
	const { isDark, toggleTheme } = useThemeContext();

	return (
		<Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
			<IconButton
				onClick={toggleTheme}
				color={"inherit"}
				size={size}
				sx={{
					transition: "transform 0.3s ease-in-out",
					"&:hover": {
						transform: "rotate(180deg)",
					},
				}}
				{...props}
			>
				{isDark ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
