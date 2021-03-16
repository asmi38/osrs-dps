import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleFetchUser } from '../actions/stats'

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
        <form className='username' onSubmit={this.handleSubmit}>
          <label> Username: </label>
            <input
              type="text"
              className="input"
              value={this.state.value}
              onChange={this.handleChange}
            />
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(User)
