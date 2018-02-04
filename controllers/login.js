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
                    console.log(builder);
                    res.redirect('/builders/profile/' + builder.id);
                } else {
                    global.errors = ['Incorrect password'];
                    res.redirect("/login");
                }
            }else{
                Customer.findOne({'email': req.body.email}, function (err, customer) {
                    if (customer) {
                        if (bcrypt.compareSync(req.body.password, customer.password)){
                            var token = auth.signToken(customer);
                            store.set('jwt', token);
                            res.redirect('/customers/profile/' + customer.id);
                            //res.redirect('/');
                            console.log(customer);
                        } else {
                            global.errors = ['Incorrect password'];
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
