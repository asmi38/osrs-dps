import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { maxHitCalc, hitChance, calcDps, expected_ttk, overkill_dps } from '../utils/sharedDPS'
import Enemy from './Enemy'
import { Card } from 'antd'

class Calcs extends Component {
  calcDiff = (num1, num2) => {
    return (Math.max(num1, num2) / Math.min(num1, num2) - 1) * 100
  }

  render(){
    const state = this.props

    const maxA = maxHitCalc(state, state.equipmentA)
    const maxB = maxHitCalc(state, state.equipmentB)
    const maxDiff = this.calcDiff(maxA, maxB).toFixed(2)

    const accA = (hitChance(state, state.equipmentA) * 100).toFixed(2)
    const accB = (hitChance(state, state.equipmentB) * 100).toFixed(2)
    const accDiff = this.calcDiff(accA, accB).toFixed(2)

    const dpsA = calcDps(state, state.equipmentA).toFixed(4)
    const dpsB = calcDps(state, state.equipmentB).toFixed(4)
    const dpsDiff = this.calcDiff(dpsA, dpsB).toFixed(2)

    return(
      <div className='calcs'>
        <Card>
          <Enemy />
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
                <td> Max hit: </td>
                <td style={{color: maxA > maxB ? 'green' : 'black'}}> {maxA} </td>
                <td style={{color: maxB > maxA ? 'green' : 'black'}}> {maxB} </td>
                <td> {maxDiff}% </td>
              </tr>
              <tr>
                <td> Accuracy: </td>
                <td style={{color: accA > accB ? 'green' : 'black'}}> {accA}% </td>
                <td style={{color: accB > accA ? 'green' : 'black'}}> {accB}% </td>
                <td> {accDiff}% </td>
              </tr>
              <tr>
                <td> DPS: </td>
                <td style={{color: dpsA > dpsB ? 'green' : 'black'}}> {dpsA} </td>
                <td style={{color: dpsB > dpsA ? 'green' : 'black'}}> {dpsB} </td>
                <td> {dpsDiff}% </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(Calcs);
