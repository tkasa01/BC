const mongoose = require('mongoose');
var Schema =  mongoose.Schema;
var multer = require('multer');
var path = require('path');
var mongoURL = 'mongodb://localhost/BC';

//create connection
var db = mongoose.connect(mongoURL,{
    useMongoClient: true
});
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var crypto = require('crypto');

mongoose.Promise = global.Promise;
var conn = mongoose.connection;

var schemaGFS = new Schema({},{strict: false}, "fs.files");
var GFS = mongoose.model('GFS', schemaGFS);


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
                const fileInfo = {
                    filename:filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            })
        })
    }
});

var upload = multer({storage: storage}).single('file');


