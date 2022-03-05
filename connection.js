const e = require('express');
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});
var newPromise = new Promise((resolve, reject) => {
  connectDatabase()
    .then(() => {
      return createDatabase();
    })
    .then(() => {
      return createTable();
    })
    .then(resolve)
    .catch(reject);
});
function connectDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        return reject(err);
      } else {
        console.log('DATABASE CONNECTED SUCCESSFULLY')
        return resolve();
      }
    })
  });
}
function createDatabase() {
  return new Promise((resolve, reject) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS customer`, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log('CREATED DATABASE SUCCESSFULLY')
        return resolve();
      }
    })
  });
}
function createTable() {
  return new Promise((resolve, reject) => {
    connection.query('CREATE TABLE IF NOT EXISTS customer.customer_details (id int(11) NOT NULL , name varchar(255) NOT NULL , PRIMARY KEY (id))', (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log('CREATED TABLE SUCCESSFULLY')
        return resolve();
      }
    })
  });
}
newPromise
  .then(() => {
    return Promise.resolve();
  })
  .catch((err) => {
    return Promise.reject(err);
  })
module.exports = connection;
