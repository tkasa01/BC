/**
 * Created by tkasa on 07/01/2018.
 */

var mongoose = require('mongoose');
var Post = require('../models/Post');
var Review = require('../models/Review');
var Customer = require('../models/Customer');
var async = require('async');

var postController = {};

postController.list = function (req, res) {
    Post.find({}).populate('author').exec(function (err, posts) {
            if(err){
                res.send(err);
            }else{
                var list = [];
                async.forEach(posts,function(post,callback){
                    if(post.author_id){
                        Customer.findById(post.author_id,function(err,customer){
                            //console.log(customer);
                            list.push({
                                post: post,
                                author: customer
                            });
                            callback();
                        })
                    }else{
                        callback();
                    }
                },function(err){
                    if(err) res.send(err);
                    // var dob = req.dob.toISOString();
                    // dob = dob.substring(0, dob.indexOf('T'));
                    res.render('./posts/posts', {
                        pageTitle: 'Recent posts from customers',
                        posts:  list,
                        user: req.user
                    });
                });
            }
        }
    );
};

postController.savePost = function(req, res) {

    if(req.user){
        //console.log(req.user.id);
        var post = new Post({
            title:req.body.title,
            content: req.body.content,
            author_id: req.user.id
        });
        post.save(function (err, post) {
            if (err) {
                res.send(err);
            } else {
                // console.log("saved" + post);
                res.redirect('/posts/posts');
            }
        });
    }else{
        res.send('You are not logged in');
    }

};

/*
 Post.findById(author).populate('author').exec(function (err, author) {
 if (err) {
 res.send(err);
 }
 else {
 // console.log("saved" + post);
 res.redirect('/posts/posts' + author);
 }
 });
 */


postController.params = function(req, res, next, id){
    Post.findById(id).populate('author', 'email').exec().then(function(err, post){
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            post.title = req.body.title;
            post.content = req.body.content;
            post.author = req.body.author;
            req.post = post;
            next();
        }
    },function(err){
        next(err);
    })
};

//====================== REVIEWS =================================
postController.saveReview = function(req, res, next) {
    if(req.user){
        console.log(req.user.id);
        var reviews = new Review({
            review: req.body,
            rating: req.body.rating,
            description: req.body.description,
            author_id: req.user.id, //assign the _id from user
            builder_id : req.params.id,
            created:req.body.created
        });
        console.log(reviews);
        reviews.save(function (err, reviews) {
            if (err) {
                res.send(err);
            } else {
                console.log("saved" + reviews);
                res.redirect('/builders/profile/' + req.params.id);
              // res.redirect('/post/postReview/' + req.params.id);
            }
        });
    }else{
        res.send('You are not logged in');
    }

};
postController.listReviews = function (req, res) {
    Review.find({}).exec(function (err, reviews) {
        console.log(reviews);
        if (err) {
            res.send(err);
        } else {
            res.render('./builders/profile/:id', {
                reviews: reviews,
                user: req.user
            });
        }
    })
};
/*
postController.listReviews = function (req, res, next) {
    var array = [];
    Review.find({}).exec(function (err, reviews) {

            if(err) {
                res.send(err);
            }
            if(reviews === null)
                 return [];
            else{
                console.log(reviews);
                async.forEach(array,function(review, callback){
                   if(review.author_id){
                        Customer.findById(review.author_id,function(err,customer){
                            //console.log(customer);
                            array.push({
                                review : review,
                                author: customer,
                                rating: review.rating,
                                description:review.description});
                            console.log(array);
                            callback();

                        })
                    }else{
                        callback();
                    }
                },function(err){
                    if(err) res.send(err);
                    // var dob = req.dob.toISOString();
                    // dob = dob.substring(0, dob.indexOf('T'));

                    res.render('./builders/profile/:id', {
                        review: array,
                        user: req.user
                    });
                    console.log(review);
                });
            }
        }
    );
};
*/
/*
 Post.findById(author).populate('author').exec(function (err, author) {
 if (err) {
 res.send(err);
 }
 else {
 // console.log("saved" + post);
 res.redirect('/posts/posts' + author);
 }
 });
 */
/*
postController.params = function(req, res, next, id){
    Post.findById(id).populate('author', 'email').exec().then(function(err, post){
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            post.title = req.body.title;
            post.content = req.body.content;
            post.update = req.body.update;
            post.author = req.body.author;
            req.post = post;
            next();
        }
    },function(err){
        next(err);
    })
};*/
/*
postController.update = function (req, res) {
        var post = req.post;
        var newPost = req.body;
       _.merge(post, newPost);
       post.save(function (err, req, res, saved, next ) {
           if(err){
               next(err);
           }else{
               res.json(saved);
           }
       })
};

postController.deletePost = function (req, res, next) {
    req.post.remove(function (err, postRemoved) {
        if(err){
            next(err);
        }else{
            res.json(postRemoved);
        }
    });
};

*/

module.exports = postController;






















