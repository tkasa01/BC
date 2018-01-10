/**
 * Created by tkasa on 09/01/2018.
 */

var mongoose = require('mongoose');
//var config = require('./config/');

mongoose.Promise = global.Promise;
//var MongoStore = require('connect-mongo')(session);
var db = mongoose.connect('mongodb://localhost/BC',{
    useMongoClient: true
});


require('./models/Builder');
var Builder = mongoose.model('Builder');

require('./models/Customer');
var Customer = mongoose.model('Customer');