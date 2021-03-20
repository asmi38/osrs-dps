import { combineReducers } from 'redux'
import enemy from './enemy'
import createNamedEquipment from './equipment'
import stats from './stats'
import calcs from './calcs'

export default combineReducers({
  stats,
  equipmentA: createNamedEquipment('A'),
  equipmentB: createNamedEquipment('B'),
  enemy,
  calcs,
})
