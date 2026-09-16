import { useEffect, useMemo, useRef, useState } from 'react'
import { IconBuilding, IconCheck, IconSearch, IconWhatsApp } from './Icons'
import { useData } from '../context/DataContext'
import { INDICACAO_ICON_MAP } from '../config/iconMap'
import { waServiceContact } from '../services/waContact'

/*
  ServicesMarketplace.jsx — vitrine de serviços "Nós Indicamos" com busca,
  filtro por categoria e scroll infinito (cresce na própria página).

  MANUTENÇÃO:
  - A vitrine mantém 5 colunas (COLS). Sem caixa de scroll interna: o grid
    cresce naturalmente para baixo e a página rola — isso evita as alturas
    fixas gigantes que espremiam a tela em alguns viewports.
  - O scroll infinito usa um `sentinel` no fim do grid observado por
    IntersectionObserver: quando ele entra na viewport (com folga de
    `rootMargin`), `loadMore()` carrega o próximo lote. PAGE_SIZE = 2 linhas.
  - Filtros combinados: a busca respeita a categoria ativa e vice-versa.
  - Toda mudança de consulta/categoria reinicia `visibleCount` e invalida
    cargas pendentes via `generationRef`.
  - Os banners laterais da vitrine (`.mp__rail`) vivem na Home e reaproveitam
    o AdCarousel com `variant="rail"`.
*/

const COLS = 5
const PAGE_SIZE = COLS * 2
const INITIAL_COUNT = COLS * 4

export default function ServicesMarketplace() {
  const { indicacoes } = useData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef(null)
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

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reinicia o carregamento sempre que a busca ou a categoria mudam.
  useEffect(() => {
    generationRef.current += 1
    setVisibleCount(INITIAL_COUNT)
    setLoading(false)
  }, [query, category])

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

  // Rola a própria página: o sentinel dispara o próximo lote ao se aproximar
  // da viewport (rootMargin pré-carrega antes do fim visível).
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore()
      },
      { rootMargin: '520px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, loading, hasMore, query, category])

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

      {visible.length === 0 ? (
        <p className="mp__empty">Nenhum serviço encontrado para os filtros atuais.</p>
      ) : (
        <div className="rec-grid rec-grid--marketplace">
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
      {!loading && !hasMore && visible.length > 0 && (
        <div className="mp__status mp__status--hint">Você viu todos os serviços disponíveis.</div>
      )}

      <div ref={sentinelRef} className="mp__sentinel" aria-hidden="true" />
    </div>
  )
}