const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const axios = require('axios');
const schema = require('./server/gschema.js');
const { maskErrors } = require('graphql-errors')
// const Bluebird = require('bluebird');
// const router = require('./server/router')
// const db = require('../db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, './public')));

maskErrors(schema)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const axiosConfigForRapGenius = {
  'Authorization' : 'Bearer CY7DUGhn8enS_FHK4LxT-fZPUt2QCCNvg346ZLH_86nbzYIoqmxO6o19MrAIpJiO'
}

app.use('/test', (req, res) => {
  axios.get(`http://api.genius.com/songs/${2437013}`, axiosConfigForRapGenius)
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch((err) => {
    console.error('error', err)
  })
})
