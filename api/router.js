var router = require('express').Router();

var index = require('../routes/index');
var customers = require('../routes/customers');
var builders = require('../routes/builders');

router.use('/', index);
router.use('/customers', customers);
router.use('/builders',builders);
router.use('/login', require('../routes/login'));
router.use('/posts', require('../routes/posts'));
router.use('/photogallery', require('../routes/builders'), require('../routes/images'));
//router.use(require('../config/passport'));
module.exports = router;
