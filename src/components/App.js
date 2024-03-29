import React, { Component } from 'react';
import Stats from './Stats'
import Equipment from './Equipment'
import Calcs from './Calcs'
import Settings from './Settings'
import { Layout, Divider } from 'antd'
import headerIcon from '../data/icons/Bank_Camel.png'
import googleSheetsIcon from '../data/icons/google_sheets.png'
import osrsboxIcon from '../data/icons/osrsbox.png'
import osrswikiIcon from '../data/icons/osrswiki.png'

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Layout>
        <Header>
          <div className='title-container'>
            <div className='title-image'><img src={headerIcon} alt='Header Icon' /></div>
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
          <Divider />
        </Content>
        <Footer style={{textAlign: 'center',}}>
          <div>Last Updated: January 22nd, 2023</div>
          <div className='donation'>
            <a href="https://www.buymeacoffee.com/ami38" rel="noreferrer" target="_blank">
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" style={{height: 40, width: 143}}/>
            </a>
          </div>
          <div className='contribution-container'>
            <div className='contribution'>
              Made using data from:
            </div>
            <div className='contribution'>
              <img src={googleSheetsIcon} alt='Google Sheets Icon'/>
              <a href="https://docs.google.com/spreadsheets/d/1wBXIlvAmqoQpu5u9XBfD4B0PW7D8owyO_CnRDiTHBKQ" rel="noreferrer" target="_blank">Bitterkoekje</a>
            </div>
            <div className='contribution'>
              <img src={osrsboxIcon} alt='OSRSBox Icon'/>
              <a href="https://www.osrsbox.com/" rel="noreferrer" target="_blank">OSRSBox</a>
            </div>
            <div className='contribution'>
              <img src={osrswikiIcon} alt='OSRSWiki Icon'/>
              <a href="https://oldschool.runescape.wiki/" rel="noreferrer" target="_blank">OSRS Wiki</a>
            </div>
          </div>
          <div>OSRS DPS ©2022 Created by <a href="mailto:admin@osrs-dps.com">asmi38</a></div>
        </Footer>
      </Layout>
      </React.Fragment>
    )
  }
}

export default App;
