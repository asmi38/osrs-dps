import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCalc } from '../actions/calcs'
import { Tooltip, Switch, Popover, InputNumber, Tabs, Card, Select } from 'antd'
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
import markIcon from '../data/icons/mark_of_darkness.png'
import hpIcon from '../data/icons/hp.png'
import slayerIcon from '../data/icons/slayer.png'
import skullIcon from '../data/icons/Skullicon.png'
import vulnerabilityIcon from '../data/icons/Vulnerability.png'
import ghostIcon from '../data/icons/ghost.png'
import skeletonIcon from '../data/icons/skeleton.png'
import zombieIcon from '../data/icons/zombie.png'


const { TabPane } = Tabs;
const { Option } = Select;
const thralls = ["None", "Lesser", "Superior", "Greater"]
const thrallIcons = {
  "None": zombieIcon,
  "Lesser": zombieIcon,
  "Superior": skeletonIcon,
  "Greater": ghostIcon}


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
        <Card size='small' style={{width: 230}}>
        <Tabs defaultActiveKey="1">


            <TabPane tab="Settings" key="1">
              <div className="options-row">
                <img className='options-image' src={bgsIcon} alt="bandos godsword icon"/>
                <Tooltip placement="topLeft" title="Damage done by BGS specs" color={toolTipColour}>
                    <span className='options-name'>BGS Specs</span>
                </Tooltip>
                <InputNumber
                  value={calcs.bgs_dmg}
                  style={{width: 56, marginLeft: 'auto', alignSelf: 'center'}}
                  onChange={(value) => this.handleChange("bgs_dmg", value)}
                  min={0}
                />
              </div>

              <div className="options-row">
                <img className='options-image' src={dwhIcon} alt="dragon warhammer icon"/>
                <Tooltip placement="topLeft" title="Number of DWH Special Attacks" color={toolTipColour}>
                    <span className='options-name'>DWH Specials</span>
                </Tooltip>
                <InputNumber
                  value={calcs.dwh_specials}
                  style={{width: 56, marginLeft: 'auto', alignSelf: 'center'}}
                  onChange={(value) => this.handleChange("dwh_specials", value)}
                  min={0}
                />
              </div>

              <div className="options-row">
                <img className='options-image' src={arclightIcon} alt="arclight icon"/>
                <Tooltip placement="topLeft" title="Number of Arclight Special Attacks" color={toolTipColour}>
                      <span className='options-name'>Arclight Specs</span>
                </Tooltip>
                <InputNumber
                  value={calcs.arclight_specials}
                  style={{width: 56, marginLeft: 'auto', alignSelf: 'center'}}
                  onChange={(value) => this.handleChange("arclight_specials", value)}
                  min={0}
                />
              </div>

              <div className="options-row">
                <img className='options-image' src={hpIcon} alt="hp icon"/>
                <Tooltip placement="topLeft" title="Remaining HP for Dharok's bonus" color={toolTipColour}>
                    <span className='options-name'>Remaining HP</span>
                </Tooltip>
                <InputNumber
                  value={calcs.remaining_hp}
                  style={{width: 56, marginLeft: 'auto', alignSelf: 'center'}}
                  onChange={(value) => this.handleChange("remaining_hp", value)}
                  min={1}
                />
              </div>

              <div className="options-row">
                <img className='options-image' src={vulnerabilityIcon} alt="vulnerability icon"/>
                <Tooltip placement="topLeft" title="If vulnerability is cast, reducing 10% defence level" color={toolTipColour}>
                    <span className='options-name'>Vulnerability</span>
                </Tooltip>
                <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.vulnerability} onChange={(value) => this.handleChange("vulnerability", value)} />
              </div>

              <div className="options-row">
                <img className='options-image' src={diaryIcon} alt="diary icon"/>
                <Tooltip placement="topLeft" title="Kandarin hard diary completed (10% increased bolt proc)" color={toolTipColour}>
                    <span className='options-name'>Kandarin</span>
                </Tooltip>
                <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.kandarin_hard} onChange={(value) => this.handleChange("kandarin_hard", value)} />
              </div>

              <div className="options-row">
                <img className='options-image' src={slayerIcon} alt="slayer icon"/>
                <Tooltip placement="topLeft" title="Slayer task bonus if wearing Slayer Helm" color={toolTipColour}>
                    <span className='options-name'>Slayer Task</span>
                </Tooltip>
                <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.slayer_task} onChange={(value) => this.handleChange("slayer_task", value)} />
              </div>

              <div className="options-row">
                <img className='options-image' src={skullIcon} alt="wilderness icon"/>
                  <Tooltip placement="topLeft" title="If wilderness bonus applies, requires specific weapon for bonus" color={toolTipColour}>
                      <span className='options-name'>Wilderness</span>
                  </Tooltip>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.wilderness} onChange={(value) => this.handleChange("wilderness", value)} />
              </div>

              <div className="options-row">
                <img className='options-image' src={markIcon} alt="mark of darkness icon"/>
                  <Tooltip placement="topLeft" title="Mark of darkness applied: 25% damage and accuracy increase against demons" color={toolTipColour}>
                      <span className='options-name'>Mark of Darkness</span>
                  </Tooltip>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.mark_darkness} onChange={(value) => this.handleChange("mark_darkness", value)} />
              </div>

              <div className="options-row">
                <img className='options-image' src={thrallIcons[calcs.thrall]} alt="selected thrall icon"/>
                  <Tooltip placement="topLeft" title="Summoned thrall which provides DPS bonus" color={toolTipColour}>
                      <span className='options-name'>Thrall</span>
                  </Tooltip>
                  <Select
                    value={calcs.thrall}
                    style={{marginLeft: 'auto', alignSelf: 'center', width: 97}}
                    onChange={(value) => this.handleChange("thrall", value)}
                  >
                    {thralls.map((thrall) => (
                      <Option value={thrall} key={thrall}>
                        {thrall}
                      </Option>
                    ))}
                  </Select>
              </div>
            </TabPane>


            <TabPane tab="League Relics" key="2">
              <div className="options-container">
                <div className="options-row">
                  <b>Trailblazer</b>
                </div>

                <div className="options-row">
                  <img className='options-image' src={quickShotIcon} alt="quick shot icon"/>
                  <Popover placement="topLeft" content={quickShot} title="Quick Shot">
                      <span className='options-name'>Quick shot</span>
                  </Popover>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.quick_shot} onChange={(value) => this.handleChange("quick_shot", value)} />
                </div>

                <div className="options-row">
                  <img className='options-image' src={fluidStrikesIcon} alt="fluid strikes icon"/>
                  <Popover placement="topLeft" content={fluidStrikes} title="Fluid Strikes">
                      <span className='options-name'>Fluid Strikes</span>
                  </Popover>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.fluid_strikes} onChange={(value) => this.handleChange("fluid_strikes", value)} />
                </div>

                <div className="options-row">
                  <img className='options-image' src={doubleCastIcon} alt="double cast icon"/>
                  <Popover placement="topLeft" content={doubleCast} title="Double Cast">
                      <span className='options-name'>Double Cast</span>
                  </Popover>
                    <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.double_cast} onChange={(value) => this.handleChange("double_cast", value)} />
                </div>

                <div className="options-row">
                  <img className='options-image' src={tierSixIcon} alt="tier six icon"/>
                  <Popover placement="topLeft" content={tierSix} title="Tier 6 Bonus">
                      <span className='options-name'>Tier 6 bonus</span>
                  </Popover>
                    <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.tier6} onChange={(value) => this.handleChange("tier6", value)} />
                </div>

                <div className="options-row">
                  <b>Twisted</b>
                </div>

                <div className="options-row">
                  <img className='options-image' src={konarsBlessingIcon} alt="konars blessing icon"/>
                  <Popover placement="topLeft" content={konarsBlessing} title="Konar's Blessing">
                      <span className='options-name'>Konar's Blessing</span>
                  </Popover>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.konars_blessing} onChange={(value) => this.handleChange("konars_blessing", value)} />
                </div>

                <div className="options-row">
                  <img className='options-image' src={xericsFocusIcon} alt="xerics focus icon"/>
                  <Popover placement="topLeft" content={xericsFocus} title="Xeric's Focus">
                      <span className='options-name'>Xeric's Focus</span>
                  </Popover>
                  <Switch style={{marginLeft: 'auto', alignSelf: 'center'}} checked={calcs.xerics_focus} onChange={(value) => this.handleChange("xerics_focus", value)} />
                </div>
              </div>
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
