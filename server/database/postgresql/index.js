const { Pool } = require('pg')
const pgHost = process.env.PGHOST ||'3.82.121.64';
const pgUser = process.env.PGUSER || 'postgres';
const pgDatabase = process.env.PGDATABASE || 'postgres';
const pgPassword = process.env.PGPASSWORD || 1234;
const pgPort = process.env.PGPORT || 5432;
const connectionString = `postgresql://${pgDatabase}:${pgPassword}@${pgHost}:${pgPort}/${pgUser}`


const db = new Pool({
  connectionString: connectionString,
})

module.exports = db
