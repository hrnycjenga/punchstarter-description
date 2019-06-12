const mongoose = require('mongoose')  
const faker = require('faker')
const {videos, pictures} = require('../postgresql/media')

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

let seedLimit = 1000
let insertSize = 10000
let counter = 0
let projectCounter = counter
let descriptionCounter = counter
let picturesCounter = counter

let projectId = 1
let projectRowGen = () => {
  let results = []
  for(let i = 0; i < insertSize; i ++ ) {
    let insertObj = {}
    insertObj.projectId = projectId
    insertObj.projectTitle = faker.commerce.productName()
    insertObj.projectSummary = faker.commerce.productAdjective() + ' ' + faker.commerce.productMaterial()
    insertObj.projectVideo = videos[(Math.floor(Math.random() * videos.length))]
    insertObj.projectAddress = faker.address.city(1) + ', ' + faker.address.stateAbbr()
    results.push(insertObj)
    projectId ++
  }
  return results
}

let descriptionsId = 1
let descriptionRowGen = () => {
  let results = []
  for(let i = 0; i < insertSize; i++) {
    let insertObj = {}
    insertObj.id = descriptionsId
    insertObj.description = faker.lorem.paragraph()
    results.push(insertObj)
    descriptionsId ++
  }
  return results
}

let pictureId = 1
let picturesRowGen = () => {
  let results = []
  for(let i = 0; i < insertSize; i ++) {
    let insertObj = {}
    insertObj.id = pictureId
    insertObj.url = pictures[Math.floor(Math.random() * pictures.length)]
    results.push(insertObj)
    pictureId ++
  }
  return results
}  

let seedProject = () => {
    mongoose.connect('mongodb://localhost:27017/punchStarter', { useNewUrlParser: true })
    db = mongoose.connection
    return db
      .then(() => {
        if(projectCounter < seedLimit) {
          let insert = () => {
            let data = projectRowGen()
            projectCounter ++
            return Project.insertMany(data)
            .then(() => {
              if(projectCounter < seedLimit) {
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

let seedDescriptions = () => {
  mongoose.connect('mongodb://localhost:27017/punchStarter', { useNewUrlParser: true })
  db = mongoose.connection
  return db
    .then(() => {
      if(descriptionCounter < seedLimit) {
        let insert = () => {
          let data = descriptionRowGen()
          descriptionCounter ++
          return Description.insertMany(data)
          .then(() => {
            if(descriptionCounter < seedLimit) {
              return insert()
              } else {
                return seedDescriptions()
              }
            })
            .catch((e) => {
              throw e
            })
        }
        return insert()
      } else {
        return console.log('description seeding complete')
      }
    })
    .catch((e) => {
      process.exit
      throw e
    })
}

let seedPictures = () => {
  mongoose.connect('mongodb://localhost:27017/punchStarter', { useNewUrlParser: true })
  db = mongoose.connection
  return db
    .then(() => {
      if(picturesCounter < seedLimit) {
        let insert = () => {
          let data = picturesRowGen()
          picturesCounter ++
          return Picture.insertMany(data)
          .then(() => {
            if(picturesCounter < seedLimit) {
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
        return console.log('picture seeding complete')
      }
    })
    .catch((e) => {
      process.exit
      throw e
    })
}



console.time('seed time')
return seedProject()
.then(()=> {
  return seedDescriptions()
})
.then(() => {
  return seedPictures()
})
.then(() => {
  console.timeEnd('seed time')
})
.then(process.exit)
.catch((e) => {
  console.log(e)
})