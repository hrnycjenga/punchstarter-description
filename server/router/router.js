var router = require('express').Router();
var controller = require('../controller/controller.js');
let {getProjectInfo, getParagraphInfo, getPicturesInfo} = require('../controller/controllerPostgres.js')

// router.get('/main/:id', controller.main);
// router.get('/paragraphs/:id', controller.paragraphs);
// router.get('/pictures/:id', controller.pictures);

router.get('/main', getProjectInfo)
router.get('/paragraphs/:id', getParagraphInfo)
router.get('/pictures/:id', getPicturesInfo)

module.exports = router;