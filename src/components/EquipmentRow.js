import React from 'react'
import { attack_style_name, strength_style_name, formatWord } from '../utils/calc'
import { Select, InputNumber } from 'antd'
import { changeEquipment, changeWeapon, changeValue } from '../actions/equipment'
const { Option } = Select

function EquipmentRow ({icon, slot_name, equip, equip_list, dispatch, attack_style, actionKey}){
  const style = attack_style_name(attack_style)
  return(
      <div className='equipment-row'>
        <div className='equip-icon-container'>
          <img className='equip-icon' src={equip.icon ? `data:image/png;base64,${equip.icon}` : icon} alt="slot icon" />
        </div>

        <span className='equip-name'>{formatWord(slot_name)}</span>

        <Select
          value={equip.id}
          showSearch
          optionFilterProp="label"
          style={{ width: 175, marginBottom: 2, marginRight: 2}}
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

        <InputNumber
          value={equip.stats[style]}
          onChange={(value) => dispatch(changeValue(slot_name, style, value, actionKey))}
          className="stat_input"
          style={{width: 50, marginBottom: 2, marginRight: 2}}
          type="number"
        />

        <InputNumber
          value={equip.stats[strength_style_name(attack_style)]}
          onChange={(value) => dispatch(changeValue(slot_name, strength_style_name(attack_style), value, actionKey))}
          className="stat_input"
          style={{width: 50, marginBottom: 2,}}
          type="number"
        />
      </div>
  )
}

export default EquipmentRow
