const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mysql');
require('dotenv').config();

const app = express();
const db = require('../database-mysql/index');
const cloudVision = require('../api/cloud-vision.js');
const relatedImages = require('../api/related-images.js');
const yelpFusion = require('../api/yelp-fusion.js');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/home', (req, res) => {
  db.selectAll((err, data) => {
    if (err) {
      console.log('Error in /home', err);
      res.status(500).send('Server error occurred');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/details', (req, res) => {
  if (!req.body.ID) {
    res.status(400).status('Bad request: invalid image ID');
  }
  console.log(req.body.ID);
  db.selectByID(req.body.ID, (err, data) => {
    if (err) {
      console.log('Error in /home');
      res.status(500).send('Server error occurred');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/yelp', (req, res) => {
  if (!req.body.location) {
    res.status(400).send('Invalid location provided to yelp request');
  }
  console.log('Searching yelp results: ', req.body.location);
  yelpFusion.getRestaurantRecommendations(req.body.location, (body) => {
    console.log('Yelp Results:', body);
    res.status(200).send(body);
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
      if (cloudResults.data.responses.length === 0) {
        throw new Error('Cloud image results were invalid');
      }
      imageLabel = cloudResults.data.responses[0].webDetection.webEntities[0].description;
      console.log('Recognized: ', imageLabel);
      return relatedImages.getRelated(imageLabel);
    })
    .then((relatedResults) => {
      // grab image urls of the top related images
      let imageUrls = relatedResults.data.items.map(item => item.link);
      console.log('Discovered Related: ', JSON.stringify(imageUrls));
      db.save('some labels...', req.body.image_url, imageLabel, JSON.stringify(imageUrls));
    })
    .then(() => {
      res.status(200).send('Server work done');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// NEED TO ADD FUNCTIONALITY
// app.post('/login', function(req, res) {
//   res.redirect('/home');
// })

// NEED TO ADD FUNCTIONALITY
// app.post('/signup', function(req, res) {
//   res.redirect('/home');
// })

app.listen(process.env.PORT || 3306, () => {
  console.log('listening on port 3306!');
});

