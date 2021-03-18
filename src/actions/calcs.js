export const UPDATE_CALC = 'UPDATE_CALC'


export function updateCalc (calc, value) {
  return {
    type: UPDATE_CALC,
    calc,
    value,
  }
}
