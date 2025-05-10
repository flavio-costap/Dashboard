"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { GlobalFilterProvider } from "@/hooks/useGlobalFilter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TransactionProvider } from "@/hooks/useTransaction";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AuthProvider>
                <GlobalFilterProvider>
                  <TransactionProvider>{children}</TransactionProvider>
                </GlobalFilterProvider>
              </AuthProvider>
            </LocalizationProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
