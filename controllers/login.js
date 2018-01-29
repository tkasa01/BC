var Builder = require('../models/Builder');
var Customer = require('../models/Customer');
var auth = require('../auth');
var bcrypt = require('bcrypt-nodejs');
var store = require('store');

function checkData(req, res, next){
    var user = req.body;
    if(!user.email){
        global.errors = ['The user is not found'];
        res.redirect("/login");
    }
    next();
}
exports.login = function(req, res, next){
    var data = req.body;
    if(data.email && data.password){
        Builder.findOne({'email': req.body.email},function (err, builder) {
            if (builder) {
                 if (bcrypt.compareSync(req.body.password, builder.password)) {
                    var token = auth.signToken(builder); //login successful
                    store.set('jwt', token);
                    res.redirect('/');
                } else {
                    global.errors = ['incorrect password'];
                    res.redirect("/login");
                }
            }else{
                Customer.findOne({'email': req.body.email}, function (err, customer) {
                    if (customer) {
                        if (bcrypt.compareSync(req.body.password, customer.password)){
                            var token = auth.signToken(customer);
                            store.set('jwt', token);
                            res.redirect('/');
                            console.log(customer);
                        } else {
                            global.errors = ['sorry'];
                            // errors.push('Sorry, user is not found');
                            res.redirect("/login");
                        }
                    }else{
                        global.errors = ['The user is not found'];
                        res.redirect("/login");
                    }
                });
            }
        })
    }else{
        global.errors = ["Please enter an email and a password"];
        res.redirect("/login");
    }
};




function isLoggedIn(req, res, next){
    if(req.login())
        return next();
    res.redirect('/');
}

exports.logout = function(req,res,next){
    store.remove('jwt');
    global.messages = ['You are log out'];
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


/*
 exports.login = function(req, res, next){
 var data = req.body;
    if(data.email && data.password){
         Builder.findOne({'email': req.body.email}, function (err, builder) {
           if (builder) {
             if (bcrypt.compareSync(req.body.password, builder.password)) {
                 var token = auth.signToken(builder); //login successful
                 store.set('jwt', token);
                 res.redirect('/');
             } else {
                 global.errors = ['incorrect password'];
                 res.redirect("/login");
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
         global.errors = ['sorry'];
         // errors.push('Sorry, user is not found');
         res.redirect("/login");
         }
         }
         });
        }
 })
 }else{
 global.errors = ["Please enter an email and a password"];
 res.redirect("/login");
 }
 };
 */

/*
 exports.login = function(req, res, next) {
 var errors  = [];
 var data = req.body;

 if (data.email && data.password) {
 Builder.findOne({'email': req.body.email}, function (err, builder) {
 if (!builder) {
 global.errors = ['The user is not found'];
 res.redirect("/login");
 }
 else {
 if (bcrypt.compareSync(req.body.password, builder.password)) {
 var token = auth.signToken(builder); //login successful
 store.set('jwt', token);
 //res.render('./profile/:id');
 res.redirect('/');
 } else {
 global.errors = ['Incorrect password'];
 res.redirect("/login");
 }
 }
 }) ||
 Customer.findOne({'email': req.body.email}, function (err, customer) {
 if (!customer) {
 global.errors = ['The Customer is not found'];
 res.redirect("/login");
 }
 else {
 if (bcrypt.compareSync(req.body.password, customer.password)) {
 var token = auth.signToken(customer);
 store.set('jwt', token);
 // res.render('./customers/profile/:id');
 res.redirect('/');
 console.log(customer);
 } else {
 global.errors = ['Incorrect password'];
 //errors.push('Incorrect password');
 res.redirect("/login");
 }
 }

 });

 }else{
 global.errors = ["Please enter an email and a password"];
 res.redirect("/login");

 };
 */