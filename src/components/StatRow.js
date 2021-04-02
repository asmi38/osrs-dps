import React from 'react'
import { changeStat, changePrayer, changePotion } from '../actions/stats'
import { formatWord } from '../utils/calc'
import { InputNumber, Select } from 'antd'
const { Option } = Select;

function StatRow({icon, stat_name, stat, dispatch, pots, prayers}){
  return(
    <React.Fragment>
      <div className='stat-row'>
        <div className='image-container'>
          <img className='image-icon' src={icon} alt="stat icon"/>
        </div>

        <label className='stat-name'>{formatWord(stat_name)}</label>

        <InputNumber
          value={stat.level}
          style={{width: 55, marginRight: 'auto'}}
          onChange={(value) => dispatch(changeStat(stat_name, {...stat, "level": value}))}
          min={1}
          max={99}
        />

        {stat_name === "hitpoints" || stat_name === "prayer" ? "" :
          <Select
            value={stat.potion}
            style={{width: 130, padding: 1}}
            onChange={(value) => dispatch(changePotion(stat_name, {...stat, "potion": value}))}
            >
              {pots.map((pot) => (
                <Option value={pot} key={pot}>
                  {pot}
                </Option>
              ))}
          </Select>
        }

        {(stat_name === "hitpoints" || stat_name === "prayer") ? "" :
          <Select
            value={stat.prayer}
            style={{width: 90, paddingRight: 1}}
            onChange={(value) => {
              if(value === "Piety" || value === "Chivalry"){
                dispatch(changePrayer("attack", value))
                dispatch(changePrayer("strength", value))
                dispatch(changePrayer("defence", value))
              }
              else{
                dispatch(changePrayer(stat_name, value))
              }
            }}
          >
            {prayers.map((prayer) => (
              <Option value={prayer} key={prayer}>
                {prayer}
              </Option>
            ))}
          </Select>
        }

        <InputNumber
          value={stat.effective_level}
          onChange={(value) => dispatch(changeStat(stat_name, {...stat, "effective_level": value}))}
          style={{width: 57, color: stat.effective_level > 99 ? 'blue' : 'black'}}
          min={1}
        />
      </div>
    </React.Fragment>
  )
}

export default StatRow
