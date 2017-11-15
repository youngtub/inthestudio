const Sequelize = require('sequelize');

const sequelize = new Sequelize('reactionsync', 'pengcheng95', 'passwordmajing', {
  host: 'reaction.csm1qfcrhywi.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected with InTheStudio DB');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Song = sequelize.define('song', {
  title: Sequelize.STRING,
  vocalists: Sequelize.ARRAY(Sequelize.STRING),
  producers: Sequelize.ARRAY(Sequelize.STRING),
  date: Sequelize.DATE,
  genre: Sequelize.STRING,
  album: Sequelize.STRING,
  isRemix: Sequelize.BOOLEAN
});

const Artist = sequelize.define('artist', {
  name: Sequelize.STRING,
  role: Sequelize.STRING,
  born: Sequelize.DATE,
  startyear: Sequelize.INTEGER,
  endyear: Sequelize.INTEGER,
  hometown: Sequelize.STRING,
  labels: Sequelize.ARRAY(Sequelize.STRING),
  associated: Sequelize.ARRAY(Sequelize.STRING),
  thumbnail: Sequelize.STRING,
  bio: Sequelize.STRING
});

const Collab = sequelize.define('collab', {
  value: {type: Sequelize.INTEGER, default: 0},
  songs: {type: Sequelize.ARRAY(Sequelize.STRING), default: []}
});

Collab.belongsTo(User, {as: 'source'})
Collab.belongsTo(User, {as: 'target'})

const Suggestion = sequelize.define('suggestion', {
  name: Sequelize.STRING,
  votes: Sequelize.INTEGER
})

const Comment = sequelize.define('comment', {
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  text: Sequelize.STRING,
  votes: Sequelize.INTEGER
})

const User = sequelize.define('user', {
  fbId: Sequelize.STRING,
  musiclikes: Sequelize.ARRAY(Sequelize.STRING),
  
})
