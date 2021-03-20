import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Enemy from './Enemy'
import Calcs from './Calcs'
import User from './User'
import Settings from './Settings'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <User />
        <Stats />
        <Equipment actionKey={"A"}/>
        <Equipment actionKey={"B"}/>
        <Enemy />
        <Calcs />
        <Settings />
      </React.Fragment>
    )
  }
}



export default App;
