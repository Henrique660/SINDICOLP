import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { IconWhatsApp, IconMenu, IconDownload } from './Icons'
import { SITE_NAME, SITE_TAGLINE, PHONE_URL } from '../config/site'

/*
  Header.jsx — cabeçalho fixo com marca, navegação principal e CTAs.

  MANUTENÇÃO:
  - Itens de navegação: edite o array `links` abaixo (to = rota, end = ativo exato).
  - Fecha o menu mobile automaticamente ao trocar de página (useEffect/ver pathname).
  - Marca e telefone vêm do src/config/site.js.
  - Instalação PWA:
    * `beforeinstallprompt` (Chrome/Edge/Android) é capturado e o botão "Instalar"
      dispara prompt() nativamente.
    * Em iOS (Safari) não há este evento — o botão vira um "tip" com instruções
      de "Adicionar à Tela de Início".
    * O botão some se o app já estiver em modo standalone (instalado).
*/

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/cursos-eventos', label: 'Curso e Eventos' },
  { to: '/colunistas', label: 'Colunistas' }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showIosTip, setShowIosTip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const tipRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    const onInstalled = () => {
      setDeferredPrompt(null)
      setShowIosTip(false)
    }
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (iOS && !standalone) setShowIosTip(true)

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (tipRef.current && !tipRef.current.contains(e.target)) setShowIosTip(false)
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') setDeferredPrompt(null)
      else setDeferredPrompt(null)
    }
  }

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
          {(isMobile && (deferredPrompt || showIosTip)) && (
            <div className="nav-install-wrap" ref={tipRef}>
              <button
                type="button"
                className="btn btn--install"
                onClick={handleInstall}
                aria-haspopup={showIosTip ? 'dialog' : undefined}
              >
                <IconDownload size={15} />
                Instalar
              </button>
              {showIosTip && !deferredPrompt && (
                <div className="install-tip" role="status">
                  <b>Instalar o app no iPhone/iPad</b>
                  <p>Toque no ícone de compartilhar <span aria-hidden="true">↑</span> na barra do Safari e escolha <em>Adicionar à Tela de Início</em>.</p>
                </div>
              )}
            </div>
          )}
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