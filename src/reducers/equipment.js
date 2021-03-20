import { RECEIVE_EQUIPMENT, CHANGE_WEAPON, CHANGE_STYLE, CHANGE_EQUIPMENT, CHANGE_VALUE, CHANGE_SPELL } from '../actions/equipment'
import { default_equipment } from '../utils/default_data'

export default function createNamedEquipment(equipmentName = ''){
  return function equipment (state = default_equipment, action) {
    switch(action.type) {
      case `RECEIVE_EQUIPMENT${equipmentName}`:
        return {
          ...state,
          ...action.equipment
        }
      case `CHANGE_EQUIPMENT${equipmentName}`:
        return {
          ...state,
          [action.slot]: action.equipment,
        }
      case `CHANGE_SPELL${equipmentName}`:
        return {
          ...state,
          spell: action.spell
        }
      case `CHANGE_WEAPON${equipmentName}`:
        return {
          ...state,
          weapon: action.weapon,
          attack_style: action.weapon.stances[0],
        }
      case `CHANGE_STYLE${equipmentName}`:
        return {
          ...state,
          attack_style: action.style,
        }
      case `CHANGE_VALUE${equipmentName}`:
        return {
          ...state,
          [action.slot]: {
            ...state[action.slot],
            stats: {
              ...state[action.slot].stats,
              [action.style]: action.value
            }
          }

        }
      default:
        return state
    }
  }
}
