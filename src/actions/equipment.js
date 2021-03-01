export const CHANGE_EQUIPMENT = 'CHANGE_EQUIPMENT'
export const CHANGE_STYLE = 'CHANGE_STYLE'
export const CHANGE_WEAPON = 'CHANGE_WEAPON'

export function changeEquipment (slot, equipment) {
  return {
    type: CHANGE_EQUIPMENT,
    equipment,
    slot,
  }
}

export function changeWeapon(weapon) {
  return {
    type: CHANGE_WEAPON,
    weapon,
  }
}

export function changeStyle(style){
  return {
    type: CHANGE_STYLE,
    style,
  }
}
