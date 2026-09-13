import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import SectionHead from '../components/SectionHead'
import EventCard from '../components/EventCard'
import { IconGraduation, IconWhatsApp } from '../components/Icons'
import { SITE_NAME, WA_TURMAS, WA_EVENTOS, WA_TREINAMENTO } from '../config/site'
import { useData } from '../context/DataContext'
import { CURSO_ICON_MAP } from '../config/iconMap'
import { fmtDataHora, isPast } from './admin/format'

/*
  CursosEventos.jsx — página de catálogo de cursos e agenda de eventos.

  MANUTENÇÃO:
  - Dados vêm do CMS (useData -> cursosEventos), editáveis em /admin/cursos-eventos.
  - `toEventCardProps` converte o modelo do banco para o formato do EventCard;
    alterações no modelo do CMS devem ser refletidas apenas aqui.
  - Eventos com `recorrente: true` continuam exibidos após a data passada
    (regra de negócio: próxima execução).
  - Abas (cursos/eventos) sincronizam com o hash da URL (#cursos / #eventos).
*/

const MESES_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function chipFrom(iso) {
  if (!iso) return { day: '–', month: '' }
  const d = new Date(iso)
  if (isNaN(d.getTime())) return { day: '–', month: '' }
  return { day: String(d.getDate()), month: `${MESES_SHORT[d.getMonth()]} · ${d.getFullYear()}` }
}

function toEventCardProps(e) {
  const chip = chipFrom(e.data)
  const dateOk = e.data && !isNaN(new Date(e.data).getTime())
  return {
    meta: e.badge ? [e.badge] : ['Evento'],
    title: e.titulo,
    description: e.descricao,
    details: [
      { icon: 'date', label: 'Data', value: fmtDataHora(e.data) || 'A definir' },
      { icon: 'local', label: 'Local', value: e.local || 'Evento online' }
    ],
    chip,
    chipExtra: dateOk ? String(new Date(e.data).getHours()).padStart(2, '0') + 'h' : '',
    ctaLabel: 'Inscrições abertas',
    ctaHref: e.linkInscricao || '#',
    ctaNote: e.recorrente && isPast(e.data) ? 'Recorrente — próxima execução em breve' : 'Próxima execução'
  }
}

export default function CursosEventos() {
  const location = useLocation()
  const [tab, setTab] = useState('cursos')
  const { cursosEventos } = useData()

  const courses = cursosEventos.filter((c) => c.tipo === 'curso')
  const events = cursosEventos.filter((c) => c.tipo === 'evento')

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash === 'cursos' || hash === 'eventos') {
      setTab(hash)
    }
  }, [location.hash])

  return (
    <>
      <PageHero
        breadcrumb="Curso e Eventos"
        eyebrow="Capacitação e networking"
        title="Curso e Eventos"
        description="Formação contínua e agenda de encontros que conectam síndicos, administradoras e especialistas do mercado condominial no Brasil."
      />

      <section className="section" data-od-id="catalogo">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Cursos e eventos">
            <button
              className="tab"
              role="tab"
              aria-selected={tab === 'cursos'}
              onClick={() => setTab('cursos')}
            >
              Cursos
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={tab === 'eventos'}
              onClick={() => setTab('eventos')}
            >
              Eventos
            </button>
          </div>

          {tab === 'cursos' && (
            <div role="tabpanel" data-tab-panel="cursos" aria-label="Cursos">
              <SectionHead eyebrow="Cursos abertos" title="Turmas com inscrições abertas">
                Aulas ao vivo com especialistas do setor. Ao inscrever-se, o time do {SITE_NAME} entra em contato com os detalhes de pagamento e acesso.
              </SectionHead>

              <div className="course-grid">
                {courses.map((c) => {
                  const CIcon = CURSO_ICON_MAP[c.icon] || IconGraduation
                  const meta = [c.cargaHoraria, c.local, 'Certificado'].filter(Boolean)
                  return (
                    <div className="course" data-reveal key={c.id}>
                      {c.badge && <span className="course__badge">{c.badge}</span>}
                      <span className="course__icon"><CIcon size={22} /></span>
                      <h3>{c.titulo}</h3>
                      <p>{c.descricao}</p>
                      <div className="course__meta">
                        {meta.map((m, i) => <span key={i}>{m}</span>)}
                      </div>
                      <a className="btn btn--ghost" href={c.linkInscricao || '#'} target="_blank" rel="noopener">Quero me inscrever</a>
                    </div>
                  )
                })}
              </div>

              <div style={{ marginTop: 'clamp(28px,4vw,44px)' }} data-reveal>
                <a className="btn btn--primary" href={WA_TURMAS} target="_blank" rel="noopener">
                  <IconWhatsApp size={15} />
                  Fale com a equipe sobre as turmas
                </a>
              </div>
              <p className="note" style={{ marginTop: 18, fontSize: 12.5, color: 'var(--muted)' }}>
                Inscrições via formulário oficial do {SITE_NAME}. Em caso de dúvida, o WhatsApp está sempre disponível.
              </p>
            </div>
          )}

          {tab === 'eventos' && (
            <div role="tabpanel" data-tab-panel="eventos" aria-label="Eventos">
              <SectionHead eyebrow="Agenda de eventos" title="Encontros que movimentam o setor">
                Congressos, lançamentos e encontros presenciais em São Paulo — programe-se para viver o melhor do networking condominial.
              </SectionHead>

              {events.map((e) => (
                <EventCard key={e.id} {...toEventCardProps(e)} />
              ))}

              <div style={{ marginTop: 'clamp(28px,4vw,44px)' }} data-reveal>
                <a className="btn btn--primary" href={WA_EVENTOS} target="_blank" rel="noopener">
                  <IconWhatsApp size={15} />
                  Tirar dúvidas sobre a agenda
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Turmas fechadas pela sua administradora?"
        title="Monte um treinamento sob medida para a sua equipe"
        description="Levamos cursos e palestras ao condomínio ou à administradora, com conteúdo adequado à realidade de cada equipe."
      >
        <a className="btn btn--light" href={WA_TREINAMENTO} target="_blank" rel="noopener">Solicitar proposta</a>
      </CTABand>
    </>
  )
}