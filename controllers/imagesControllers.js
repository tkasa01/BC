var mongoose = require('mongoose');
var multer = require('multer');
var GFS = require('../models/GFS');
var Builder = require('../models/Builder');
var path = require('path');
var Grid = require('gridfs-stream');
var GridFsStorage = require('multer-gridfs-storage');
var storage = GFS.storage;
var upload = multer({storage: storage});
mongoose.Promise = global.Promise;
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs ;

conn.once('open', function(){
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

exports.displayImages = function(req, res) {
                gfs.files.find().toArray(function (err, files) {
                    if (!files || files.length === 0) {
                        res.render('./photo/photogallery', {
                            files: files,
                            title: 'Categories: ',
                            categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
                            user: req.user
                        });
                    } else {
                        files.map(function (file) {
                            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
                                file.isImage = true;
                                var readstream = gfs.createReadStream(file.filename);
                                readstream.pipe(res);
                            }
                        });
                        res.render('./photo/photogallery', {
                            files: files,
                            title: 'Categories: ',
                            categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
                            user: req.user,
                            _id: req.params.id
                        });
                    }

                 });
};


//display one image
 exports.displayOneImage = function (req, res){
     gfs.files.findOne({filename: req.params.filename},function(err, file){
         if(!file || file.length === 0){
             return res.status(404).json({
                err: 'No file exist'
             })
         }
         if(file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/png'){
         //read output
            var readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
         }
     })
 };


exports.deleteFile = function(req, res){
    gfs.remove({_id:req.params.id, root: 'images'}, function (err, gridStore) {
        if (err) {
           return res.status(404).json({err: err});
        }
        res.redirect('/photo/phptogallery/', {

        });
    });
};


//display one image as JSON
exports.getOneImage = function (req, res){
    gfs.files.findOne({filename: req.params.filename},function(err, file){
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        return res.json(file);
    })
};

exports.displayFile = function (req, res){
    gfs.files.find().toArray(function(err, files){
        if(!files || files.length == 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
};

//module.exports = imagesController;
