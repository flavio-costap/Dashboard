'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      logout()
    }
  }, [logout])

  return <>{children}</>
}
