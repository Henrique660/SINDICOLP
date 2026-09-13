/*
  CTABand.jsx — faixa de chamada para ação (fundo escuro/índigo).

  MANUTENÇÃO:
  - Props: eyebrow, title, description e children (botões/links de ação).
  - Os botões são passados como children pelas páginas que o utilizam.
  - Estilo: classe `.cta-band` em src/styles/styles.css.
*/

export default function CTABand({ eyebrow, title, description, children }) {
  return (
    <section className="cta-band" data-od-id="cta-band">
      <div className="container cta-band__in" data-reveal>
        <span className="eyebrow eyebrow--sky eyebrow--rule">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cta-band__actions">{children}</div>
      </div>
    </section>
  )
}