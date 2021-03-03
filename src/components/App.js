import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Enemy from './Enemy'
import Calcs from './Calcs'

class App extends Component {
  render() {
    return (
      <div>
        <Equipment />
        <Enemy />
        <Calcs />
      </div>
    )
  }
}

export default App;
