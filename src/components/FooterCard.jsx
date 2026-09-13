import { IconWhatsApp } from './Icons'
import { WA_CHAT } from '../config/site'

/*
  FooterCard.jsx — faixa de CTA exibida logo acima do rodapé.

  MANUTENÇÃO:
  - Mensagem e número do WhatsApp são definidos em src/config/site.js (WA_CHAT).
  - Alterar texto/copy: edite diretamente os elementos abaixo.
*/

export default function FooterCard() {
  return (
    <section className="footer-card">
      <div className="container footer-card__in" data-reveal>
        <div>
          <h2>Fale com a nossa equipe</h2>
          <p>Tire dúvidas sobre cursos, eventos, parcerias ou inscreva-se para publicar como colunista.</p>
        </div>
        <a className="btn btn--primary" href={WA_CHAT} target="_blank" rel="noopener">
          <IconWhatsApp size={15} />
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  )
}