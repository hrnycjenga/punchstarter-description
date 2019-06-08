const {Pool} = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'
const {videos, pictures} = require('./media.js')
const faker = require('faker')

const db = new Pool({
  connectionString: connectionString,
})

const seedLimit = 100000000
let counter = 0
let insertSize = 10
// 10000000000
let rowGen = () => {
  let data = ''
  let title, summary, video, address
  for(let i = 0; i < insertSize; i ++ ) {
    title = `'${faker.commerce.productName()}'`
    // console.log(typeof title, i)
    summary = `'${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}'`
    // console.log(summary, i)
    video =  `'${videos[(Math.floor(Math.random() * videos.length))]}'`
    // console.log(video, i)
    address = `'${faker.address.city(1)}, ${faker.address.stateAbbr()}'`
    // console.log(address, i)
    if(i === insertSize -1) {
      // console.log('end of loop')
      data = data.concat(`(${title}, ${summary}, ${video}, ${address})`)
    } else {
      data += data.concat(`(${title}, ${summary}, ${video}, ${address}), \n`)
    }
    // console.log(data, i)
  }
  return data
}

// console.log('printing data outside of seedDB func => ' , rowGen().length)
console.time('seedTime');

seedDb = () => {
  return db.connect().then((client) => {
    let data = rowGen()
    let queryStr = 
    `INSERT INTO project
    (projectTitle, projectSummary, projectVideo, projectAddress)
     VALUES ${data}`
    console.log('PRINTING query str', queryStr.length)
    return client
      .query(queryStr)
      .then(() => {
        return () => {
          while(counter < seedLimit) {
            // console.log(counter)
            counter ++
            // console.log(counter)
            return seedDb()
          }
        }
      })
      .catch((e) => {
        client.release()
        throw e
      })
      .then(() => {
        console.log('ran')
        client.release()
        return console.log('seeding complete')
      })
      .catch((e) => {
        client.release()
        return console.log('failed to seed =>', e)
      })
  })
}

// while (counter < seedLimit) {
  return seedDb()
  .then(process.exit, console.timeEnd('seedTime'))
  .catch((e) => {
    if(e) return console.log('failed to seed db =>', e)
    process.exit
  })
  
// }
    