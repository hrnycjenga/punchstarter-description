const faker = require('faker')
const {Pool, Client} = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'
require('require-sql')
const schema = require('./schema.sql')


const client = new Client({
  connectionString: connectionString,
})

client.connect()


client.query(schema, (err, res) => {
  console.log(err, res)
})