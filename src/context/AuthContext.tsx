import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api, setToken, type Customer } from '../lib/api'

type AuthState = {
  customer: Customer | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const token = localStorage.getItem('sri_vpn_token')
    if (!token) {
      setCustomer(null)
      setLoading(false)
      return
    }
    try {
      const { customer: me } = await api.me()
      setCustomer(me)
    } catch {
      setToken(null)
      setCustomer(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    const { token, customer: c } = await api.login({ email, password })
    setToken(token)
    setCustomer(c)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { token, customer: c } = await api.register({ name, email, password })
    setToken(token)
    setCustomer(c)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setCustomer(null)
  }, [])

  const value = useMemo(
    () => ({ customer, loading, login, register, logout, refresh }),
    [customer, loading, login, register, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
