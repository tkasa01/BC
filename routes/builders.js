/**
 * Created by tkasa on 19/12/2017.
 */
var express = require('express');
var router = express.Router();
var builders = require('../controllers/buildersControllers');

router.get('/list', builders.list);

router.get('/registration',builders.showRegistrationPage);

router.post('/registration',builders.save);

router.get('/profile/:id',builders.show);

router.post('/show', builders.findByName);

router.get('/edit/:id', builders.edit);// Edit builder

router.get('/show/:id', builders.show);//get single builder by id

router.post('/update/:id', builders.update);

router.post('/delete/:id', builders.delete);

module.exports = router;

