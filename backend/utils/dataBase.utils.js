const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yNLinh1312",
  database: "project_schema",
});

let db = pool.promise();

module.exports.db = db;
