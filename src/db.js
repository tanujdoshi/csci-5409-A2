const mysql = require("mysql2");
require("dotenv").config();
let connection;

function connectToDatabase() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "a2",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database");

    // Check if table exists
    connection.query(`SHOW TABLES LIKE 'products'`, (err, results) => {
      if (err) {
        console.error("Error checking if table exists:", err);
        connection.end(); // Close connection on error
        return;
      }

      if (results.length === 0) {
        // Table does not exist, create it
        const createTableQuery = `
          CREATE TABLE products (
            name varchar(100),
            price varchar(100),
            availability boolean
          )
        `;

        connection.query(createTableQuery, (err) => {
          if (err) {
            console.error("Error creating table:", err);
          } else {
            console.log("Table created successfully");
          }
          connection.end(); // Close connection after creating table
        });
      } else {
        // Table exists, proceed with your operations
        console.log("Table already exists");
        connection.end(); // Close connection if table exists
      }
    });
  });
}

module.exports = connectToDatabase;
