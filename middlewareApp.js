var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var store = require('store');
var auth = require('./auth');

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    //for jwt token
    app.use(function(req,res,next){
        if(store.get('jwt')){
            auth.checkAuth(store.get('jwt')).then(function(user){
                req.user = user;
            },function(err){
                //handle error
            })
        }else{
            console.log('I am not log');
            req.user = null;
        }
        next();
    })
};