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
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onLogout }) => {
	const navigate = useNavigate();
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

	const navigationItems = [
		{ text: "Expenses", icon: <ReceiptIcon />, path: "/" },
		{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
	];

	return (
		<>
			<AppBar
				position="static"
				sx={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
					borderRadius: 0,
					width: "100vw",
				}}
			>
				<Toolbar sx={{ minHeight: 64 }}>
					{/* Logo Section */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							cursor: "pointer",
							flexGrow: isMobile ? 0 : 1,
						}}
						onClick={() => navigate("/")}
					>
						<TrackChangesIcon sx={{ mr: 1, fontSize: 28 }} />
						<Typography
							variant="h6"
							component="div"
							sx={{
								fontWeight: "bold",
								fontSize: isMobile ? "1.1rem" : "1.25rem",
							}}
						>
							Trakr - Expense Tracker
						</Typography>
					</Box>

					{/* Desktop Navigation */}
					{!isMobile && (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Button
								color="inherit"
								component={Link}
								to="/"
								sx={{
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.1)",
										transform: "translateY(-1px)",
									},
									transition: "all 0.2s ease-in-out",
									borderRadius: 2,
									px: 2,
								}}
								startIcon={<ReceiptIcon />}
							>
								Expenses
							</Button>
							<Button
								color="inherit"
								component={Link}
								to="/dashboard"
								sx={{
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.1)",
										transform: "translateY(-1px)",
									},
									transition: "all 0.2s ease-in-out",
									borderRadius: 2,
									px: 2,
								}}
								startIcon={<DashboardIcon />}
							>
								Dashboard
							</Button>
							<Button
								color="inherit"
								onClick={handleLogoutClick}
								sx={{
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.1)",
										transform: "translateY(-1px)",
									},
									transition: "all 0.2s ease-in-out",
									borderRadius: 2,
									px: 2,
									ml: 2,
								}}
								startIcon={<LogoutIcon />}
							>
								Logout
							</Button>
						</Box>
					)}

					{/* Mobile Menu Button */}
					{isMobile && (
						<IconButton
							color="inherit"
							edge="end"
							onClick={handleMobileMenuToggle}
							sx={{ ml: "auto" }}
						>
							<MenuIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			<Drawer
				anchor="right"
				open={mobileMenuOpen}
				onClose={handleMobileMenuClose}
				sx={{
					"& .MuiDrawer-paper": {
						width: 280,
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						color: "white",
					},
				}}
			>
				<Box sx={{ p: 2 }}>
					<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
						<TrackChangesIcon sx={{ mr: 1, fontSize: 24 }} />
						<Typography
							variant="h6"
							sx={{ fontWeight: "bold" }}
						>
							Trakr Menu
						</Typography>
					</Box>

					<List>
						{navigationItems.map((item) => (
							<ListItem
								button
								key={item.text}
								component={Link}
								to={item.path}
								onClick={handleMobileMenuClose}
								sx={{
									borderRadius: 2,
									mb: 1,
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.1)",
									},
								}}
							>
								<ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}

						<Divider
							sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
						/>

						<ListItem
							button
							onClick={() => {
								handleMobileMenuClose();
								handleLogoutClick();
							}}
							sx={{
								borderRadius: 2,
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.1)",
								},
							}}
						>
							<ListItemIcon sx={{ color: "white" }}>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default Navbar;
