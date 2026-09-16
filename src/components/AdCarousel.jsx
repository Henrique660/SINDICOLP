import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { PHONE_URL } from '../config/site'
import { IconChevronRight } from './Icons'

import heroImg from '../assets/blookkoHero.png'
import railImg from '../assets/Blookkorail.png'

/*
  AdCarousel.jsx — carrossel de anunciantes.

  MANUTENÇÃO:
  - Usa a coleção `anunciantes` do CMS (AdminAnunciantes): imagem + link externo.
  - `variant="hero"` (padrão): banner full-bleed no topo da Home.
  - `variant="rail"`: retângulo vertical para os espaços publicitários laterais
    da vitrine (Home). Mesma lógica de autoplay/controles, apenas outra roupagem
    (estilo `.ad-carousel--rail` em styles.css).
  - Fallback: quando não há anunciantes do CMS para a variante corrente, uma
    imagem estática é exibida (heroImg ou railImg). Clique nela redireciona
    para o WhatsApp com a mensagem "Eu quero anunciar na Blookko".
  - Avanço automático (4.5s) com pausa em hover/foco; setas, dots e contador
    sobrepostos ao banner. Anunciantes inativos ficam fora.
*/

const SLIDE_INTERVAL = 4500

const FALLBACK_MSG = 'Eu quero anunciar na Blookko'
const fallbackLink = `${PHONE_URL.split('?')[0]}?text=${encodeURIComponent(FALLBACK_MSG)}`

const FALLBACK = {
  hero: { imagem: heroImg, linkExterno: fallbackLink, nome: 'Anuncie na BLOOKKO' },
  rail: { imagem: railImg, linkExterno: fallbackLink, nome: 'Anuncie na BLOOKKO' }
}

export default function AdCarousel({ variant = 'hero' }) {
  const { anunciantes } = useData()
  const items = (anunciantes || []).filter(
    (a) => a.ativo && a.imagem && a.linkExterno && (a.posicao || 'hero') === variant
  )

  const showFallback = items.length === 0
  const slides = showFallback ? [FALLBACK[variant]] : items

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [slides.length, index])

  useEffect(() => {
    if (slides.length < 2 || paused) return undefined
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL
    )
    return () => clearTimeout(timer)
  }, [index, slides.length, paused])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  const className = variant === 'rail' ? 'ad-carousel ad-carousel--rail' : 'ad-carousel'

  return (
    <section className={className} data-od-id="anunciantes">
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
            {slides.map((a, i) => (
              <div className="ad-carousel__slide" key={a.id || i} aria-hidden={i !== index}>
                <a
                  className="ad-carousel__link"
                  href={a.linkExterno}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  aria-label={showFallback ? a.nome : `${a.nome} — abrir site do anunciante`}
                  data-od-id={a.id ? `anunciante-${a.id}` : 'anunciante-fallback'}
                >
                  <img src={a.imagem} alt={a.nome} loading={i === index ? 'eager' : 'lazy'} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <span className="ad-carousel__label" aria-hidden="true">Patrocinadores &amp; apoiadores</span>

        {slides.length > 1 && (
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
                {slides.map((a, i) => (
                  <button
                    key={a.id || i}
                    type="button"
                    className={i === index ? 'is-active' : ''}
                    onClick={() => setIndex(i)}
                    aria-label={`Ir para o anunciante ${i + 1} de ${slides.length}`}
                    aria-current={i === index ? 'true' : undefined}
                  />
                ))}
              </div>
              <span className="ad-carousel__count">{index + 1} / {slides.length}</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
