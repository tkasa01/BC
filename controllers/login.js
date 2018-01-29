var Builder = require('../models/Builder');
var Customer = require('../models/Customer');
var Promise = require('promise'); // fulfill, reject
//var validation = require('./handlers/validation');
var auth = require('../auth');
var bcrypt = require('bcrypt-nodejs');
var store = require('store');
var errors ,
    messages ;

exports.login = function(req, res, next){
        var data = req.body;
        if(data.email && data.password){
            Builder.findOne({'email': req.body.email}, function (err, builder) {
                if (builder) {
                    if (bcrypt.compareSync(req.body.password, builder.password)) {
                        var token = auth.signToken(builder);//login successful
                        store.set('jwt', token);
                        res.redirect('/');
                    } else {
                        console.log('incorrect passport');
                    }
                } else {
                    Customer.findOne({'email': req.body.email}, function (err, customer) {
                        if (customer) {
                            if (bcrypt.compareSync(req.body.password, customer.password)){
                                var token = auth.signToken(customer);
                                store.set('jwt', token);
                                res.redirect('/');
                                console.log(customer);
                            } else {
                                console.log('user not found, sorry');
                            }
                        }
                    });
                }
            })
        }else{
            global.errors = ["Please enter email and password"];
            res.redirect("/login");
        }


};


exports.logout = function(req,res,next){
    store.remove('jwt');
   // messages.push('You are log out');
    res.redirect('/');
};


exports.displayErrors = function(){
    if(errors.length > 0){
        return errors;
    }else{
        messages.push('Success, you are login');
        return messages;
    }
};


exports.decodeToken = function(){
    return function(req, res, next){
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer '+ req.query.access_token;
        }
        checkToken(req, res, next);
    }
};
