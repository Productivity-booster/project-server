import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config(); // Load environment variables from .env

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PW,
  database: process.env.DB,
  port: process.env.DBPORT,
});

// Connect to the database and log the status
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

export default connection;
