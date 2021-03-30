import React, { Component } from 'react';
import { connect } from 'react-redux'
import { receiveEquipment, changeEquipment, changeStyle, changeWeapon, changeValue, changeSpell } from '../actions/equipment'
import { equipment_presets } from '../utils/default_data'
import { attack_style_name, strength_style_name, formatWord } from '../utils/calc'
import { totalAtkCalc, totalStrCalc } from '../utils/sharedDPS'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PasteModal from './PasteModal'
import { Button, Select, InputNumber, Card } from 'antd'

import HeadData from '../data/head'
import BodyData from '../data/body'
import LegsData from '../data/legs'
import CapeData from '../data/cape'
import AmmoData from '../data/ammo'
import HandsData from '../data/hands'
import NeckData from '../data/neck'
import SpellData from '../data/spells'
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
import SpellIcon from '../data/icons/Spell_Icon.png'
import ShieldSlot from '../data/icons/Shield_slot.png'
import HandsSlot from '../data/icons/Gloves_slot.png'
import FeetSlot from '../data/icons/Boots_slot.png'
import RingSlot from '../data/icons/Ring_slot.png'
import CombatType from '../data/icons/Combat_type.png'

const { Option } = Select

function EquipmentRow ({icon, slot_name, equip, equip_list, dispatch, attack_style, actionKey}){
  const style = attack_style_name(attack_style)

  return(
    <tr>
      <td>
        <img className='equip-icon' src={equip.icon ? `data:image/png;base64,${equip.icon}` : icon} alt="slot icon" />
      </td>

      <td>
        {formatWord(slot_name)}
      </td>

      <td>
        <Select
          value={equip.id}
          showSearch
          optionFilterProp="label"
          style={{ width: 200 }}
          onChange={(value) =>
                    (slot_name === "weapon" ?
                      dispatch(changeWeapon(equip_list[value], actionKey)) :
                      dispatch(changeEquipment(slot_name, equip_list[value], actionKey)))
                    }
        >
            {Object.keys(equip_list).map((item_key) => (
              <Option value={equip_list[item_key].id} label={equip_list[item_key].name} key={equip_list[item_key].id}>
                {equip_list[item_key].name}
              </Option>
            ))}
        </Select>
      </td>

      <td>
        <InputNumber
          value={equip.stats[style]}
          onChange={(value) => dispatch(changeValue(slot_name, style, value, actionKey))}
          className="stat_input"
          style={{width: 50,}}
          type="number"
        />
      </td>

      <td>
        <InputNumber
          value={equip.stats[strength_style_name(attack_style)]}
          onChange={(value) => dispatch(changeValue(slot_name, strength_style_name(attack_style), value, actionKey))}
          className="stat_input"
          style={{width: 50,}}
          type="number"
        />
      </td>

    </tr>
  )
}

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModal = (boolean) => {
    this.setState(state => ({
      modalVisible: boolean
    }))
  }

  handleReset = (e) => {
    e.preventDefault()
    this.props.dispatch(receiveEquipment(equipment_presets.none, this.props.actionKey))
  }

  handlePaste = (e) => {
    e.preventDefault()
    this.props.dispatch(receiveEquipment)
  }

  render() {
    const { weapon, dispatch, attack_style, equipment, head, ammo, body, cape, feet, legs, hands, neck, ring, shield, spell, actionKey } = this.props

    function mapCombatStyles(){
      const combatStyles = Object.keys(weapon.stances).map((key) => (
          weapon.stances[key]
      ))
      const spellCast = {"attack_style": "magic", "attack_type": "spellcasting", "boosts": null, "combat_style": "spell", "experience": "magic"}
      if(combatStyles.filter(e => e.attack_type === "spellcasting").length === 0){
        combatStyles.push(spellCast)
      }
      return combatStyles
    }

    function getStyleIndex(arr, style){
      for(let i=0; i< arr.length; i++){
        if(arr[i].combat_style === style.combat_style && arr[i].boosts === style.boosts){
          return i
        }
      }
      return -1
    }

    return (
      <div className='equipment-set'>
        <Card size='small'>
        <div className='equip-buttons'>
          <Select
            showSearch
            placeholder="Select preset"
            style={{ width: 160, marginRight: 'auto'}}
            onChange={(value) => dispatch(receiveEquipment(equipment_presets[value], actionKey))}
          >
          {Object.keys(equipment_presets).map((preset_key) => (
            <Option value={preset_key} key={preset_key}>
              {formatWord(preset_key)}
            </Option>
          ))}
          </Select>
          <CopyToClipboard text={btoa(JSON.stringify(equipment))}>
            <Button type="dashed">Copy</Button>
          </CopyToClipboard>
          <PasteModal modalVisible={this.state.modalVisible} setModal={this.setModal} dispatch={dispatch} actionKey={actionKey} />
          <Button type="dashed" onClick={this.handleReset}>Reset</Button>
        </div>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Slot:</th>
              <th></th>
              <th>Attack</th>
              <th>Strength</th>
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
              actionKey={actionKey}
            />

            <tr>
              <td><img src={CombatType} alt="Combat type icon"/></td>
              <td>Combat</td>
              <td>
                <Select
                  onChange={(value) => dispatch(changeStyle(mapCombatStyles()[value], actionKey))}
                  value={getStyleIndex(mapCombatStyles(), equipment.attack_style)}
                  style={{ width: 200, }}
                >
                {mapCombatStyles().map((style, index) => {
                    return (
                      <Option value={index} key={index}>
                        {formatWord(style.combat_style) + " " + (style.attack_style ? style.attack_style : "") + " " + (style.attack_type ? style.attack_type : "")}
                      </Option>
                    )
                })}
              </Select>
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td><img src={SpellIcon} alt="Spell book icon"/></td>
              <td>Spell:</td>
              <td>
                <Select
                  showSearch
                  optionFilterProp="label"
                  onChange={(value) => dispatch(changeSpell(SpellData[value], actionKey))}
                  value={spell.name}
                  style={{ width: 200, }}
                >
                {Object.keys(SpellData).map((spell_key) => (
                  <Option value={spell_key} label={SpellData[spell_key].name} key={spell_key}>
                    {formatWord(SpellData[spell_key].name)}
                  </Option>
                ))}
              </Select>
              </td>
            </tr>

            <EquipmentRow
              icon={AmmoSlot}
              slot_name="ammo"
              equip={ammo}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={AmmoData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={HeadSlot}
              slot_name="head"
              equip={head}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={HeadData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={CapeSlot}
              slot_name="cape"
              equip={cape}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={CapeData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={NeckSlot}
              slot_name="neck"
              equip={neck}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={NeckData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={BodySlot}
              slot_name="body"
              equip={body}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={BodyData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={LegsSlot}
              slot_name="legs"
              equip={legs}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={LegsData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={ShieldSlot}
              slot_name="shield"
              equip={shield}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={ShieldData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={HandsSlot}
              slot_name="hands"
              equip={hands}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={HandsData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={FeetSlot}
              slot_name="feet"
              equip={feet}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={FeetData}
              actionKey={actionKey}
            />

            <EquipmentRow
              icon={RingSlot}
              slot_name="ring"
              equip={ring}
              dispatch={dispatch}
              attack_style={attack_style}
              equip_list={RingData}
              actionKey={actionKey}
            />

            <tr>
              <td></td>
              <td><b>Total</b></td>
              <td></td>
              <td style={{textAlign: 'center'}}><b>{totalAtkCalc(equipment)}</b></td>
              <td style={{textAlign: 'center'}}><b>{totalStrCalc(equipment)}</b></td>
            </tr>
          </tbody>
        </table>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps ) {
  const actionKey = ownProps.actionKey
  const equipment = (actionKey === 'A' ? state.equipmentA : state.equipmentB)
  const { attack_style, head, ammo, body, cape, feet, hands, legs, neck, ring, shield, weapon, spell } = equipment
  return {
    actionKey,
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
    spell
  }
}



export default connect(mapStateToProps)(Equipment)
