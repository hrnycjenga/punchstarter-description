const {Pool} = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'
const {videos, pictures} = require('./media.js')
const faker = require('faker')


const db = new Pool({
  connectionString: connectionString,
})

// let id = 0
// console.log('printing id outside of loop =>', id)
// +(id+1) + ","


// console.log("logging data type =>", typeof data,'and data =>', data)


// console.log('loggin querystr type =>', typeof queryStr,'and quertystr =>', queryStr)

const seedLimit = 10


// console.log('prinintg data =>', data)

console.time('seedTime');
let counter = 0
let insertSize = 10

seedDb = () => {
  return db.connect().then((client) => {
    let rowGen = () => {
      data = ''
      for(let i = 0; i < insertSize; i ++ ) {
        let title = "'" + faker.commerce.productName() + "'"
        let summary = "'" + faker.commerce.productAdjective() + " " + faker.commerce.productMaterial() + "'"
        let video =  "'" + videos[(Math.floor(Math.random() * videos.length))] + "'"
        let address = "'" + faker.address.city(1) + ", " + faker.address.stateAbbr() + "'"
        data.concat(`(${title}, ${summary}, ${video}, ${address}),`)
      }
      return data
    }
    let queryStr = 
    `INSERT INTO project(
      projectTitle, 
      projectSummary, 
      projectVideo, 
      projectAddress
      ) VALUES ${rowGen()}`
    console.log(data)
    return client
      .query(queryStr)
      .then(() => {
        while(counter < seedLimit) {
          counter ++
          return seedDb()
        }
      })
      .catch((e) => {
        client.release()
        throw e
      })
      .then(() => {
        client.release()
        return console.log('seeding complete')
      })
      .catch((e) => {
        client.release()
        return console.log('failed to seed =>', e)
      })
  })
}

while (counter < seedLimit) {
  return seedDb()
  .then(process.exit)
  .catch((e) => {
    if(e) return console.log('failed to seed db =>', e)
    process.exit
  })
}
console.timeEnd('seedTime')
    