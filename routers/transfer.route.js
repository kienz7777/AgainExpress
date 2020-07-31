var express = require('express');

var controller = require('../controllers/transfer.controller');

var router = express.Router();

var csurf = require('csurf');
var csrfProtection = csurf({ cookie: true })

router.get('/create',csrfProtection, controller.create);
router.post('/create', controller.postCreate);

module.exports = router;