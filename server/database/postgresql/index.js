const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'dev',
    password : '1234',
    database : 'testdb0   '
  }
})
const { Client } = require('pg')
const bookshelf = require('bookshelf')(knex)
  
let User = bookshelf.Model.extend({
  tableName: 'users'
});

const client = new Client()

await client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()