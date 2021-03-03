import { CHANGE_STAT, CHANGE_POTION, CHANGE_PRAYER } from '../actions/stats'
import { elvl_calc } from '../utils/calc'

const default_stats = {
  "Attack": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Strength": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Defence": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Magic": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Ranged": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Hitpoints": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
  "Prayer": {
    "level": 99,
    "potion": "None",
    "prayer": "None",
    "effective_level": 99
  },
}

export default function stats (state = default_stats, action) {
  switch(action.type) {
    case CHANGE_STAT :
      return {
        ...state,
        [action.stat_name]: elvl_calc(action.stat_name, action.stat),
      }
    case CHANGE_POTION :
      return {
        ...state,
        [action.stat_name]: elvl_calc(action.stat_name, action.potion),
      }
    case CHANGE_PRAYER :
      return {
        ...state,
        [action.stat_name]: elvl_calc(action.stat_name, action.prayer),
      }
    default:
      return state
  }
}
