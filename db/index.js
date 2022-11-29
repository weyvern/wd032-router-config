const { Pool } = require('pg');

const connectionString = process.env.PG_URI;

const pool = new Pool({ connectionString });

const db = {
  query: (text, params) => {
    return pool.query(text, params);
  }
};

module.exports = db;
