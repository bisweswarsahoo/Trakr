import { Container, useTheme, useMediaQuery } from "@mui/material";
import { getGradientByName } from "@trakr/design-system";

const AuthContainer = ({ children, variant = "login" }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const mode = theme.palette.mode;

	const gradients = {
		login: getGradientByName("primary", mode),
		register: getGradientByName("secondary", mode),
	};

	return (
		<Container
			sx={{
				minHeight: "100vh",
				minWidth: "100vw",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: gradients[variant],
				padding: isMobile ? 2 : 4,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{children}
		</Container>
	);
};

export default AuthContainer;
