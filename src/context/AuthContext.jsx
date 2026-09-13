import { createContext, useCallback, useContext, useState } from 'react'
import { ADMIN_EMAIL, ADMIN_PASS, SESSION_KEY } from '../config/admin'

/*
  AuthContext.jsx — sessão do administrador (fase de demonstração).

  MANUTENÇÃO:
  - Login simulado: compara com ADMIN_EMAIL/ADMIN_PASS (src/config/admin.js).
  - Troca para API: substitua a função `login` por uma chamada a POST /auth/login
    que retorna um JWT; guarde o token no sessionStorage (mesma chave SESSION_KEY)
    e valide em `isAuthenticated`.
  - `logout` limpa a sessão e re-renderiza o app.
*/

const AuthContext = createContext(null)

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) || null
  } catch (e) {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readSession())

  const login = useCallback(async (email, password) => {
    await new Promise((r) => setTimeout(r, 350))
    const ok =
      email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS
    if (!ok) throw new Error('Credenciais inválidas.')

    const fakeToken = 'dev-' + Date.now().toString(36)
    try {
      sessionStorage.setItem(SESSION_KEY, fakeToken)
    } catch (e) {
      /* sessão indisponível — mantém em memória */
    }
    setToken(fakeToken)
    return fakeToken
  }, [])

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch (e) {
      /* ignore */
    }
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}