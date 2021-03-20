import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { maxHitCalc, hitChance, calcDps, expected_ttk, overkill_dps } from '../utils/sharedDPS'

class Calcs extends Component {
  render(){
    const state = this.props

    return(
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Set 1</th>
              <th>Set 2</th>
              <th>Diff.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Maximum hit: </td>
              <td> {maxHitCalc(state, state.equipmentA)} </td>
              <td> {maxHitCalc(state, state.equipmentB)} </td>
            </tr>
            <tr>
              <td> Accuracy: </td>
              <td> {hitChance(state, state.equipmentA)} </td>
              <td> {hitChance(state, state.equipmentB)} </td>
            </tr>
            <tr>
              <td> DPS: </td>
              <td> {calcDps(state, state.equipmentA)} </td>
              <td> {calcDps(state, state.equipmentB)} </td>
            </tr>
            <tr>
              <td> Maximum hit: </td>
              <td> {maxHitCalc(state, state.equipmentA)} </td>
              <td> {maxHitCalc(state, state.equipmentB)} </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(Calcs);


// <tr>
//   <td> Accuracy: </td>
//   <td>{hitChance(state)}</td>
// </tr>
// <tr>
//   <td> DPS: </td>
//   <td>{calcDps(state)} </td>
// </tr>
// <tr>
//   <td> Time to kill: </td>
//   <td>{expected_ttk(state)} </td>
// </tr>
// <tr>
//   <td> Overkill DPS: </td>
//   <td>{overkill_dps(state)} </td>
// </tr>
