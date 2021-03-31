import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { Tooltip, Switch, Popover, InputNumber, Tabs, Card } from 'antd'
import { quickShot, fluidStrikes, doubleCast, tierSix, konarsBlessing, xericsFocus } from '../utils/descriptions'

import konarsBlessingIcon from '../data/icons/Konars_Blessing.png'
import doubleCastIcon from '../data/icons/Double_Cast.png'
import fluidStrikesIcon from '../data/icons/Fluid_Strikes.png'
import quickShotIcon from '../data/icons/Quick_Shot.png'
import xericsFocusIcon from '../data/icons/Xerics_Focus.png'
import tierSixIcon from '../data/icons/Tier_Six.png'
import diaryIcon from '../data/icons/diary.png'
import bgsIcon from '../data/icons/bandos_godsword.png'
import dwhIcon from '../data/icons/dwh.png'
import arclightIcon from '../data/icons/Arclight.png'
import prayerIcon from '../data/icons/prayer.png'
import hpIcon from '../data/icons/hp.png'
import slayerIcon from '../data/icons/slayer.png'
import skullIcon from '../data/icons/Skullicon.png'


const { TabPane } = Tabs;


class Settings extends Component {
  handleChange = (name, value) => {
    if(value === true){
      this.props.dispatch(updateCalc(name, true))
    }
    else if(value === false){
      this.props.dispatch(updateCalc(name, false))
    }
    else {
      this.props.dispatch(updateCalc(name, value))
    }
  }

  render(){
    const { calcs } = this.props
    const toolTipColour = "geekblue"

    return(
      <div className='settings'>
        <Card size='small'>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Settings" key="1">
            <table>
              <tbody>
              <tr>
                <td>
                  <img src={bgsIcon} alt="bandos godsword icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Damage done by BGS specs" color={toolTipColour}>
                      <span>BGS Specs</span>
                  </Tooltip>
                </td>
                <td>
                  <InputNumber
                    value={calcs.bgs_dmg}
                    style={{width: 60,}}
                    onChange={(value) => this.handleChange("bgs_dmg", value)}
                    min={0}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={dwhIcon} alt="dragon warhammer icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Number of DWH Special Attacks" color={toolTipColour}>
                      <span>DWH Specials</span>
                  </Tooltip>
                </td>
                <td>
                  <InputNumber
                    value={calcs.dwh_specials}
                    style={{width: 60,}}
                    onChange={(value) => this.handleChange("dwh_specials", value)}
                    min={0}
                  />
                </td>
              </tr>


              <tr>
                <td>
                  <img src={arclightIcon} alt="arclight icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Number of Arclight Special Attacks" color={toolTipColour}>
                      <span>Arclight Specs</span>
                  </Tooltip>
                </td>
                <td>
                  <InputNumber
                    value={calcs.arclight_specials}
                    style={{width: 60,}}
                    onChange={(value) => this.handleChange("arclight_specials", value)}
                    min={0}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={hpIcon} alt="hp icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Remaining HP for Dharok's bonus" color={toolTipColour}>
                      <span>Remaining HP</span>
                  </Tooltip>
                </td>
                <td>
                  <InputNumber
                    value={calcs.remaining_hp}
                    style={{width: 60,}}
                    onChange={(value) => this.handleChange("remaining_hp", value)}
                    min={1}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={prayerIcon} alt="prayer icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Remaining Prayer for Bludgeon Special" color={toolTipColour}>
                      <span>Remaining Prayer</span>
                  </Tooltip>
                </td>
                <td>
                  <InputNumber
                    value={calcs.remaining_prayer}
                    style={{width: 60,}}
                    onChange={(value) => this.handleChange("remaining_prayer", value)}
                    min={0}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={diaryIcon} alt="diary icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Kandarin hard diary completed (10% increased bolt proc)" color={toolTipColour}>
                      <span>Kandarin</span>
                  </Tooltip>
                </td>
                <td>
                  <Switch checked={calcs.kandarin_hard} onChange={(value) => this.handleChange("kandarin_hard", value)} />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={slayerIcon} alt="slayer icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="Slayer task bonus if wearing Slayer Helm" color={toolTipColour}>
                      <span>Slayer Task</span>
                  </Tooltip>
                </td>
                <td>
                  <Switch checked={calcs.slayer_task} onChange={(value) => this.handleChange("slayer_task", value)} />
                </td>
              </tr>

              <tr>
                <td>
                  <img src={skullIcon} alt="wilderness icon"/>
                </td>
                <td>
                  <Tooltip placement="topLeft" title="If wilderness bonus applies, requires specific weapon for bonus" color={toolTipColour}>
                      <span>Wilderness</span>
                  </Tooltip>
                </td>
                <td>
                  <Switch checked={calcs.wilderness} onChange={(value) => this.handleChange("wilderness", value)} />
                </td>
              </tr>
              </tbody>
            </table>
          </TabPane>


          <TabPane tab="League Relics" key="2">
          <table>
            <tbody>
            <tr><b>Trailblazer</b></tr>
            <tr>
              <td>
                <img style={{width:"30px", height:"30px"}} src={quickShotIcon} alt="quick shot icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={quickShot} title="Quick Shot">
                    <span>Quick shot</span>
                </Popover>
              </td>
              <td>
                <Switch checked={calcs.quick_shot} onChange={(value) => this.handleChange("quick_shot", value)} />
              </td>
            </tr>

            <tr>
              <td>
                <img src={fluidStrikesIcon} alt="fluid strikes icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={fluidStrikes} title="Fluid Strikes">
                    <span>Fluid Strikes</span>
                </Popover>
              </td>
              <td>
                <Switch checked={calcs.fluid_strikes} onChange={(value) => this.handleChange("fluid_strikes", value)} />
              </td>
            </tr>

            <tr>
              <td>
                <img src={doubleCastIcon} alt="double cast icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={doubleCast} title="Double Cast">
                    <span>Double Cast</span>
                </Popover>
              </td>
              <td>
                  <Switch checked={calcs.double_cast} onChange={(value) => this.handleChange("double_cast", value)} />
              </td>
            </tr>

            <tr>
              <td>
                <img src={tierSixIcon} alt="tier six icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={tierSix} title="Tier 6 Bonus">
                    <span>Tier 6 bonus</span>
                </Popover>
              </td>
              <td>
                  <Switch checked={calcs.tier6} onChange={(value) => this.handleChange("tier6", value)} />
              </td>
            </tr>

            <tr><b>Twisted</b></tr>
            <tr>
              <td>
                <img src={konarsBlessingIcon} alt="konars blessing icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={konarsBlessing} title="Konar's Blessing">
                    <span>Konar's Blessing</span>
                </Popover>
              </td>
              <td>
                <Switch checked={calcs.konars_blessing} onChange={(value) => this.handleChange("konars_blessing", value)} />
              </td>
            </tr>


            <tr>
              <td>
                <img src={xericsFocusIcon} alt="xerics focus icon"/>
              </td>
              <td>
                <Popover placement="topLeft" content={xericsFocus} title="Xeric's Focus">
                    <span>Xeric's Focus</span>
                </Popover>
              </td>
              <td>
                <Switch checked={calcs.xerics_focus} onChange={(value) => this.handleChange("xerics_focus", value)} />
              </td>
            </tr>

            </tbody>
          </table>
        </TabPane>
        </Tabs>
        </Card>
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
