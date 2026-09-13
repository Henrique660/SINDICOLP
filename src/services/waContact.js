import { PHONE_URL } from '../config/site'

/*
  waContact.js — monta o link de WhatsApp para contatar um serviço/parceiro.

  MANUTENÇÃO:
  - Prioriza o número cadastrado no CMS (campo `whatsapp` de indicacoes).
  - Sem número cadastrado, cai no WhatsApp geral da BLOOKKO (PHONE_URL).
  - A mensagem sempre inclui o nome/categoria do serviço selecionado.
*/

function normalizePhone(value) {
  if (!value) return ''
  const v = String(value).trim()
  const wa = v.match(/wa\.me\/([0-9]+)/)
  return (wa ? wa[1] : v).replace(/\D/g, '')
}

export function waServiceContact(service) {
  const nome = String((service && service.nome) || '').trim() || 'serviço da rede'
  const categoria = String((service && service.categoria) || '').trim()
  const msg =
    `Olá! Vim pelo site BLOOKKO e tenho interesse no serviço "${nome}"` +
    (categoria ? ` (${categoria})` : '') +
    `. Podem me passar mais informações?`
  const phone = normalizePhone(service && service.whatsapp)
  const base = phone ? `https://wa.me/${phone}` : PHONE_URL.split('?')[0]
  return `${base}?text=${encodeURIComponent(msg)}`
}