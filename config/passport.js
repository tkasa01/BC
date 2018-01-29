/**
 * Created by tkasa on 08/01/2018.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Builder'),
    config = require('./config'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function (app) {

    const localOp = {username: 'email'};
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });



    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
       //passReqToCallback: true
    },
        function (email, password, done) {
        User.authenticate(email, password, function(err, user){
            if(err)
                return done(err);
            if(!user){
                return done(null, false, req.flash('loginMessage', 'Invalid password or email is already taken'));
        }
            return done(null, newUser);
       })
     }

    ))
};

