import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { PageHead } from './ui'

/*
  Dashboard.jsx — resumo (home do painel) com contagens por módulo.

  MANUTENÇÃO:
  - Cards: edite o array `cards` (to, label, value, sub, desc).
  - "Restaurar padrão" recria o seed inicial (apaga edições locais) usando
    DataContext.reset -> src/services/store.js.
*/

export default function Dashboard() {
  const { cursosEventos, colunistas, indicacoes, anunciantes, reset } = useData()

  const cards = [
    {
      to: '/admin/cursos-eventos',
      label: 'Cursos e Eventos',
      value: cursosEventos.length,
      sub: 'Itens publicados',
      desc: 'Gerencie cursos, carga horária, local e links de inscrição.'
    },
    {
      to: '/admin/colunistas',
      label: 'Colunistas',
      value: colunistas.length,
      sub: 'Artigos publicados',
      desc: 'Publique artigos e notícias com conteúdo formatado em Markdown.'
    },
    {
      to: '/admin/indicamos',
      label: 'Nós Indicamos',
      value: indicacoes.length,
      sub: 'Parceiros na rede',
      desc: 'Cadastre fornecedores, logotipos, categorias e links externos.'
    },
    {
      to: '/admin/anunciantes',
      label: 'Anunciantes',
      value: anunciantes.length,
      sub: 'Banners no carrossel',
      desc: 'Gerencie as imagens dos anunciantes e os links ancorados no banner.'
    }
  ]

  return (
    <>
      <PageHead
        title="Resumo"
        subtitle="Visão geral do conteúdo publicado na landing page BLOOKKO."
        actions={
          <button
            className="af-btn af-btn--ghost"
            type="button"
            onClick={() => {
              if (window.confirm('Restaurar o conteúdo padrão? Todas as alterações serão descartadas.')) {
                reset()
              }
            }}
          >
            Restaurar padrão
          </button>
        }
      />

      <div className="admin-cards">
        {cards.map((c) => (
          <Link className="admin-card" to={c.to} key={c.to}>
            <div className="admin-card__top">
              <span className="admin-card__value">{c.value}</span>
              <span className="admin-card__sub">{c.sub}</span>
            </div>
            <h2>{c.label}</h2>
            <p>{c.desc}</p>
            <span className="admin-card__go">Gerenciar →</span>
          </Link>
        ))}
      </div>

      <div className="admin-tip">
        <strong>Como o painel funciona nesta fase</strong>
        <p>
          Estes dados são persistidos no seu navegador (localStorage) apenas para a demonstração do
          CMS. Na próxima fase, o mesmo repositório será trocado por uma API Node.js + PostgreSQL,
          sem alterar as telas.
        </p>
      </div>
    </>
  )
}