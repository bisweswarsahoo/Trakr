import React from "react";
import {
	Box,
	Paper,
	Typography,
	Card,
	CardContent,
	Avatar,
	LinearProgress,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CategoryIcon from "@mui/icons-material/Category";
import { formatCurrency } from "@trakr/utils";

const CategoryBreakdownSection = ({ categoryReport }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const maxCategoryAmount =
		categoryReport && categoryReport.length
			? Math.max(...categoryReport.map((c) => c.total))
			: 1;

	return (
		<Paper
			elevation={4}
			sx={{
				borderRadius: 3,
				overflow: "hidden",
				border: `1px solid ${theme.palette.divider}`,
				mt: isMobile ? 2 : 3,
			}}
		>
			<Box
				sx={{
					p: isMobile ? 2 : 3,
					borderBottom: `1px solid ${theme.palette.divider}`,
					display: "flex",
					alignItems: "center",
					gap: 1.5,
				}}
			>
				<CategoryIcon color="primary" />
				<Typography
					variant="h6"
					sx={{ fontWeight: 600 }}
				>
					Spending by Category Overview
				</Typography>
			</Box>
			<Box sx={{ p: isMobile ? 1.5 : 2 }}>
				{!categoryReport || categoryReport.length === 0 ? (
					<Box sx={{ py: 4, textAlign: "center" }}>
						<Typography color="text.secondary">
							No category data available for this period
						</Typography>
					</Box>
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1.5,
						}}
					>
						{categoryReport.map((cat, i) => (
							<Card
								key={i}
								variant="outlined"
								sx={{
									borderRadius: 2,
									transition: "all 0.2s ease",
									"&:hover": {
										boxShadow: theme.shadows[2],
									},
								}}
							>
								<CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											mb: 1,
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 1.5,
											}}
										>
											<Avatar
												sx={{
													width: 36,
													height: 36,
													bgcolor: cat.color || theme.palette.primary.main,
													fontSize: "1rem",
												}}
											>
												{cat.icon || "📂"}
											</Avatar>
											<Box>
												<Typography
													variant="body1"
													sx={{ fontWeight: 600 }}
												>
													{cat.category_name}
												</Typography>
												<Typography
													variant="caption"
													color="text.secondary"
												>
													{cat.count}{" "}
													{cat.count === 1 ? "transaction" : "transactions"}
												</Typography>
											</Box>
										</Box>
										<Typography
											variant="h6"
											sx={{
												fontWeight: "bold",
												color: cat.color || "primary.main",
											}}
										>
											{formatCurrency(cat.total || 0)}
										</Typography>
									</Box>
									<LinearProgress
										variant="determinate"
										value={(cat.total / maxCategoryAmount) * 100}
										sx={{
											height: 6,
											borderRadius: 3,
											bgcolor: alpha(
												cat.color || theme.palette.primary.main,
												0.1,
											),
											"& .MuiLinearProgress-bar": {
												borderRadius: 3,
												bgcolor: cat.color || theme.palette.primary.main,
											},
										}}
									/>
								</CardContent>
							</Card>
						))}
					</Box>
				)}
			</Box>
		</Paper>
	);
};

export default CategoryBreakdownSection;
