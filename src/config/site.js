/*
  site.js — configurações globais da marca BLOKKO.

  MANUTENÇÃO:
  - Toda a identidade (nome, tagline, e-mail, telefone, redes) centralizada aqui;
    os componentes importam estas constantes, não fixam textos de marca.
  - WhatsApp: PHONE_URL abre sem mensagem; WA_* são links com mensagem pronta
    por contexto (chat, colunista, turmas, eventos, treinamento, indicação).
  - Para mudar o número, troque ambos: SITE_PHONE (exibição) e PHONE_URL
    (wa.me/55 + DDD + número).
*/

export const SITE_NAME = 'BLOKKO'
export const SITE_TAGLINE = 'Sua Plataforma Condominial'
export const SITE_EMAIL = 'contato@blokko.com.br'
export const SITE_PHONE = '(51) 9999-9999'

export const PHONE_URL = 'https://wa.me/555199999999'

const WhatsAppMsg = (msg) =>
  `https://wa.me/555199999999?text=${encodeURIComponent(msg)}`

export const WA_CHAT = WhatsAppMsg(
  'Olá! Vim pelo site BLOKKO e gostaria de mais informações.'
)

export const WA_COLUNISTA = WhatsAppMsg(
  'Olá! Quero apresentar uma coluna para a BLOKKO.'
)

export const WA_TURMAS = WhatsAppMsg(
  'Olá! Quero saber mais sobre as turmas de cursos da BLOKKO.'
)

export const WA_EVENTOS = WhatsAppMsg(
  'Olá! Quero participar dos eventos da BLOKKO.'
)

export const WA_TREINAMENTO = WhatsAppMsg(
  'Olá! Quero um treinamento sob medida para a minha equipe.'
)

export const WA_INDICACAO = WhatsAppMsg(
  'Olá! Quero indicar um parceiro para a BLOKKO.'
)

export const SOCIAL = {
  telegram: '#',
  youtube: '#',
  instagram: '#/'
}

export const COPYRIGHT = `${SITE_NAME}. Todos os direitos reservados.`