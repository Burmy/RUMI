const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rumi-db2",
  connectionLimit: 50,
  waitForConnections: true,
  debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;
