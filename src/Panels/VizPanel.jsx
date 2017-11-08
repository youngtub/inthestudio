import React from 'react';
import * as d3 from 'd3';
import InfoPanel from './InfoPanel';
import Surch from '../Surch/Surch';
import {Grid, Row, Col} from 'react-bootstrap';
import $ from 'jquery';

class VizPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // jsonObj: {},
      artists: [],
      songs: [],
      links: [],
      artistsLibrary: [],
      linksLibrary: [],
      songsLibrary: [],
      selectedArtist: {},
      selectedLink: {},
      display: ''
    }
    this.generateCharts = this.generateCharts.bind(this);
    this.applySurchCb = this.applySurchCb.bind(this);
    this.infoPanelCallback = this.infoPanelCallback.bind(this);
  }

  componentDidMount() {
    //axios call to db

    this.setState({
      // jsonObj: jsonData,
      artists: jsonData.nodes,
      artistsLibrary: jsonData.nodes,
      songs: jsonData.songs,
      songsLibrary: jsonData.songs,
      links: jsonData.links,
      linksLibrary: jsonData.links
    }, this.generateCharts);

  };

  componentWillReceiveProps() {
    // console.log('PROPS IN VIZPANEL', this.props.settings)
    setTimeout(() => this.generateCharts(), 100)
  }

  generateCharts() {


    d3.select('#canvas').selectAll('svg').remove();

    var width = 960,
        height = 700

    var svg = d3.select("#canvas").append("svg")
        .attr("width", width)
        .attr("height", height);

    var linkDistance = this.props.settings.linkDistance || 200;
    var circleSize = this.props.settings.circleSize || 12;
    var artistNum = this.props.settings.artistNumber || 7;
    var roles = this.props.settings.roles || ['rapper', 'producer'];
    var label = this.props.settings.label || 'text';

    var limitedArtists = this.state.artists.filter((artist, i) => {
      return i < artistNum && roles.includes(artist.role);
    })

    var limitedArtistsIds = limitedArtists.reduce((acc, curr) => {
      acc.push(curr.id); return acc;
    }, [])
    var limitedLinks = this.state.linksLibrary.filter((link, i) => {
      // console.log('link this time', link.source)
      return limitedArtistsIds.includes(link.source.id) && limitedArtistsIds.includes(link.target.id) || limitedArtistsIds.includes(link.source) && limitedArtistsIds.includes(link.target)
    })
    // console.log('LTDLINKS', limitedLinks)
    var nodes = d3.forceSimulation(limitedArtists)
    .force("charge", d3.forceManyBody().strength(-100))
    .force("link", d3.forceLink(this.state.links)
      .distance((d) => {
        return d.value > 0 ? linkDistance/Math.pow(d.value, 1) : linkDistance;
      })
      .strength((d) => {
        return d.value > 0 ? d.value*2 : 1;
      })
      )
    .force("center", d3.forceCenter(400, 300))
    .force("gravity", d3.forceManyBody().strength(-50))
    // .force("distance", d3.forceManyBody(100))

    .force('collision', d3.forceCollide().radius(function(d) {
      return 30
    }))
    .force("size", d3.forceManyBody([width, height]));

    var link = svg.selectAll(".link").data(limitedLinks).enter()
        .append("line")
        .attr("class", (d) => `link ${d.source.name.split(' ').join('')} ${d.target.name.split(' ').join('')}`)
        .attr("stroke-width", (d) => d.value*3);

        // .attr("height", (d) => d.value/2)
          // .call(force.drag);
          $('.link').toggle();

    link.on("click", (d) => {
        console.log('selected link', d);

        var songsArr = this.state.songsLibrary.filter(song => {
          return d.songList.includes(song.id)
        })

        this.setState({
          display: 'link',
          selectedLink: d,
          songs: songsArr
        })
      });

var node = svg.selectAll(".node").data(limitedArtists).enter()
    .append("g").attr("class", "node")
    .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
    );

function dragstarted() {
  if (!d3.event.active) nodes.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) nodes.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}

// append("svg:image")
// .attr('x', -9)
// .attr('y', -12)
// .attr('width', 20)
// .attr('height', 24)
// .attr("xlink:href", "resources/images/check.png")



