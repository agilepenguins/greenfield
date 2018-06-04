const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mysql');
require('dotenv').config();

const app = express();
// var cloud = require('../api/cloud-vision');
const db = require('../database-mysql/index');
const cloudVision = require('../api/cloud-vision.js');
const relatedImages = require('../api/related-images.js');
const yelpFusion = require('../api/yelp-fusion.js')

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

  // super basic input validation
  if (!req.body.image_url) {
    res.status(400).status('Bad request: image url not valid');
  }

  // TODO Matt: protect/limit API calls
  cloudVision.getLabels(req.body.image_url)
    .then((cloudResults) => {
      // pull label with the highest detection score
      imageLabel = cloudResults.data.responses[0].webDetection.webEntities[0].description;
      console.log('Recognized: ', imageLabel);
      return relatedImages.getRelated(imageLabel);
    })
    .then((relatedResults) => {
      // grab image urls of the top related images
      let imageUrls = relatedResults.data.items.map(item => item.link);
      console.log('Discovered Related: ', JSON.stringify(imageUrls));
      db.save('some labels...', req.body.image_url, imageLabel, JSON.stringify(imageUrls));
      res.status(200).send('Submit successful');
    })
    .then(() => {
      yelpFusion.getRestaurantRecommendations(imageLabel, (body) => {
        res.send(body);
      });
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

