/**
 * Created by tkasa on 19/12/2017.
 */
var mongoose = require('mongoose');
var flash = require('connect-flash');
var Builder = require('../models/Builder');
var shortid = require('shortid');
var validation = require('./validation');
var builderController = {};

//all list of builders
builderController.list = function(req, res) {
    Builder.find({}).exec(function (err, builders) {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/builders/list', {
                pageTitle: 'List of Builders' ,
                builders: builders});
        }
    });
};
function getBuilder(builder) {
    return '${builder}'
}

builderController.findByName = function(req, res){
    var query = Builder.find({id: req.params.id});
    console.log(req.body.firstname);
    console.log(req.body.lastname);
     Builder.$where('firstname').exec(function (err, builder) {
        if(err || !builder){
            res.send('non found');
        }else{
            res.render('../views/builders/show',{builder: builder});
        }
    });
};

//shows single
builderController.show = function(req, res){Builder.findOne({_id: req.params.id}).exec(function(err, builder){
    if(err){
        console.log(err);
        res.render('../views/index',{pageTitle: 'Home page'});
    }
    else{
        console.log(builder);
        var builderMessage = 'I am a qualified builder with experience';
        res.render('../views/builders/profile', {
            builderMessage: builderMessage,
            pageTitle: 'Builder\'s a home page',
            builder: builder});
    }
});
};

builderController.showRegistrationPage = function(req,res){
    res.render('builders/registration', {
        pageTitle: 'Registration Page for builders',
        errors: global.errors
    });
    global.errors = '';
};

builderController.save = function(req, res) {
    validation.builder(req.body).then(function(validatedUser){
        var builder = new Builder(validatedUser);
        builder.save(function (err){
            if(err){
                res.json("/",{ messages: global.messages});
               // res.redirect("/",{ messages: global.messages});
            }
        });
    },function(err){
      errors = err;
        res.redirect("/builders/registration");

    });
    global.errors = '';
};

//add by id function
builderController.edit = function(req, res) {
    Builder.findOne({_id: req.params.id}).exec(function (err, builder) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/builders/edit", {builder: builder, pageTitle:'Builder edit page'});
        }
    });
};

//update
builderController.update = function(req, res){
   // var update = req.body;
    //    if(update.id){delete update.id;}
        Builder.findByIdAndUpdate(req.params.id, {$set: {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        position:req.body.position,
        dob: req.body.dob,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        ncards:req.body.ncards,
        education:req.body.education,
        insurance:req.body.insurance,
        address: req.body.address,
        password: req.body.password,
        confpassword: req.body.password}},
        { new: true },
      function (err, builder) {
           if (err) {
               console.log(err);
               res.render("../views/builders/edit", {builder: req.body});
           }
             //  var updateBuilder = _.assign(builder, update);
               res.redirect('/builders/show/'+builder._id);
      });
 };


 //delete
 builderController.delete = function(req, res) {
 Builder.remove({_id: req.params.id}, function(err) {
 if(err) {
 console.log(err);
 }
 else {
 console.log("Builder deleted!");
 res.redirect("/builders");
 }
 });
 };



 module.exports = builderController;














