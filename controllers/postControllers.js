/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Customer = require('../models/Customer');

var postController = {};

postController.list = function (req, res) {

    Post.find({}).populate('author').exec(function (err, posts) {
        if(err){
            res.send(err);
        }else{
            res.render('./posts/posts', {
                pageTitle: 'Recent posts from customers',
                posts:posts,
                user:req.user,
                author: req.author
            });
        }
    });
};

postController.savePost = function(req, res, next) {
    //var postSorted = post.object('Post').sorted('timestamp', true);
    var post = new Post({content: req.body.content, title: req.body.title,  author: req.body.author});
    console.log(post);
    post.save(function (err, post) {
        if (err) {
            res.send(err);
        } else {
               // console.log("saved" + post);
                res.redirect('/posts/posts');
            }
        });
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
    Post.findById(id).populate('author').exec(function(err, post, author){
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            req.author = author;
            req.post = post;
            next();
        }
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





















