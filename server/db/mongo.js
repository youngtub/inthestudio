const mongoose = require('mongoose');

mongoose.connect('mongodb://anr:wakalaka@ds255265.mlab.com:55265/inthestudio');
const db = mongoose.connection;

db.on('error', (err) => console.error('Mongo connection failed: ', err));
db.once('open', () => console.log('Mongo connection successful!'))

module.exports = db;
