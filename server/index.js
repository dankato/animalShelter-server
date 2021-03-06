'use strict'; 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);


app.get('/cat', (req,res) => {
  res.json({
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    name: 'Fluffy',
    gender: 'Female',
    age: '2 yrs',
    breed: 'Bengal',
    story: 'Thrown on the street'
  });
});

app.get('/dog', (req,res) => {
  res.json({
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    name: 'Dogg',
    gender: 'Female',
    age: '3 yrs',
    breed: 'Golden',
    story: 'In the jungle'
  });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
//   dbConnect();
  runServer();
}

module.exports = {app};
