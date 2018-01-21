var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    //for jwt token
    app.use(function(req,res,next){
        if(true){
            //req.user = decode
        }else{
            req.user = null;
        }
        next();
    })
};