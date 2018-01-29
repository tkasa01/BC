/**
 * Created by tkasa on 12/12/2017.
 */
var mongoose = require('mongoose');
var Customer = require('../models/Customer');
var validation = require('./handlers/validation');
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
    Customer.findOne({_id: req.params.id}).exec(function(err, customer){
        if(err){
            console.log("error: ", err);
        }
        else{
            res.render('../views/customers/profile', {
                pageTitle: 'Customer\'s a home page',
                customer: customer,
                user: req.user
            });
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
        errors = err;
        res.redirect('/customers/registration');
    });
    global.errors = '';
};


//add by id function
customerController.edit = function(req, res) {
    Customer.findOne({_id: req.params.id}).exec(function (err, customer) {
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
    Customer.findByIdAndUpdate(req.params.id, { $set: {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        address: req.body.address}},
        { new: true }, function (err, customer) {
        if (err) {
            console.log(err);
            res.render("../views/customers/edit", {customer: req.body,  user: req.user});
        }
        res.redirect("/customers/show/"+customer._id);
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
    //Needs a profile ejs page

    //Fine customer by id and return customer data
};

module.exports = customerController;