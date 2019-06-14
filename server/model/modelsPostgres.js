const db = require('../database/postgresql/index.js')

module.exports = {
  projectModel: (projectId, cb) => {
    db.query(`SELECT * FROM project WHERE projectId = ${projectId};`, (err, data) => {
      if (err) console.log('failed to get project at controller', err)
      else cb(null, data)
    })
  },

  paragraphsModel: (paragraphId, cb) => {
    db.query(`SELECT * FROM descriptions WHERE descriptionId = ${paragraphId};`, (err, data) => {
      if (err) console.log('failed to get paragraph at controller', err)
      else cb(null, data)
    })
  },

  picturesModel: (pictureId, cb) => {
    console.log('logging id at picture model =>', pic)
    db.query(`SELECT * FROM pictures WHERE pictureId = ${pictureId};`, (err, data) => {
      if (err) console.log('failed to get picture at controller', err)
      else cb(null, data)
    })
  }


}