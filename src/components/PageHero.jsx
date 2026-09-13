import { Link } from 'react-router-dom'
import { IconChevronRight } from './Icons'

/*
  PageHero.jsx — cabeçalho de páginas internas (trilha + título + descrição).

  MANUTENÇÃO:
  - Props: breadcrumb (último item da trilha), eyebrow, title, description.
  - Usado pelas páginas: Colunistas, CursosEventos, NosIndicamos.
  - Estilo: classes `.page-hero` em src/styles/styles.css.
*/

export default function PageHero({ breadcrumb, eyebrow, title, description }) {
  return (
    <section className="page-hero" data-od-id="page-hero">
      <div className="container page-hero__in">
        <nav className="breadcrumb" aria-label="Trilha">
          <Link to="/">Início</Link>
          <IconChevronRight size={12} />
          <span aria-current="page">{breadcrumb}</span>
        </nav>
        <span className="eyebrow eyebrow--sky">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}