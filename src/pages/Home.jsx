import { Link } from 'react-router-dom'
import SectionHead from '../components/SectionHead'
import CTABand from '../components/CTABand'
import EventCard from '../components/EventCard'
import {
  IconWhatsApp, IconGraduation, IconCalendar, IconMic, IconBook, IconDocument,
  IconNews, IconArrowRight, IconPlay, IconPodcastMic
} from '../components/Icons'
import { SITE_NAME, SITE_TAGLINE, SOCIAL, WA_CHAT } from '../config/site'
import { useData } from '../context/DataContext'
import { fmtData, truncate } from './admin/format'

/*
  Home.jsx — página inicial da landing BLOKKO.

  MANUTENÇÃO:
  - Conteúdo estático (quickAccess, features, podcastEpisodes): editar os arrays abaixo.
  - Notícias: derivadas automaticamente dos colunistas cadastrados no CMS
    (as 3 mais recentes) — não editar como conteúdo fixo.
  - Marca e links de WhatsApp vêm de src/config/site.js.
*/

const quickAccess = [
  {
    to: '/cursos-eventos#cursos',
    icon: IconGraduation,
    title: 'Cursos abertos',
    text: 'Formação para síndicos, gestão financeira e direito condominial com turmas com inscrições por formulário.',
    go: 'Conferir turmas'
  },
  {
    to: '/cursos-eventos#eventos',
    icon: IconCalendar,
    title: 'Próximo evento',
    text: 'Lançamento da Cartilha e do Projeto Meu Condomínio na COP-30 — inscrições gratuitas via Sympla.',
    go: 'Ver agenda'
  },
  {
    to: SOCIAL.youtube,
    external: true,
    icon: IconMic,
    title: 'Nosso podcast',
    text: 'Conversas semanais com dicas práticas, orientações e insights exclusivos para síndicos e administradores.',
    go: 'Ouvir agora'
  }
]

const features = [
  { icon: IconMic, title: 'Informação de qualidade', text: 'Podcast semanal com dicas práticas, orientações e insights exclusivos para síndicos e administradores.' },
  { icon: IconGraduation, title: 'Capacitação profissional', text: 'Cursos, palestras e workshops que preparam você para os desafios da gestão condominial.' },
  { icon: IconCalendar, title: 'Eventos imperdíveis', text: 'Congressos e encontros que conectam síndicos e especialistas, promovendo networking e troca de experiências.' },
  { icon: IconBook, title: 'Literatura essencial', text: 'Indicações de livros e publicações que aprofundam o conhecimento em gestão e administração condominial.' },
  { icon: IconDocument, title: 'Artigos relevantes', text: 'Conteúdo atualizado com análises detalhadas sobre tendências e desafios do setor condominial.' },
  { icon: IconNews, title: 'Notícias atualizadas', text: 'Fique por dentro das novidades, regulamentações e mudanças que impactam o universo condominial.' }
]

const newsCovers = ['article__cover--condo', 'article__cover--blog']

const podcastEpisodes = [
  { title: 'Episódio 13 — O Sindicato que traz benefícios aos condomínios do Brasil', meta: '1ª temporada · 28 min' },
  { title: '2ª Temporada · Ep 04 — Um convite aos gestores condominiais', meta: '2ª temporada · 32 min' }
]

