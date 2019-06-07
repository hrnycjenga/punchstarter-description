const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres';
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
