/**
 * Created by tkasa on 19/12/2017.
 */
var express = require('express');
var router = express.Router();
var builders = require('../controllers/buildersControllers');
var passport = require('passport');


router.get('/registration',builders.showRegistrationPage);

router.post('/registration',builders.save);

router.get('/profile/:id',builders.show);

router.get('/profile/:name', builders.findByName);

router.get('/list', builders.list);

module.exports = router;

console.log(true? "true" : "false");
