var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var store = require('store');
var auth = require('./auth');
var Builder = require('./models/Builder');

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });


    //for jwt token
    app.use(function(req,res,next){
        if(store.get('jwt')){
            auth.checkAuth(store.get('jwt')).then(function(user){
                req.user = user.user;
                req.role = user.role;
                next();
            },function(err){
                res.send(err);
                next();
            })
        }else{
            req.user = null;
            req.role = "guest";
            next();
        }
    })
};




