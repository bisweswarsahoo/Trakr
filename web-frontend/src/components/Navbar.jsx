import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		onLogout();
		navigate("/login");
	};

	return (
		<AppBar
			position="static"
			color="primary"
		>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					Trakr
				</Typography>

				<Button
					color="inherit"
					component={Link}
					to="/"
				>
					Expenses
				</Button>
				<Button
					color="inherit"
					component={Link}
					to="/dashboard"
				>
					Dashboard
				</Button>
				<Button
					color="inherit"
					onClick={handleLogoutClick}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
