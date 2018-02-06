/**
 * Created by tkasa on 23/12/2017.
 */
var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var builders = require('../controllers/buildersControllers');
router.use(function (req,res,next) {
    if(req.session && typeof req.session.user !== 'undefined')
        res.redirect('/');
    next();
});


//get login page
router.get('/', function(req, res ){
    console.log(req.user);
    res.render('login', {
        builder: req.builder,
        user: req.user,
        pageTitle: 'Login page',
        errors: global.errors
    });
    global.errors = '';

});

//post login page before login
router.post('/', login.login, builders.show );

router.get('/profile/:id', isLoggedIn, builders.show , function(req, res){
    res.render('profile',{user: req.user});
});


router.get('/logout',login.logout);

function isLoggedIn(req, res, next){
    if(req.login())
        return next();
    res.redirect('/');
}


module.exports = router;