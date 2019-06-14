const { Pool } = require('pg')
const password = require('./password.js')
const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'postgres';
const pgPassword = process.env.PGPASSWORD || password;
const pgPort = process.env.PGPORT || 5432;
const connectionString = `postgresql://${pgDatabase}:${pgPassword}@${pgHost}:${pgPort}/${pgUser}`


const db = new Pool({
  connectionString: connectionString,
})

module.exports = db