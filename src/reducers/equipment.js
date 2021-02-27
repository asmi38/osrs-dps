import { CHANGE_EQUIPMENT } from '../actions/equipment'
import HeadData from '../data/head'
import AmmoData from '../data/ammo'
import BodyData from '../data/body'
import CapeData from '../data/cape'
import FeetData from '../data/feet'
import HandsData from '../data/hands'
import LegsData from '../data/legs'
import NeckData from '../data/neck'
import RingData from '../data/ring'
import ShieldData from '../data/shield'
import WeaponData from '../data/weapon'

const default_equipment = {
  "head": HeadData["0"],
  "ammo": AmmoData["0"],
  "body": BodyData["0"],
  "cape": CapeData["0"],
  "feet": FeetData["0"],
  "hands": HandsData["0"],
  "legs": LegsData["0"],
  "neck": NeckData["0"],
  "ring": RingData["0"],
  "shield": ShieldData["0"],
  "weapon": WeaponData["0"],
}

export default function equipment (state = default_equipment, action) {
  switch(action.type) {
    case CHANGE_EQUIPMENT :
      return {
        ...state,
        [action.equipment.slot]: action.equipment,
      }
    default:
      return state
  }
}
