const mysql2 = require("mysql2");
const util = require("util");

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const dbQuery = util.promisify(db.query).bind(db);

module.exports = { db, dbQuery };
// db adalah metode untuk db query dengan callback function
// dbQuery adalah metode untuk db query dengan async await
