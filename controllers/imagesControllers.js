var mongoose = require('mongoose');

var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null,Date.now() + file.originalname);

    }
});
var upload = multer({storage: storage});
var Image = require('../models/Images');
var fs = require('fs');
var path = require('path');
var imagesController = {};


imagesController.save = function(req, res) {
    var image = new Image();
    image.img.data = fs.readFileSync(req.files.userPhoto.path); //
    image.img.contentType = 'image/png';
    image.save(function (err, image) {
        if (err) {
            res.send(err);
        } else {
            res.render('./photo/photogallery',{user:req.user});
            console.log(image);
        }
    });
};

imagesController.list = function(req, res, next){
    Image.find({}).exec(function(err, images){
        if(err){
            res.sendStatus(403);
        }else{
            res.render('../views/photo/photogallery',{
                pageTitle: 'Collection of the builders work',
                title: 'Categories: ',
                categories: ['Bathrooms', 'Electricity', 'Paining job', 'Carpenter'],
                user: req.user
            })
        }
    });
    next();
};


module.exports = imagesController;
    /*
    {
    index: function (req, res) {
        res.send('the image ' + req.param.image_id);
    },
    create:function (req, res) {
        res.send('post the image ' );
    },
    like:function (req, res) {
        res.send('the image: like post cpntrollers ');
    },
    comment:function (req, res) {
        res.send('the coment post: like post cpntrollers ');
    }
};*/