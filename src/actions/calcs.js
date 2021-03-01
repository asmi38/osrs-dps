export const UPDATE_CALC = 'UPDATE_CALC'


export function updateCalc (type, calc) {
  return {
    type: UPDATE_CALC,
    type,
    calc,
  }
}
