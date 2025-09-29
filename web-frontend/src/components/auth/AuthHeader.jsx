import {
	Box,
	Typography,
	Avatar,
	Slide,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { getGradientByName, createAlphaColor } from "../../theme/utils";

const AuthHeader = ({ variant = "login", title, subtitle, description }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const config = {
		login: {
			avatarGradient: getGradientByName("primary", theme),
			textGradient: getGradientByName("primary", theme),
			shadowColor: createAlphaColor(theme.palette.primary.main, 0.3),
			animation: "pulse 2s ease-in-out infinite alternate",
			animationKeyframes: {
				"@keyframes pulse": {
					"0%": { transform: "scale(1)" },
					"100%": { transform: "scale(1.05)" },
				},
			},
		},
		register: {
			avatarGradient: getGradientByName("secondary", theme),
			textGradient: getGradientByName("secondary", theme),
			shadowColor: createAlphaColor(theme.palette.secondary.main, 0.4),
			animation: "bounce 2s ease-in-out infinite alternate",
			animationKeyframes: {
				"@keyframes bounce": {
					"0%": { transform: "scale(1) rotate(0deg)" },
					"100%": { transform: "scale(1.08) rotate(5deg)" },
				},
			},
		},
	};

	const currentConfig = config[variant];

	return (
		<Slide
			direction="down"
			in
			timeout={1000}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					mb: 3,
					flexDirection: "column",
					textAlign: "center",
					...currentConfig.animationKeyframes,
				}}
			>
				<Avatar
					sx={{
						width: variant === "register" ? 85 : 80,
						height: variant === "register" ? 85 : 80,
						mb: 2,
						background: currentConfig.avatarGradient,
						boxShadow: `0 8px 24px ${currentConfig.shadowColor}`,
						animation: currentConfig.animation,
					}}
				>
					<TrackChangesIcon
						sx={{
							fontSize: variant === "register" ? 42 : 40,
							color: theme.palette.common.white,
						}}
					/>
				</Avatar>
				<Typography
					variant={isMobile ? "h4" : "h3"}
					align="center"
					sx={{
						fontWeight: 800,
						background: currentConfig.textGradient,
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						fontSize: {
							xs: "2rem",
							sm: "2.5rem",
							md: "3rem",
						},
						mb: 1,
					}}
				>
					{title}
				</Typography>
				<Typography
					variant="h6"
					align="center"
					sx={{
						color: theme.palette.text.secondary,
						fontSize: {
							xs: "1rem",
							sm: "1.1rem",
						},
						fontWeight: 400,
					}}
				>
					{subtitle}
				</Typography>
				{description && (
					<Typography
						variant="body1"
						align="center"
						sx={{
							mt: 2,
							color: theme.palette.text.secondary,
							fontSize: {
								xs: "1rem",
								sm: "1.1rem",
							},
							fontStyle: "italic",
						}}
					>
						{description}
					</Typography>
				)}
			</Box>
		</Slide>
	);
};

export default AuthHeader;
