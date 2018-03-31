/**
 * Created by tkasa on 19/12/2017.
 */
var mongoose = require('mongoose');
var Builder = require('../models/Builder');
var Review = require('../models/Review');
var Customer = require('../models/Customer');
var validation = require('./handlers/validation');
var async = require('async');

var builderController = {};



//all list of builders
builderController.list = function(req, res) {
    Builder.find({}).exec(function (err, builders) {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/builders/list', {
                pageTitle: 'List of Builders',
                builders: builders,
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

    Builder.find( {$and:[{
        firstname : req.body.firstname,
        lastname :req.body.lastname,
        position:req.body.position
    }]},function(err,builders){
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
    Builder.findOne({_id: req.params.id}).populate('review').exec(function(err, builder){
        var b = req.params.id;
        if(err){
            res.send(err);
        }
        else{
              Review.find({}).populate('author_id  builder_id').exec(function(err, reviews, customer) {
                  if (err) {
                      res.send(err)
                  } else {
                      var data = [];
                      //if (builder._id.equals(reviews.builder_id)){

                      async.forEach(reviews, function (review, callback) {
                          if (review.author_id) {
                              Customer.findById(review.author_id, function (err, customer) {
                                  data.push({review: review, author_id: customer, builder_id: builder});
                                  callback();
                              })
                          } else {
                              callback();
                          }
                      }, function (err) {
                          if (err) res.send(err);
                          var builderMessage = 'I am a qualified builder with experience';
                          res.render('../views/builders/profile', {
                              builderMessage: builderMessage,
                              pageTitle: 'Builder\'s a home page',
                              user: req.user,
                              builder: builder,
                              author_id: customer,
                              reviews: reviews,
                              errors: global.errors,
                              messages: global.messages
                              //  owner: req.params.id === req.user.user.id ? true : false,
                          });
                          global.errors = '';
                          global.messages = '';
                      });
                  }
                //  }

              });
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
                res.json(err);
            }else{
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


//=============== upload images functions ==========================

builderController.displayUploadPage = function(req, res){
    Builder.findOne({_id: req.params.id}).exec(function (err, builder) {
        if (err) {
            console.log("Error:", err);
            res.status(400).send("builder doesn't exist");
        }else{
            res.render('photo/upload',{
                pageTitle: 'Upload the images',
                builder: builder,
                _id: req.params.id,
                user: req.user
            });
        }
    });
};
builderController.uploadFile =  function(req, res) {
     upload.single('file');
res.redirect('/photo/photogallery', {
    pageTitle: 'Collection of the builders work',
    title: 'Categories: ',
    categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
    user: req.user,
    files: req.files
    //builder: builder,
    //_id: req.params.id,
});
        /*
         res.render('./photo/photogallery',{
             pageTitle: 'Collection of the builders work',
             title: 'Categories: ',
             categories: ['Bathrooms', 'Electricity', 'Paining', 'Carpenter'],
             user: req.user,
             files: req.files
             //builder: builder,
             //_id: req.params.id,
        });
*/

};

 module.exports = builderController;











