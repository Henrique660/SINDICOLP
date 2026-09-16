import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import SectionHead from '../components/SectionHead'
import AdsLayout from '../components/AdsLayout'
import { IconArrowRight } from '../components/Icons'
import { WA_COLUNISTA } from '../config/site'
import { useData } from '../context/DataContext'
import { truncate } from './admin/format'

/*
  Colunistas.jsx — página de artigos e análises.

  MANUTENÇÃO:
  - Os artigos vêm do CMS (src/context/DataContext -> store.js), ordenados pela
    data de publicação. Conteúdo é editável em /admin/colunistas.
  - `toPostProps` converte o modelo do banco (tag, conteudo, linkMateria)
    para o card exibido; se o modelo mudar, ajuste apenas essa função.
  - Copy dos textos da página: editados diretamente abaixo.
*/

const MESES_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function toPostProps(c) {
  const d = c.dataPublicacao ? new Date(c.dataPublicacao + 'T12:00:00') : null
  const day = d && !isNaN(d.getTime()) ? String(d.getDate()).padStart(2, '0') : '—'
  const month =
    d && !isNaN(d.getTime())
      ? `${MESES_SHORT[d.getMonth()]} ${d.getFullYear()}`
      : ''
  return {
    day,
    month,
    cat: c.tag,
    title: c.titulo,
    text: truncate(c.conteudo, 150) || 'Clique para ler a matéria completa.',
    href: c.linkMateria || '#'
  }
}

export default function Colunistas() {
  const { colunistas } = useData()
  const posts = [...colunistas]
    .sort((a, b) => String(b.dataPublicacao).localeCompare(String(a.dataPublicacao)))
    .map(toPostProps)

  return (
    <>
      <PageHero
        breadcrumb="Colunistas"
        eyebrow="Análise e opinião"
        title="Colunistas"
        description="Artigos e análises de especialistas que acompanham o mercado condominial — da rotina da assembleia às novas exigências de gestão e sustentabilidade."
      />

      <section className="section" data-od-id="feed-colunistas">
        <AdsLayout>
          <SectionHead eyebrow="Conteúdo do portal" title="Leia os artigos mais recentes">
            Uma curadoria de temas práticos para quem administra condomínios, publicada em parceria com os órgãos de classe.
          </SectionHead>

          <div className="feed" style={{ maxWidth: 880 }}>
            {posts.map((p) => (
              <a className="post-row" href={p.href} target="_blank" rel="noopener" data-reveal key={p.title}>
                <div className="post-row__date"><b>{p.day}</b><span>{p.month}</span></div>
                <div className="post-row__body">
                  <span className="cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
                <span className="post-row__arrow"><IconArrowRight size={22} /></span>
              </a>
            ))}
          </div>
        </AdsLayout>
      </section>

      <CTABand
        eyebrow="Espaço aberto para especialistas"
        title="Publique no nosso portal"
        description="Advogados, administradores, consultores e profissionais com assunto relevante para o mercado condominial: apresente sua coluna à nossa editoria."
      >
        <a className="btn btn--light" href={WA_COLUNISTA} target="_blank" rel="noopener">
          Quero ser colunista
        </a>
      </CTABand>
    </>
  )
}