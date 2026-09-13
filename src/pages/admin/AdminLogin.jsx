import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_EMAIL, ADMIN_PASS } from '../../config/admin'

/*
  AdminLogin.jsx — tela de autenticação do painel.

  MANUTENÇÃO:
  - Credenciais de demonstração em src/config/admin.js (ADMIN_EMAIL/ADMIN_PASS).
  - Fase atual: login simulado (AuthContext). Quando o backend (Node/Postgres)
    entrar, troque o `login` do AuthContext pela chamada a POST /auth/login.
  - Usuário já autenticado é redirecionado automaticamente para /admin.
*/

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__brand">
        <span className="brand__mark" aria-hidden="true">
          <span>B</span>
        </span>
        <span className="brand__name">
          BLOKKO<small>Painel Administrativo</small>
        </span>
      </div>

      <form className="admin-login__card" onSubmit={onSubmit}>
        <h1>Acessar o painel</h1>
        <p className="admin-login__sub">Entre com suas credenciais de administrador.</p>

        {error && <div className="admin-alert">{error}</div>}

        <label className="af-field">
          <span className="af-label">E-mail</span>
          <input
            className="af-input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@blokko.com.br"
            required
          />
        </label>

        <label className="af-field">
          <span className="af-label">Senha</span>
          <input
            className="af-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button className="af-btn af-btn--primary" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <div className="admin-login__demo">
          <strong>Credenciais de demonstração</strong>
          <code>{ADMIN_EMAIL}</code>
          <code>{ADMIN_PASS}</code>
        </div>

        <Link className="admin-login__back" to="/">
          ← Voltar para o site
        </Link>
      </form>
    </div>
  )
}