import { CHANGE_EQUIPMENT } from '../actions/equipment'
import { CHANGE_WEAPON } from '../actions/equipment'
import { CHANGE_STYLE } from '../actions/equipment'
import { default_equipment } from '../utils/default_data'

export default function equipment (state = default_equipment, action) {
  switch(action.type) {
    case CHANGE_EQUIPMENT:
      return {
        ...state,
        [action.slot]: action.equipment,
      }
    case CHANGE_WEAPON:
      return {
        ...state,
        weapon: action.weapon,
        attack_style: action.weapon.stances[0],
      }
    case CHANGE_STYLE:
      return {
        ...state,
        attack_style: action.style,
      }
    default:
      return state
  }
}
