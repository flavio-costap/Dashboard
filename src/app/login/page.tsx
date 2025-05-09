'use client'

import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styled from 'styled-components'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Background = styled.div`
  background-color: #264ECA;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormContainer = styled.div`
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const StyledButton = styled(Button)`
  && {
    background-color: #2148C0;
    color: white;
    margin-top: 1rem;
    width: 100%;
    &:hover {
      background-color: #2148C0;
    }
  }
`

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleLogin = () => {
    login(email)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Background>
      <FormContainer>
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
