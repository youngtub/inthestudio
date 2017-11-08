import React from 'react';
import {Row, Col} from 'react-bootstrap';

const About = (props) => {

  return (
    <div style={centered}>
    <h3><u>About</u></h3>
    <br/>
    <h5>InTheStudio is an interactive visualization of collaborations between rappers and producers</h5>
    <br/>
    {/*<p> You can approach it in 2 ways: </p>
    <ul>
      <li>By starting with all artists and narrowing down the scope (top-down) </li>
      <li>Starting with one artist, and building it up from there (ground-up)</li>
    </ul>*/}
      <br/>
      <p>More data coming soon!</p>
      <p>Feel free to mess around with the settings</p>
      <br/>
      <p> Also...</p>
      <p>Check out our proprietary <i>Surch</i>! It helps you to build up an aggregate search composed of multiple searches</p>
      <p>Click 'Demo' in the purple container above to try it out</p>
      <br/>
      {/*<Row>
        <Col md={4}></Col>
        <Col md={2}>
          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdWllPTTFJMEQ3cWs' height={200} width={200}></img>
        </Col>
        <Col md={2}>
          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdWmlCMFdJd2Y4Nnc' height={200} width={200}></img>
        </Col>
        <Col md={4}></Col>
      </Row>*/}
      <br/>
     <p>Of course, there are far too many artists to display, so I've started off with some of my favourite current artists.
       Please
       <a href='#contribute'> add suggestions </a> of who should be included!
     </p>

     <br/>

     </div>
  )
};

const centered = {
  textAlign: 'center'
}

export default About;
