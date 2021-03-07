import { UPDATE_CALC } from '../actions/calcs'

const default_state = {
  "slayer_task": true,
  "dwh_specials": 0,
  "bgs_specials": 0,
  "kandarin_hard": false,
  "remaining_hp": 99,
  "quick_shot": false,
  "fluid_strikes": false,
  "double_cast": false,
  "tier6": false,
  "konars_blessing": false,
  "xerics_focus": false,
}
export default function calcs (state = default_state, action) {
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
