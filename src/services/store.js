/*
  store.js — repositório de dados (fase atual: localStorage).

  MANUTENÇÃO:
  - seed(): conteúdo inicial migrado da landing; é carregada apenas no primeiro
    acesso (chave `blokko:db`). Altere aqui para reconfigurar o conteúdo padrão.
  - loadDB/saveDB: persistência local. Para a fase backend, esta camada deve
    passar a consumir a API Node/Postgres mantendo o mesmo formato de dados.
  - ids: gerados por uid() (crypto.randomUUID com fallback).
*/

const DB_KEY = 'blokko:db'

export { DB_KEY }

const ENROLL_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSeJC66aQfhtkbUNWMCPExu7qva-YYwr2lbbKmi1lxrdGCHvYQ/viewform'

const SYMPLA_CONASI =
  'https://www.sympla.com.br/evento/conasi-confianca-belem-2026-congresso-nacional-de-administradoras-e-sindicos-pelo-brasil/3178610'

const SYMPLA_COP30 =
  'https://www.sympla.com.br/evento/lanCamento---cartilha-e-projeto-meu-condomInio-na-cop30/2796536'

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)
}

const seed = () => ({
  cursosEventos: [
    {
      id: 'seed-curso-1',
      tipo: 'curso',
      titulo: 'Formação de Síndicos Profissionais',
      descricao:
        'Visão completa da função: legislação, assembleias, prestação de contas, liderança e rotina de gestão para quem assume ou profissionaliza a função.',
      icon: 'graduation',
      badge: 'Inscrições abertas',
      cargaHoraria: '20h',
      local: 'Online ao vivo',
      linkInscricao: ENROLL_FORM,
      data: '',
      recorrente: false,
      destaque: true
    },
    {
      id: 'seed-curso-2',
      tipo: 'curso',
      titulo: 'Gestão Financeira e Orçamentária de Condomínios',
      descricao:
        'Orçamento anual, fluxo de caixa, inadimplência, fundo de reserva e práticas para entregar contas transparentes aos condôminos.',
      icon: 'money',
      badge: 'Vagas limitadas',
      cargaHoraria: '16h',
      local: 'Online ao vivo',
      linkInscricao: ENROLL_FORM,
      data: '',
      recorrente: false,
      destaque: true
    },
    {
      id: 'seed-curso-3',
      tipo: 'curso',
      titulo: 'Direito Condominial na Prática',
      descricao:
        'Código Civil, convenção e regimento interno, cobranças, conflitos e responsabilidades do síndico com exemplos de casos reais.',
      icon: 'law',
      badge: 'Novo',
      cargaHoraria: '12h',
      local: 'Online ao vivo',
      linkInscricao: ENROLL_FORM,
      data: '',
      recorrente: false,
      destaque: false
    },
    {
      id: 'seed-evento-1',
      tipo: 'evento',
      titulo: 'CONASI CONFIANÇA — Congresso Nacional de Administradoras e Síndicos',
      descricao:
        'Um dos principais eventos voltados à gestão condominial no Brasil, reunindo especialistas, palestras estratégicas e networking para administradores, síndicos e profissionais do setor.',
      icon: 'calendar',
      badge: 'Congresso Nacional',
      cargaHoraria: '',
      local: 'Hotel Central Plaza — São Paulo/SP',
      linkInscricao: SYMPLA_CONASI,
      data: '2026-03-28T09:00',
      recorrente: true,
      destaque: true
    },
    {
      id: 'seed-evento-2',
      tipo: 'evento',
      titulo: 'Prepare seu condomínio para a COP-30',
      descricao:
        'Lançamento oficial da Cartilha COP-30 e do Projeto Meu Condomínio na COP-30, com dicas de sustentabilidade, gestão e aproveitamento do potencial de locação por curta temporada.',
      icon: 'calendar',
      badge: 'Lançamento · Gratuito',
      cargaHoraria: '',
      local: 'Centro de Convenções Metrópole — Salão Nobre, São Paulo',
      linkInscricao: SYMPLA_COP30,
      data: '2026-01-29T18:30',
      recorrente: true,
      destaque: false
    }
  ],

  colunistas: [
    {
      id: 'seed-col-1',
      tag: 'Gestão',
      titulo: 'Síndicos com perfil de gestores: a nova gestão condominial',
      conteudo:
        'Por que o condomínio moderno pede mais do que um administrador do dia a dia — exige planejamento, dados e postura de gestor.',
      dataPublicacao: '2026-07-27',
      linkMateria: '#',
      destaque: true
    },
    {
      id: 'seed-col-2',
      tag: 'Jurídico',
      titulo: 'O síndico e a inadimplência: o que pode e o que não pode nos novos tempos',
      conteudo:
        'Limites legais, medidas práticas e o equilíbrio entre cobrar e preservar a convivência no condomínio.',
      dataPublicacao: '2026-07-21',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-3',
      tag: 'Jurídico',
      titulo: 'Síndico e condômino: a diferença entre intimidade social e urbanidade',
      conteudo:
        'Como a convivência em condomínio equilibra direitos individuais, regras comuns e vida em comunidade.',
      dataPublicacao: '2026-07-14',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-4',
      tag: 'Gestão',
      titulo: 'De segurança a sustentabilidade: 8 pontos para avaliar o condomínio',
      conteudo:
        'Um roteiro objetivo para diagnosticar o condomínio antes de assumir a gestão ou definir prioridades.',
      dataPublicacao: '2026-07-07',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-5',
      tag: 'Tecnologia',
      titulo: 'As assembleias condominiais e a tecnologia da informação',
      conteudo:
        'Assembleias híbridas, votação digital e a transparência que a tecnologia traz para a gestão.',
      dataPublicacao: '2026-06-30',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-6',
      tag: 'Segurança',
      titulo: 'Segurança em condomínios: estratégias para uma convivência tranquila',
      conteudo:
        'Controle de acesso, treinamento de equipes e cultura de prevenção sem descuidar do acolhimento.',
      dataPublicacao: '2026-06-23',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-7',
      tag: 'Carreira',
      titulo: 'Síndico profissional no Brasil: o que a lei e a vida cobram',
      conteudo:
        'Formação, registro profissional e as competências que a prática exige de quem quer viver de gestão condominial.',
      dataPublicacao: '2026-06-16',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-8',
      tag: 'Sustentabilidade',
      titulo: 'Coluna do Conasi-PA: dá para fazer da gestão condominial uma gestão verde?',
      conteudo:
        'Eficiência hídrica, energia, resíduos e as oportunidades da COP-30 para os condomínios do Brasil.',
      dataPublicacao: '2026-06-09',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-9',
      tag: 'Gestão',
      titulo: 'Por que sua assembleia precisa de uma boa pauta',
      conteudo:
        'Uma pauta bem construída evita discussões intermináveis e transforma a assembleia em decisão.',
      dataPublicacao: '2026-06-02',
      linkMateria: '#',
      destaque: false
    },
    {
      id: 'seed-col-10',
      tag: 'Proteção',
      titulo: 'Qual a importância do seguro de vida para síndicos e condôminos',
      conteudo:
        'Por que a proteção financeira da família faz parte do planejamento de quem lidera um condomínio.',
      dataPublicacao: '2026-05-27',
      linkMateria: '#',
      destaque: false
    }
  ],

  indicacoes: [
    {
      id: 'seed-ind-1',
      nome: 'Administração e contabilidade',
      logo: '',
      categoria: 'Administração e contabilidade',
      descricao: 'Contabilidade especializada, prestação de contas e administradoras de condomínios.',
      itens: ['Escrituração condominial', 'Relatórios e balancetes', 'Cobrança e inadimplência'],
      icon: 'building',
      linkExterno: '#',
      destaque: true
    },
    {
      id: 'seed-ind-2',
      nome: 'Segurança patrimonial',
      logo: '',
      categoria: 'Segurança patrimonial',
      descricao: 'Empresas de vigilância, controle de acesso e tecnologias para proteger o condomínio.',
      itens: ['Vigilância e portaria', 'CFTV e alarmes', 'Controle de acesso'],
      icon: 'shield',
      linkExterno: '#',
      destaque: false
    },
    {
      id: 'seed-ind-3',
      nome: 'Reformas e manutenção',
      logo: '',
      categoria: 'Reformas e manutenção',
      descricao: 'Manutenção predial, reformas, impermeabilização e adequação de áreas comuns.',
      itens: ['Manutenção preventiva', 'Reformas e impermeabilização', 'Adequação de áreas comuns'],
      icon: 'wrench',
      linkExterno: '#',
      destaque: false
    },
    {
      id: 'seed-ind-4',
      nome: 'Jurídico condominial',
      logo: '',
      categoria: 'Jurídico condominial',
      descricao: 'Advogados especializados em direito condominial, cobranças e contencioso.',
      itens: ['Consultoria e pareceres', 'Cobrança de inadimplentes', 'Contencioso condominial'],
      icon: 'law',
      linkExterno: '#',
      destaque: false
    },
    {
      id: 'seed-ind-5',
      nome: 'Soluções digitais',
      logo: '',
      categoria: 'Soluções digitais',
      descricao: 'Softwares de gestão, portais do condômino, VPN e soluções de comunicação.',
      itens: ['Gestão financeira e de documentos', 'Assembleias online e votação', 'Nulla de obras e reservas'],
      icon: 'monitor',
      linkExterno: '#',
      destaque: false
    },
    {
      id: 'seed-ind-6',
      nome: 'Seguros e proteção',
      logo: '',
      categoria: 'Seguros e proteção',
      descricao: 'Seguros condominiais, de vida e responsabilidade civil, com corretagem especializada.',
      itens: ['Seguro incêndio e RC', 'Seguro de vida para síndicos', 'Assistência condominial'],
      icon: 'umbrella',
      linkExterno: '#',
      destaque: false
    }
  ]
})

export function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.cursosEventos && parsed.colunistas && parsed.indicacoes) return parsed
    }
  } catch (e) {
    /* dados corrompidos — recria seed */
  }
  const db = seed()
  saveDB(db)
  return db
}

export function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  } catch (e) {
    /* storage indisponível — mantém apenas em memória */
  }
}