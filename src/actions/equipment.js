export const CHANGE_EQUIPMENT = 'CHANGE_EQUIPMENT'
export const CHANGE_STYLE = 'CHANGE_STYLE'
export const CHANGE_WEAPON = 'CHANGE_WEAPON'
export const RECEIVE_EQUIPMENT = 'RECEIVE_EQUIPMENT'
export const CHANGE_VALUE = 'CHANGE_VALUE'
export const CHANGE_SPELL = 'CHANGE_SPELL'

export function changeEquipment(slot, equipment, key){
  return {
    type: CHANGE_EQUIPMENT + key,
    equipment,
    slot,
  }
}

export function changeSpell(spell, key){
  return {
    type: CHANGE_SPELL + key,
    spell
  }
}

export function changeValue(slot, style, value, key){
  return {
    type: CHANGE_VALUE + key,
    slot,
    style,
    value,
  }
}

export function receiveEquipment(equipment, key){
  return{
    type: RECEIVE_EQUIPMENT + key,
    equipment,
  }
}

export function changeWeapon(weapon, key) {
  return {
    type: CHANGE_WEAPON + key,
    weapon,
  }
}

export function changeStyle(style, key){
  return {
    type: CHANGE_STYLE + key,
    style,
  }
}
