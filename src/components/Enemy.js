import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEnemy } from '../actions/enemy'
import MonsterData from '../data/monster-list'
import { Select, Tooltip } from 'antd'
import kalphiteIcon from '../data/icons/kalphite_icon.png'
import dragonIcon from '../data/icons/dragon_icon.png'
import fieryIcon from '../data/icons/fireIcon.png'
import demonIcon from '../data/icons/demon_icon.png'
import undeadIcon from '../data/icons/vengeance_icon.png'
import leafyIcon from '../data/icons/kurask_icon.png'
import vampyreIcon from '../data/icons/vampyre_icon.png'

const { Option } = Select
const importantAttributes = ["kalphite", "dragon", "fiery", "demon", "undead", "leafy", "vampyre" ]
const attributeData = { kalphite: { icon: kalphiteIcon, text: 'Kalphite'},
                        dragon: { icon: dragonIcon, text: 'Dragon'},
                        fiery: { icon: fieryIcon, text: 'Fiery'},
                        demon: { icon: demonIcon, text: 'Demon'},
                        undead: { icon: undeadIcon, text: 'Undead'},
                        leafy: { icon: leafyIcon, text: 'Leafy'},
                        vampyre: { icon: vampyreIcon, text: 'Vampyre'}
                      }

class Enemy extends Component {
  render(){
    const { enemy, dispatch } = this.props

    return(
      <div className='enemy'>
        <div clasName='enemy-select'>
          <label>Enemy:</label>
          <Select
            showSearch
            optionFilterProp="label"
            value={enemy.id}
            style={{ width: 200, }}
            onChange={(value) => dispatch(changeEnemy(MonsterData[value]))}
          >
            {Object.keys(MonsterData).map((monster_key) =>
              <Option value={MonsterData[monster_key].id} label={MonsterData[monster_key].name} key={monster_key}>
                {MonsterData[monster_key].name}
              </Option>
            )}
          </Select>
        </div>
        <div className='enemy-icons'>
          {enemy.attributes.map((attribute) =>
            importantAttributes.includes(attribute)
              ? <Tooltip placement="top" title={attributeData[attribute].text} color="geekblue"><img className='image-icon' src={attributeData[attribute].icon} alt="attribute icon" /></Tooltip>
              : null)
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ enemy }){
  return{
    enemy,
  }
}

export default connect(mapStateToProps)(Enemy);
