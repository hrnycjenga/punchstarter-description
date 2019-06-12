const {projectModel, paragraphsModel, picturesModel} = require('../model/modelsPostgres.js')

module.exports = {
  getProjectInfo: (req, res) => {
    // console.log('expect id from postgresController => ', req.params)
    let projectId = req.query.id
    // console.log('logging projectid in controller => ', projectId)
    projectModel(projectId, (err, data) => {
      if(err) {
        res.status(500)
        console.log('failed to get project at controller', err)
        res.send()
      } else {
        res.status(200)
        // console.log('got project ad controller logging data =>', data)
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
        // console.log('got paragraph at controller logging data =>', data)
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
        // console.log('got picture at controller logging data =>', data)
        res.send(data)
      }
    })
  }
}