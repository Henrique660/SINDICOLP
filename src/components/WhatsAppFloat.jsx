import { IconWhatsApp } from './Icons'
import { WA_CHAT } from '../config/site'

/*
  WhatsAppFloat.jsx — botão flutuante de WhatsApp (cantos da tela).

  MANUTENÇÃO:
  - Posicionamento/estilo: CSS `.wa-float` em src/styles/styles.css.
  - Link e mensagem: src/config/site.js (WA_CHAT).
*/

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={WA_CHAT}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a BLOOKKO no WhatsApp"
    >
      <IconWhatsApp size={26} />
    </a>
  )
}