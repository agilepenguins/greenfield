var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
// var cloud = require('../api/cloud-vision');
var db = require('../database-mysql/index');
app.use(bodyParser.json());


// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/home', function (req, res) {
  db.selectAll((data) => {
    res.status(200);
    res.send(data);
  });
});

// https://instagram.fyyz1-1.fna.fbcdn.net/vp/1dd90caa8aae24e9197b54502c8a9016/5BABA928/t51.2885-15/e35/14607055_1250138995009163_6900772036642078720_n.jpg

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

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

