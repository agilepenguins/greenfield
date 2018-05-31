DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE items (
  ID int NOT NULL AUTO_INCREMENT,
  labels VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
