'use client'
import { ReactNode } from 'react'
import { AuthProvider } from '@/hooks/useAuth'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '@/styles/theme'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
