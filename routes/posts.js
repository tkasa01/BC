/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');
var customers = require('../controllers/customersControllers');

postRouter.post('/posts',  posts.savePost);

postRouter.get('/posts', posts.list);

postRouter.get('/postReview',  function (req, res, next) {
    var id = req.params.id;
    res.redirect(req.params.id + 'postReview');
 ;
    next();
});

postRouter.post('/customers/profile/:id/postReview', posts.saveReview);




/*
 postRouter.post( '/posts',posts.savePost);
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);
postRouter.delete('/:id',posts.deletePost);
*/

module.exports = postRouter;


