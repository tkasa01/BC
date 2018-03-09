/**
 * Created by tkasa on 19/12/2017.
 */
var express = require('express');
var router = express.Router();
var builders = require('../controllers/buildersControllers');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);

    }
});
var upload = multer({ dest: './public/uploads/', storage: storage});

router.get('/list', builders.list);

router.get('/registration',builders.showRegistrationPage);

router.post('/registration',builders.save);

router.get('/profile/:id',builders.show);

router.get('/display', builders.displayPage);

router.post('/show', builders.findByName);

router.get('/edit/:id', builders.edit);// Edit builder

router.get('/show/:id', builders.show);//get single builder by id

router.post('/update/:id', builders.update);

router.post('/delete/:id', builders.delete);

router.post('/profile/:id/upload', upload.single('img'), function(req, res){
    console.log('helloooooooo images');
    res.json({file: req.file});
});

//router.post('/postReview/:id', builders.postReview);
//router.get('/postReview/:id',builders.displayPost);

module.exports = router;

