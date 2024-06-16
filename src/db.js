const mysql = require("mysql2");
require("dotenv").config();
let connection;

function connectToDatabase() {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "a2",
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        throw err;
      }
      console.log("Connected to the MySQL database.");
    });
  }
  return connection;
}

module.exports = connectToDatabase;
