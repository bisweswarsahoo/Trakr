import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Box,
	useTheme,
	useMediaQuery,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Avatar,
	Chip,
	Fade,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({ onLogout }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	const handleLogoutClick = () => {
		onLogout();
		navigate("/login");
	};

	const handleMobileMenuToggle = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const handleMobileMenuClose = () => {
		setMobileMenuOpen(false);
	};

	const isActiveRoute = (path) => {
		return location.pathname === path;
	};

	const isActive = isActiveRoute;
	const handleDrawerToggle = handleMobileMenuToggle;
	const handleLogout = handleLogoutClick;

	const navigationItems = [
		{ text: "Expenses", icon: <ReceiptIcon />, path: "/", color: "#4CAF50" },
		{
			text: "Dashboard",
			icon: <DashboardIcon />,
			path: "/dashboard",
			color: "#2196F3",
		},
	];

	return (
		<AppBar
			position="fixed"
			sx={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
				backdropFilter: "blur(10px)",
				zIndex: 1100,
				borderBottom: "1px solid rgba(255,255,255,0.1)",
			}}
		>
			<Toolbar
				sx={{
					minHeight: 70,
					px: isMobile ? 2 : 3,
					position: "relative",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						right: 0,
						width: 100,
						height: 100,
						background: "rgba(255,255,255,0.05)",
						borderRadius: "50%",
						transform: "translate(30px, -30px)",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						flexGrow: isMobile ? 0 : 1,
					}}
					onClick={() => navigate("/")}
				>
					<Avatar
						sx={{
							bgcolor: "rgba(255,255,255,0.2)",
							color: "white",
							width: isMobile ? 40 : 45,
							height: isMobile ? 40 : 45,
							mr: 1.5,
							border: "2px solid rgba(255,255,255,0.3)",
						}}
					>
						<TrackChangesIcon fontSize={isMobile ? "medium" : "large"} />
					</Avatar>
					<Box>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								fontSize: isMobile ? "1.1rem" : "1.3rem",
								lineHeight: 1.2,
								textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
							}}
						>
							Trakr
						</Typography>
						<Typography
							variant="caption"
							sx={{
								fontSize: isMobile ? "0.7rem" : "0.75rem",
								opacity: 0.9,
								lineHeight: 1,
								display: isMobile ? "none" : "block",
							}}
						>
							Expense Tracker
						</Typography>
					</Box>
				</Box>

				{!isMobile && (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1.5,
							position: "relative",
							zIndex: 1,
						}}
					>
						{navigationItems.map((item) => {
							const isActive = isActiveRoute(item.path);
							return (
								<Chip
									key={item.path}
									component={Link}
									to={item.path}
									icon={item.icon}
									label={item.text}
									clickable
									sx={{
										color: "white",
										backgroundColor: isActive
											? "rgba(255,255,255,0.25)"
											: "rgba(255,255,255,0.1)",
										border: isActive
											? "1px solid rgba(255,255,255,0.4)"
											: "1px solid rgba(255,255,255,0.2)",
										fontWeight: isActive ? "bold" : "medium",
										fontSize: "0.9rem",
										px: 1,
										py: 0.5,
										height: 40,
										transition: "all 0.3s ease",
										textDecoration: "none",
										"&:hover": {
											backgroundColor: "rgba(255,255,255,0.2)",
											transform: "translateY(-2px)",
											boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
											border: "1px solid rgba(255,255,255,0.4)",
										},
										"& .MuiChip-icon": {
											color: "white",
											fontSize: "1.1rem",
										},
										"& .MuiChip-label": {
											color: "white",
											fontWeight: "inherit",
										},
									}}
								/>
							);
						})}

						<Button
							onClick={handleLogoutClick}
							startIcon={<LogoutIcon />}
							sx={{
								color: "white",
								backgroundColor: "rgba(244, 67, 54, 0.2)",
								border: "1px solid rgba(244, 67, 54, 0.3)",
								borderRadius: 3,
								px: 2,
								py: 1,
								ml: 2,
								fontWeight: "medium",
								textTransform: "none",
								transition: "all 0.3s ease",
								"&:hover": {
									backgroundColor: "rgba(244, 67, 54, 0.3)",
									transform: "translateY(-2px)",
									boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
									border: "1px solid rgba(244, 67, 54, 0.5)",
								},
							}}
						>
							Logout
						</Button>
					</Box>
				)}

				{isMobile && (
					<IconButton
						color="inherit"
						edge="end"
						onClick={handleMobileMenuToggle}
						sx={{
							ml: "auto",
							borderRadius: 2,
							p: 1.5,
							position: "relative",
							zIndex: 1,
							transition: "all 0.3s ease",
						}}
					>
						<Fade in={!mobileMenuOpen}>
							<MenuIcon sx={{ position: "absolute" }} />
						</Fade>
						<Fade in={mobileMenuOpen}>
							<CloseIcon sx={{ position: "absolute" }} />
						</Fade>
					</IconButton>
				)}
			</Toolbar>

			<Drawer
				anchor="left"
				open={mobileMenuOpen}
				onClose={handleMobileMenuClose}
				sx={{
					zIndex: 1200,
					"& .MuiDrawer-paper": {
						width: isMobile ? 280 : 320,
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						color: "white",
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: -50,
							right: -50,
							width: 150,
							height: 150,
							background: "rgba(255,255,255,0.08)",
							borderRadius: "50%",
						},
						"&::after": {
							content: '""',
							position: "absolute",
							bottom: -30,
							left: -30,
							width: 100,
							height: 100,
							background: "rgba(255,255,255,0.05)",
							borderRadius: "50%",
						},
					},
				}}
			>
				<Box sx={{ p: 3, position: "relative", zIndex: 1 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							mb: 3,
							pb: 2,
							borderBottom: "1px solid rgba(255,255,255,0.2)",
						}}
					>
						<Avatar
							sx={{
								bgcolor: "rgba(255,255,255,0.2)",
								color: "white",
								width: 50,
								height: 50,
								mr: 2,
								border: "2px solid rgba(255,255,255,0.3)",
							}}
						>
							<TrackChangesIcon />
						</Avatar>
						<Box>
							<Typography
								variant="h6"
								sx={{
									fontWeight: "bold",
									fontSize: "1.2rem",
									lineHeight: 1.2,
								}}
							>
								Trakr
							</Typography>
							<Typography
								variant="caption"
								sx={{
									fontSize: "0.8rem",
									opacity: 0.9,
									lineHeight: 1,
								}}
							>
								Navigation Menu
							</Typography>
						</Box>
					</Box>

					<List sx={{ p: 0 }}>
						{navigationItems.map((item) => (
							<Fade
								in
								timeout={500}
								key={item.path}
							>
								<ListItem sx={{ px: 0 }}>
									<ListItemButton
										component={Link}
										to={item.path}
										onClick={handleDrawerToggle}
										sx={{
											borderRadius: 2,
											mb: 1,
											mx: 0,
											position: "relative",
											overflow: "hidden",
											transition: "all 0.3s ease",
											color: isActive(item.path)
												? "white"
												: "rgba(255,255,255,0.8)",
											bgcolor: isActive(item.path)
												? "rgba(255,255,255,0.25)"
												: "transparent",
											border: isActive(item.path)
												? "1px solid rgba(255,255,255,0.3)"
												: "1px solid transparent",
											"&::before": {
												content: '""',
												position: "absolute",
												top: 0,
												left: 0,
												right: 0,
												bottom: 0,
												background:
													"linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
												transform: "translateX(-100%)",
												transition: "transform 0.3s ease",
											},
											"&:hover": {
												bgcolor: "rgba(255,255,255,0.15)",
												color: "white",
												transform: "translateX(4px)",
												"&::before": {
													transform: "translateX(0)",
												},
											},
										}}
									>
										<ListItemIcon
											sx={{
												color: "inherit",
												minWidth: 40,
												transition: "all 0.3s ease",
											}}
										>
											{item.icon}
										</ListItemIcon>
										<ListItemText
											primary={item.text}
											sx={{
												"& .MuiListItemText-primary": {
													fontWeight: isActive(item.path) ? 600 : 400,
													fontSize: "0.95rem",
												},
											}}
										/>
										{isActive(item.path) && (
											<Chip
												size="small"
												label="Active"
												sx={{
													bgcolor: "rgba(255,255,255,0.3)",
													color: "white",
													fontSize: "0.7rem",
													height: 24,
													border: "1px solid rgba(255,255,255,0.4)",
												}}
											/>
										)}
									</ListItemButton>
								</ListItem>
							</Fade>
						))}

						<Fade
							in
							timeout={700}
						>
							<Box
								sx={{
									mt: 3,
									pt: 2,
									borderTop: "1px solid rgba(255,255,255,0.2)",
								}}
							>
								<ListItem sx={{ px: 0 }}>
									<ListItemButton
										onClick={handleLogout}
										sx={{
											borderRadius: 2,
											bgcolor: "rgba(244, 67, 54, 0.2)",
											color: "white",
											border: "1px solid rgba(244, 67, 54, 0.3)",
											transition: "all 0.3s ease",
											position: "relative",
											overflow: "hidden",
											"&::before": {
												content: '""',
												position: "absolute",
												top: 0,
												left: 0,
												right: 0,
												bottom: 0,
												background:
													"linear-gradient(45deg, rgba(244, 67, 54, 0.3), rgba(244, 67, 54, 0.1))",
												transform: "translateX(-100%)",
												transition: "transform 0.3s ease",
											},
											"&:hover": {
												bgcolor: "rgba(244, 67, 54, 0.3)",
												transform: "translateX(4px)",
												boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
												"&::before": {
													transform: "translateX(0)",
												},
											},
										}}
									>
										<ListItemIcon
											sx={{
												color: "inherit",
												minWidth: 40,
											}}
										>
											<LogoutIcon />
										</ListItemIcon>
										<ListItemText
											primary="Logout"
											sx={{
												"& .MuiListItemText-primary": {
													fontWeight: 500,
													fontSize: "0.95rem",
												},
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Box>
						</Fade>
					</List>
				</Box>
			</Drawer>
		</AppBar>
	);
};

export default Navbar;
