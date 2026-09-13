import { createContext, useCallback, useContext, useState } from 'react'
import { DB_KEY, loadDB, saveDB, uid } from '../services/store'

/*
  DataContext.jsx — fonte única de dados do CMS (landing + admin).

  MANUTENÇÃO:
  - Expoe as coleções: cursosEventos, colunistas, indicacoes, anunciantes.
  - upsert(coleção, item): cria ou atualiza; remove(coleção, id): exclui.
  - Persistência atual: localStorage (store.js). Quando o backend Node/Postgres
    entrar, troque `commit` por chamadas REST sem alterar as páginas que usam
    useData(). A interface pública permanece a mesma.
  - reset() recria o seed padrão (apaga as edições locais).
*/

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => loadDB())

  const commit = useCallback((updater) => {
    setDb((prev) => {
      const next = updater(prev)
      saveDB(next)
      return next
    })
  }, [])

  const upsert = useCallback(
    (collection, item) => {
      commit((prev) => {
        const list = prev[collection] || []
        const exists = list.some((i) => i.id === item.id)
        return {
          ...prev,
          [collection]: exists ? list.map((i) => (i.id === item.id ? item : i)) : [...list, item]
        }
      })
    },
    [commit]
  )

  const remove = useCallback(
    (collection, id) => {
      commit((prev) => ({
        ...prev,
        [collection]: (prev[collection] || []).filter((i) => i.id !== id)
      }))
    },
    [commit]
  )

  const reset = useCallback(() => {
    localStorage.removeItem(DB_KEY)
    setDb(loadDB())
  }, [])

  return (
    <DataContext.Provider
      value={{
        cursosEventos: db.cursosEventos || [],
        colunistas: db.colunistas || [],
        indicacoes: db.indicacoes || [],
        anunciantes: db.anunciantes || [],
        upsert,
        remove,
        reset,
        uid
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}