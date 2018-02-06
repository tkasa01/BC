/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Customer = require('../models/Customer');
var async = require('async');

var postController = {};

postController.list = function (req, res, next) {
    Post.find({}).populate('author').exec(function (err, posts) {
        if(err){
            res.send(err);
        }else{
            var list = [];
            async.forEach(posts,function(post,callback){
                if(post.author_id){
                    Customer.findById(post.author_id,function(err,customer){
                        console.log(customer)
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

postController.savePost = function(req, res, next) {

    if(req.user){
        console.log(req.user.id)
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





















