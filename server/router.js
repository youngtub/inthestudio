const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const mongodb = require('./db/mongo.js');
const artist = require('./db/mongoModels/artistModel.js');

router.get('/getArtistData', (req, res) => {
  var artistName = req.query.artistName;
  artistName = artistName.replace(/ /g, '+');
  var config = {
    headers: {
      "Authorization" : "Bearer BQCTsGN-NjuG5AKBiouxqCOiH_S8nRQhrSF-rD-dEskcba37q3rMnJuW6HYOf0LurZeSbKbweEXhWcOLGM229w"
    }
  }

  var closureData = {
    artistName: req.query.artistName,
    artistId: '',
    topTracks: [],
    albums: []
  }

  axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, config)
  .then((response) => {
    // console.log('RES FROM SPOT', response.data)
    var artistId = response.data.artists.items[0].id;
    closureData.artistId = artistId;

    axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, config)
    .then((topTracksData) => {
      // console.log('TOP TRACKS', topTracksData.data.tracks)
      closureData['topTracks'] = topTracksData.data.tracks
      axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, config)
      .then((artistAlbums) => {
        // console.log('ARTIST albums', artistAlbums.data)
        var albums = artistAlbums.data.items;
        // console.log('ALBUMS', albums.length)
        closureData['albums'] = albums;
        var albumId = albums[0].id;
        axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, config)
        .then((trackz) => {
          // console.log('tracks', trackz.data)
          var tracks = trackz.data.items;
          var trackId = tracks[0].id;
          axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, config)
          .then((audioAnalysis) => {
            // console.log('AUDIO Analysis', audioAnalysis.data)
          })
          .then(() => {
            axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, config)
            .then((features) => {
              // console.log('Audio Features', features.data)
            })
            .then(() => {
              artist.create({
                name: closureData.artistName,
                data: closureData
              })
              res.send(JSON.stringify(closureData))
            })
          })
        })
      })
    })
  })
  .catch((err) => console.log('error', err))

})


module.exports = router;
