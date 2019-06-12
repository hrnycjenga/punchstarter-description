const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'

const db = new Pool({
  connectionString: connectionString,
})

module.exports = db