export default function Home() {
  const { colunistas } = useData()

  const news = [...colunistas]
    .sort((a, b) => String(b.dataPublicacao).localeCompare(String(a.dataPublicacao)))
    .slice(0, 3)
    .map((c, i) => ({
      letter: String(c.titulo || '').trim().charAt(0).toUpperCase() || '·',
      tag: c.tag,
      coverClass: newsCovers[i % newsCovers.length],
      date: fmtData(c.dataPublicacao),
      title: c.titulo,
      text: `${truncate(c.conteudo, 110)} — ${SITE_NAME}.`,
      href: c.linkMateria || '#'
    }))

  return (
    <>
      <section className="hero" data-od-id="hero">
        <div className="container hero__in">
          <span className="eyebrow eyebrow--sky eyebrow--rule">{SITE_TAGLINE}</span>
          <h1>Transformando a gestão condominial no Brasil</h1>
          <p className="hero__lead">Informação, capacitação e suporte para síndicos, administradoras e gestores de condomínios. Cursos, eventos e indicações de confiança — tudo em um só lugar.</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/cursos-eventos">Explorar cursos e eventos</Link>
            <a className="btn btn--outline-light" href={WA_CHAT} target="_blank" rel="noopener">
              <IconWhatsApp size={15} />
              Fale no WhatsApp
            </a>
          </div>
          <div className="hero__rule" aria-hidden="true"></div>
          <div className="hero__kicker" aria-label="Atuação">
            <span>Podcast</span><span>Capacitação</span><span>Congressos</span><span>Colunistas</span><span>Indicações</span>
          </div>
        </div>
      </section>

      <div className="container quick">
        <div className="quick__row" data-reveal>
          {quickAccess.map((q) => {
            const QIcon = q.icon
            const inner = (
              <>
                <span className="qcard__icon"><QIcon size={20} /></span>
                <h3>{q.title}</h3>
                <p>{q.text}</p>
                <span className="qcard__go">{q.go} <IconArrowRight size={13} /></span>
              </>
            )
            if (q.external) {
              return (
                <a key={q.title} className="qcard" href={q.to} target="_blank" rel="noopener" data-od-id={`quick-${q.title.toLowerCase()}`}>
                  {inner}
                </a>
              )
            }
            return (
              <Link key={q.title} className="qcard" to={q.to} data-od-id={`quick-${q.title.toLowerCase()}`}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      <section className="section section--surface" data-od-id="evento-destaque">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Próximo congresso</span>
            <h2>São Paulo recebe o CONASI CONFIANÇA 2026</h2>
            <p>Congresso Nacional de Administradoras e Síndicos — um dos principais eventos voltados à gestão condominial no Brasil.</p>
          </div>
          <EventCard
            meta={['Congresso Nacional', 'Organização parceira']}
            title="CONASI CONFIANÇA — Congresso Nacional de Administradoras e Síndicos"
            description="No dia 28 de março de 2026, São Paulo recebe o evento que reúne especialistas, palestras estratégicas e networking para administradores, síndicos e profissionais do setor que buscam atualização, inovação e crescimento profissional."
            details={[
              { icon: 'date', label: 'Data', value: '28 de março de 2026' },
              { icon: 'time', label: 'Horário', value: 'das 9h às 18h' },
              { icon: 'local', label: 'Local', value: 'Hotel Central Plaza — São Paulo/SP' }
            ]}
            chip={{ day: '28', month: 'Mar · 2026' }}
            chipExtra="9h às 18h"
            ctaLabel="Inscrições abertas"
            ctaHref="https://www.sympla.com.br/evento/conasi-confianca-belem-2026-congresso-nacional-de-administradoras-e-sindicos-pelo-brasil/3178610"
            ctaNote="Via Sympla · Vagas limitadas"
          />
        </div>
      </section>

      <section className="section" data-od-id="oferta">
        <div className="container">
          <SectionHead eyebrow="O que oferecemos" title="Capacitação completa para a gestão" center eyebrowClass="--rule">
            Todo o suporte que síndicos e administradoras precisam para enfrentar os desafios do setor condominial.
          </SectionHead>
          <div className="feature-grid">
            {features.map((f) => {
              const FIcon = f.icon
              return (
                <div className="feature" data-reveal key={f.title}>
                  <span className="feature__icon"><FIcon size={21} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--surface" data-od-id="noticias">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Notícias</span>
            <h2>Conteúdo exclusivo para síndicos</h2>
            <p>O melhor portal de conteúdo para síndicos e gestores de condomínio — análises, novidades e boas práticas.</p>
          </div>
          <div className="news-grid">
            {news.map((n) => (
              <article className="article" data-reveal key={n.title}>
                <a className={`article__cover ${n.coverClass}`} href={n.href} aria-hidden="true" tabIndex="-1">
                  <span className="mono">{n.letter}</span><span className="tag">{n.tag}</span>
                </a>
                <div className="article__body">
                  <span className="article__date">{n.date}</span>
                  <h3><a href={n.href}>{n.title}</a></h3>
                  <p>{n.text}</p>
                  <a className="article__more" href={n.href}>Ler mais <IconArrowRight size={13} /></a>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(28px,4vw,40px)' }} data-reveal>
            <Link className="btn btn--ghost" to="/colunistas">Acessar todos os colunistas</Link>
          </div>
        </div>
      </section>

      <section className="section" data-od-id="podcast">
        <div className="container podcast">
          <div data-reveal>
            <span className="eyebrow">Nosso podcast</span>
            <h2 className="sec-head" style={{ marginBottom: 16 }}>Conversas inspiradoras para a gestão do seu condomínio</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '56ch' }}>Conheça o canal do {SITE_NAME} no YouTube: o ponto de encontro para síndicos e gestores em busca de insights, soluções e dicas práticas.</p>
            <div className="podcast__list">
              {podcastEpisodes.map((ep) => (
                <a className="podcast-ep" href={SOCIAL.youtube} target="_blank" rel="noopener" key={ep.title}>
                  <span className="podcast-ep__play"><IconPlay size={16} /></span>
                  <span><b>{ep.title}</b><span>{ep.meta}</span></span>
                </a>
              ))}
            </div>
            <a className="btn btn--ghost" style={{ marginTop: 22 }} href={SOCIAL.youtube} target="_blank" rel="noopener">Conhecer o canal</a>
          </div>
          <div className="podcast__art" data-reveal aria-hidden="true">
            <span className="mic">
              <IconPodcastMic size={20} />
            </span>
            <small>Gravado em São Paulo · SP</small>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Cursos e palestras"
        title="Transforme seu conhecimento em poder de ação"
        description="Cursos, palestras e workshops com especialistas renomados, projetados para expandir suas habilidades e prepará-lo para os desafios do futuro."
      >
        <Link className="btn btn--light" to="/cursos-eventos#cursos">Acessar os cursos</Link>
        <Link className="btn btn--outline-light" to="/cursos-eventos#eventos">Próximos eventos</Link>
      </CTABand>
    </>
  )
}