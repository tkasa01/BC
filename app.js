var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');

var shortid = require('shortid');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var fs = require('fs');
var validator = require('validator');
var _ = require('lodash');

/*it is a middleware function that gives the value of that id, it is a forth argument */
app.param('id', function(req, res, next, id){
    console.log("this is my id" + id);
    next();
});

//var flash = require('connect-flash');
require('./middlewareApp')(app);
var api = require('./api/router');


mongoose.Promise = global.Promise;
//var MongoStore = require('connect-mongo')(session);
//create connection
var db = mongoose.connect('mongodb://localhost/BC',{
  useMongoClient: true
});

fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if(~filename.indexOf('sf'))require(__dirname + '/models' + filename)
});
/*
require('./models/Builder');
var Builder = mongoose.model('Builder');

require('./models/Customer');
var Customer = mongoose.model('Customer');

require('./models/Post');
var Post = mongoose.model('Post');

require('./models/Review');
var Review = mongoose.model('Review');

require('./models/GFS');
var GFS = mongoose.model('GFS');

require('./models/Category');
var Category = mongoose.model('Category');
*/

//app.locals.info = 'flash';
app.locals.siteTitle = 'Building Company';



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', api);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'foolala',
    saveUninitialized: true,
    resave: true,
    mongooseConnection: mongoose.connection,
    autoRemove: 'native',

    cookie: {maxAge: 180*60*1000} //2 hours
}));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.use(function(req, res, next){
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


