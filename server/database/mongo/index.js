const mongoose = require('mongoose')  
const faker = require('faker')
const {videos, pictures} = require('../postgresql/media')

// const connection = mongoose.connect('mongodb://localhost:27017/punchStarter', { useNewUrlParser: true })

// const db = mongoose.connection

mongoose.Promise = Promise;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
  // console.log('Connected to db mongoDb');
// })
 
let projectSchema = mongoose.Schema({
  projectId: Number,
  projectTitle: String,
  projectSummary: String,
  projectVideo: String,
  projectAddress: String,
})

let descriptionSchema = mongoose.Schema({
  descriptionId: Number,
  descriptionEnrty: String
})

let pictureSchema = mongoose.Schema({
  pictureId: Number,
  pictureURL: String
})

let Project = mongoose.model('Project', projectSchema)
let Description = mongoose.model('Description', descriptionSchema)
let Picture = mongoose.model('Picture', pictureSchema)

let seedLimit = 100
let insertSize = 100000
let counter = 0
let projectCounter = counter

let id = 1
let projectRowGen = () => {
  let results = []
  for(let i = 0; i < insertSize; i ++ ) {
    let insertObj = {}
    insertObj.projectId = id
    insertObj.projectTitle = faker.commerce.productName()
    insertObj.projectSummary = faker.commerce.productAdjective() + ' ' + faker.commerce.productMaterial()
    insertObj.projectVideo = videos[(Math.floor(Math.random() * videos.length))]
    insertObj.projectAddress = faker.address.city(1) + ', ' + faker.address.stateAbbr()
    id ++
    results.push(insertObj)
  }
  
  return results
}

// console.log(projectRowGen())

seedProject = () => {
    mongoose.connect('mongodb://localhost:27017/punchStarter', { useNewUrlParser: true })
    // console.log('connected to mongoDb')
    db = mongoose.connection
    return db
      // .then(() => {
      // })
      .then(() => {
        if(projectCounter < seedLimit) {
          // console.log('printing project counter in first then =>', projectCounter)
          let insert = () => {
            let data = projectRowGen()
            console.log('insert ran', projectCounter) 
            projectCounter ++
            return Project.insertMany(data)
            .then(() => {
              if(projectCounter < seedLimit) {
                // console.log('printing counter inside second then => ', projectCounter)
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
          return console.log('project seeding complete')
        }
      })
      .catch((e) => {
        process.exit
        throw e
      })
}


console.time('seed time')
seedProject()
.then(() => {
  console.timeEnd('seed time')
})
.then(process.exit)
.catch((e) => {
  console.log(e)
})