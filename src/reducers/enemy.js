import { CHANGE_ENEMY } from '../actions/enemy'
import MonsterData from '../data/monster-list'

const default_monster = MonsterData["415"]

export default function enemy (state = default_monster, action) {
  switch(action.type) {
    case CHANGE_ENEMY :
      return {
        ...state,
        enemy: action.enemy,
      }
    default:
      return state
  }
}
