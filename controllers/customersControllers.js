/**
 * Created by tkasa on 12/12/2017.
 */
var mongoose = require('mongoose');
var Customer = require('../models/Customer');
var customerController = {};

//all list of customers
 customerController.list = function(req, res) {
    Customer.find({}).exec(function (err, customers) {
        if (err) {
            req.flash("error","All list iz not shown");
            console.log("error", err);
        } else {
            res.render('../views/customers/index', {
                pageTitle: 'List of customers',
                customers: customers});
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
            res.render('../views/customers/show', {
                pageTitle: 'Customer\'s a home page',
                customer: customer});
        }
    });
};

customerController.create = function (req, res) {
   res.render('../views/customers/registration',{
       pageTitle: 'Registration Page for Customers'
   });
};

//save new customer
customerController.save = function(req, res) {
    var customer = new Customer(req.body);
    customer.save(function(err) {
        if(err) {
            console.log(err);
            res.render("../views/customers/registration",{pageTitle: 'Registration Page for Customers'});
        } else {
            console.log("Successfully created a customer.");
            res.redirect("/customers/show/"+ customer._id);
        }
    });

};

//add by id function
customerController.edit = function(req, res) {
    Customer.findOne({_id: req.params.id}).exec(function (err, customer) {
        if (err) {
            res.send(err);
            console.log("Error:", err);
        }
        else {
            res.render("../views/customers/edit", {customer: customer});
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
            res.render("../views/customers/edit", {customer: req.body});
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