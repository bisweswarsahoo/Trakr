import React from "react";
import { Paper, PaperProps } from "@mui/material";

export interface CardProps extends PaperProps {
	children: React.ReactNode;
}

export const BaseCard: React.FC<CardProps> = ({ children, ...props }) => {
	return (
		<Paper
			elevation={2}
			sx={{ borderRadius: "16px", padding: 2, marginBottom: 2 }}
			{...props}
		>
			{children}
		</Paper>
	);
};
