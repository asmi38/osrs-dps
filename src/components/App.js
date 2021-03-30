import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Calcs from './Calcs'

import Settings from './Settings'

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className='container'>
        <div className='settings-container'>
          <Stats />
          <Calcs />
          <Settings />
        </div>
        <div className='equipment-container'>
          <Equipment actionKey={"A"}/>
          <Equipment actionKey={"B"}/>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default App;
