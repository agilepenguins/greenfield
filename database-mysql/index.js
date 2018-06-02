var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'greenfield'
});

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'greenfield'
// });

var selectAll = function(callback) {
  connection.query('SELECT * FROM pictures', function(err, results) {
    if(err) {
      callback(err);
    } else {
      callback(results);
    }
  });
};

var save = (labels, image_url) => {
  connection.query(
    `INSERT INTO pictures (labels, image_url) VALUES ('${labels}', '${image_url}')`, 
    function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('Image saved!');
    }
  })
}

module.exports.selectAll = selectAll;
module.exports.save = save;
