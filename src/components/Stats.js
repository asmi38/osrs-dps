import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card } from 'antd'
import User from './User'
import StatRow from './StatRow'
import attack_sprite from '../data/icons/attack.png'
import strength_sprite from '../data/icons/strength.png'
import defence_sprite from '../data/icons/defence.png'
import magic_sprite from '../data/icons/magic.png'
import range_sprite from '../data/icons/range.png'
import hp_sprite from '../data/icons/hp.png'
import prayer_sprite from '../data/icons/prayer.png'
import potion_sprite from '../data/icons/potion.png'
import stats_sprite from '../data/icons/stats1.png'
import miningIcon from '../data/icons/Mining_icon.png'

const atk_pots = ["None", "Attack", "Super Attack", "Zamorak Brew", "Overload", "Overload (+)"]
const str_pots = ["None", "Strength", "Super Strength", "Overload", "Overload (+)"]
const def_pots = ["None", "Defence", "Super Defence", "Saradomin Brew", "Overload", "Overload (+)"]
const melee_prayers = ["None", "Piety", "Chivalry", "15%", "10%", "5%"]
const magic_pots = ["None", "Magic", "Super Magic", "Imbued heart", "Overload", "Overload (+)"]
const magic_prayers = ["None", "5%", "10%", "15%", "Augury" ]
const range_pots = ["None", "Ranging", "Super Ranging", "Overload", "Overload (+)"]
const range_prayers = ["None", "5%", "10%", "15%", "Rigour"]
const mining_pots = ["None", "D pickaxe spec"]

class Stats extends Component {
  render() {
    const { attack, strength, ranged, magic, defence, prayer, hitpoints, dispatch, mining } = this.props

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

              <StatRow
                icon={miningIcon}
                stat_name="mining"
                dispatch={dispatch}
                stat={mining}
                pots={mining_pots}
                prayers={[]}/>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ stats }) {
  const { attack, defence, hitpoints, magic, prayer, ranged, strength, mining } = stats

  return {
    attack,
    strength,
    defence,
    ranged,
    magic,
    hitpoints,
    prayer,
    mining,
  }
}

export default connect(mapStateToProps)(Stats);