if (label === 'image') {

  node.append("circle")
      .attr("r", circleSize*2.3)
      .attr("fill", function(d) { return d.role === 'rapper' ? '#241587' : '#3f88a3' })
      .attr("class", (d) => `${d.role} ${d.name} node`);

  node.append("svg:image")
      .attr('x', -circleSize*1.5)
      .attr('y', -circleSize*1.5)
      .attr('width', circleSize*3)
      .attr('height', circleSize*3)
      .attr("border-radius", '50%')
      .attr("xlink:href", (d) => `${d.thumbnail}`)
} else {
  node.append("circle")
      .attr("r", circleSize)
      .attr("fill", function(d) { return d.role === 'rapper' ? '#241587' : '#3f88a3' })
      .attr("class", (d) => `${d.role} ${d.name} node`);

  node.append("text")
      .attr("dx", 15).attr("dy", ".70em")
      .text(function(d) { return d.name })
      .style("font-size", "14px")
      .attr("class", (d) => `${d.role} ${d.name}`)
}

    node.on('click', d => {

      var songsArr = this.state.songsLibrary.filter(song => {
        return d.songs.includes(song.id)
      })
      let artist = d.name;
      var relatedLinks = this.state.linksLibrary.filter(link => {
        // console.log('LINK', link)
        return link.source.name === artist || link.target.name === artist;
      })
      console.log('ARTIST', artist)

      // $(`.${artist.split(' ').join('')}`).css('display', 'inline');
      $('.link').css('display', 'none')
      $(`.${artist.split(' ').join('')}.link`).toggle();

      this.setState({
        selectedArtist: d,
        display: 'artist',
        songs: songsArr,
        links: relatedLinks
      }, () => {
        console.log('artist in state', this.state.selectedArtist)
        // this.generateCharts();
      })
    });

      nodes.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });

  };

  applySurchCb(surchArr) {
    // console.log('surch array', surchArr)
    var filteredArtistsArray = this.state.artistsLibrary.filter(artist => {
      return surchArr.includes(artist.name);
    });

    var filteredLinksArray = this.state.linksLibrary.filter(link => {
      if (surchArr.length === 1) {
        return false;
      } else {
        return surchArr.includes(link.source.name) && surchArr.includes(link.target.name);
      }
    })
    this.setState({
      artists: filteredArtistsArray,
      links: filteredLinksArray
    }, () => {
      console.log('state in viz panel', this.state)
      this.generateCharts()
    })
  }

  infoPanelCallback(name) {
    var newSelectedArtist = this.state.artists.filter(artist => artist.name === name)[0];
    var newSongs = this.state.songsLibrary.filter(song => {
      return newSelectedArtist.songs.includes(song.id)
    })
    this.setState({
      selectedArtist: newSelectedArtist,
      display: 'artist',
      songs: newSongs
    }, () => {
      $(`.link`).css('display', 'none');
      $(`.${name.split(' ').join('')}`).css('display', 'inline');
    })
  };

  render() {
    return (
        <Grid fluid={true}>

          <Row>

            <Col md={9} className="show-grid">
              <div id='canvas' style={border}></div>
            </Col>

            <Col md={3} style={border}>

              <Row className="show-grid">
                  <InfoPanel selectedArtist={this.state.selectedArtist} selectedLink={this.state.selectedLink}
                    display={this.state.display} artists={this.state.artists}
                    songs={this.state.songs} links={this.state.linksLibrary}
                    infoPanelCallback={this.infoPanelCallback}
                    />
              </Row>

              <Row className="show-grid">
                  <Surch allArtists={this.state.artistsLibrary} applySurchCb={this.applySurchCb}/>
              </Row>

            </Col>

          </Row>

        </Grid>
    )
  }

};

const border = {
  // border: 'solid black 1px'
}

