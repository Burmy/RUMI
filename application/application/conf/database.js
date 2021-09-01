const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "csc317",
  password: "sfsucsc317",
  database: "csc317",
  connectionLimit: 50,
  waitForConnections: true,
  debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;
