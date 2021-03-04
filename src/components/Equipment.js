import React, { Component } from 'react';
import { connect } from 'react-redux'
import { receiveEquipment, changeEquipment, changeStyle, changeWeapon, changeValue } from '../actions/equipment'
import { equipment_presets } from '../utils/default_data'
import HeadData from '../data/head'
import BodyData from '../data/body'
import LegsData from '../data/legs'
import CapeData from '../data/cape'
import AmmoData from '../data/ammo'
import HandsData from '../data/hands'
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
import HandsSlot from '../data/icons/Gloves_slot.png'
import FeetSlot from '../data/icons/Boots_slot.png'
import RingSlot from '../data/icons/Ring_slot.png'
import CombatType from '../data/icons/Combat_type.png'


function EquipmentRow ({icon, slot_name, equip, equip_list, dispatch, attack_style}){
  const style = "attack_" + attack_style.attack_type

  const capitalise = ([firstLetter, ...restOfWord]) =>
    firstLetter.toUpperCase() + restOfWord.join('')

  return(
    <tr>
      <td>
        <img src={icon} alt="slot icon" />
        {capitalise(slot_name)}
      </td>
      <td>
        <select
          value={equip.id}
          onChange={(e) =>
                    (slot_name === "weapon" ?
                      dispatch(changeWeapon(equip_list[e.target.value])) :
                      dispatch(changeEquipment(slot_name, equip_list[e.target.value])))
                    }
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
          onChange={(e) => dispatch(changeValue(slot_name, style, parseInt(e.target.value)))}
          className="stat_input"
          type="number"
        />
      </td>
      <td>
        <input
          value={equip.stats.melee_strength}
          onChange={(e) => dispatch(changeValue(slot_name, "melee_strength", parseInt(e.target.value)))}
          className="stat_input"
          type="number"
        />
      </td>
    </tr>
  )
}

class Equipment extends Component {
  render() {
    const { weapon, dispatch, attack_style } = this.props

    const varToString = varObj => Object.keys(varObj)[0]

    function total_atk_calc(equipment){
      const style = "attack_" + equipment.attack_style.attack_type
      const keys = Object.keys(equipment).filter(word => word !== "attack_style")
      const values = (keys.map(equip_name =>
        equipment[equip_name].stats[style]))

      return values.reduce((a, b) => a + b, 0)
    }

    function total_str_calc(equipment){
      const keys = Object.keys(equipment).filter(word => word !== "attack_style")
      const values = (keys.map(equip_name =>
        equipment[equip_name].stats["melee_strength"]))

      return values.reduce((a, b) => a + b, 0)
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>
                Preset:
                <select
                  onChange={(e) => dispatch(receiveEquipment(equipment_presets[e.target.value]))}
                >
                  {Object.keys(equipment_presets).map((preset_key) => (
                    <option value={preset_key} key={preset_key}>
                      {preset_key}
                    </option>
                  ))}
                </select>
              </th>
              <th>Attack Bonus</th>
              <th>Strength Bonus</th>
            </tr>
          </thead>
          <tbody>
            <EquipmentRow
              icon={WeaponSlot}
              slot_name="weapon"
              equip={weapon}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={WeaponData}
            />
            <tr>
              <td><img src={CombatType} alt="Combat type icon"/> Combat</td>
              <td>
                <select
                  defaultValue={weapon.stances[0]}
                  onChange={(e) => dispatch(changeStyle(weapon.stances[e.target.value]))}
                >
                {Object.keys(weapon.stances).map((item_key) => (
                  <option value={item_key} key={item_key}>
                    {weapon.stances[item_key].combat_style + " " + weapon.stances[item_key].attack_style + " " + weapon.stances[item_key].attack_type}
                  </option>
                ))}
                </select>
              </td>
              <td></td>
              <td></td>
            </tr>
            <EquipmentRow
              icon={AmmoSlot}
              slot_name="ammo"
              equip={this.props.ammo}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={AmmoData}
            />
            <EquipmentRow
              icon={HeadSlot}
              slot_name="head"
              equip={this.props.head}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={HeadData}
            />
            <EquipmentRow
              icon={CapeSlot}
              slot_name="cape"
              equip={this.props.cape}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={CapeData}
            />
            <EquipmentRow
              icon={NeckSlot}
              slot_name="neck"
              equip={this.props.neck}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={NeckData}
            />
            <EquipmentRow
              icon={BodySlot}
              slot_name="body"
              equip={this.props.body}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={BodyData}
            />
            <EquipmentRow
              icon={LegsSlot}
              slot_name="legs"
              equip={this.props.legs}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={LegsData}
            />
            <EquipmentRow
              icon={ShieldSlot}
              slot_name="shield"
              equip={this.props.shield}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={ShieldData}
            />
            <EquipmentRow
              icon={HandsSlot}
              slot_name="hands"
              equip={this.props.hands}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={HandsData}
            />
            <EquipmentRow
              icon={FeetSlot}
              slot_name="feet"
              equip={this.props.feet}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={FeetData}
            />
            <EquipmentRow
              icon={RingSlot}
              slot_name="ring"
              equip={this.props.ring}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={RingData}
            />
            <tr>
              <td>Total</td>
              <td></td>
              <td>{total_atk_calc(this.props.equipment)}</td>
              <td>{total_str_calc(this.props.equipment)}</td>
            </tr>
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
    hands,
    neck,
    ring,
    shield,
    weapon,
    equipment,
  }
}

export default connect(mapStateToProps)(Equipment)
