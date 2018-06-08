const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
    host: process.env.MYSQL_HOST,
  },
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Picture = sequelize.define('picture', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  labels: {
    type: Sequelize.STRING,
  },
  image_url: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  related_images: {
    type: Sequelize.JSON,
  },
});

let selectAll = (callback) => {
  Picture.findAll()
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

let selectByID = (ID, callback) => {
  Picture.findAll({
    where: {
      id: ID,
    },
  })
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

let save = (labelsIn, imageIn, locationIn, relatedIn) => {
  Picture.sync()
    .then(() => Picture.create({
      labels: labelsIn,
      image_url: imageIn,
      location: locationIn,
      related_images: relatedIn,

    }))
    .catch((err) => {
      console.log(err);
    });
};

module.exports.selectAll = selectAll;
module.exports.selectByID = selectByID;
module.exports.save = save;
