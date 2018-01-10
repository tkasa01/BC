/**
 * Created by tkasa on 12/12/2017.
 */
var express = require('express');
var router = express.Router();
var customers = require('../controllers/customersControllers');

router.get('/customers', function (req, res, next) {
    res.render('customers', {
                pageTitle: 'List of Builders' });
    next();
});

router.get('/', customers.list, function(req, res, next) {
         res.render('customers/index', {
             pageTitle: 'Builders Company'
         });
});

// get all customers
router.get('/', function(req, res){
    customers.list(req, res);


});

//get single customer by id
router.get('/show/:id', function(req, res ){
    customers.show(req, res);
});

//create customer
router.get('/create', function (req, res) {
    customers.create(req, res);
    res.render('create',{
        pageTitle: 'Create Customers'
    })
});

router.get('/registration', function (req, res) {
    res.render('customers/registration', {pageTitle: 'Registration Page for customers'});
});

//save customer
router.post('/save', function(req, res){
    customers.save(req, res);
});

// Edit customer
router.get('/edit/:id', function(req, res){
    customers.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res){
    customers.update(req, res);
});

// Edit update
router.post('/delete/:id', function (req, res) {
    customers.delete(req, res);
});

//Profile page
router.get('/profile/:id',customers.profile);

module.exports = router;







