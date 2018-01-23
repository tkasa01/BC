/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');

postRouter.get('/', function (req,res) {
    res.render('../views/posts/posts');
});


//
//
//postRouter.post('/', posts.postPost);
/*
postRouter.route('/:id')
    .get(posts.getOne)
    .put(posts.update)
    .delete(posts.deletePost);
*/
module.exports = postRouter;


