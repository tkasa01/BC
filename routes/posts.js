/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');

postRouter.get('/', function (req,res) {
    res.render('../views/posts/posts' );
});

postRouter.post('/write', posts.writePost, function (req,res) {
    res.render('../views/posts/posts');
});

/*
postRouter.post( '/posts',posts.postPost);
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);
postRouter.delete('/:id',posts.deletePost);
*/

module.exports = postRouter;


