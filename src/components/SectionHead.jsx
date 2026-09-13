/*
  SectionHead.jsx — cabeçalho padronizado de seções (eyebrow + título + texto).

  MANUTENÇÃO:
  - Props: eyebrow, title, children (parágrafo opcional), center, eyebrowClass.
  - `center` adiciona a classe .sec-head--center; eyebrowClass permite variantes
    como "--rule". Estilo em src/styles/styles.css.
*/

export default function SectionHead({ eyebrow, title, children, center = false, eyebrowClass = '' }) {
  return (
    <div className={`sec-head${center ? ' sec-head--center' : ''}`} data-reveal>
      <span className={`eyebrow${eyebrowClass ? ` ${eyebrowClass}` : ''}`}>{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}