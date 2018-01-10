var express = require('express');
var imagesRouter = express.Router();
var posts = require('../controllers/postControllers');
/* GET users listing. */

imagesRouter.get('/',function (req, res) {
    res.render('photo/photogallery', {pageTitle: 'Collection of the builders work', title: 'Categories: ',
        categories:['Bathrooms', 'Electricity','Paining lob','Carpenter' ]});
});



imagesRouter.post('/', function(req, res, next) {
    res.render('photo/photogallery', {pageTitle: 'Collection builders work' });
});

module.exports = imagesRouter;
