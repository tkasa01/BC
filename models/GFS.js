const mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var mongoURL = 'mongodb://localhost/BC';
var Schema =  mongoose.Schema;
//create connection
var db = mongoose.connect(mongoURL,{
    useMongoClient: true
});
var conn = mongoose.connection;
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var crypto = require('crypto');

mongoose.Promise = global.Promise;


//========== the block for upload images ===============
var gfs;
conn.once('open', function(){
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

//create storage engine using gridFS
var storage = new GridFsStorage({
    url: mongoURL,
    file: function (req, file){
        return new Promise(function(resolve, reject){
            crypto.randomBytes(16, function(err, buf){
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const categories = function(req, categories, cb) {
                    if(categories.value !== ""){
                        cb(null, req.body.categories.value);
                    }
                    console.log(categories(cb));
                };
                const fileInfo = {
                    filename:filename,
                    categories: categories,
                    bucketName: 'images' // backendname should math to the collection name
                };
                resolve(fileInfo);

            })
        })
    }
});

 multer({storage: storage}).single('file');


var GFS = module.exports = mongoose.model('GFS', new Schema({},{strict: false}), "images.files");
