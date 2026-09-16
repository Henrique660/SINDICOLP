/*
  main.jsx — bootstrap do app.

  MANUTENÇÃO:
  - Ordem dos providers importa: AuthProvider (sessão) -> DataProvider (conteúdo).
  - CSS: styles.css (landing) e admin.css (painel) são globais.
  - Em dev use `npm run dev`; build de produção: `npm run build`.
  - Service worker (PWA) é registrado apenas em produção para não atrapalhar o
    HMR do Vite; os assets ficam em /public (sw.js, manifest, ícones).
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import './styles/styles.css'
import './styles/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

/*
  Carregamento condicional do stylepwa.css (folha exclusiva do PWA).

  REGRA: esta folha NUNCA é linkada estaticamente no index.html.
  Ela é injetada dinamicamente via import() apenas quando o app roda
  em `display-mode: standalone` (PWA instalada) ou, no iOS, quando
  `navigator.standalone` é true (aberto pela Tela de Início).
  Em outras palavras: o usuário web tradicional nunca baixa essas regras.

  O import() do Vite gera um chunk separado, então os bytes só são
  transferidos quando há realmente uma PWA instalada. Também ouvimos
  o evento de mudança do media query: se o usuário instalar o app
  enquanto navegava, a folha é injetada no ato.
*/
function isStandalonePWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator.standalone === true)
  )
}

function loadPwaStyles() {
  import('./styles/stylepwa.css').catch(() => {})
}

if (isStandalonePWA()) {
  loadPwaStyles()
} else {
  const mql = window.matchMedia('(display-mode: standalone)')
  const onChange = (e) => {
    if (e.matches) loadPwaStyles()
  }
  if (mql.addEventListener) mql.addEventListener('change', onChange)
}