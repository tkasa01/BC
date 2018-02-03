/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var mongoose = require('mongoose');
var posts = require('../controllers/postControllers');

postRouter.post('/customers/profile',  posts.savePost, function (req, res){
    console.log('hey');
    res.send('add a book');
});

postRouter.get('/posts', posts.list);
postRouter.get('/posts',  posts.create);

/*
 postRouter.post( '/posts',posts.savePost);
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);
postRouter.delete('/:id',posts.deletePost);
*/

module.exports = postRouter;


