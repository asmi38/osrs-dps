import { combineReducers } from 'redux'
import enemy from './enemy'
import equipment from './equipment'
import stats from './stats'
import calcs from './calcs'

export default combineReducers({
  stats,
  equipment,
  enemy,
  calcs,
})
