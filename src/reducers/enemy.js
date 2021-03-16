import { CHANGE_ENEMY } from '../actions/enemy'
import MonsterData from '../data/monster-list'

const default_monster = MonsterData["8061"]

export default function enemy (state = default_monster, action) {
  switch(action.type) {
    case CHANGE_ENEMY:
      return action.enemy
    default:
      return state
  }
}
