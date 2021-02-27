export const CHANGE_ENEMY = 'CHANGE_ENEMY'

export function changeEnemy (enemy) {
  return {
    type: CHANGE_ENEMY,
    enemy,
  }
}
