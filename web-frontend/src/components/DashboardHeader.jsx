import {
	Box,
	Typography,
	Container,
	Avatar,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DashboardHeader = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box
			sx={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				color: "white",
				py: isMobile ? 4 : 6,
				position: "relative",
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					top: -50,
					right: -50,
					width: 200,
					height: 200,
					background: "rgba(255,255,255,0.1)",
					borderRadius: "50%",
				},
				"&::after": {
					content: '""',
					position: "absolute",
					bottom: -30,
					left: -30,
					width: 150,
					height: 150,
					background: "rgba(255,255,255,0.05)",
					borderRadius: "50%",
				},
			}}
		>
			<Container maxWidth="xl">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 2,
						position: "relative",
						zIndex: 1,
					}}
				>
					<Avatar
						sx={{
							bgcolor: "rgba(255,255,255,0.2)",
							color: "white",
							width: isMobile ? 60 : 80,
							height: isMobile ? 60 : 80,
						}}
					>
						<DashboardIcon fontSize={isMobile ? "large" : "inherit"} />
					</Avatar>
					<Box sx={{ textAlign: isMobile ? "center" : "left" }}>
						<Typography
							variant={isMobile ? "h4" : "h2"}
							sx={{
								fontWeight: "bold",
								fontSize: isMobile ? "2rem" : "3rem",
								lineHeight: 1.2,
								textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
							}}
						>
							Dashboard
						</Typography>
						<Typography
							variant={isMobile ? "body1" : "h6"}
							sx={{
								opacity: 0.9,
								fontSize: isMobile ? "1rem" : "1.25rem",
								mt: 0.5,
								textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
							}}
						>
							Track your expenses with beautiful insights
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default DashboardHeader;
