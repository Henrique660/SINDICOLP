import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import SectionHead from '../components/SectionHead'
import {
  IconBuilding, IconCheck, IconLayers, IconWhatsApp
} from '../components/Icons'
import { SITE_NAME, WA_INDICACAO } from '../config/site'
import { useData } from '../context/DataContext'
import { INDICACAO_ICON_MAP } from '../config/iconMap'
import { waServiceContact } from '../services/waContact'

/*
  NosIndicamos.jsx — página da rede de parceiros e recomendações.

  MANUTENÇÃO:
  - Parceiros vêm do CMS (useData -> indicacoes), editáveis em /admin/indicamos.
  - O ícone exibido é resolvido por INDICACAO_ICON_MAP (src/config/iconMap.js);
    cadastre novos nomes lá quando adicionar opções no CMS.
  - `trustItems` é o bloco estático "Critério da rede" (editar abaixo).
  - Quando um parceiro tem linkExterno válido, o título vira um link externo.
*/

const trustItems = [
  { lead: 'A contratação é sempre independente.', rest: 'Os parceiros listados neste espaço foram selecionados pela equipe do ' + SITE_NAME + ', mas a decisão final é sua — avalie propostas, contratos e referências antes de fechar negócio.' },
  { lead: 'Construída com os órgãos de classe.', rest: 'Nosso relacionamento com entidades como o Conasi-PA e o CRA-PA orienta a curadoria desta página.' }
]

export default function NosIndicamos() {
  const { indicacoes } = useData()

  const recommendations = indicacoes.map((r) => {
    const icon = INDICACAO_ICON_MAP[r.icon] || IconBuilding
    return {
      ...r,
      icon,
      itens: r.itens || []
    }
  })

  return (
    <>
      <PageHero
        breadcrumb="Nós Indicamos"
        eyebrow="Rede de parceiros de confiança"
        title="Nós Indicamos"
        description=""
      />

      <section className="section" data-od-id="categorias">
        <div className="container">
          <SectionHead eyebrow="Categorias da rede" title="O que você precisa, onde indicamos">
            Um ponto de partida confiável para contratar serviços essenciais à gestão condominial.
          </SectionHead>

          <div className="rec-grid">
            {recommendations.map((r) => {
              const RIcon = r.icon
              const hasLink = r.linkExterno && r.linkExterno !== '#'
              return (
                <div className="recommend" data-reveal key={r.id}>
                  <span className="recommend__icon"><RIcon size={21} /></span>
                  {hasLink ? (
                    <h3><a href={r.linkExterno} target="_blank" rel="noopener noreferrer">{r.nome} ↗</a></h3>
                  ) : (
                    <h3>{r.nome}</h3>
                  )}
                  <p>{r.descricao}</p>
                  {r.itens.length > 0 && (
                    <ul>
                      {r.itens.map((item) => (
                        <li key={item}>
                          <IconCheck size={13} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="recommend__actions">
                    <a
                      className="btn btn--primary btn--sm"
                      href={waServiceContact(r)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Contatar ${r.nome} no WhatsApp`}
                    >
                      <IconWhatsApp size={14} />
                      Contatar
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="trust-strip" data-reveal>
            <span className="trust-strip__key">
              <IconLayers size={20} />
              Critério da rede
            </span>
            {trustItems.map((t) => (
              <span key={t.lead}><b>{t.lead}</b> {t.rest}</span>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Participe da rede"
        title="Tem uma indicação de confiança?"
        description="Conhece um profissional ou empresa que merece estar nesta página? Envie sua sugestão e avaliação para a nossa equipe."
      >
        <a className="btn btn--light" href={WA_INDICACAO} target="_blank" rel="noopener">Indicar um parceiro</a>
      </CTABand>
    </>
  )
}