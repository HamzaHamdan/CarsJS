# DealsOnWheels

#### Click on the following link to use the app instance deployed to Heroku: https://dealsonwheels.herokuapp.com

#### You can use the below credentials to login as an admin user:
```
Username: admin@dow.com
Password: 123456
```  
#### You can use the below credentials to login as seller user:
```
Username: seller@seller.com
Password: 123456
```  
#### Create MySQL schema cars_db by following the below steps:
1. Connect to MySQL database
1. Run the below commands:
```
drop database if exists cars_db
create database cars_db
```
#### Clone the app to your local directory and run the commands:
```
npm install
npm run dev
```
#### Connect to MySQL database cars_db and run the below insert statement:
```
insert into cars_db.users
    (id, name, email, password, createdAt, updatedAt)
values
    ('9953274d-da9b-49d1-bc02-ae91ce553561', 'admin', 'admin@dow.com', '$2a$10$S3Z.XgSV9Rc8dHHKPKE6neaUNUF1pVdD2bwjdv9tAm16w1eaazVc2', '2020-01-26 09:05:04', '2020-01-26 09:05:04');
commit;
```
