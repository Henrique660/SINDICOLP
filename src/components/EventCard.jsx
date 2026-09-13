import { IconCalendar, IconClock, IconPin, IconFile, IconSend } from './Icons'

/*
  EventCard.jsx — card de evento (data em destaque + detalhes + CTA).

  MANUTENÇÃO:
  - Props: meta[], title, description, details[] ({icon,label,value}),
    chip {day,month}, chipExtra, ctaLabel, ctaHref, ctaVariant, ctaNote, style.
  - `detailIcons` abaixo mapeia o nome do ícone usado em details.
  - No CMS, os eventos são convertidos para este formato em
    src/pages/CursosEventos.jsx (função toEventCardProps).
*/

const detailIcons = { date: IconCalendar, local: IconPin, time: IconClock, file: IconFile, send: IconSend }

export default function EventCard({
  meta = [],
  title,
  description,
  details = [],
  chip,
  chipExtra,
  ctaLabel,
  ctaHref,
  ctaVariant = 'btn--primary',
  ctaNote,
  style
}) {
  return (
    <div className="event-card" data-reveal style={style}>
      <div>
        <div className="event-card__meta">
          {meta.map((m, i) => (
            <span key={i}>
              {i > 0 && <span aria-hidden="true">·</span>}
              {m}
            </span>
          ))}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
          {details.map((d, i) => {
            const Icon = detailIcons[d.icon]
            return (
              <li key={i}>
                {Icon && <Icon size={15} />}
                <span>
                  <strong>{d.label}:</strong> {d.value}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="event-card__side">
        <div className="date-chip">
          <b>{chip.day}</b>
          <span>{chip.month}</span>
          {chipExtra && (
            <span style={{ display: 'block', marginTop: 6, color: '#fff', fontSize: 11, letterSpacing: '0.08em', opacity: 0.8 }}>
              {chipExtra}
            </span>
          )}
        </div>
        <a className={`btn ${ctaVariant}`} href={ctaHref} target="_blank" rel="noopener">
          {ctaLabel}
        </a>
        {ctaNote && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{ctaNote}</span>}
      </div>
    </div>
  )
}