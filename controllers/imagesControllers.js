var mongoose = require('mongoose');
var Image = require('../models/Images');
var fs = require()
var imagesController = {};


imagesController.save = function(req, res) {
    var image = new Image;
    image.img.data = fs.readFileSync('../views/builders/profile');
    image.type = 'image/png';

    image.save(function (err, image) {
        if (err) {
            res.send(err);
        } else {
            res.render('./photo/photogallery');
        }
    });
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