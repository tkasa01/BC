var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
//var passport = require('passport');
//var passportJWT = require('passport-jwt');
var config = require('./config/config');


//var ExtractJwt = passportJWT.ExtractJwt;
//var JwtStrategy = passportJWT.Strategy;
/*
exports.decodeToken = function(){
    return function (req, res, next) {
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        checkAuth(req, res, next);
    }
};

exports.verifyUser = function (token) {
   // console.log(token);
    return new Promise(function(resolve, reject){
        jwt.verify(token, process.env.JWT_SECRET, function(err, dectoken){
            console.log(token);
           if(err || !dectoken) {
           return reject(err)
           }
           resolve(dectoken);
        })
    })

};
*/

exports.signToken = function(user){
    var jwtData = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname
    }
    return jwt.sign(
        {user: jwtData},
        config.secret
    );
};

exports.checkAuth = function(token){
    return new Promise(function(fulfill,reject){
        console.log(token);
        jwt.verify(token, config.secret, function (err, user) {
            if(err)
                reject(err);
            fulfill(user);
        })
    })

};

