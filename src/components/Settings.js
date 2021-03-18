import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'

class Settings extends Component {
  handleChange = (e) => {
    const { value, name } = e.target

    if(value === "true"){
      this.props.dispatch(updateCalc(name, true))
    }
    else if(value === "false"){
      this.props.dispatch(updateCalc(name, false))
    }
    else {
      this.props.dispatch(updateCalc(name, value))
    }
  }

  render(){
    const { calcs } = this.props

    return(
      <div>
        <table>
          <p>Options</p>


          <tr>
            <td>BGS Specs</td>
            <td>
              <input
                type="number"
                value={calcs.bgs_specials}
                name="bgs_specials"
                onChange={this.handleChange}
              >
              </input>
            </td>
          </tr>


          <tr>
            DWH Specs
            <td>
              <input
                type="number"
                value={calcs.dwh_specials}
                name="dwh_specials"
                onChange={this.handleChange}
              >
              </input>
            </td>
          </tr>


          <tr>
            Arclight Specs
            <td>
              <input
                type="number"
                value={calcs.arclight_specials}
                name="arclight_specials"
                onChange={this.handleChange}
              >
              </input>
            </td>
          </tr>


          <tr>
            Kandarin
            <td>
              <select value={calcs.kandarin_hard} name="kandarin_hard" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <tr>
            Remaining HP
            <td>
              <input
                type="number"
                value={calcs.remaining_hp}
                name="remaining_hp"
                onChange={this.handleChange}
              >
              </input>
            </td>
          </tr>


          <tr>
            Remaining Prayer
            <td>
              <input
                type="number"
                value={calcs.remaining_prayer}
                name="remaining_prayer"
                onChange={this.handleChange}
              >
              </input>
            </td>
          </tr>


          <tr>
            On task
            <td>
              <select value={calcs.slayer_task} name="slayer_task" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <tr>
            Wildy
            <td>
              <select value={calcs.wilderness} name="wilderness" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>

          <p>League Relics</p>
          <p>Trailblazer</p>


          <tr>
            Quickshot
            <td>
              <select value={calcs.quick_shot} name="quick_shot" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <tr>
            Fluid Strikes
            <td>
              <select value={calcs.fluid_strikes} name="fluid_strikes" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <tr>
            Double Cast
            <td>
              <select value={calcs.double_cast} name="double_cast" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <tr>
            Tier 6 Bonus
            <td>
              <select value={calcs.tier6} name="tier6" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>


          <p>Trailblazer</p>
          <tr>
            Konar's Blessing
            <td>
              <select value={calcs.konars_blessing} name="konars_blessing" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>
          <tr>
            Xeric's focus
            <td>
              <select value={calcs.xerics_focus} name="xerics_focus" onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

function mapStateToProps({ calcs }){
  return{
    calcs
  }
}

export default connect(mapStateToProps)(Settings);
