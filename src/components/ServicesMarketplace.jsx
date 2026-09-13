import { useEffect, useMemo, useRef, useState } from 'react'
import { IconBuilding, IconCheck, IconSearch, IconWhatsApp } from './Icons'
import { useData } from '../context/DataContext'
import { INDICACAO_ICON_MAP } from '../config/iconMap'
import { waServiceContact } from '../services/waContact'

/*
  ServicesMarketplace.jsx — lista de serviços "Nós Indicamos" com busca,
  filtro por categoria e scroll infinito interno (a página não rola).

  MANUTENÇÃO:
  - Filtros combinados: a busca respeita a categoria ativa e vice-versa.
  - Toda mudança de consulta/categoria reinicia `visibleCount` e leva o
    container de volta ao topo (`generationRef` invalida cargas pendentes).
  - O scroll infinito funciona dentro de `.mp__scroller` (max-height +
    overflow-y) usando o evento `onScroll`. INITIAL_COUNT define quantos
    serviços aparecem na primeira renderização (todos os atuais); PAGE_SIZE
    é o tamanho de cada lote carregado ao rolar até o fim.
*/

const PAGE_SIZE = 3
const INITIAL_COUNT = 6

export default function ServicesMarketplace() {
  const { indicacoes } = useData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const generationRef = useRef(0)

  const services = useMemo(
    () =>
      indicacoes.map((r) => ({
        ...r,
        itens: r.itens || [],
        icon: INDICACAO_ICON_MAP[r.icon] || IconBuilding
      })),
    [indicacoes]
  )

  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.categoria).filter(Boolean))),
    [services]
  )

  // Filtragem combinada (busca ∩ categoria) — recalcula quando um dos dois muda.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter((s) => {
      const okCategory = !category || s.categoria === category
      const okQuery =
        !q ||
        s.nome.toLowerCase().includes(q) ||
        s.descricao.toLowerCase().includes(q)
      return okCategory && okQuery
    })
  }, [services, query, category])

  // Reinicia o scroll infinito sempre que a busca ou a categoria mudam.
  useEffect(() => {
    generationRef.current += 1
    setVisibleCount(INITIAL_COUNT)
    setLoading(false)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [query, category])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function loadMore() {
    if (loading || !hasMore) return
    const generation = generationRef.current
    setLoading(true)
    // Simula uma busca assíncrona; o guard inspirado em generation ignora
    // respostas atrasadas quando o usuário já mudou o filtro.
    setTimeout(() => {
      if (generation !== generationRef.current) return
      setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))
      setLoading(false)
    }, 450)
  }

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 60) {
      loadMore()
    }
  }

  return (
    <div className="mp">
      <div className="mp__toolbar">
        <label className="mp__search">
          <IconSearch size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou descrição…"
            aria-label="Buscar serviço"
          />
        </label>

        <label className="mp__field">
          <span className="mp__field-label">Categoria</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mp__scroller" ref={scrollRef} onScroll={handleScroll}>
        {visible.length === 0 ? (
          <p className="mp__empty">Nenhum serviço encontrado para os filtros atuais.</p>
        ) : (
          <div className="rec-grid">
            {visible.map((r) => {
              const RIcon = r.icon
              const hasLink = r.linkExterno && r.linkExterno !== '#'
              return (
                <div className="recommend" key={r.id}>
                  <span className="recommend__icon"><RIcon size={21} /></span>
                  {hasLink ? (
                    <h3><a href={r.linkExterno} target="_blank" rel="noopener noreferrer">{r.nome} ↗</a></h3>
                  ) : (
                    <h3>{r.nome}</h3>
                  )}
                  <p>{r.descricao}</p>
                  {r.itens.length > 0 && (
                    <ul>
                      {r.itens.map((item) => (
                        <li key={item}>
                          <IconCheck size={13} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="recommend__actions">
                    <a
                      className="btn btn--primary btn--sm"
                      href={waServiceContact(r)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Contatar ${r.nome} no WhatsApp`}
                    >
                      <IconWhatsApp size={14} />
                      Contatar
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {loading && (
          <div className="mp__status" role="status" aria-live="polite">
            <span className="mp__spinner" aria-hidden="true" />
            <span>Carregando mais serviços…</span>
          </div>
        )}
        {!loading && hasMore && (
          <div className="mp__status mp__status--hint">Role para ver mais serviços</div>
        )}
      </div>
    </div>
  )
}