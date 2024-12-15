import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme();

type Props = {
	children: ReactNode;
};

export const AppThemeProvider = ({ children }: Props) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
