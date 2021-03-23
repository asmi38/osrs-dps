import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEnemy } from '../actions/enemy'
import MonsterData from '../data/monster-list'
import { Select } from 'antd'

const { Option } = Select

class Enemy extends Component {
  render(){
    const { enemy, dispatch } = this.props

    return(
      <div>
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
    )
  }
}

function mapStateToProps({ enemy }){
  return{
    enemy,
  }
}

export default connect(mapStateToProps)(Enemy);
