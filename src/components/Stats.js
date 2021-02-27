import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeStat, changePrayer, changePotion } from '../actions/stats'
import attack_sprite from '../data/icons/attack.png'
import strength_sprite from '../data/icons/strength.png'
import defence_sprite from '../data/icons/defence.png'
import magic_sprite from '../data/icons/magic.png'
import range_sprite from '../data/icons/range.png'
import hp_sprite from '../data/icons/hp.png'
import prayer_sprite from '../data/icons/prayer.png'
import potion_sprite from '../data/icons/potion.png'
import stats_sprite from '../data/icons/stats1.png'

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
      <td className='poop'>
        <img src={icon} alt="stat icon"/>
        {stat_name}
      </td>
      <td>
        <input
          value={stat.level}
          onChange={(e) => dispatch(changeStat(stat_name, {...stat, "level": e.target.value}))}
          className="stat_input"
          type="number"
        />
      </td>
      <td>
        <select
          value={stat.potion}
            onChange={(e) => dispatch(changePotion(stat_name, {...stat, "potion": e.target.value}))}
          >
            {pots.map((pot) => (
              <option value={pot} key={pot}>
                {pot}
              </option>
            ))}
        </select>
      </td>
      <td>
        <select
          value={stat.prayer}
          onChange={(e) => dispatch(changePrayer(stat_name, {...stat, "prayer": e.target.value}))}
        >
          {prayers.map((prayer) => (
            <option value={prayer} key={prayer}>
              {prayer}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          value={stat.effective_level}
          onChange={(e) => dispatch(changeStat(stat_name, {...stat, "effective_level": e.target.value}))}
          className="stat_input"
          type="number"
        />
      </td>
    </React.Fragment>
  )
}

class Stats extends Component {
  render() {
    return (
      <div>
      <table>
        <thead>
         <tr>
          <th>Stats</th>
          <th><img src={stats_sprite} alt="Stats"/></th>
          <th><img src={potion_sprite} alt="Potion"/></th>
          <th><img src={prayer_sprite} alt="Prayer"/></th>
          <th>Effective</th>
         </tr>
        </thead>
        <tbody>
         <tr>
          <StatRow
            icon={attack_sprite}
            stat_name="Attack"
            dispatch={this.props.dispatch}
            stat={this.props.attack}
            pots={atk_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            icon={strength_sprite}
            stat_name="Strength"
            dispatch={this.props.dispatch}
            stat={this.props.strength}
            pots={str_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            icon={defence_sprite}
            stat_name="Defence"
            dispatch={this.props.dispatch}
            stat={this.props.defence}
            pots={def_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            icon={range_sprite}
            stat_name="Ranged"
            dispatch={this.props.dispatch}
            stat={this.props.ranged}
            pots={range_pots}
            prayers={range_prayers}/>
         </tr>
         <tr>
          <StatRow
            icon={magic_sprite}
            stat_name="Magic"
            dispatch={this.props.dispatch}
            stat={this.props.magic}
            pots={magic_pots}
            prayers={magic_prayers}/>
         </tr>
         <tr>
          <StatRow
            icon={hp_sprite}
            stat_name="Hitpoints"
            dispatch={this.props.dispatch}
            stat={this.props.hitpoints}
            pots={[]}
            prayers={[]}/>
         </tr>
         <tr>
          <StatRow
            icon={prayer_sprite}
            stat_name="Prayer"
            dispatch={this.props.dispatch}
            stat={this.props.prayer}
            pots={[]}
            prayers={[]}/>
         </tr>
        </tbody>
      </table>
    </div>
    )
  }
}

function mapStateToProps({ stats }) {
  const attack = stats.Attack
  const defence = stats.Defence
  const hitpoints = stats.Hitpoints
  const magic = stats.Magic
  const prayer = stats.Prayer
  const ranged = stats.Ranged
  const strength = stats.Strength

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
