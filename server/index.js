const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mysql');
require('dotenv').config();

const app = express();
// var cloud = require('../api/cloud-vision');
const db = require('../database-mysql/index');
const cloudVision = require('../api/cloud-vision.js');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/home', (req, res) => {
  db.selectAll((data) => {
    res.status(200);
    res.send(data);
  });
});

app.post('/submit', (req, res) => {
  let imageLabel; // description for the google image lookup eg 'Las Vegas'

  // TODO Matt: protect/limit API calls
  cloudVision.getLabels(req.body.image_url)
    .then((results) => {
      // pull label with the highest detection score
      imageLabel = results.data.responses[0].webDetection.webEntities[0].description;
      console.log(imageLabel);
      db.save('some labels...', req.body.image_url, imageLabel)
      res.status(200).send('Submit successful');
    })
    .then(() => {
      // Navira/Trevor:  yelp & hotels flights events etc goes here
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
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

