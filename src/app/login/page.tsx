'use client'

import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { Background, FormContainer, StyledButton, TitleContainer } from './page.styles'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleLogin = () => {
    login(email, password)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Background>
      <FormContainer>
        <TitleContainer>
          <DashboardOutlinedIcon sx={{ fontSize: 40, marginRight: 1, color:"white" }} />
          <Typography variant="h3" fontWeight={500} color="white">
            Dashboard
          </Typography>
        </TitleContainer>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <StyledButton variant="contained" onClick={handleLogin}>
          Entrar
        </StyledButton>
      </FormContainer>
    </Background>
  )
}
