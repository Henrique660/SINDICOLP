import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IconWhatsApp, IconMenu } from './Icons'
import { SITE_NAME, SITE_TAGLINE, PHONE_URL } from '../config/site'

/*
  Header.jsx — cabeçalho fixo com marca, navegação principal e CTA do WhatsApp.

  MANUTENÇÃO:
  - Itens de navegação: edite o array `links` abaixo (to = rota, end = ativo exato).
  - Fecha o menu mobile automaticamente ao trocar de página (useEffect/ver pathname).
  - Marca e telefone vêm do src/config/site.js.
*/

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/cursos-eventos', label: 'Curso e Eventos' },
  { to: '/colunistas', label: 'Colunistas' },
  { to: '/nos-indicamos', label: 'Nós indicamos' }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="site-header" data-od-id="site-header">
      <div className="container navbar">
        <Link className="brand" to="/" aria-label={`${SITE_NAME} — Início`}>
          <span className="brand__mark" aria-hidden="true"><span>B</span></span>
          <span className="brand__name">{SITE_NAME}<small>{SITE_TAGLINE}</small></span>
        </Link>
        <nav
          className={`nav-panel${open ? ' is-open' : ''}`}
          data-nav-panel
          id="nav-panel"
          aria-label="Navegação principal"
        >
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-cta">
          <a className="btn btn--primary" href={PHONE_URL} target="_blank" rel="noopener">
            <IconWhatsApp size={13} />
            Fale conosco
          </a>
          <button
            className="nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={String(open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="nav-panel"
          >
            <IconMenu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}