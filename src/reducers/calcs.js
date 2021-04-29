import { UPDATE_CALC } from '../actions/calcs'

const default_state = {
  "slayer_task": true,
  "dwh_specials": 0,
  "vulnerability": false,
  "bgs_dmg": 0,
  "arclight_specials": 0,
  "kandarin_hard": true,
  "remaining_hp": 1,
  "remaining_prayer": 99,
  "quick_shot": false,
  "fluid_strikes": false,
  "double_cast": false,
  "tier6": false,
  "konars_blessing": false,
  "xerics_focus": false,
  "wilderness": true,
  "mark_darkness": false,
  "thrall": "None",
}
export default function calcs (state = default_state, action) {
  switch(action.type) {
    case UPDATE_CALC:
      return {
        ...state,
        [action.calc]: action.value,
      }
    default:
      return state
  }
}
