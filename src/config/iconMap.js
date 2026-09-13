/*
  iconMap.js — mapeia nomes de ícone (string, do CMS) -> componentes SVG.

  MANUTENÇÃO:
  - Quando adicionar um ícone novo às opções do admin (src/config/admin.js),
    registre-o também aqui com o mesmo nome de string.
  - `fallback` usados nas páginas (ex.: IconGraduation, IconBuilding) cobrem
    valores desconhecidos que venham do banco.
*/

import {
  IconGraduation, IconMoney, IconLaw, IconCalendar, IconBook, IconMic,
  IconBuilding, IconShield, IconWrench, IconMonitor, IconUmbrella
} from '../components/Icons'

export const CURSO_ICON_MAP = {
  graduation: IconGraduation,
  money: IconMoney,
  law: IconLaw,
  calendar: IconCalendar,
  book: IconBook,
  mic: IconMic
}

export const INDICACAO_ICON_MAP = {
  building: IconBuilding,
  shield: IconShield,
  wrench: IconWrench,
  law: IconLaw,
  monitor: IconMonitor,
  umbrella: IconUmbrella
}