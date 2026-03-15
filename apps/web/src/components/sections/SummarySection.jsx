import { Grid, Box, Card, CardContent, Avatar, Typography, useTheme, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BalanceIcon from "@mui/icons-material/Balance";
import { formatCurrency } from "@trakr/utils";

const SummarySection = ({ summary }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	if (!summary) return null;

	const summaryData = [
		{
			label: "Total Income",
			value: formatCurrency(summary.total_income || 0),
			icon: <TrendingUpIcon />,
			color: theme.palette.success.main,
			gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
		},
		{
			label: "Total Expense",
			value: formatCurrency(summary.total_expense || 0),
			icon: <TrendingDownIcon />,
			color: theme.palette.error.main,
			gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
		},
		{
			label: "Net Profit",
			value: formatCurrency(summary.net_profit || 0),
			icon: <BalanceIcon />,
			color:
				(summary.net_profit || 0) >= 0
					? theme.palette.success.main
					: theme.palette.error.main,
			gradient:
				(summary.net_profit || 0) >= 0
					? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
					: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
		},
		{
			label: "Transactions",
			value: summary.transaction_count || 0,
			icon: <ReceiptIcon />,
			color: theme.palette.info.main,
			gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
		},
	];

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "1fr 1fr",
					md: "1fr 1fr 1fr 1fr",
				},
				gap: isMobile ? 1.5 : 2,
				mb: 4,
			}}
		>
			{summaryData.map((card, i) => (
				<Card
					key={i}
					elevation={4}
					sx={{
						borderRadius: 3,
						overflow: "hidden",
						transition: "all 0.3s ease",
						"&:hover": {
							transform: "translateY(-4px)",
							boxShadow: `0 12px 30px ${alpha(card.color, 0.25)}`,
						},
					}}
				>
					<Box
						sx={{
							height: 4,
							background: card.gradient,
						}}
					/>
					<CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1.5,
							}}
						>
							<Avatar
								sx={{
									bgcolor: alpha(card.color, 0.12),
									color: card.color,
									width: isMobile ? 44 : 50,
									height: isMobile ? 44 : 50,
								}}
							>
								{card.icon}
							</Avatar>
							<Box>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontWeight: 500 }}
								>
									{card.label}
								</Typography>
								<Typography
									variant="h5"
									sx={{
										fontWeight: "bold",
										fontSize: isMobile ? "1.2rem" : "1.4rem",
										color: card.color,
									}}
								>
									{card.value}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
			))}
		</Box>
	);
};

export default SummarySection;
