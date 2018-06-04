const mysql = require('mysql');
require('dotenv').config();

let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'greenfield',
})

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'greenfield'
// });

let selectAll = function (callback) {
  connection.query('SELECT * FROM pictures', (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(results);
    }
  });
};

let save = (labels, image_url, location, related) => {
  connection.query(
    `INSERT INTO pictures (labels, image_url, location, related_images) 
    VALUES ('${labels}', '${image_url}', '${location}', '${related}')`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Image saved!');
      }
    },
  );
};

module.exports.selectAll = selectAll;
module.exports.save = save;
