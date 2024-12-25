import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); 

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PW,
  database: process.env.DB,
  port: process.env.DBPORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

export default db;
