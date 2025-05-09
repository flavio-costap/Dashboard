
'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Typography, Container, Button } from '@mui/material'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { logout } = useAuth()

  return (
    <ProtectedRoute>
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Button variant="outlined" onClick={logout}>Sair</Button>
      </Container>
    </ProtectedRoute>
  )
}