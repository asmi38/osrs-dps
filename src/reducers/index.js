import { combineReducers } from 'redux'
import enemy from './enemy'
import equipment from './equipment'
import stats from './stats'

export default combineReducers({
  stats,
  equipment,
  enemy,  
})
