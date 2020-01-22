CREATE DATABASE cars_db;
USE cars_db;

CREATE TABLE cars
(
    id int NOT NULL
    AUTO_INCREMENT,
	make varchar
    (255) NOT NULL,
	model varchar
    (255) NOT NULL,
    year varchar
    (255) NOT NULL,
    color varchar
    (255) NOT NULL,
    milage varchar
    (255) NOT NULL,
	PRIMARY KEY
    (id)
);

CREATE TABLE images
(
    id int NOT NULL
    AUTO_INCREMENT,
    carVinNum varchar
    (255) NOT NULL,
    image varchar
    (255) NOT NULL,
	PRIMARY KEY
    (id)
);

CREATE TABLE cars_make
(
    id int NOT NULL
    AUTO_INCREMENT,
    carMake varchar
    (255) NOT NULL,
	PRIMARY KEY
    (id)
);


CREATE TABLE cars_model
(
    id int NOT NULL
    AUTO_INCREMENT,
    carMakeid INT,
    carModel varchar
    (255) NOT NULL,
	PRIMARY KEY
    (id)
);

CREATE TABLE cars_year
(
    id int NOT NULL
    AUTO_INCREMENT,
    carYear INT,
	PRIMARY KEY
    (id)
);
