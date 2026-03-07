import React from "react";
import {
	TextField as MuiTextField,
	TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface InputProps extends Omit<MuiTextFieldProps, "error" | "label"> {
	label: string;
	error?: string;
}

export const TextInputField: React.FC<InputProps> = ({
	label,
	error,
	...props
}) => {
	return (
		<MuiTextField
			label={label}
			error={!!error}
			helperText={error}
			variant="outlined"
			fullWidth
			{...props}
		/>
	);
};
