"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { GlobalFilterProvider } from "@/hooks/useGlobalFilter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TransactionProvider } from "@/hooks/useTransaction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { ptBR } from "@mui/x-date-pickers/locales";
import { Toaster } from 'react-hot-toast'

const brazilianLocale = ptBR.components.MuiLocalizationProvider.defaultProps.localeText;

export default function RootLayout({ children }: { children: ReactNode }) {
  dayjs.locale("pt-br");
  return (
    <html lang="pt-BR">
      <body>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster position="top-right" />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br" localeText={brazilianLocale}>
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
