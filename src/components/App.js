import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Enemy from './Enemy'
import Calcs from './Calcs'
import User from './User'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <User />
        <Stats />
        <Equipment />
        <Enemy />
        <Calcs />
      </React.Fragment>
    )
  }
}

export default App;
