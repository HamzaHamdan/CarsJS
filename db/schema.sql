CREATE DATABASE cars_db;
USE cars_db;

CREATE TABLE cars
(
    id int NOT NULL
    AUTO_INCREMENT,
	makeId varchar
    (255) NOT NULL,
	modelId varchar
    (255) NOT NULL,
    carYear varchar
    (255) NOT NULL,
    carColor varchar
    (255) NOT NULL,
    carMilage varchar
    (255) NOT NULL,
	carPrice varchar
    (255) NOT NULL,
	carVinNum varchar
    (255) NOT NULL,
	createdAt timestamp,
	updatedAt timestamp,
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

        create table carMakes
        (
            id int
            auto_increment not null,
make varchar
            (255) not null,
createdAt timestamp,
updatedAt timestamp,
primary key
            (id)
);

            create table carModels
            (
                id int
                auto_increment not null,
makeId varchar
                (255) not null,
model varchar
                (255) not null,
createdAt timestamp,
updatedAt timestamp,
primary key
                (id)
);

                create table users
                (
                    id int
                    auto_increment not null,
name varchar
                    (255) not null,
email varchar
                    (255) not null,
password varchar
                    (255) not null,
createdAt timestamp,
updatedAt timestamp,
primary key
                    (id)
);