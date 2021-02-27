export const CHANGE_EQUIPMENT = 'CHANGE_EQUIPMENT'

export function changeEquipment (equipment) {
  return {
    type: CHANGE_EQUIPMENT,
    equipment,
  }
}
