/**
 * Created by tkasa on 07/01/2018.
 */



var mongoose = require('mongoose');
var Post = require('../models/Post');

var passport = require('passport');

//var flash = require('connect-flash');
//var shortid = require('shortid');
//var validation = require('./validation');

var postController = {};
/*
postController.list = function (req, res, next) {
    Post.find({}).populate('author').exec().then(function (posts) {
        res.render('/posts', {pageTitle: 'Recent posts from customers', posts:posts});
            },function (err) {
                 next(err);
        })
};
*/
postController.list = function (req, res, next) {
    Post.find({}).populate('author').exec().then(function (err, posts) {
        if(err){
            res.send(err);
        }else{
            res.render('/posts', {pageTitle: 'Recent posts from customers' , posts:posts});
        }
        next();
    });
};


postController.params = function(req, res, next){
    Post.findById(id).exec(function(err, post){
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            req.post = post;
            next();
        }
    })
};

postController.postPost = function(req, res, next){
    var newPost = req.body;
    Post.create(newPost).populate('author').exec(function(err, post){
        if(err){
            next(err);
        }else{
            res.json(post);
        }
    })
};

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

























