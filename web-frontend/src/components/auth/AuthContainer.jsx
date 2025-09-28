import { Container, useTheme, useMediaQuery } from "@mui/material";

const AuthContainer = ({ children, variant = "login" }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const gradients = {
		login: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		register: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
