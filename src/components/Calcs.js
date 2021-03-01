import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'



class Calcs extends Component {
  render(){
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Set 1</th>
              <th> </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Maximum hit: </td>
              <td> number </td>
            </tr>
            <tr>
              <td> Accuracy: </td>
              <td> acc number</td>
            </tr>
            <tr>
              <td> DPS: </td>
              <td> dps number </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


function mapStateToProps({ calcs }) {
  return {
    calcs
  }
}





export default connect(mapStateToProps)(Calcs);
