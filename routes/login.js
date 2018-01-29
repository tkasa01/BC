/**
 * Created by tkasa on 23/12/2017.
 */
var express = require('express');
var router = express.Router();
var login = require('../controllers/login');

router.use(function (req,res,next) {
    if(req.session && typeof req.session.user !== 'undefined')
        res.redirect('/');
    next();
});

//login
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


router.get('/profile/:id', function(req, res){
    res.render('profile',{user: req.user});
});

router.post('/', login.login);
router.get('/logout',login.logout);




module.exports = router;