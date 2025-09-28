import {
	Paper,
	Typography,
	Box,
	Avatar,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { ResponsiveContainer } from "recharts";

const ChartContainer = ({
	title,
	children,
	data,
	emptyIcon: EmptyIcon,
	emptyText,
	emptySubtext,
	gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const hasData = data && data.length > 0;

	return (
		<Paper
			elevation={8}
			sx={{
				borderRadius: 4,
				overflow: "hidden",
				background: "linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)",
				border: "1px solid rgba(0,0,0,0.05)",
				transition: "all 0.3s ease",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
				},
			}}
		>
			{/* Enhanced Header */}
			<Box
				sx={{
					background: gradient,
					color: "white",
					p: isMobile ? 2 : 2.5,
					position: "relative",
					overflow: "hidden",
					"&::before": {
						content: '""',
						position: "absolute",
						top: -10,
						right: -10,
						width: 60,
						height: 60,
						background: "rgba(255,255,255,0.1)",
						borderRadius: "50%",
					},
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "bold",
						fontSize: isMobile ? "1.1rem" : "1.25rem",
						position: "relative",
						zIndex: 1,
					}}
				>
					{title}
				</Typography>
			</Box>

			{/* Chart Content */}
			<Box
				sx={{
					height: isMobile ? 320 : 380,
					p: hasData ? 0 : 2,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{hasData ? (
					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						{children}
					</ResponsiveContainer>
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							gap: 2,
							px: 2,
						}}
					>
						<Avatar
							sx={{
								width: isMobile ? 70 : 80,
								height: isMobile ? 70 : 80,
								bgcolor: "grey.100",
								color: "grey.400",
								fontSize: isMobile ? "2rem" : "2.5rem",
								mb: 1,
							}}
						>
							<EmptyIcon fontSize="inherit" />
						</Avatar>
						<Box sx={{ textAlign: "center" }}>
							<Typography
								variant="h6"
								color="text.secondary"
								sx={{
									fontWeight: 600,
									fontSize: isMobile ? "1.1rem" : "1.25rem",
									mb: 1,
								}}
							>
								{emptyText}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{
									fontSize: isMobile ? "0.9rem" : "1rem",
									maxWidth: 280,
									mx: "auto",
									lineHeight: 1.5,
								}}
							>
								{emptySubtext}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</Paper>
	);
};

export default ChartContainer;
