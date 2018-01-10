/**
 * Created by tkasa on 23/12/2017.
 */
var express = require('express');
var router = express.Router();
var builders = require('../controllers/login');
var passport = require('passport');
//var Builder = require('../models/Builder');

router.use(function (req,res,next) {
    if(req.session && typeof req.session.user !== 'undefined')
        res.redirect('/');
    next();
});

//login
router.get('/', function(req, res ){
    res.render('login', {
        builder: req.builder,
        pageTitle: 'Login page',
        errors: {},
        message: ''});
});

function isLoggedIn(req, res, next) {
    if(req.Authenticated())
        return next();
    res.redirect('/');
}

router.post('/',builders.checkUser);

router.get('/profile/:id', isLoggedIn, function(req, res){
    res.render('profile',{user: req.user});
});

router.get('/logout',function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;