import AdCarousel from './AdCarousel'

/*
  AdsLayout.jsx — grade de anúncios rail reutilizável.

  MANUTENÇÃO:
  - Envolve o conteúdo com o grid `.mp__layout`, exibindo um retângulo
    vertical de publicidade em cada lateral (variant="rail"). O mesmo
    layout usado na vitrine da Home — em telas menores os dois banners
    empilham numa única coluna lateral (`.mp__rails`), fixa e sticky,
    enquanto o conteúdo rola ao lado (media queries em styles.css).
  - No desktop os rails ficam um de cada lado via `display: contents`
    no wrapper `.mp__rails` + grid-areas (left/main/right).
  - Usado em: Home, CursosEventos, Colunistas.
  - Banners hero ficam fora deste componente (a Home renderiza o
    AdCarousel hero separadamente).
*/

export default function AdsLayout({ children }) {
  return (
    <div className="container container--wide">
      <div className="mp__layout">
        <div className="mp__rails">
          <aside className="mp__rail mp__rail--left" aria-label="Publicidade">
            <AdCarousel variant="rail" />
          </aside>
          <aside className="mp__rail mp__rail--right" aria-label="Publicidade">
            <AdCarousel variant="rail" />
          </aside>
        </div>

        <div className="ads-layout__main">{children}</div>
      </div>
    </div>
  )
}