var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'localtester',
  password : 'localpw',
  database : 'test'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results) {
    if(err) {
      callback(err);
    } else {
      callback(results);
    }
  });
};

var save = (labels, image_url) => {
  connection.query(
    `INSERT INTO items (labels, image_url) VALUES ('${labels}', '${image_url}')`, 
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