const jsonData = {
  "nodes": [
    {
      "id": 0,
      "name": "Metro Boomin",
      "role": "producer",
      "thumbnail": "http://bluntiq.com/media/2017/06/1498194822_4290326ce261592ad7c489abca79f4c4-1.jpg",
      "collabs": {
        "1": 2,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 2
      },
      "songs": [0, 1, 2, 3, 4]
    },
    {
      "id": 1,
      "name": "Offset",
      "role": "rapper",
      "thumbnail": "http://s3.amazonaws.com/hiphopdx-production/2016/03/Offset-Migos-827x620.jpg",
      "collabs": {
        "0": 2,
        "2": 1,
        "3": 1
      },
      "songs": [0, 1]
    },
    {
      "id": 2,
      "name": "Drake",
      "role": "rapper",
      "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Drake_and_Future_2016_Summer_Sixteen_Tour.jpg/220px-Drake_and_Future_2016_Summer_Sixteen_Tour.jpg",
      "collabs": {
        "0": 1,
        "1": 1,
        "5": 1,
        "6": 1
      },
      "songs": [5]
    },
    {
      "id": 3,
      "name": "Lil Uzi Vert",
      "role": "rapper",
      "thumbnail": "http://blameebro.com/wp-content/uploads/2016/12/how-rich-is-lil-uzi-vert-liluziv.jpg",
      "collabs": {
        "0": 1,
        "1": 1
      },
      "songs": [1]
    },
    {
      "id": 4,
      "name": "21 Savage",
      "role": "rapper",
      "thumbnail": "http://images.genius.com/66dcc06b58c51a9c3ed8d42abfdc4f3d.783x783x1.jpg",
      "collabs": {
        "0": 1
      },
      "songs": [2, 3]
    },
    {
      "id": 5,
      "name": "Future",
      "role": "rapper",
      "thumbnail": "http://s3.amazonaws.com/factmag-images/wp-content/uploads/2016/02/03003149/Future-2-25-16.png",
      "collabs": {
        "0": 2,
        "4": 1,
        "5": 1
      },
      "songs": [3, 4, 5]
    },
    {
      "id": 6,
      "name": "Zaytoven",
      "role": "producer",
      "thumbnail": "http://go.a3cfestival.com/hubfs/zaytoven-trap-music-definition-0.jpg",
      "collabs": {
        "2": 1,
        "5": 1
      },
      "songs": [5]
    }
  ],

  "songs": [
    {
      "id": 0,
      "title": "No Complaints",
      "rappers": [1, 2],
      "producers": [0]
    },
    {
      "id": 1,
      "title": "Bad & Boujee (feat. Lil Uzi Vert)",
      "rappers": [1, 3],
      "producers": [0]
    },
    {
      "id": 2,
      "title": "No Heart",
      "rappers": [4],
      "producers": [0]
    },
    {
      "id": 3,
      "title": "X (feat. Future)",
      "rappers": [4, 5],
      "producers": [0]
    },
    {
      "id": 4,
      "title": "Purple Rain",
      "rappers": [5],
      "producers": [0]
    },
    {
      "id": 5,
      "title": "Used to This",
      "rappers": [2, 5],
      "producers": [6]
    }
  ],
  "links": [
    {"source": 0, "target": 1, "value": 2, "songList": [0, 1] },
    {"source": 0, "target": 2, "value": 1, "songList": [0] },
    {"source": 0, "target": 3, "value": 1, "songList": [1] },
    {"source": 0, "target": 4, "value": 2, "songList": [2, 3] },
    {"source": 0, "target": 5, "value": 2, "songList": [3, 4] },
    {"source": 0, "target": 6, "value": 0, "songList": [] },
    {"source": 1, "target": 2, "value": 1, "songList": [0] },
    {"source": 1, "target": 3, "value": 1, "songList": [1] },
    {"source": 1, "target": 4, "value": 0, "songList": [] },
    {"source": 1, "target": 5, "value": 0, "songList": [] },
    {"source": 1, "target": 6, "value": 0, "songList": [] },
    {"source": 2, "target": 5, "value": 1, "songList": [5] },
    {"source": 2, "target": 3, "value": 0, "songList": [0] },
    {"source": 2, "target": 4, "value": 0, "songList": [0] },
    {"source": 4, "target": 3, "value": 0, "songList": [] },
    {"source": 4, "target": 6, "value": 0, "songList": [] },
    {"source": 4, "target": 5, "value": 1, "songList": [3] },
    {"source": 6, "target": 5, "value": 1, "songList": [5] },
    {"source": 6, "target": 2, "value": 1, "songList": [5] }
  ]
}


export default VizPanel;
