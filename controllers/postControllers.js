/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Customer = require('../models/Customer');
var promise = require('promise');

var postController = {};

postController.list = function (req, res) {
    console.log('heiiii');
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

postController.create = function (req, res) {
    console.log('create function');
    res.render('./customers/profile',{
        pageTitle: 'Registration Page for Customers',
        user: req.user,
        errors: global.errors
    });
    global.errors = '';

};

postController.savePost = function(req, res){
    //var postSorted = post.object('Post').sorted('timestamp', true);
    var post = new Post(req.body);
    post.save(function (err, post) {
        if (err) {
            res.send(err);
        } else {
            console.log(post);
            res.render('./posts/posts');
        }
    });
};

/*
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

*/

module.exports = postController;





















