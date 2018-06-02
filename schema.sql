DROP DATABASE IF EXISTS greenfield;

CREATE DATABASE greenfield;

USE greenfield;

CREATE TABLE pictures (
  ID int NOT NULL AUTO_INCREMENT,
  labels VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users_pictures (
  ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  picture_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(ID) ON DELETE CASCADE,
  FOREIGN KEY (picture_id) REFERENCES pictures(ID) ON DELETE CASCADE,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
