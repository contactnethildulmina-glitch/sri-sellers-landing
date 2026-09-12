import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fetchProfile, type Customer } from '../lib/api'
import { supabase } from '../lib/supabase'

type AuthState = {
  customer: Customer | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      if (!data.session?.user) {
        setCustomer(null)
        return
      }
      const profile = await fetchProfile(data.session.user.id)
      setCustomer(profile)
    } catch {
      setCustomer(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setCustomer(null)
        setLoading(false)
        return
      }
      void fetchProfile(session.user.id)
        .then(setCustomer)
        .catch(() => setCustomer(null))
        .finally(() => setLoading(false))
    })
    return () => {
      sub.subscription.unsubscribe()
    }
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    if (!data.user) throw new Error('Login failed')
    const profile = await fetchProfile(data.user.id)
    setCustomer(profile)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw new Error(error.message)
    if (!data.user) throw new Error('Registration failed')
    if (!data.session) {
      throw new Error(
        'Account created. Check your email to confirm, then log in. (Email confirmation may be enabled in Supabase Auth settings.)',
      )
    }
    // Give the profiles trigger a moment, then load (with auth metadata fallback)
    await new Promise((r) => setTimeout(r, 400))
    const profile = await fetchProfile(data.user.id)
    setCustomer(profile)
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
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
