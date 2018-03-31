/**
 * Created by tkasa on 12/12/2017.
 */

var mongoose = require('mongoose');
var Customer = require('../models/Customer');
var Post = require('../models/Post');
var validation = require('./handlers/validation');
var async = require('async');
var customerController = {};

//all list of customers
customerController.list = function(req, res) {
    Customer.find({}).exec(function (err, customers) {
        if (err) {
            res.send(err);
            console.log("error", err);
        } else {
            res.render('../views/customers/index', {
                pageTitle: 'List of customers',
                customers: customers,
                user: req.user
            });
        }
    });
};


//shows single
customerController.show = function(req, res){
    Customer.findOne({_id: req.params.id}).populate('post').exec(function(err, customer, posts){
        if(err){
            console.log("error: ", err);
        }
        else{
            Post.find({}).exec(function(err, posts){
               if(err){
                   res.send(err);
               } else{
                   res.render('../views/customers/profile', {
                       pageTitle: 'Customer\'s a home page',
                       customer: customer,
                       posts: posts,
                       user: req.user,
                       errors: global.errors,
                       messages: global.messages
                   });
                   global.errors = '';
                   global.messages = '';
               }
            })
        }

    });
};

customerController.create = function (req, res) {
    res.render('../views/customers/registration',{
        pageTitle: 'Registration Page for Customers',
        user: req.user,
        errors: global.errors
    });
    global.errors = '';

};

//save new customer
customerController.save = function(req, res) {
    validation.customer(req.body).then(function(validatedUser) {
        console.log(req.body);
        var customer = new Customer(validatedUser);
        customer.save(function (err, customer) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                console.log(customer);
                res.redirect('/login');
            }
        });
    },function(err){
        console.log(err);
        errors = global.erors;
        res.redirect('/customers/registration');
    });
    global.errors = '';
};


//add by id function
customerController.edit = function(req, res) {
    Customer.findOne({_id: req.params.id}).exec(function (err, customer, posts) {
        if (err) {
            res.send(err);
            console.log("Error:", err);
        }
        else {
            res.render("../views/customers/edit", {customer: customer,  user: req.user});
        }
    });
};

//update
/*the strings updated not right! should I do validation?*/

customerController.update = function(req, res) {
    Customer.findByIdAndUpdate(req.params.id, {
        $set:
            {
            title: req.body.title,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address}
    },
        { new: true }, function (err, customer) {
            if (err) {
                console.log(err);
                res.render("../views/customers/edit", {customer: req.body,  user: req.user});
            }
            res.redirect("/customers/show/"+ customer._id);
        });
};

//delete
customerController.delete = function(req, res) {
    Customer.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Customer deleted!");
            res.redirect("/customers");
        }
    });
};

//Profile page
customerController.profile = function(req,res){
    Customer.findOne({_id: req.params.id}).exec(function(err, customer){
        if(err){
            console.log("error: ", err);
        }
        else{
            res.render('../views/customers/profile', {
                pageTitle: 'Customer\'s a home page',
                customer: customer,
                user: req.user,
                errors: global.errors,
                messages: global.messages
            });
            global.errors = '';
            global.messages = '';
        }
    });
};


customerController.getMyPosts = function (req, res) {
    Post.find({user: req.params._id}, function (err, posts) {
        Post.populate(posts, {path: 'customer'}, function (err, posts) {
                if(err){
                    res.send(err);
                }else{
                    var list = [];
                    async.forEach(posts, function (post, callback) {
                        if (post.author_id) {
                            Customer.findById(post.author_id, function (err, customer) {
                           // Customer.findById(post.author_id, function (err, customer) {
                                console.log(post.author_id);
                                if (post.author_id) {
                                    list.push({post: post, author_id: customer});
                                    callback();
                                }
                            })
                        } else {
                            callback();
                        }
                    }, function (err) {
                            if (err) res.send(err);
                            res.render('posts/dashboard', {
                                customer:req.body.params,
                                pageTitle: 'My posts',
                                author_id: req.user,
                                user: req.user,
                                posts: posts
                            });
                           }
                    )
                }
         });       //res.send(posts);
    });
};


module.exports = customerController;

/*
customerController.getMyPosts = function (req, res) {
    Post.find({user: req.params._id}, function (err, posts) {
        Post.populate(posts, {path: 'customer'}, function (err, posts) {
            if(err){
                res.send(err);
            }else{
                var list = [];
                async.forEach(posts, function (post, callback) {
                        if (post.author_id) {
                            Customer.findOne({user: post.author_id}, function (err, customer) {
                                // Customer.findById(post.author_id, function (err, customer) {
                                console.log(post.author_id);
                                if (post.author_id === user._id) {
                                    list.push({post: post, author_id: customer});
                                    callback();
                                }
                            })
                        } else {
                            callback();
                        }
                    }, function (err) {
                        if (err) res.send(err);
                        res.render('posts/dashboard', {
                            _id:req.body.params,
                            pageTitle: 'My posts',
                            author_id: req.user,
                            user: req.user,
                            posts: posts
                        });
                    }
                )
            }
        });       //res.send(posts);
    });
};

*/