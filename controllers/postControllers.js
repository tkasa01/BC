/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Customer = require('../models/Customer');

var postController = {};

postController.list = function (req, res, next) {
    Post.find({}).populate('author').exec(function (err, posts) {
        if(err){
            res.send(err);
        }else{
            res.render('./posts/posts', {
                pageTitle: 'Recent posts from customers',
                posts:posts,
                user: req.user
            });
        }
    }
    );
};

postController.savePost = function(req, res, next) {
    //var postSorted = post.object('Post').sorted('timestamp', true);
    var post = new Post({_id: new mongoose.Types.ObjectId(),
                             title:req.body.title,
                            content: req.body.content,
                            author:req.body.author
                            });
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





















