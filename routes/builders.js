/**
 * Created by tkasa on 19/12/2017.
 */
var express = require('express');
var router = express.Router();
var builders = require('../controllers/buildersControllers');

var GFS = require('../models/GFS');
var multer = require('multer');
var storage = GFS.storage;
var upload = multer({storage: storage});


function authorize(req, res, next){
    if(req.user === 'builder'){
        next();
    }else{
        res.status(403).send('Forbidden');
    }
}
router.get('/list', builders.list);

router.get('/registration',builders.showRegistrationPage);

router.post('/registration',builders.save);

router.get('/profile/:id',builders.show);

router.get('/display', builders.displayPage);

router.post('/show', builders.findByName);

router.get('/edit/:id', builders.edit);// Edit builder

router.get('/show/:id', builders.show);//get single builder by id

router.post('/update/:id', builders.update);

router.post('/delete/:id', authorize, builders.delete);

router.get('/profile/:id/photo/upload', builders.displayUploadPage);



router.post('/profile/:id/photo/upload',   upload.single('file') ,function(req, res) {
        res.render('./photo/photogallery', {
            pageTitle: 'Collection of the builders work',
            title: 'Categories: ',
            categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
            user: req.user,
            files: req.files
        })
});

module.exports = router;

