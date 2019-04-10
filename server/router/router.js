var router = require('express').Router();
var controller = require('../controller/controller.js');

router.get('/main/:id', controller.main);
router.get('/paragraphs/:id', controller.paragraphs);
router.get('/pictures/:id', controller.pictures);

module.exports = router;