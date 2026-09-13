/*
  format.js — utilitários de formatação compartilhados (admin e landing).

  MANUTENÇÃO:
  - toDate/fmtData/fmtDataHora: formata datas ISO e datetime-local.
  - isPast: usado para detectar eventos já realizados (regra de "próxima execução").
  - stripMd/truncate: resumem texto Markdown para cards (remove a sintaxe).
*/

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const toDate = (iso) => {
  if (!iso) return null
  const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso)
  return isNaN(d.getTime()) ? null : d
}

export function fmtData(iso) {
  const d = toDate(iso)
  if (!d) return ''
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`
}

export function fmtDataHora(iso) {
  const d = toDate(iso)
  if (!d) return ''
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()} · ${hh}h${mm}`
}

export function isPast(iso) {
  const d = toDate(iso)
  if (!d) return false
  return d < new Date()
}

function stripMd(md) {
  return String(md || '')
    .replace(/[#*_`>~|!\[\]{}()<>=-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncate(text, max = 120) {
  const s = stripMd(text)
  return s.length > max ? s.slice(0, max).trimEnd() + '…' : s
}