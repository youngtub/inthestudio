import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

const InfoPanel = (props) => {

  const calculateLinks = () => {
    var relevantLinks = props.links.reduce((acc, curr) => {
      if (curr.source.name === props.selectedArtist.name && curr.value > 0) {
        acc[`${curr.target.name}`] = curr.value;
      }
      if (curr.target.name === props.selectedArtist.name && curr.value > 0) {
        acc[`${curr.source.name}`] = curr.value;
      }
      return acc;
    }, {})
    var outputArr = [];
    for (var key in relevantLinks) {
      let tempObj = {
        'name':key,
        'count': relevantLinks[key]
      }
      outputArr.push(tempObj)
    }
    outputArr.sort((a,b)=>b.count-a.count);
    return outputArr
  }

  return (
    <div id='infoPanel'>

    {props.display === 'artist' ? (
      <Grid fluid={true}>


      <Row>

        <Col sm={12} md={12} style={centered}>

          <Row>
            <h2>{props.selectedArtist.name}</h2>
          </Row>

          <Row>
            <img src={props.selectedArtist.thumbnail} height={150} width={160}/>
          </Row>

          <Row>
            {props.selectedArtist.role}
          </Row>
        </Col>

      </Row>

      <Row style={offset}>

        <br/><hr/><br/>

        <Col md={6}>
          <h4 style={centered}> Songs </h4>
          <br/>

          <ListGroup>
            {props.songs.map((song, i) => (
              <ListGroupItem key={i}>
                {song.title}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>

        <Col md={6}>
          <h4 style={centered}> Collabs </h4>
          <br/>
          {calculateLinks(props.links).map((link, i) => (
            <ListGroupItem key={i} onClick={() => props.infoPanelCallback(link.name)}>
              {link.name} : {link.count}
            </ListGroupItem>
          ))}
        </Col>

      </Row>

    </Grid>
  ) : ''}

    {props.display === 'link' ? (
      <Grid fluid={true}>
        <Row className="show-grid">

          <Col sm={6} md={6} className='artist1' style={centered}>

            <Row>
              {props.selectedLink.source.name}
            </Row>

            <Row>
              <img src={props.selectedLink.source.thumbnail} height={150} width={160}/>
            </Row>

            <Row>
              {props.selectedLink.source.role}
            </Row>

          </Col>

          <Col sm={6} md={6} className='artist2' style={centered}>

            <Row>
              {props.selectedLink.target.name}
            </Row>

            <Row>
              <img src={props.selectedLink.target.thumbnail} height={150} width={160}/>
            </Row>

            <Row>
              {props.selectedLink.target.role}
            </Row>

          </Col>

        </Row>

        <Row style={centered}>
          <br/><hr/><br/>
          <h4 style={centered}> Songs </h4>
          <br/>
          <Col md={3}></Col>
          <Col md={6}>
          <ListGroup>
          {props.songs.map((song, i) => (
            <ListGroupItem key={i}>
              {song.title}
            </ListGroupItem>
          ))}
          </ListGroup>
        </Col>
        <Col md={3}></Col>
        </Row>

      </Grid>

    ) : ''}

    {props.display === '' ? (
      <Col md={12}>
        <img src='https://drive.google.com/uc?id=1bEsmi0UXdfDE0awAY5O0u6U1bB3v0lZK' height={230} width={300}></img>
        <br/><br/><br/>
        <p>Click on an Artist or Link to learn more</p>
      </Col>
    ) : ''}

    </div>
  )
};

const centered = {
  textAlign: "center",
  align: "center"
}

const offset = {
  // marginLeft: '7%'
}

export default InfoPanel;
