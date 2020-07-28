var express = require('express');
var router = express.Router();
var middleValidate = require('../middleware/user.validate');

var controller = require('../controllers/user.controller');

var multer = require('multer');
var upload = multer({dest: './public/uploads/'});

router.get('/', controller.index);

router.get('/cookie', (req,res,next) => {
    res.cookie('user-id',12345);
    res.send('hê')
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:ids', controller.get);

router.post('/create',upload.single('avatar'),middleValidate.postCreate, controller.postCreate);

module.exports = router;