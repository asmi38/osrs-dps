import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Calcs from './Calcs'
import Settings from './Settings'
import { Layout } from 'antd'
import GnomeChildIcon from '../data/icons/gnome-child.png'

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Layout>
        <Header>
          <div className='title-container'>
            <div className='title-image'><img src={GnomeChildIcon} /></div>
            <div className='title-text'> OSRS DPS</div>
          </div>
        </Header>
        <Content>
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
        </Content>
        <Footer style={{textAlign: 'center' }}>OSRS DPS ©2021 Created by asmi38</Footer>
      </Layout>
      </React.Fragment>
    )
  }
}

export default App;
