/*
  main.jsx — bootstrap do app.

  MANUTENÇÃO:
  - Ordem dos providers importa: AuthProvider (sessão) -> DataProvider (conteúdo).
  - CSS: styles.css (landing) e admin.css (painel) são globais.
  - Em dev use `npm run dev`; build de produção: `npm run build`.
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