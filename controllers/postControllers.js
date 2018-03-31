/**
 * Created by tkasa on 07/01/2018.
 */
var mongoose = require('mongoose');
var Post = require('../models/Post');
var Review = require('../models/Review');
var Customer = require('../models/Customer');
var Builder = require('../models/Builder');
var owner = require('../models/Authorization');
var async = require('async');

var postController = {};

postController.params = function(req, res, next, id){
    console.log('post id params func ' + id);
    Post.findById(id).then(function(post){
        console.log('post id' + id);
        if(!post){
            next(new Error('No post found from this id'));
        }else{
            req.body.post = post;
            next();
        }
    },function(err){
        next(err);
    })
};

postController.list = function (req, res) {
    Post.find({}).populate('author_id').exec(function (err, posts) {
         if(err){
             res.send(err);
         }else{
             var list = [];
             async.forEach(posts, function(post, callback){
                    if(post.author_id){
                        Customer.findById(post.author_id, function(err, customer){
                            list.push({post: post, author_id: customer});
                                callback();
                        })
                    }else{
                        callback();
                    }
                },function(err){
                    if(err) res.send(err);
                   // var dob = req.dob.toISOString();
                   //     dob = dob.substring(0, dob.indexOf('T'));
                    res.render('./posts/posts', {
                        pageTitle: 'Recent posts from customers',
                        posts:  list,
                        author_id: req.params.id,
                        user: req.user
                    });
                 });
         }
    });
};

postController.savePost = function(req, res) {
    if(req.user){
        //console.log('user id ' + req.user.id);
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
        res.redirect('/login');
    }

};


postController.checkOwner = function(req, res, next){
/*
    if(req.user) {
        var idUser = req.user.id; //string
        console.log(idUser);
        var postId = req.params.id;//string
        console.log(postId); }*/

         Post.find({content: req.body.content}, function(err, author){
         if(err)
         console.log(err);
         res.json(author);
         console.log(author);
         });
         next();
};

//delete
postController.delete = function(req, res, post) {
       Post.remove({_id: req.params.id}, function (err, post) {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            }else{
                console.log("post deleted!");
                res.redirect('/posts/posts');
               // res.json({message: 'Successfully deleted'});
            }
       });
};


module.exports = postController;






















