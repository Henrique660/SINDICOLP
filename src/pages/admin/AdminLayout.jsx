import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

/*
  AdminLayout.jsx — estrutura do painel (sidebar + área de conteúdo).

  MANUTENÇÃO:
  - Itens do menu: edite o array `navItems` (to = rota do módulo).
  - Contadores ao lado de cada item vem do DataContext (total de registros).
  - Em telas menores a sidebar vira barra horizontal (CSS src/styles/admin.css).
  - Uso: rota /admin é protegida por ProtectedRoute (src/pages/admin/ProtectedRoute.jsx).
*/

const navItems = [
  { to: '/admin', label: 'Resumo', end: true },
  { to: '/admin/cursos-eventos', label: 'Cursos e Eventos' },
  { to: '/admin/colunistas', label: 'Colunistas' },
  { to: '/admin/indicamos', label: 'Nós Indicamos' }
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const { cursosEventos, colunistas, indicacoes } = useData()
  const navigate = useNavigate()

  const counts = {
    '/admin/cursos-eventos': cursosEventos.length,
    '/admin/colunistas': colunistas.length,
    '/admin/indicamos': indicacoes.length
  }

  function onLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <div className="admin-aside__brand">
          <span className="brand__mark" aria-hidden="true">
            <span>B</span>
          </span>
          <span className="brand__name">
            BLOKKO<small>Painel Administrativo</small>
          </span>
        </div>
        <nav className="admin-nav" aria-label="Menu do painel">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              <span>{item.label}</span>
              {counts[item.to] != null && <em>{counts[item.to]}</em>}
            </NavLink>
          ))}
        </nav>
        <div className="admin-aside__foot">
          <Link to="/" target="_blank" rel="noopener">
            Ver site ↗
          </Link>
          <button type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-main__in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}