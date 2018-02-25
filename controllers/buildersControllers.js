/**
 * Created by tkasa on 19/12/2017.
 */
var mongoose = require('mongoose');
var Builder = require('../models/Builder');
//var Review = require('../models/Post');
var validation = require('./handlers/validation');
var async = require('async');
var builderController = {};

//all list of builders
builderController.list = function(req, res) {
    Builder.find({}).populate('review').exec(function (err, builders) {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/builders/list', {
                pageTitle: 'List of Builders',
                builders: builders,
                review:req.review,
                user: req.user
            });
        }
    });
};

builderController.displayPage = function(req, res){
    res.render('builders/display', {
                    pageTitle: 'Found by name',
                    user: req.user
                });
};

builderController.findByName = function(req, res){

    Builder.find( {$and:[{firstname : req.body.firstname, lastname :req.body.lastname }]},function(err,builders){
        if(err || !builders){
            global.errors =['• Not found'];
            res.send('non found');
        }else{
            res.render('../views/builders/show',{
                builder:builders,
                user: req.user
            });
        }
    });

    /*
     Builder.find({'firstname': req.body.firstname} || {'lastname':req.body.lastname }||{'position': req.body.position}).exec(function (err, builder ) {
        if(err || !builder){
            global.errors =['Not found'];
            res.send('non found');
        }else{
            res.render('../views/builders/show',{
                builder:builder,
                user: req.user
            });
        }
    });
    */
};

//shows single
builderController.show = function(req, res){
    Builder.findOne({_id: req.params.id}).exec(function(err, builder){
        if(err){
            console.log(err);
            res.render('../views/index',{
                pageTitle: 'Home page',
                builder: builder,
                user: req.user,
                errors: global.errors,
                messages: global.messages
            });
        }
        else{
            console.log(builder);
            var array = [];
            async.forEach(array,function(review, callback){
                if(review.author_id){
                    Builder.findById(review.builder_id,function(err, builder){
                        //console.log(customer);
                        array.push({
                            reviews : review,
                            builder: builder,
                            rating: review.rating,
                            description:review.description});
                        callback();

                    })
                }else{
                    callback();
                }
            },function(err){
                if(err) res.send(err);
                    // var dob = req.dob.toISOString();
                    // dob = dob.substring(0, dob.indexOf('T'));
                    console.log(err);

                    //==============================
                    var builderMessage = 'I am a qualified builder with experience';
                    res.render('../views/builders/profile', {
                        builderMessage: builderMessage,
                        pageTitle: 'Builder\'s a home page',
                        user: req.user,
                        builder: builder,
                        errors: global.errors,
                        messages: global.messages,
                      //  owner: req.params.id === req.user.user.id ? true : false,
                        reviews: req.review
                         });
                global.errors = '';
                global.messages = '';
              });//
        }
    });

};

builderController.showRegistrationPage = function(req,res){
    res.render('builders/registration', {
        pageTitle: 'Registration Page for builders',
        user: req.user,
        reviews: req.review,
        errors: global.errors,
        messages: global.messages
    });
    global.errors = '';
    global.messages = '';
};


builderController.save = function(req, res) {
    validation.builder(req.body).then(function(validatedUser){
        var builder = new Builder(validatedUser);
        builder.save(function (err, builder){
            if(err){
               console.log(err);
                res.json(err);
            }else{
                console.log(builder);
                global.messages = ['You are successful registered, please log in'];
                res.redirect("/login");
            }
        });
    },function(err){
        global.errors = err;
        res.redirect("/builders/registration");

    });
    global.errors = '';
    global.messages = '';
};

//add by id function
builderController.edit = function(req, res) {
    Builder.findOne({_id: req.params.id}).exec(function (err, builder) {
        if (err) {
            console.log("Error:", err);
            res.status(400).send("builder doesn't exist");
        }
        else {
            res.render("../views/builders/edit", {
                builder: builder,
                user: req.user,
                pageTitle:'Builder edit page'});
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
               next(err);
               console.log(err);
               res.render("../views/builders/edit", {builder: req.body,  user: req.user});
           }

               res.redirect('/builders/show/'+ builder._id, { user: req.user});
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
             res.redirect("/");
         }
     });
 };


/*
builderController.postReview = function (req, res) {
    var review = req.body;
    Builder.findById(req.params.id, function(err, builder){
        if(builder){
            builder.reviews.push(review);
            builder.save()
        }else{
            res.send(err);
        }
    })
};
builderController.displayPost = function(req, res){
    Builder.findOne({_id: req.params.id}).exec(function (err, builder) {
        if (err) {
            console.log("Error:", err);
            res.status(400).send("builder doesn't exist");
        }else {
            res.render("../views/builders/profile", {
                builder: builder,
                user: req.user,
                pageTitle:'Builder edit page'});
        }
    });
};
*/
 module.exports = builderController;













