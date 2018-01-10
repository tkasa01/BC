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

builderController.findByName = function(req, res){
    Builder.findOne({
        firstname: req.params.firstname,
        lastname: req.params.lastname
    }, function (err, response) {
        if(err || !response){
            res.send({message: 'non found'});
        }else{
            res.render('../views/builders/profile', {success: true, builders: builders});
        }
    })
};

//shows single
builderController.show = function(req, res){Builder.findOne({_id: req.params.id}).exec(function(err, builder){
        if(err){
            console.log(err);
            res.render('../views/index',{pageTitle: 'Home page', errors: 'User does not exist'})
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
        errors: req.errors
    });
};

builderController.save = function(req, res) {
    validation.builder(req.body).then(function(validatedUser){
        var builder = new Builder(req.body);
        builder.save(function (err){
            if(err){
                res.redirect("/");
            }

        });
    },function(err){
        req.errors = err;
        console.log(err);
        res.redirect("/builders/registration");
    });
};
module.exports = builderController;