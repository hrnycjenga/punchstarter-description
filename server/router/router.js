var router = require('express').Router();
var controller = require('../controller/controller.js');

router.get('/main', controller.main);
router.get('/paragraphs', controller.paragraphs);
router.get('/pictures', controller.pictures);

module.exports = router;