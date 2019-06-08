const {Pool} = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'
const {videos, pictures} = require('./media.js')
const faker = require('faker')

const db = new Pool({
  connectionString: connectionString,
})

const seedLimit = 100
let counter = 1
let insertSize = 100000

let rowGen = () => {
  let data = ''
  let title, summary, video, address
  for(let i = 0; i < insertSize; i ++ ) {
    title = `'${faker.commerce.productName()}'`
    summary = `'${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}'`
    video =  `'${videos[(Math.floor(Math.random() * videos.length))]}'`
    let city = faker.address.city(1)
    while(city.includes("'")) {
      city = faker.address.city(1)
    }
    address = `'${city}, ${faker.address.stateAbbr()}'`
    if(i === insertSize -1) {
      data = data.concat(`(${title}, ${summary}, ${video}, ${address})`)
    } else {
      data = data.concat(`(${title}, ${summary}, ${video}, ${address}), \n`)
    }
  }
  return data
}

console.time('seedTime');

seedDb = () => {
  return db.connect()
  .then((client) => {
    if(counter < seedLimit) {
      // console.log('if caught', counter)
      let insert = () => {
        // console.log('insert ran', counter )
        let data = rowGen()
        // console.log(data)
        let queryStr = 
        `INSERT INTO project
        (projectTitle, projectSummary, projectVideo, projectAddress)
        VALUES ${data}`
          return client
          .query(queryStr)
          .then(() => {
            if(counter < seedLimit) {
              // console.log('printing before', counter)
              counter ++
              console.log('printing counter', counter)
              return insert()
            } else {
              return seedDb()
            }
          })
          .catch((e) => {
            // client.release()
            throw e
          })
        }
      return insert()
    } else {
      console.log('seeding complete')
      return client.release()
    }
  })
}

return seedDb()
.then(() => {
  console.timeEnd('seedTime')
  })
.then(process.exit)
.catch((e) => {
  if(e) return console.log('failed to seed db =>', e)
  process.exit
})
  
    