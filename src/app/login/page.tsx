'use client'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const { login } = useAuth()

  const handleLogin = () => {
    login(email)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Entrar</Button>
    </Container>
  )
}