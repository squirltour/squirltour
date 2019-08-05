const { Pool, Client } = require('pg');
const connectionString = 'postgres://nkqugefk:QUBlxEQ-K3CAbPUffOfmhVLu6gWhmXfe@raja.db.elephantsql.com:5432/nkqugefk';
const pool = new Pool({connectionString: connectionString});

pool.query('select * from fake_data', (err, res) => {
  console.log(res);
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
};