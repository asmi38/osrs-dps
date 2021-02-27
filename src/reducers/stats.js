import { CHANGE_STAT, CHANGE_POTION, CHANGE_PRAYER } from '../actions/stats'
import { elvl_calc } from '../utils/calc'

const default_stats = {
  "Attack": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Strength": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Defence": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Magic": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Ranged": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Hitpoints": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
  },
  "Prayer": {
    "level": 1,
    "potion": "None",
    "prayer": "None",
    "effective_level": 1
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
