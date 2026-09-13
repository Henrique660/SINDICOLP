/*
  Icons.jsx — biblioteca de SVGs do projeto BLOKKO.

  MANUTENÇÃO:
  - Todos os ícones herdam `currentColor` (cor do contexto onde são usados).
  - Para adicionar um novo ícone: copie a estrutura de um existente, ajuste o
    path/viewBox e exporte como `export function IconNome({ size, className })`.
  - `size` é o único prop padrão relevante (largura/altura em px).
  - Módulos que mapeiam nomes de string -> componente: src/config/iconMap.js
    (usados pelas áreas gerenciáveis do CMS).
*/
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

export function IconWhatsApp({ size = 16, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function IconMail({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}

export function IconTelegram({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export function IconYouTube({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export function IconInstagram({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function IconMenu({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" width={size} height={size} aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

export function IconGraduation({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

export function IconCalendar({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export function IconClock({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function IconPin({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function IconArrowRight({ size = 13 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function IconChevronRight({ size = 12 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function IconMic({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v4" />
    </svg>
  )
}

export function IconPodcastMic({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.4" width={size} height={size} aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  )
}

export function IconPlay({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function IconBook({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

export function IconDocument({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  )
}

export function IconNews({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" />
    </svg>
  )
}

export function IconMoney({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9a3 3 0 1 0-3 3 3 3 0 1 1-3 3" />
      <path d="M12 4v3M12 17v3" />
    </svg>
  )
}

export function IconLaw({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="m7 7-3 4h16l-3-4" />
      <path d="M8 21h8" />
    </svg>
  )
}

export function IconCheck({ size = 13 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function IconShield({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconWrench({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

export function IconMonitor({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

export function IconUmbrella({ size = 21 }) {
  return (
    <svg viewBox="0 0 24 24" stroke="none" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 22a7 7 0 0 0 7-7v-2a7 7 0 0 0-14 0v2a7 7 0 0 0 7 7Z" />
    </svg>
  )
}

export function IconLayers({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="m12 2-10 5 10 5 10-5-10-5Z" />
      <path d="m2 12 10 5 10-5" />
      <path d="m2 17 10 5 10-5" />
    </svg>
  )
}

export function IconBuilding({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export function IconFile({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

export function IconSend({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} width={size} height={size} aria-hidden="true">
      <path d="m18 9-6-6-6 6" />
      <path d="M12 3v13" />
      <path d="m5 17 2 3h10l2-3" />
    </svg>
  )
}