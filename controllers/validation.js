var express = require('express');
var validator = require('express-validator');
var cryptPassword = require('password-hash-and-salt');
var async = require('async');
//var Promise = require('promise'); // fulfill, reject

var errors = {};
var validatadForm = {};
const MIN_AGE = 18;
const NAME_LENGTH ={min: 2, max: 15};
const PHONE_LENGTH = 11;
const PASSWORD_LENGTH = 8;


exports.builder = function(body){
    return new Promise(function(fulfill,reject){
        var validatedUser = {};
        //validations

        firstnameValidation(body.firstname).then(function(){
            console.log('yay');
        },function(err){
            console.log(err);
        });

        //save
        if(errors){
            reject(errors);
        }else{
            fulfill(validatedUser);
        }
    })
};

exports.customer = function(body){
    return new Promise(function(fulfill,reject){
        fulfill(body);
    })
};

function firstnameValidation(form) {
    return new Promise(function (fulfill, reject) {
        if(form.length > NAME_LENGTH.max || form.length < NAME_LENGTH.min){
            console.log(form);
            errors.firstname = 'The length must be between 2 and 15 characters';
        }
       /*
        if(!validator.isAlpha(form.replace(' ', ''))){
            console.log(form);
            errors.firstname = 'Please enter a valid name';
        }
        */
        if(errors.length > 0){return reject(errors);
        }
        else{
            fulfill();
        }

    });
}

function lastnameValidation(form) {
    return new Promise(function (fulfill, reject) {

        if(!validator.isLength(form.lastname.replace(NAME_LENGTH))){
            errors.lastname = 'The length must be between 2 and 15 characters';
        }
        if(!validator.isAlpha(form.lastname.replace(' ', ''))){
            errors.lastname = 'Please enter a valid name';
        }
        if(errors.length > 0){return reject(errors);}
        fulfill();
    });
}


/*
exports.validationDateOfBirth = function (form) {
    return new Promise(function (fulfill, reject){
        if (moment(moment(form.dob).format("YYYY"), "YYYY").fromNow() < MIN_AGE) {
            errors.name = 'You are too young';
        }
        if(errors.length > 0){return reject(errors);}
        fulfill(form);
        //console.log(form.dob.toISOString() - new Date().toISOString());
    });
};

exports.validationPhoneNumber = function (phonenumber) {
    return new Promise(function (fulfill, reject) {
        if(validator.isInt(phonenumber)){
            errors.name = 'Enter a valid UK phone number';
        }
        if(!validator.isLength(phonenumber.replace(PHONE_LENGTH))){
            errors.name = 'The length must be 11 numbers';
        }
        if(errors.length > 0){return reject(errors);}
               fulfill(phonenumber);
     });
};

exports.validationEmail = function (email) {
    return new Promise(function (fulfill, reject) {
        if(validator.isEmail(email)){
            fulfill(email);
        }else{
            return reject(errors = 'Please enter a valid email address');
        }
    });
};

exports.validationPassword = function (form) {
    return new Promise(function (fulfill, reject) {
        if(validator.equals(form.password, form.confpassword)){
       // if(validator.matches(form.password, form.confpassword)){
           if(form.password >= PASSWORD_LENGTH){

             cryptPassword(form.password).hash(function (err, hashed_password) {
                 if(err) reject(err);
                 fulfill(hashed_password)
             });
           }else {
               reject('The password must be minimum 8 long');
           }
        }else{
            reject('The password does not match with confirmation password');
            }

    });
};

exports.validationAddress = function (form) {
    return new Promise(function (fulfill, reject) {
        if(validator.alphaNumeric(form.password, form.confpassword)){
            if(form.password >= PASSWORD_LENGTH){

                cryptPassword(form.password).hash(function (err, hashed_password) {
                    if(err) reject(err);
                    fulfill(hashed_password)
                });
            }else {
                reject('The password must be minimum 8 long');
            }
        }else{
            reject('The password does not match with confirmation password');
        }

    });
};
*/

/*
* fulfilled - The action relating to the promise succeeded
 rejected - The action relating to the promise failed
 pending - Hasn't fulfilled or rejected yet
 settled - Has fulfilled or rejected
 The spec also uses the term thenable to describe an object that is promise-like,
 in that it has a then method. This term reminds me of ex-England Football Manager Terry Venables
 so I'll be using it as little as possible.
* */





