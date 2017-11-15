import React from 'react';
// import {Grid, Row, Col} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import $ from 'jquery';
import {Slider, Button, Checkbox, Radio} from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinks: false,
      roles: ['rapper', 'producer'],
      label: 'text',
      circleSize: 15,
      linkDistance: 200,
      artistNumber: 7
    }
    this.hideLinks = this.hideLinks.bind(this);
    this.showLinks = this.showLinks.bind(this);
    this.toggleRoles = this.toggleRoles.bind(this);
    this.setCircleSize = this.setCircleSize.bind(this);
    this.setLinkDistance = this.setLinkDistance.bind(this);
    this.setArtistsNumber = this.setArtistsNumber.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
  }

  componentDidUpdate() {
  }

  hideLinks() {
    $('.link').css('display', 'none');
  }

  showLinks() {
    $('.link').css('display', 'inline')
  }

  toggleRoles(val) {
    this.setState({
      roles: val
    }, () => {
      this.props.passStateInSettings(this.state)
    })
  }

  setCircleSize(val) {
    this.setState({
      circleSize: val
    }, () => {
      this.props.passStateInSettings(this.state)
    })
  }

  setLinkDistance(val) {
    this.setState({
      linkDistance: val
    }, () => {
      this.props.passStateInSettings(this.state)
    })
  }

  setArtistsNumber(val) {
    this.setState({
      artistNumber: val
    }, () => {
      this.props.passStateInSettings(this.state)
    })
  }

  toggleLabel(e) {
    this.setState({
      label: e.target.value
    }, () =>{
      this.props.passStateInSettings(this.state)
    })
  }

  render() {
    return (
      <Grid style={settingsContainer} className='settingsContainer'>
        <Row>
          <br/>
          <h3>Settings</h3>
          <br/><hr/><br/><br/>

          <Row>
            <Col md={1} style={settingTypeStyle}>
              <p>Links:</p><br/>
            </Col>
            <Col md={9}>
                <Button onClick={this.hideLinks}>Hide</Button>
                <Button onClick={this.showLinks}>Show</Button>
            </Col>
          </Row>

          <br/><hr/><br/>

        <Row>
          <Col md={2} style={settingTypeStyle}>
            <p>Include: </p>
          </Col>
          <Col md={9}>
            <CheckboxGroup style={{marginLeft: '20%'}} options={checkBoxOptions} defaultValue={['rapper', 'producer']} onChange={this.toggleRoles} />
          </Col>
        </Row>

        <br/><hr/><br/>

        <Row>
          <Col md={1} style={settingTypeStyle}>
            <p> Circle size: </p>
          </Col>
          <Col md={7} style={button}>
            <Slider style={sliderStyle} value={this.state.circleSize} max={30} min={3} onChange={this.setCircleSize}/>
          </Col>
        </Row>

        <br/><hr/><br/>

        <Row>
          <Col md={1} style={settingTypeStyle}>
            <p>Link distance:</p>
          </Col>
          <Col md={7} style={button}>
            <Slider style={sliderStyle} value={this.state.linkDistance} max={500} min={20} onChange={this.setLinkDistance}/>
          </Col>
        </Row>

        <br/><hr/><br/>

        <Row>
          <Col md={2} style={settingTypeStyle}>
            <p># of Artists: </p>
          </Col>
          <Col md={7} style={button}>
            <Slider style={sliderStyle} value={this.state.artistNumber} max={7} min={1} onChange={this.setArtistsNumber}/>
          </Col>
        </Row>

        <br/><hr/><br/>

          <Row>
            <Col md={1} style={settingTypeStyle}>
              <p> Label: </p>
            </Col>
            <Col md={9}>

              <RadioGroup onChange={this.toggleLabel} value={this.state.label}>
                  <RadioButton value="text">Text</RadioButton>
                  <RadioButton value="image">Image</RadioButton>
              </RadioGroup>
              {/*<ToggleButtonGroup style={button} type="radio" name='label' value={this.state.labelNum} onChange={this.toggleLabel}>
                <ToggleButton bsSize='small' value={1}>Text</ToggleButton>
                <ToggleButton bsSize='small' value={2}>Image</ToggleButton>
              </ToggleButtonGroup>*/}
            </Col>
          </Row>

          <br/><hr/><br/>

        </Row>
      </Grid>
    )
  }
};

const checkBoxOptions = [
  {label: 'Rappers', value: 'rapper'},
  {label: 'Producers', value: 'producer'}
]

const settingTypeStyle = {
  marginLeft: '5%'
}

const sliderStyle = {
  marginTop: '-17%'
}

const button = {
  zIndex: '300',
  marginLeft: '30%'
}

const settingsContainer = {
  border: 'solid black 1px',
  zIndex: 200,
  marginTop: '75%',
  marginLeft: '3%',
  width: '20vw',
  borderRadius: '10px',
  textAlign: 'center'
}

export default Settings;
