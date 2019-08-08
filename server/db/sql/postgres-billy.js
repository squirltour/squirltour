const pg = require('pg');
//const conString = "postgres://btmn626:g@teofPostgresql65@localhost:5432/sdb_dumbletour";

const conString = 'postgres://EricStallings:Ems@1987@localhost/sdb_squirtletour';

const client = new pg.Client(conString);
client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
};
