import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEnemy } from '../actions/enemy'
import MonsterData from '../data/monster-list'

class Enemy extends Component {
  render(){
    const { enemy, dispatch } = this.props

    return(
      <div>
        Enemy:
        <select
          value={enemy.id}
          onChange={(e) => dispatch(changeEnemy(MonsterData[e.target.value]))}
        >
          {Object.keys(MonsterData).map((monster_key) =>
            <option
              value={monster_key}
              key={monster_key}
            >
              {MonsterData[monster_key].name}
            </option>
          )}
        </select>
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
