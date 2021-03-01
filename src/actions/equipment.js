export const CHANGE_EQUIPMENT = 'CHANGE_EQUIPMENT'

export function changeEquipment (slot, equipment) {
  return {
    type: CHANGE_EQUIPMENT,
    equipment,
    slot,
  }
}
