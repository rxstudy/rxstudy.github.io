import { ProfessionEnum } from './reducers/GlobalTypes'

export const OP_SLOT_COUNT_DEFAULT = 12
export const OP_SLOT_COUNT_MAX = 12
export const OP_SLOT_COUNT_MIN = 1

export const ALL_PROFESSIONS: ProfessionEnum[] = [
  ProfessionEnum.Warrior,
  ProfessionEnum.Pioneer,
  ProfessionEnum.Sniper,
  ProfessionEnum.Tank,
  ProfessionEnum.Medic,
  ProfessionEnum.Caster,
  ProfessionEnum.Support,
  ProfessionEnum.Special
]

export const PROFESSION_TO_ICON_NAME: { [k in ProfessionEnum]: string } =
{
  [ProfessionEnum.Warrior]: 'guard',
  [ProfessionEnum.Pioneer]: 'vanguard',
  [ProfessionEnum.Sniper]: 'sniper',
  [ProfessionEnum.Tank]: 'defender',
  [ProfessionEnum.Medic]: 'medic',
  [ProfessionEnum.Caster]: 'caster',
  [ProfessionEnum.Support]: 'supporter',
  [ProfessionEnum.Special]: 'specialist'
}
