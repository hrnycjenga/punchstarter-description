const { Pool } = require('pg');
const {password} = require('./password.js')
const pgHost = process.env.PGHOST || 'localhost';
const { user }= require('./username')

const pgUser = user
const pgDatabase = process.env.PGDATABASE || 'postgres';

const pgPassword = process.env.PGPASSWORD || password;
const pgPort = process.env.PGPORT || 5432;
const connectionString = `postgresql://${pgDatabase}:${pgPassword}@${pgHost}:${pgPort}/${pgUser}`
require('require-sql');
const schema = require('./schema.sql');

const db = new Pool({
  connectionString: connectionString
});

let generateTables = () => {
  return db.connect().then((client) => {
    return client
      .query(schema)
      .then(() => {
        client.release()
        return console.log('tables generated')
      })
      .catch((e) => {
          client.release()
          return console.log('err in generating tables =>', e)
      })
  })
}

generateTables()
  .then(process.exit)
  .catch((e) =>{
    if(e) return console.log('err in generating tables =>', e)
    process.exit
  })
