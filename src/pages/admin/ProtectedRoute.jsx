import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/*
  ProtectedRoute.jsx — guarda de rota para áreas restritas.

  MANUTENÇÃO:
  - Envolve as rotas /admin/* no App.jsx. Sem sessão, redireciona para
    /admin/login guardando a rota de origem em `state.from`.
  - Autenticação vem do AuthContext (fase atual: mock; futuramente JWT).
*/

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return children
}