import {
	Paper,
	Typography,
	Avatar,
	Box,
	useTheme,
	useMediaQuery,
} from "@mui/material";

const SummaryCard = ({ icon: Icon, title, value, color, subtitle }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Paper
			elevation={8}
			sx={{
				position: "relative",
				borderRadius: 4,
				overflow: "hidden",
				background: `linear-gradient(135deg, ${theme.palette[color].light}15 0%, ${theme.palette[color].main}25 100%)`,
				border: `1px solid ${theme.palette[color].main}20`,
				transition: "all 0.3s ease",
				"&:hover": {
					transform: "translateY(-8px)",
					boxShadow: `0 12px 35px ${theme.palette[color].main}25`,
				},
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					right: 0,
					width: "60px",
					height: "60px",
					background: `${theme.palette[color].main}10`,
					borderRadius: "50%",
					transform: "translate(20px, -20px)",
				},
			}}
		>
			<Box
				sx={{
					p: isMobile ? 2.5 : 3,
					position: "relative",
					zIndex: 1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: 2,
					}}
				>
					<Avatar
						sx={{
							width: isMobile ? 50 : 60,
							height: isMobile ? 50 : 60,
							backgroundColor: `${theme.palette[color].main}`,
							boxShadow: `0 8px 20px ${theme.palette[color].main}30`,
						}}
					>
						<Icon fontSize="large" />
					</Avatar>
					<Box sx={{ textAlign: "right" }}>
						<Typography
							variant="h3"
							sx={{
								fontWeight: "bold",
								fontSize: isMobile ? "1.8rem" : "2.2rem",
								color: theme.palette[color].main,
								lineHeight: 1,
							}}
						>
							{value}
						</Typography>
						{subtitle && (
							<Typography
								variant="caption"
								sx={{
									color: theme.palette[color].dark,
									fontWeight: 500,
								}}
							>
								{subtitle}
							</Typography>
						)}
					</Box>
				</Box>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 600,
						color: theme.palette[color].dark,
						fontSize: isMobile ? "1rem" : "1.1rem",
					}}
				>
					{title}
				</Typography>
			</Box>
		</Paper>
	);
};

export default SummaryCard;
