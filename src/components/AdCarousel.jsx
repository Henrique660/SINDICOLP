import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { IconChevronRight } from './Icons'

/*
  AdCarousel.jsx — carrossel de anunciantes (banner de largura total).

  MANUTENÇÃO:
  - Usa a coleção `anunciantes` do CMS (AdminAnunciantes): imagem + link externo.
  - Banner full-bleed, mesma linguagem visual do hero da Home.
  - Avanço automático (4.5s) com pausa em hover/foco; setas, dots e contador
    sobrepostos ao banner. Anunciantes inativos ficam fora.
*/

const SLIDE_INTERVAL = 4500

export default function AdCarousel() {
  const { anunciantes } = useData()
  const items = (anunciantes || []).filter(
    (a) => a.ativo && a.imagem && a.linkExterno
  )
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (index >= items.length) setIndex(0)
  }, [items.length, index])

  useEffect(() => {
    if (items.length < 2 || paused) return undefined
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      SLIDE_INTERVAL
    )
    return () => clearTimeout(timer)
  }, [index, items.length, paused])

  if (!items.length) return null

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  return (
    <section className="ad-carousel" data-od-id="anunciantes">
      <div
        className="ad-carousel__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="ad-carousel__viewport"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Anunciantes patrocinadores"
        >
          <div
            className="ad-carousel__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((a, i) => (
              <div className="ad-carousel__slide" key={a.id} aria-hidden={i !== index}>
                <a
                  className="ad-carousel__link"
                  href={a.linkExterno}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  aria-label={`${a.nome} — abrir site do anunciante`}
                  data-od-id={`anunciante-${a.id}`}
                >
                  <img src={a.imagem} alt={a.nome} loading="lazy" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <span className="ad-carousel__label" aria-hidden="true">Patrocinadores &amp; apoiadores</span>

        {items.length > 1 && (
          <>
            <button
              type="button"
              className="ad-carousel__btn"
              data-dir="prev"
              onClick={prev}
              aria-label="Anunciante anterior"
            >
              <IconChevronRight size={16} />
            </button>
            <button
              type="button"
              className="ad-carousel__btn"
              data-dir="next"
              onClick={next}
              aria-label="Próximo anunciante"
            >
              <IconChevronRight size={16} />
            </button>
            <div className="ad-carousel__controls">
              <div className="ad-carousel__dots">
                {items.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    className={i === index ? 'is-active' : ''}
                    onClick={() => setIndex(i)}
                    aria-label={`Ir para o anunciante ${i + 1} de ${items.length}`}
                    aria-current={i === index ? 'true' : undefined}
                  />
                ))}
              </div>
              <span className="ad-carousel__count">{index + 1} / {items.length}</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}