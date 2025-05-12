const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:  process.env.DB_HOST,
  user:DB_USER,    
  port: DB_PORT, //remove when connecting locally
  password: DB_PASSWORD,  
  database: DB_NAME,  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool;