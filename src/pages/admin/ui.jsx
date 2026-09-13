/*
  ui.jsx — primitivas de UI reutilizáveis do painel admin.

  MANUTENÇÃO:
  - Componentes visuais: Field, Input, Select, Toggle, Badge, StatusDot,
    Modal, PageHead, EmptyState. Estilo em src/styles/admin.css (prefixo .af-).
  - Ao criar novos formulários no CMS, reutilize estes componentes em vez de
    duplicar classes CSS.
*/

export function Field({ label, required, hint, children }) {
  return (
    <label className="af-field">
      <span className="af-label">
        {label}
        {required && <em>*</em>}
      </span>
      {children}
      {hint && <small className="af-hint">{hint}</small>}
    </label>
  )
}

export function Input(props) {
  return <input className="af-input" {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className="af-input" {...props}>
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="af-toggle">
      <input type="checkbox" checked={Boolean(checked)} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

export function Badge({ children, tone }) {
  return (
    <span className="af-badge" data-tone={tone}>
      {children}
    </span>
  )
}

export function StatusDot({ active }) {
  return <span className={`af-status${active ? ' is-on' : ''}`}>{active ? 'Ativo' : 'Inativo'}</span>
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="admin-modal__backdrop" onClick={onClose} />
      <div className="admin-modal__panel">
        <header className="admin-modal__head">
          <h2>{title}</h2>
          <button type="button" className="admin-modal__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>
        <div className="admin-modal__body">{children}</div>
      </div>
    </div>
  )
}

export function PageHead({ title, subtitle, actions }) {
  return (
    <div className="admin-page-head">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="admin-page-head__actions">{actions}</div>}
    </div>
  )
}

export function EmptyState({ text }) {
  return <div className="admin-empty">{text}</div>
}