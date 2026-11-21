const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // AWS RDS ke liye zaroori
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 10000,
    acquireTimeoutMillis: 10000
  }
};

let poolPromise = null;

const getPool = async () => {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config).connect();
  }
  return poolPromise;
};

module.exports = { sql, getPool };