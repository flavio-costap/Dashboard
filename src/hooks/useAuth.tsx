'use client'
import { useState, useContext, createContext, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = { email: string }
type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    if (email === 'admin@admin.com' && password === 'admin123') {
      const loggedUser = { email }
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('authToken', 'fake-token')
      router.push('/dashboard')
    } else {
      alert('Credenciais inválidas')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
