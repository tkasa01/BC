var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var shortid = require('shortid');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var validator = require('validator');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var flash = require('connect-flash');
var api = require('./api/router');
var imagesDownload = require('./api/mongoose');
//var error = require('./error.js');
require('./middlewareApp')(app);

//require('./config/passport')(app, passport);
//require('./db');

mongoose.Promise = global.Promise;
//var MongoStore = require('connect-mongo')(session);
var db = mongoose.connect('mongodb://localhost/BC',{
  useMongoClient: true
});
console.log('listen on port 3000' + db);


//app.locals.info = 'flash';
app.locals.siteTitle = 'Building Company';

/*it is a middleware function that gives the value of that id, it is a forth argument */
app.param('id', function(req,res, next,id){
        console.log(id);
        next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', api);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(session({
    secret: 'foolala',
    saveUninitialized: true,
    resave: true,
    //store: new  MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'native',
   // }),
    cookie: {maxAge: 180*60*1000} //2 hours
}));

//================================================================//
//Express Messages Middleware
//app.use(function (req, res, next) {
  //  res.locals.sessionFlash = req.sessionFlash;
    //res.locals.messages = require('express-messages')(req, res);
   // delete req.locals.session.sessionFlash;
   // next();
//});

//===================================================================

app.use(passport.initialize());
app.use(passport.session());//persistent login session

require('./models/Builder');
var Builder = mongoose.model('Builder');

require('./models/Customer');
var Customer = mongoose.model('Customer');

require('./models/Post');
var Post = mongoose.model('Post');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.use(function(req,res,next){
    req.messages = [];
    req.errors = [];
    next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




console.log('hello');
module.exports = app;


