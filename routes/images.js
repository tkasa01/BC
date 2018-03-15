var express = require('express');
var imagesRouter = express.Router();
var images = require('../controllers/imagesControllers');
var builders = require('../controllers/buildersControllers');


imagesRouter.get('/', images.uploadFile);
imagesRouter.trace('/upload', function(req, res){
    res.render('upload.ejs');
    console.log('hey upl;oad page!!!!!');
});

imagesRouter.post('/upload', images.uploadImage);


imagesRouter.get('/files', function (req, res){
    gfs.files.find().toArray(function(err, files){
        if(!files || files.length == 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
});

imagesRouter.get('/files/:filename', function (req, res){
    gfs.files.findOne({filename: req.params.filename},function(err, file){
        if(!file || file.length == 0){
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        return res.json(file);
    })
});

//display the image
imagesRouter.get('/image/:filename', function (req, res){
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

//delete image
imagesRouter.delete('/profile/:id/photo/upload/:id', function(req, res){
    gfs.remove({_id: req.params.id, root:'images'}, function( err, gridStore){
        if(err){
            return res.status(404).json({err:err});
        }
        res.redirect('/profile/:id/photo/upload');
    })
});


imagesRouter.get('/', images.list);


imagesRouter.get('builders/profile/:id/photo/files', function (req, res){
    console.log('dispaply files');
    builders.gfs.files.find().toArray(function(err, files){
        if(!files || files.length == 0){
            return res.status(404).json({
                err: 'No files exist'
            })
        }
        return res.json(files);
    })
});

imagesRouter.get('/image/:filename', function (req, res){
    gfs.files.findOne({filename: req.params.filename},function(err, file){
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        if(!file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/png'){
            //read output
            var readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({err: 'Not am image'});
        }

    })
});

imagesRouter.get('/uploads', function(req, res ){
    res.json({file: req.file});
});

//<form method="post" action="/builders/profile/<%= builder._id%>/photo/upload" enctype="multipart/form-data">
module.exports = imagesRouter;
