/**
 * Created by tkasa on 29/03/2018.
 */

var express = require('express');
var reviewRouter = express.Router();

var reviews = require('../controllers/reviewControllers');

reviewRouter.post('/postReview/:id', reviews.saveReview) ;

reviewRouter.get('/builders/profile/:id', reviews.listReviews);


reviewRouter.post('/delete/:id', reviews.deleteReview);

module.exports = reviewRouter;
