/*
  App.jsx — rotas da aplicação BLOOKKO (landing + CMS).

  MANUTENÇÃO:
  - LandingLayout: envolve todas as rotas públicas (Header/Footer/WhatsAppFloat)
    e gerencia scroll/reveal. Rotas admin ficam fora deste layout.
  - /admin: protegido por ProtectedRoute; sub-rotas aninhadas dentro do
    AdminLayout (sidebar + Outlet). Novo módulo? Adicione uma <Route> aqui
    e um navItem no AdminLayout.
  - Catch-all (/*) envia para a Home; páginas 404 podem ser criadas futuramente.
*/

import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FooterCard from './components/FooterCard'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Colunistas from './pages/Colunistas'
import CursosEventos from './pages/CursosEventos'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminCursosEventos from './pages/admin/AdminCursosEventos'
import AdminColunistas from './pages/admin/AdminColunistas'
import AdminIndicamos from './pages/admin/AdminIndicamos'
import AdminAnunciantes from './pages/admin/AdminAnunciantes'
import ProtectedRoute from './pages/admin/ProtectedRoute'

function LandingLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear()
    })
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('[data-reveal]')

    const revealAll = () => {
      reveals.forEach((el) => el.classList.add('is-in'))
    }

    if (!('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    reveals.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <FooterCard />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/colunistas" element={<Colunistas />} />
        <Route path="/cursos-eventos" element={<CursosEventos />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cursos-eventos" element={<AdminCursosEventos />} />
        <Route path="colunistas" element={<AdminColunistas />} />
        <Route path="indicamos" element={<AdminIndicamos />} />
        <Route path="anunciantes" element={<AdminAnunciantes />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  )
}