import React, { Component } from 'react';
import VizPanel from './Panels/VizPanel';
import 'antd/dist/antd.css';
import axios from 'axios';
import Menu from './Sections/Menu.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import ScrollableAnchor from 'react-scrollable-anchor'
import About from './Sections/About';
import Contribute from './Sections/Contribute'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObj: {}
    }
    this.passStateInSettings = this.passStateInSettings.bind(this);
  }

  componentDidMount() {
    // axios.get('/api/test').then((res)=>console.log('test', res))
  }

  passStateInSettings(obj) {
    this.setState({
      settingsObj: obj
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ScrollableAnchor id={'main'}>
          <h2> InTheStudio </h2>
          </ScrollableAnchor>
        </header>
        <Grid fluid={true}>


        <Row>
          <Col md={2}>
            <Menu passStateInSettings={this.passStateInSettings}/>
          </Col>

          <Col md={10}>
            <VizPanel settings={this.state.settingsObj}/>
          </Col>

        </Row>


      <ScrollableAnchor id={'about'}>
        <hr/>
      </ScrollableAnchor>
        <Row style={aboutStyle}>
          <br/>
          <About/>
          <br/><br/><hr/><br/><br/>
        </Row>


        <ScrollableAnchor id={'contribute'}>
        <Row>
          <Contribute />
        </Row>
        </ScrollableAnchor>

        <Row>
          <Col md={12} style={surfStyle}>
            <div style={surfStyle}>
              {/*<a style={black}> Powered by </a>*/}
              <h2 className='Balmain'> Surf </h2>
              </div>
              </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

const surfStyle = {
  float: 'right',
  backgroundColor: '#dbdde0'
}

// const black = {
//   color: 'black'
// }

const aboutStyle = {
  backgroundColor: '#afbdd3'
}

export default App;
