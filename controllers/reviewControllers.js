var mongoose = require('mongoose');
var Review = require('../models/Review');
var Customer = require('../models/Customer');
var Builder = require('../models/Builder');
var owner = require('../models/Authorization');
var async = require('async');

var reviewController = {};

reviewController.params = function(req, res, next, id){
    Review.findById(id).then(function(review){
        console.log('review id' + id);
        if(!review){
            next(new Error('No post found from this id'));
        }else{
            req.body.review = review;
            next();
        }
    },function(err){
        next(err);
    })
};

reviewController.saveReview = function(req, res) {
    if(req.user){
        var review = new Review({
            review: req.body.review,
            rating: req.body.rating,
            description: req.body.description,
            author_id: req.user.id, //assign the _id from user
            builder_id : req.params.id,
            created:req.body.created
        });
        review.save(function (err, review) {
            Review.findOne(review).populate('builder_id').populate('author_id.firstname author_id.lastname').exec(function(err, review){
                if (err) {
                    res.send(err);
                } else {
                    console.log("saved " + review);
                    res.redirect('/builders/profile/' + req.params.id);
                }
            })
        });
    }else{
        res.send('You are not logged in');
    }
};



reviewController.listReviews = function (req, res) {
    Review.find({}).populate('author_id builder_id').exec(function (err, reviews, customer, builder) {
        if (err) {
            res.send(err);
        } else {
            //res.render('builders/profile' + req.params.id, {
                res.render('/reviews/review/'+ req.params.id, {
                reviews: reviews,
                author_id: req.customer,
                builder_id: req.builder,
                user: req.user
            });
            console.log("review" + customer);
        }
    });
};

reviewController.deleteReview = function (req, res) {
    Review.remove({_id: req.params.id}, function (err, review) {
        if(err){
            next(err);
        }else{
            res.redirect("/");
        }
    });
};

module.exports = reviewController;