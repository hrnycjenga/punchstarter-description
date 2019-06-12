const {Pool} = require('pg')
const connectionString = 'postgresql://postgres:1234@localhost:5432/postgres'
const {videos, pictures} = require('./media.js')
const faker = require('faker')

const db = new Pool({
  connectionString: connectionString,
})

const seedLimit = 1000
let insertSize = 10000
let counter = 1
let projectCounter = counter
let descriptionCounter = counter
let picturesCounter = counter

let projectRowGen = () => {
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

let descriptionRowGen = () => {
  let data = ''
  let description
  for(let i = 0; i < insertSize; i ++ ) {
    description = `'${faker.lorem.paragraph()}'`
    if(i === insertSize -1) {
      data = data.concat(`(${description})`)
    } else {
      data = data.concat(`(${description}), \n`)
    }
  }
  return data
}

let picutresRowGen = () => {
  let data = ''
  let picture
  for(let i = 0; i < insertSize; i ++ ) {
    picture = `'${pictures[(Math.floor(Math.random() * pictures.length))]}'`
    if(i === insertSize -1) {
      data = data.concat(`(${picture})`)
    } else {
      data = data.concat(`(${picture}), \n`)
    }
  }
  return data
}

seedProject = () => {
  return db.connect()
  .then((client) => {
    if(projectCounter < seedLimit) {
      let insert = () => {
        let data = projectRowGen()
        let queryStr = 
        `INSERT INTO project 
        (projectTitle, projectSummary, projectVideo, projectAddress) 
        VALUES ${data}`
          return client
          .query(queryStr)
          .then(() => {
            if(projectCounter < seedLimit) {
              console.log(`inserted into project table ${projectCounter} times`)
              projectCounter ++
              return insert()
            } else {
              return seedProject()
            }
          })
          .catch((e) => {
            throw e
          })
        }
      return insert()
    } else {
      console.log('product seed complete')
      return client.release()
    }
  })
}

seedDescription = () => {
  return db.connect()
  .then((client) => {
    if(descriptionCounter < seedLimit) {
      let insert = () => {
        let data = descriptionRowGen()
        let queryStr = 
        `INSERT INTO descriptions
        (descriptionEntry)
        VALUES ${data}`
          return client
          .query(queryStr)
          .then(() => {
            if(descriptionCounter < seedLimit) {
              console.log(`inserted into description table ${descriptionCounter} times`)
              descriptionCounter ++
              return insert()
            } else {
              return seedDescription()
            }
          })
          .catch((e) => {
            throw e
          })
        }
      return insert()
    } else {
      console.log('description seed complete')
      return client.release()
    }
  })
}

seedPictures = () => {
  return db.connect()
  .then((client) => {
    if(picturesCounter < seedLimit) {
      let insert = () => {
        let data = picutresRowGen()
        let queryStr = `INSERT INTO pictures (pictureURL) VALUES ${data}`
          return client
          .query(queryStr)
          .then(() => {
            if(picturesCounter < seedLimit) {
              console.log(`inserted into pictures table ${picturesCounter} times`)
              picturesCounter ++
              return insert()
            } else {
              return seedPictures()
            }
          })
          .catch((e) => {
            throw e
          })
        }
      return insert()
    } else {
      console.log('pictures seed complete')
      return client.release()
    }
  })
}

console.time('seedTime');

return seedProject()
  .then(() => {
    return seedDescription()  
  })
  .then(()=>{
    return seedPictures()
  })
  .then(() => {
    console.timeEnd('seedTime')
    })
  .then(process.exit)
  .catch((e) => {
    if(e) return console.log('failed to seed db =>', e)
    process.exit
  })
  
    