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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({username: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(handleFetchUser(this.state.username))
  }

  render(){
    return(
      <div>
          <label> Username: </label>

            <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onPressEnter={this.handleSubmit}
              style={{width: 150,}}
              allowClear
              size="medium"
            />

          <Button
            type="primary"
            loading={this.props.stats.isFetching}
            onClick={this.handleSubmit}
          >
          Submit
          </Button>

          Combat Level: {combatLvlCalc(this.props.stats)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { stats: state.stats }
}

export default connect(mapStateToProps)(User)
