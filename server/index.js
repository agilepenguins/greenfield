const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mysql');
require('dotenv').config();

const app = express();
// var cloud = require('../api/cloud-vision');
const db = require('../database-mysql/index');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/home', (req, res) => {
  db.selectAll((data) => {
    res.status(200);
    res.send(data);
  });
});

app.post('/submit', (req, res) => {
  db.save('some labels...', req.body.image_url, req.body.location);
  res.send(200);
});

// app.post('/login', function(req, res) {
//   res.redirect('/home');
// })

// app.post('/submit', function (req, res) {
//   cloud.getLabels(req.body.image_url, (labels, image_url) => {
//     db.save(labels, image_url)});
// });

app.listen(3306, () => {
  console.log('listening on port 3306!');
});

