var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

};