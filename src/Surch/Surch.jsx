import React from 'react';
import Autosuggest from './Autosuggest';
import {Tag} from 'antd';
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

  render() {
    return (
      <div id='surchContainer'>
        <div id='autosuggest' style={surchStyle}>
          <Autosuggest allArtists={this.props.allArtists} SurchCb={this.surchArtists} />
        </div>
        <br/><br/>

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

        <Col md={4}>
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
        <br/>
      </div>
    )
  }

};

const surchStyle = {
  // padding: '10px',
  marginLeft: '2%',
  marginTop: '2%'
}

const tagStyle = {
  // height: '5vh',
  // width: '7vw',
  // fontSize: '12px'
}

export default Surch;
