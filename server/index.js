var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
require('dotenv').config();

var app = express();
// var cloud = require('../api/cloud-vision');
var db = require('../database-mysql/index');
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/home', function (req, res) {
  db.selectAll((data) => {
    res.status(200);
    res.send(data);
  });
});

app.post('/submit', function(req, res) {
  db.save('some labels...', req.body.image_url);
});

// app.post('/login', function(req, res) {
//   res.redirect('/home');
// })

// app.post('/submit', function (req, res) {
//   cloud.getLabels(req.body.image_url, (labels, image_url) => {
//     db.save(labels, image_url)});
// });

app.listen(3306, function() {
  console.log('listening on port 3306!');
});

