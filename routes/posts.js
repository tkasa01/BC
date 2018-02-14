/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');

postRouter.post('/posts',  posts.savePost);

postRouter.get('/posts', posts.list);

postRouter.post('/postReview/:id', posts.saveReview) ;

postRouter.get('/builders/profile/:id', posts.listReviews);



/*
 postRouter.post( '/posts',posts.savePost);
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);
postRouter.delete('/:id',posts.deletePost);
*/

module.exports = postRouter;


