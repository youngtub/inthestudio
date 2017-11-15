const mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  title: String,
  vocalists: Array,
  producers: Array,
  engineers: Array,
  date: Date,
  genre: String,
  album: String,
  isRemix: Boolean
})

module.exports = mongoose.model('song', SongSchema);
