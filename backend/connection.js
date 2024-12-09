import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thesis123",
  database: "thesis",
});

export default db;
