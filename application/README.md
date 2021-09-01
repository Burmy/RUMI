# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Cheng-Yu Chuang        |
| Student ID    | 920945048              |
| Student Email | cchuang2@mail.sfsu.edu |



# Build/Run Instructions
This project is based on Node.js, Express, and MySQL

## Build Instructions
1. Initiate the structure of MySQL database
```
%MySql bin path%/mysql -u root -p %Database Name% < %Project Path%/application/conf/init_db.sql
```
or import the table structure in your database ```application/config/init_db.sql```
1. Type your dabase setting in ```application/config/database.js```
2. cd ```application/```
3. Install node.js dependencies
```
npm install
```

## Run Instructions
1. ```npm start```