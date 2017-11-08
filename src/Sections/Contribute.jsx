import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import {Icon, Input} from 'antd';

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedArtists: [],
      comments: [],
      castVotes: {},
      inputValue: ''
    }
    this.handleUpvote = this.handleUpvote.bind(this);
    this.calcLike = this.calcLike.bind(this);
    this.addArtist = this.addArtist.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let sortedArr = dummySuggestedArtistsArr.sort((a, b) => b.count - a.count)
    this.setState({
      suggestedArtists: sortedArr
    })
  };

  handleUpvote(name) {
    if (!this.state.castVotes[name]) {
      let newArr = this.state.suggestedArtists.reduce((acc, curr) => {
        if (curr.name === name) {curr.count++; acc.push(curr);}
        else {acc.push(curr);}
        return acc;
      }, []);
      let newCastVotes = this.state.castVotes;
      newCastVotes[name] = true;
      this.setState({
        suggestedArtists: newArr,
        castVotes: newCastVotes
      })
    }
  };

  calcLike(name) {
    let castVotesArr = Object.keys(this.state.castVotes);
    if (castVotesArr.includes(name)) return 'like'
    return 'like-o'
  }

  addArtist() {
    var newArr = this.state.suggestedArtists;
    let newName = this.state.inputValue.slice(0,1).toUpperCase() + this.state.inputValue.slice(1)
    let newObj = {
      name: newName,
      count: 0
    }
    newArr.push(newObj);
    this.setState({
      suggestedArtists: newArr,
      inputValue: ''
    })
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }


  render() {
    return (
      <Grid fluid={true} style={commentsSectionStyle}>
        <Row>
          <br/>
          <h3><u>Contribute</u></h3>
          <br/>
        </Row>
        <Row>
          <Col md={6}>
            <h4>Suggest Artists</h4>
            <br/>
            <Row>
            <Col md={6} style={suggestedArtistsStyle}>

            <ListGroup>
              {this.state.suggestedArtists.map((artist, i) => (
                <Row>
                    <ListGroupItem key={i} style={artistListEntry}>
                      <Col md={9}>
                        {artist.name}
                      </Col>
                      <Col md={1}>
                        {artist.count}
                      </Col>
                      <Col md={1}>
                        <Icon type={this.calcLike(artist.name)} style={centered} onClick={()=>this.handleUpvote(artist.name)}/>
                      </Col>
                    </ListGroupItem>
                </Row>
              ))}
            </ListGroup>

              <Row style={inputStyle}>
                <Col md={10}>
                  <Input placeholder='Add artist' value={this.state.inputValue} onChange={this.handleInputChange}/>
                </Col>
                <Col md={2}>
                  <Icon type='plus-circle-o' style={{ fontSize: '30px'}} onClick={this.addArtist}/>
                </Col>
              </Row>
              <br/><br/>
            </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h4>Comments</h4>
          </Col>
        </Row>
      </Grid>
    )
  }
};

const artistListEntry = {
  height: '5vh',
  width: '20vw'
}

const inputStyle = {
  width: '20vw',
  textAlign: 'center'
}

const centered = {
  textAlign: "center"
}

const commentsSectionStyle = {
  textAlign: "center",
  backgroundColor: '#8597bc'
}

const suggestedArtistsStyle = {
  marginLeft: '28%',
  textAlign: 'left'
}

const dummySuggestedArtistsArr = [
  {
    name: 'Lil Wayne',
    count: 5
  },
  {
    name: 'Eminem',
    count: 8
  },
  {
    name: 'Dr. Dre',
    count: 9
  },
  {
    name: 'Southside',
    count: 3
  },
  {
    name: 'Nas',
    count: 8
  },
  {
    name: 'Tupac',
    count: 10
  },
  {
    name: 'Chance the Rapper',
    count: 7
  },
  {
    name: 'Travis Scott',
    count: 5
  },
  {
    name: 'Kendrick Lamar',
    count: 7
  }
]

export default Contribute;
