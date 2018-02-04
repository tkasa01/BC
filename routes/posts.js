/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');


postRouter.post('/posts',  posts.savePost,function (req, res) {
    console.log('kuu');
    res.send('POST request to the homepage');
});



postRouter.get('/posts', posts.list);


/*
 postRouter.post( '/posts',posts.savePost);
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);
postRouter.delete('/:id',posts.deletePost);
*/

module.exports = postRouter;


