import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEquipment } from '../actions/equipment'
import HeadData from '../data/head'
import BodyData from '../data/body'
import LegData from '../data/legs'
import CapeData from '../data/cape'
import AmmoData from '../data/ammo'
import HandData from '../data/hands'
import NeckData from '../data/neck'
import RingData from '../data/ring'
import ShieldData from '../data/shield'
import FeetData from '../data/feet'
import WeaponData from '../data/weapon'
import AmmoSlot from '../data/icons/Ammo_slot.png'
import WeaponSlot from '../data/icons/Weapon_slot.png'
import HeadSlot from '../data/icons/Head_slot.png'
import CapeSlot from '../data/icons/Cape_slot.png'
import NeckSlot from '../data/icons/Neck_slot.png'
import BodySlot from '../data/icons/Body_slot.png'
import LegsSlot from '../data/icons/Legs_slot.png'
import ShieldSlot from '../data/icons/Shield_slot.png'
import GlovesSlot from '../data/icons/Gloves_slot.png'
import BootsSlot from '../data/icons/Boots_slot.png'
import RingSlot from '../data/icons/Ring_slot.png'
import CombatType from '../data/icons/Combat_type.png'


function EquipmentRow ({icon, slot_name, equip, equip_list, dispatch, attack_style}){
  const style = "attack_" + attack_style.attack_type
  return(
    <tr>
      <td>
        <img src={icon} alt="slot icon" />
        {slot_name}
      </td>
      <td>
        <select
          value={equip.id}
          onChange={(e) => dispatch(changeEquipment(slot_name, e.target.value))}
        >
            {Object.keys(equip_list).map((item_key) => (
              <option value={equip_list[item_key].id} key={equip_list[item_key].id}>
                {equip_list[item_key].name}
              </option>
            ))}
        </select>
      </td>
      <td>
        <input
          value={equip.stats[style]}
          onChange={console.log(equip)}
          className="stat_input"
          type="number"
        />
      </td>
      <input
        value={equip.stats.melee_strength}
        onChange={console.log("Test")}
        className="stat_input"
        type="number"
      />
      <td>
      </td>
    </tr>
  )
}

class Equipment extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Slot
              </th>
              <th>
                Set Placeholder
              </th>
              <th>
                Attack
              </th>
              <th>
                Strength
              </th>
            </tr>
          </thead>
          <tbody>
            <EquipmentRow
              icon={WeaponSlot}
              slot_name="weapon"
              equip={this.props.weapon}
              dispatch={this.props.dispatch}
              attack_style={this.props.attack_style}
              equip_list={WeaponData}
            />
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps ({ equipment }) {
  const { attack_style, head, ammo, body, cape, feet, hands, legs, neck, ring, shield, weapon} = equipment
  return {
    attack_style,
    head,
    ammo,
    body,
    cape,
    feet,
    legs,
    neck,
    ring,
    shield,
    weapon
  }
}

export default connect(mapStateToProps)(Equipment)
