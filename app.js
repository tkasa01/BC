var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var shortid = require('shortid');
var mongoose = require('mongoose');
var passport = require('passport');
var methodOverride = require('method-override');
var validator = require('express-validator');
var flash = require('connect-flash');
var api = require('./api/router');
var imagesDownload = require('./api/mongoose');
//var error = require('./error.js');
require('./middlewareApp')(app);
require('./config/passport')(app, passport);
//require('./db');

mongoose.Promise = global.Promise;
//var MongoStore = require('connect-mongo')(session);
var db = mongoose.connect('mongodb://localhost/BC',{
  useMongoClient: true
});
console.log('listen on port 3000' + db);


//app.locals.info = 'flash';
app.locals.siteTitle = 'Building Company';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', api);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(session({
    secret: 'foo',
    saveUninitialized: true,
    resave: true,
    //store: new  MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'native',
   // }),
    cookie: {maxAge: 180*60*1000} //2 hours
}));
app.use(passport.initialize());
app.use(passport.session());//persistent login session
app.use(flash());//use connect-flash for flash messages stored in session


// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function (req, res, next){
     res.locals.message = req.flash();
   next();
});

//Express Validation Middleware
app.use(validator
({errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }})
);

// Route that creates a flash message using custom middleware
/*
app.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
        type: 'success',
        message: 'This is a flash message using custom middleware and express-session.'
    };
    res.redirect(301, '/');
});
*/
//app.use(error());


require('./models/Builder');
var Builder = mongoose.model('Builder');

require('./models/Customer');
var Customer = mongoose.model('Customer');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req,res,next){
    req.errors = {};
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


