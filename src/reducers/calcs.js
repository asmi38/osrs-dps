import { UPDATE_CALC } from '../actions/calcs'

export default function calcs (state = {}, action) {
  switch(action.type) {
    case UPDATE_CALC:
      return {
        ...state,
        [action.type]: action.calc,
      }
    default:
      return state
  }
}
