/**
 * Created by tkasa on 12/12/2017.
 */
var express = require('express');
var router = express.Router();
var customers = require('../controllers/customersControllers');
var post = require('../controllers/postControllers');
var Post = require('../models/Post');


router.get('/customers', function (req, res, next) {
    res.render('customers', {
                pageTitle: 'List of Builders',
                user: req.user
    });
    next();
});

// get all customers
router.get('/', customers.list);

//get single customer by id
router.get('/profile/:id', customers.show);

router.get('/registration',  customers.create);
//save customer
router.post('/registration', customers.save);

// Edit customer
router.get('/edit/:id', customers.edit);

// Edit update
router.post('/update/:id', customers.update);

// Edit update
router.post('/delete/:id', customers.delete);

//Profile page
router.get('/profile/:id',customers.profile);

router.get('/profile/posts/write', function (req, res) {
    console.log('create function');
    res.render('posts/write',{
        pageTitle: 'Write a post to find a builder',
        user: req.user
    });
});
module.exports = router;







