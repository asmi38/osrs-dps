import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeStat, changePrayer, changePotion } from '../actions/stats'

const atk_pots = ["None", "Attack", "Super Attack", "Zamorak Brew", "Overload", "Overload (+)"]
const str_pots = ["None", "Strength", "Super Strength", "Overload", "Overload (+)"]
const def_pots = ["None", "Defence", "Super Defence", "Saradomin Brew", "Overload", "Overload (+)"]
const melee_prayers = ["None", "Piety", "Chivalry", "15%", "10%", "5%"]
const magic_pots = ["None", "Magic", "Super Magic", "Imbued heart", "Overload", "Overload (+)"]
const magic_prayers = ["None", "5%", "10%", "15%", "Augury" ]
const range_pots = ["None", "Ranging", "Super Ranging", "Overload", "Overload (+)"]
const range_prayers = ["None", "5%", "10%", "15%", "Rigour"]

function StatRow({stat_name, stat, dispatch, pots, prayers}){
  return(
    <React.Fragment>
      <td></td>
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
          <th>Level</th>
          <th>Potion</th>
          <th>Prayer</th>
          <th>Effective Level</th>
         </tr>
        </thead>
        <tbody>
         <tr>
          <StatRow
            stat_name="Attack"
            dispatch={this.props.dispatch}
            stat={this.props.attack}
            pots={atk_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            stat_name="Strength"
            dispatch={this.props.dispatch}
            stat={this.props.strength}
            pots={str_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            stat_name="Defence"
            dispatch={this.props.dispatch}
            stat={this.props.defence}
            pots={def_pots}
            prayers={melee_prayers}/>
         </tr>
         <tr>
          <StatRow
            stat_name="Ranged"
            dispatch={this.props.dispatch}
            stat={this.props.ranged}
            pots={range_pots}
            prayers={range_prayers}/>
         </tr>
         <tr>
          <StatRow
            stat_name="Magic"
            dispatch={this.props.dispatch}
            stat={this.props.magic}
            pots={magic_pots}
            prayers={magic_prayers}/>
         </tr>
         <tr>
          <StatRow
            stat_name="Hitpoints"
            dispatch={this.props.dispatch}
            stat={this.props.hitpoints}
            pots={[]}
            prayers={[]}/>
         </tr>
         <tr>
          <StatRow
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
