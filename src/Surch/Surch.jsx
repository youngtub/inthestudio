import React from 'react';
import Autosuggest from './Autosuggest';
import {Tag, Button} from 'antd';
import 'antd/dist/antd.css';
import {Row, Col} from 'react-bootstrap';

class Surch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      surchedArtists: []
    }
    this.surchArtists = this.surchArtists.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
    this.resetSurch = this.resetSurch.bind(this);
    this.demoSurch = this.demoSurch.bind(this);
  }

  componentWillMount() {
    console.log('all artists', this.props.allArtists)
  }

  surchArtists(name) {
    var newArtistsArray = this.state.surchedArtists.concat(name);
    this.setState({
      surchedArtists: newArtistsArray
    }, () => {
      // console.log('artists in Surch state', this.state.surchedArtists);
      this.props.applySurchCb(this.state.surchedArtists)
    })
  }

  removeArtist(name) {
    console.log('NAME IN SURCH', name)
    var filteredArtistsArray = this.state.surchedArtists.filter(artist => artist !== name);
    this.setState({
      surchedArtists: filteredArtistsArray
    }, () => {
      console.log('artists after delete state', this.state.surchedArtists);
      this.props.applySurchCb(this.state.surchedArtists)
    })
  }

  resetSurch() {
    this.setState({
      surchedArtists: []
    }, this.props.reset)
  };

  demoSurch() {
    this.setState({
      surchedArtists: ['Drake', 'Future', 'Metro Boomin', 'Offset', '21 Savage']
    }, () => {
      this.props.applySurchCb(this.state.surchedArtists)
    })
  }

  render() {
    return (
      <div id='surchContainer'>
        <div id='autosuggest' style={surchStyle}>
          <Row>
            <Col md={8}>
              <Autosuggest allArtists={this.props.allArtists} SurchCb={this.surchArtists} style={autosuggestStyle}/>
            </Col>
            <Col md={4} style={surchButtons}>
              <Button onClick={this.demoSurch}>Demo</Button>
              <Button onClick={this.resetSurch}> Reset</Button>
            </Col>
          </Row>
        </div>
        <br/>
        <Row>
        <Col md={4}>
          {
            this.state.surchedArtists.slice(0, 5).map((artist, i) => (
              <div style={surchStyle}>
                <Tag key={artist} closable={true}
                  afterClose={() => this.removeArtist(artist)} style={tagStyle}>
                  {artist}
                </Tag><br/><br/>
              </div>
            ))
          }
        </Col>

        <Col md={4} style={surchStyle}>
          {
            this.state.surchedArtists.slice(5, 10).map((artist, i) => (
              <div style={surchStyle}>
                <Tag key={artist} closable={true}
                  afterClose={() => this.removeArtist(artist)} style={tagStyle}>
                  {artist}
                </Tag><br/><br/>
              </div>
            ))
          }
        </Col>

        <Col md={4}></Col>
        </Row>
        <br/>
      </div>
    )
  }

};

const surchButtons = {
  // marginLeft: '3%'
}

const autosuggestStyle = {
  width: '70%'
}

const surchStyle = {
  // padding: '10px',
  marginLeft: '2%',
  marginTop: '2%'
}

const tagStyle = {
  // height: '5vh',
  // width: '7vw',
  // fontSize: '12px'
  marginLeft: '4%'
}

export default Surch;
