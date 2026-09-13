/*
  admin.js — configuração do painel administrativo.

  MANUTENÇÃO:
  - ADMIN_EMAIL/ADMIN_PASS: credenciais de demonstração (fase mock de auth).
    Remover assim que o backend com JWT + PostgreSQL estiver ativo.
  - Opções dos formulários: COLUNISTA_TAGS, INDICACAO_CATEGORIAS,
    CURSO_ICONS e INDICACAO_ICONS. Novos ícones exigem registro também em
    src/config/iconMap.js.
*/

export const ADMIN_EMAIL = 'admin@blookko.com.br'
export const ADMIN_PASS = 'blookko2026'
export const SESSION_KEY = 'blookko:session'

export const COLUNISTA_TAGS = [
  'Gestão',
  'Jurídico',
  'Segurança',
  'Tecnologia',
  'Carreira',
  'Sustentabilidade',
  'Proteção'
]

export const INDICACAO_CATEGORIAS = [
  'Administração e contabilidade',
  'Segurança patrimonial',
  'Reformas e manutenção',
  'Jurídico condominial',
  'Soluções digitais',
  'Seguros e proteção',
  'Limpeza e conservação',
  'Eficiência e sustentabilidade'
]

export const CURSO_ICONS = [
  { value: 'graduation', label: 'Formação' },
  { value: 'money', label: 'Financeiro' },
  { value: 'law', label: 'Jurídico' },
  { value: 'calendar', label: 'Calendário' },
  { value: 'book', label: 'Livro' },
  { value: 'mic', label: 'Podcast' }
]

export const INDICACAO_ICONS = [
  { value: 'building', label: 'Prédio' },
  { value: 'shield', label: 'Escudo' },
  { value: 'wrench', label: 'Ferramenta' },
  { value: 'law', label: 'Jurídico' },
  { value: 'monitor', label: 'Tecnologia' },
  { value: 'umbrella', label: 'Guarda-chuva' }
]