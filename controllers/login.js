var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
var Builder = require('../models/Builder');
var validation = require('./validation');
//var checkToken = expressJwt({secret: config.secrets.jwt});
var builderController = {};

builderController.getEmail = function(req, res){
    console.log(req.email);
    if(req.email){
        return res.send({
            email: req.email,
            massage: req.flash('success')
        })
    }
    res.send({
        errors: true,
        message: req.flash('not authorized')
    })
};

exports.decodeToken = function(){
    return function(req, res, next){
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer '+ req.query.access_token;
        }
        checkToken(req, res, next);
    }
};

exports.getFreshUser = function () {
    return function(req, res, next){
        Builder.findById(req.builder._id).then(function(user){
            if(!user){
                res.status(401).send('No user with the given email')
            }
        })
    }
};


builderController.checkUser = function(req, res, next){
   var email = req.body.email;
   var password = req.body.password;
    if(!email || !password) {
        res.status(400).send('You need a username and a password');
        return;
    }
        Builder.findOne({email: email}).then(function (user) {
            console.log(email);
            if(!user){
                res.status(401).send('No user exist');
            }else{
                if(!user.authenticate(password)){
                    res.status(401).send('Wrong password');
                }else{
                   req.user = user;
                   next();
                }
            }
        },function (err) {
           next(err);
        });
    //}

};


module.exports = builderController;

/*
 var builder = ({
 firstname: 'lalala',
 lastname: 'mamamam'
 });
 return res.render('../views/builders/profile',{builder: builder,
 pageTitle: 'Registration paje for builders',
 builderMessage: 'I am a qualified builder with experience'
 });
 */