/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Customer = require('../models/Customer');
var promise = require('promise');

//var shortid = require('shortid');
//var validation = require('./validation');

var postController = {};

exports.list = function (req, res) {
    Post.find({}).populate('author').exec(function (err, posts) {
        if(err){
            res.send(err);
        }else{
            res.render('./posts/posts', {
                pageTitle: 'Recent posts from customers',
                posts:posts,
                user:req.user
            });
        }
    });
};


exports.savePost = function(req, res){
    console.log('postPage');
    //var postSorted = post.object('Post').sorted('timestamp', true);

    var post = new Post({title:req.body.title,
                         content:req.body.content,
                         timestamp:req.body.timestamp,
                         author:req.body.author});
    console.log(post);
    post.author = Customer;
    post.save(function (err, post) {
        if (err) {
            res.send(err);
        } else {
            res.render('./posts', {post: post})
        }
    });
};


postController.params = function(req, res, next, id){
    Post.findById(id).exec(function(err, post){
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            req.post = post;
            next();
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

























