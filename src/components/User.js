import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { handleFetchUser } from '../actions/stats'
import { Button, Input } from 'antd'
import { combatLvlCalc } from '../utils/calc'

function User(props)  {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch()
  const stats = useSelector(state => state.stats)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleFetchUser(username))
  }

  return (
    <div className='user'>
        <label className='username-label'>Username:</label>

          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onPressEnter={handleSubmit}
            style={{width: 150, height: 32}}
            placeholder="Enter username"
            allowClear
          />

        <Button
          type="primary"
          loading={stats.isFetching}
          onClick={handleSubmit}
        >
        Submit
        </Button>

        <p className='combat-level'>Level: <b>{combatLvlCalc(stats)}</b></p>
    </div>
  )
}

export default User
