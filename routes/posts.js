/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');

postRouter.get('/', posts.list, function (req, res) {
    res.render('/posts', {pageTitle: 'Recent posts from customers'});
});

postRouter.post('/', posts.postPost);

postRouter.route('/:id')
    .get(posts.getOne)
    .put(posts.update)
    .delete(posts.deletePost);

module.exports = postRouter;


