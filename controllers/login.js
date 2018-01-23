var Builder = require('../models/Builder');
var Customer = require('../models/Customer');
var validation = require('./validation');
var auth = require('../auth');
var builderController = {};
var bcrypt = require('bcrypt-nodejs');
var store = require('store');

builderController.getEmail = function(req, res){
    console.log(req.email);
    if(req.email){
        return res.send({
            email: req.email,
            massage: req.flash('success')
        })
    }
    res.send({
        errors:  ('not authorized')
    })
};

exports.login = function(req,res,next){
    Builder.findOne({'email' : req.body.email},function(err,builder){
        if(builder){
            if(bcrypt.compareSync(req.body.password, builder.password)){
                var token = auth.signToken(builder);//login successful
                store.set('jwt',token);
                res.redirect('/');
            }else{
                console.log('incorrect passport');
            }
        }else{
    Customer.findOne({'email' : req.body.email},function (err,customer){
         if(customer){
             if(bcrypt.compareSync(req.body.password, customer.password))
                 var token = auth.signToken(customer);
                 store.set('jwt', token);
                 res.redirect('/');
                    console.log(customer);
         }else{
                console.log('user not found, sorry');
         }
    })
        }
    });
};

exports.logout = function(req,res,next){
    store.remove('jwt');
    res.redirect('/');
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


exports.builder = function(email){

};
