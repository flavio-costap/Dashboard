import { useState, useContext, createContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type User = { email: string }
type AuthContextType = { user: User | null; login: (email: string) => void; logout: () => void }

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = (email: string) => {
    setUser({ email })
    router.push('/dashboard')
  }

  const logout = () => {
    setUser(null)
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