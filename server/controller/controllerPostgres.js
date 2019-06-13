const {projectModel, paragraphsModel, picturesModel} = require('../model/modelsPostgres.js')

module.exports = {
  getProjectInfo: (req, res) => {
    let projectId = req.query.id
    projectModel(projectId, (err, data) => {
      if(err) {
        res.status(500)
        console.log('failed to get project at controller', err)
        res.send()
      } else {
        res.status(200)
        res.send(data)
      }
    })
  },

  getParagraphInfo: (req, res) => {
    let paragraphId = req.query.id
    paragraphsModel(paragraphId, (err, data) => {
      if(err) {
        res.status(500)
        console.log('failed to get paragraph at controller', err)
        res.send()
      } else {
        res.status(200)
        res.send(data)
      }
    })
  },

  getPicturesInfo: (req, res) => {
    let pictureId = req.query.id
    console.log('logging id at picture controller =>', pictureId)
    picturesModel(pictureId, (err, data) => {
      if(err) {
        res.status(500)
        console.log('failed to get picture at controller', err)
        res.send()
      } else {
        res.status(200)
        res.send(data)
      }
    })
  }
}