const mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
  topTracks: Array,
  albums: Array
});

module.exports = mongoose.model('artist', ArtistSchema);
