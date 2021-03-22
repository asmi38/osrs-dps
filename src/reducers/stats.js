import { CHANGE_STAT, CHANGE_POTION, CHANGE_PRAYER, FETCHING_USER, FETCHING_USER_ERROR, FETCHING_USER_SUCCESS } from '../actions/stats'
import { elvl_calc } from '../utils/calc'
import { initialStats } from '../utils/default_data'

export default function stats (state = initialStats, action) {
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
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: null,
        attack: elvl_calc("attack", {...state.attack, level:action.data.attack}),
        strength: elvl_calc("strength", {...state.strength, level: action.data.strength}),
        defence: elvl_calc("defence", {...state.defence, level: action.data.defence}),
        hitpoints: elvl_calc("hitpoints", {...state.hitpoints, level: action.data.hitpoints}),
        magic: elvl_calc("magic", {...state.magic, level: action.data.magic}),
        ranged: elvl_calc("ranged", {...state.ranged, level: action.data.ranged}),
        prayer: elvl_calc("prayer", {...state.prayer, level: action.data.prayer}),
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
