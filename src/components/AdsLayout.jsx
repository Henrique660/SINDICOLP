import AdCarousel from './AdCarousel'

/*
  AdsLayout.jsx — grade de anúncios rail reutilizável.

  MANUTENÇÃO:
  - Envolve o conteúdo com o grid `.mp__layout`, exibindo um retângulo
    vertical de publicidade em cada lateral (variant="rail"). O mesmo
    layout usado na vitrine da Home — em telas menores os rails caem para
    blocos full-width acima/abaixo do conteúdo (media queries em styles.css).
  - Usado em: Home, CursosEventos, Colunistas.
  - Banners hero ficam fora deste componente (a Home renderiza o
    AdCarousel hero separadamente).
*/

export default function AdsLayout({ children }) {
  return (
    <div className="container container--wide">
      <div className="mp__layout">
        <aside className="mp__rail mp__rail--left" aria-label="Publicidade">
          <AdCarousel variant="rail" />
        </aside>

        <div className="ads-layout__main">{children}</div>

        <aside className="mp__rail mp__rail--right" aria-label="Publicidade">
          <AdCarousel variant="rail" />
        </aside>
      </div>
    </div>
  )
}