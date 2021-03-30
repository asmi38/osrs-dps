import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeStat, changePrayer, changePotion } from '../actions/stats'
import { formatWord } from '../utils/calc'
import { InputNumber, Select, Card } from 'antd'
import User from './User'

import attack_sprite from '../data/icons/attack.png'
import strength_sprite from '../data/icons/strength.png'
import defence_sprite from '../data/icons/defence.png'
import magic_sprite from '../data/icons/magic.png'
import range_sprite from '../data/icons/range.png'
import hp_sprite from '../data/icons/hp.png'
import prayer_sprite from '../data/icons/prayer.png'
import potion_sprite from '../data/icons/potion.png'
import stats_sprite from '../data/icons/stats1.png'

const { Option } = Select
const atk_pots = ["None", "Attack", "Super Attack", "Zamorak Brew", "Overload", "Overload (+)"]
const str_pots = ["None", "Strength", "Super Strength", "Overload", "Overload (+)"]
const def_pots = ["None", "Defence", "Super Defence", "Saradomin Brew", "Overload", "Overload (+)"]
const melee_prayers = ["None", "Piety", "Chivalry", "15%", "10%", "5%"]
const magic_pots = ["None", "Magic", "Super Magic", "Imbued heart", "Overload", "Overload (+)"]
const magic_prayers = ["None", "5%", "10%", "15%", "Augury" ]
const range_pots = ["None", "Ranging", "Super Ranging", "Overload", "Overload (+)"]
const range_prayers = ["None", "5%", "10%", "15%", "Rigour"]

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
            style={{width: 130,}}
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
            style={{width: 90,}}
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
          style={{width: 60, color: stat.effective_level > 99 ? 'blue' : 'black'}}
          min={1}
        />
      </div>
    </React.Fragment>
  )
}

class Stats extends Component {
  render() {
    const { attack, strength, ranged, magic, defence, prayer, hitpoints, dispatch } = this.props

    return (
      <div className='stats-container'>
        <Card size='small'>
        <User />
              <div className='stat-header'>
                <div className='stat-name-header'><label className='stats-title'>Stats</label></div>
                <div className='stat-input-header'><img className='image-icon' src={stats_sprite} alt="Stats"/></div>
                <div className='potion-header'><img className='image-icon' src={potion_sprite} alt="Potion"/></div>
                <div className='prayer-header'><img className='image-icon' src={prayer_sprite} alt="Prayer"/></div>
                <div className='elevel-header'><label className='eff-title'>Effective</label></div>
              </div>

              <StatRow
                icon={attack_sprite}
                stat_name="attack"
                dispatch={dispatch}
                stat={attack}
                pots={atk_pots}
                prayers={melee_prayers}/>

              <StatRow
                icon={strength_sprite}
                stat_name="strength"
                dispatch={dispatch}
                stat={strength}
                pots={str_pots}
                prayers={melee_prayers}/>

              <StatRow
                icon={defence_sprite}
                stat_name="defence"
                dispatch={dispatch}
                stat={defence}
                pots={def_pots}
                prayers={melee_prayers}/>

              <StatRow
                icon={range_sprite}
                stat_name="ranged"
                dispatch={dispatch}
                stat={ranged}
                pots={range_pots}
                prayers={range_prayers}/>

              <StatRow
                icon={magic_sprite}
                stat_name="magic"
                dispatch={dispatch}
                stat={magic}
                pots={magic_pots}
                prayers={magic_prayers}/>

              <StatRow
                icon={hp_sprite}
                stat_name="hitpoints"
                dispatch={dispatch}
                stat={hitpoints}
                pots={[]}
                prayers={[]}/>

              <StatRow
                icon={prayer_sprite}
                stat_name="prayer"
                dispatch={dispatch}
                stat={prayer}
                pots={[]}
                prayers={[]}/>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ stats }) {
  const { attack, defence, hitpoints, magic, prayer, ranged, strength } = stats

  return {
    attack,
    strength,
    defence,
    ranged,
    magic,
    hitpoints,
    prayer,
  }
}

export default connect(mapStateToProps)(Stats);
