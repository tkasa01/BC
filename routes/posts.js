/**
 * Created by tkasa on 07/01/2018.
 */
var express = require('express');
var postRouter = express.Router();
var posts = require('../controllers/postControllers');

postRouter.post('/posts',  posts.savePost);

postRouter.get('/posts', posts.list);

postRouter.post('/delete/:id',  posts.checkOwner, posts.delete); //


postRouter.post('/postReview/:id', posts.saveReview) ;

//postRouter.post('/delete/:id', loggedIn, posts.delete);

//postRouter.get('/builders/profile/:id', posts.listReviews);

postRouter.get('/reviews/:id', posts.listReviews);


/*
postRouter.get('/:id',posts.getOne);
postRouter.put('/:id',posts.update);

*/
function loggedIn(req, res, next) {
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}
module.exports = postRouter;


