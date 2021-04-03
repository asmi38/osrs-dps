import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleFetchUser } from '../actions/stats'
import { Button, Input } from 'antd'
import { combatLvlCalc } from '../utils/calc'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  handleChange = (e) => this.setState({username: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(handleFetchUser(this.state.username))
  }

  render(){
    return(
      <div className='user'>
          <label className='username-label'>Username:</label>

            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onPressEnter={this.handleSubmit}
              style={{width: 150, height: 32}}
              placeholder="Enter username"
              allowClear
            />

          <Button
            type="primary"
            loading={this.props.stats.isFetching}
            onClick={this.handleSubmit}
          >
          Submit
          </Button>

          <p className='combat-level'>Level: <b>{combatLvlCalc(this.props.stats)}</b></p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { stats: state.stats }
}

export default connect(mapStateToProps)(User)
