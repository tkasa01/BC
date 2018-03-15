var mongoose = require('mongoose');
var multer = require('multer');
var Image = require('../models/Images');
var path = require('path');
var imagesController = {};

var mongoURL = 'mongodb://localhost/BC';
//create connection
var db = mongoose.connect(mongoURL,{
    useMongoClient: true
    // reconnectTries: Number.MAX_VALUE
});
var conn = mongoose.connection;
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var crypto = require('crypto');

var gfs;
conn.once('open', function(){
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});


//create storage engine
var storage = new GridFsStorage({
    url: mongoURL,
    file: function (req, file){
        return new Promise(function(resolve, reject){
            crypto.randomBytes(16, function(err, buf){
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                // const categories = req.body.categories.value;
                const fileInfo = {
                    filename:filename,
                    //    categories: categories,
                    bucketName: 'images' // backendname should math to the collection name
                };
                resolve(fileInfo);
                console.log(req.body.categories);
            })
        })
    }
});
const upload = multer({storage: storage});

imagesController.list = function(req, res, next){
    Image.find({}).exec(function(err, categories){
        if(err){
            res.sendStatus(403);
        }else{
            res.render('../views/photo/photogallery',{
                pageTitle: 'Collection of the builders work',
                title: 'Categories: ',
                categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
                user: req.user
            })
        }
    });
    next();
};

imagesController.uploadImage =  upload.single('file'), function(req, res){
    res.redirect('/photogallery');
};

imagesController.uploadFile = function(req, res){
    gfs.files.find().toArray(function (err, files) {
        if (!files || files.length == 0) {
            res.render('/upload', {
                files: false,
                user: req.user
            });
        } else {
            files.map(function (file) {
                if (file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/jpg') {
                    file.isImage = true;}
            });
        }
        res.render('/upload', {
            files: files,
            user: req.user
        });
    });
};
module.exports = imagesController;
