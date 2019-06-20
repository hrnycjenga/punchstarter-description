const { Pool } = require('pg')
const pgHost = `3.82.121.64`;
const pgUser = 'postgres';
const pgDatabase = 'postgres';
const pgPassword = 1234
const pgPort = 5432;
const connectionString = `postgresql://${pgDatabase}:${pgPassword}@${pgHost}:${pgPort}/${pgUser}`


const db = new Pool({
  connectionString: connectionString,
})

module.exports = db
