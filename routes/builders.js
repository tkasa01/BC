/**
 * Created by tkasa on 19/12/2017.
 */
var express = require('express');
var router = express.Router();
//var Builder = require('../models/Builder');
var builders = require('../controllers/buildersControllers');
/*
var path = require('path');
var mongoose = require('mongoose');
var mongoURL = 'mongodb://localhost/BC';
//create connection
var db = mongoose.connect(mongoURL,{
    useMongoClient: true
   // reconnectTries: Number.MAX_VALUE
});
var conn = mongoose.connection;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var crypto = require('crypto');
*/
//mongoose.Promise = global.Promise;
//var MongoStore = require('connect-mongo')(session);

/*
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
*/
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

//router.post('/postReview/:id', builders.postReview);
//router.get('/postReview/:id',builders.displayPost);

//router.get('/profile/:id/photo/upload', builders.displayUploadPage);
/*
router.get('/profile/:id/photo/upload', function(req, res){
    Builder.findOne({_id: req.params.id}).exec(function (err, builder) {
        if (err) {
            res.send(err);
        } else {
            gfs.files.find().toArray(function (err, files) {
                if (!files || files.length == 0) {
                    res.render('./photo/upload', {
                        files: false,
                        user: req.user,
                        builder: builder,
                         _id: req.params.id});
                } else {
                    files.map(function (file) {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/jpg') {
                            file.isImage = true;
                        } else {
                            file.isImage = false;
                        }
                    });
                    res.render('./photo/upload', {
                        files: files,
                        user: req.user,
                        builder: builder,
                        _id: req.params.id});
                }
            });

        }
    })
});*/
/*
router.get('/profile/:id/photo/upload', function(req, res){
    Builder.findOne({_id: req.params.id}).exec(function (err, builder, files) {
        if (err) { res.send(err);
        } else {
            gfs.files.find().toArray(function (err, files) {
                if (!files || files.length == 0) {
                    res.render('./photo/upload', {
                        files: false,
                        user: req.user,
                        builder: builder,
                        _id: req.params.id});
                } else {
                    files.map(function (file) {
                        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/jpg') {
                            file.isImage = true;}
                    });

                }
                res.render('./photo/upload', {
                    files: files,
                    user: req.user,
                    builder: builder,
                    _id: req.params.id
                });
            });
        }
    });
});

router.post('/profile/:id/photo/upload', upload.single('file'), function(req, res){
    res.redirect('/photogallery');
});


router.get('/profile/:id/photo/files', function (req, res){
    gfs.files.find().toArray(function(err, files){
        if(!files || files.length == 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
});


router.get('/profile/:id/photo/files/:filename', function (req, res){
    gfs.files.findOne({filename: req.params.filename},function(err, file){
        if(!file || file.length == 0){
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        return res.json(file);
    })
});
*/

//display the image
/*
router.get('/image/:filename', function (req, res){
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
        }else{
             res.status(404).json({
                 err: 'Not am image'});
        }
    })
});
*/

//delete image
/*
router.delete('/profile/:id/photo/upload/:id', function(req, res){
    gfs.remove({_id: req.params.id, root:'images'}, function( err, gridStore){
        if(err){
            return res.status(404).json({err:err});
        }
        res.redirect('/profile/:id/photo/upload');
    })
});
*/
module.exports = router;

/*
store an image on a file
 var storage = multer.diskStorage({
 destination: function(req, file, cb){
 cb(null,'./public/uploads/')
 },
 filename: function(req, file, cb){
 cb(null, Date.now() + file.originalname);

 }
 });
 var upload = multer({ dest: './public/uploads/', storage: storage});

 router.post('/profile/:id/photo/upload', upload.single('img'), function(req, res){
 console.log('helloooooooo images');
 res.json({file: req.file});
 });
 */