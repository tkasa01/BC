var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                       siteTitle: 'Builders Company',
                       pageTitle: 'Home page'
       });
});

module.exports = router;
