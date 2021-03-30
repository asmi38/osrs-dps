import React, { Component } from 'react';
import { connect } from 'react-redux'
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
    const maxDiff = this.calcDiff(maxA, maxB)

    const accA = (hitChance(state, state.equipmentA) * 100)
    const accB = (hitChance(state, state.equipmentB) * 100)
    const accDiff = this.calcDiff(accA, accB)

    const dpsA = calcDps(state, state.equipmentA)
    const dpsB = calcDps(state, state.equipmentB)
    const dpsDiff = this.calcDiff(dpsA, dpsB)

    const ttkA = expected_ttk(state, state.equipmentA)
    const ttkB = expected_ttk(state, state.equipmentB)
    const ttkDiff = this.calcDiff(ttkA, ttkB)

    const okA = overkill_dps(state, state.equipmentA)
    const okB = overkill_dps(state, state.equipmentB)
    const okDiff = this.calcDiff(okA, okB)

    return(
      <div className='calcs'>
        <Card size='small'>
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
                <td className={maxA > maxB ? 'text-higher' : 'text-lower'}> {maxA} </td>
                <td className={maxB > maxA ? 'text-higher' : 'text-lower'}> {maxB} </td>
                <td> {maxDiff.toFixed(2)}% </td>
              </tr>
              <tr>
                <td> Accuracy: </td>
                <td className={accA > accB ? 'text-higher' : 'text-lower'}> {accA.toFixed(2)}% </td>
                <td className={accB > accA ? 'text-higher' : 'text-lower'}> {accB.toFixed(2)}% </td>
                <td> {accDiff.toFixed(2)}% </td>
              </tr>
              <tr>
                <td> DPS: </td>
                <td className={dpsA > dpsB ? 'text-higher' : 'text-lower'}> {dpsA.toFixed(4)} </td>
                <td className={dpsB > dpsA ? 'text-higher' : 'text-lower'}> {dpsB.toFixed(4)} </td>
                <td> {dpsDiff.toFixed(2)}% </td>
              </tr>
              <tr>
                <td> Overkill DPS: </td>
                <td className={okA > okB ? 'text-higher' : 'text-lower'}> {okA.toFixed(4)} </td>
                <td className={okB > okA ? 'text-higher' : 'text-lower'}> {okB.toFixed(4)} </td>
                <td> {okDiff.toFixed(2)}% </td>
              </tr>
              <tr>
                <td> Time to kill: </td>
                <td className={ttkA < ttkB ? 'text-higher' : 'text-lower'}> {ttkA.toFixed(1)} </td>
                <td className={ttkB < ttkA ? 'text-higher' : 'text-lower'}> {ttkB.toFixed(1)} </td>
                <td> {ttkDiff.toFixed(2)}% </td>
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
