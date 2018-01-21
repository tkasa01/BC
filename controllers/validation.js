var express = require('express');
var validator = require('validator');
var moment = require('moment');
var cryptPassword = require('password-hash-and-salt');
var async = require('async');
var Promise = require('promise'); // fulfill, reject
var locale = require('locale');

var errors;
var messages;
var validatadForm = {};
const MIN_AGE = 18;
const NAME_LENGTH = {min: 2, max: 15};
const PHONE_LENGTH = 10;
const PASSWORD_LENGTH = 8;

exports.builder = function(form){
    return new Promise(function(fulfill, reject){
        var age = findAge(form.dob);
            errors   = [];
            messages = [];

        if(validator.isEmpty(form.title)){
            errors.push('Your title is empty');
        }
         if(form.firstname.length > NAME_LENGTH.max || form.firstname.length < NAME_LENGTH.min){
            errors.push('The First name must be between 2 and 15 characters');
        }
         if(!validator.isAlpha(form.firstname.replace(' ', ''))){
            errors.push('Please enter a valid First name');
        }

         if(form.lastname.length > NAME_LENGTH.max || form.lastname.length < NAME_LENGTH.min){
            errors.push('The Last name must be between 2 and 15 characters');
        }

        if(!validator.isAlpha(form.lastname.replace(' ', ''))){
            errors.push('Please enter a valid Last name');
        }

        if(validator.isEmpty(form.position)){
            errors.push('Your position must be declared');
        }

        if(age < MIN_AGE){
         // if(moment(moment(form.dob).format("YYYY"),"YYYY").fromNow() < MIN_AGE) {
           errors.push('You are too yang');
        }

        if(validator.isEmpty(form.email) && !validator.isEmail(form.email)){
            errors.push('Check the email please');
        }

        if((validator.isLength(form.phonenumber) < PHONE_LENGTH) && !validator.isNumeric(form.phonenumber)){
            errors.push('Enter please UK phone number');
        }
        /*

        if(!validator.isPostalCode(form.postcode, 'UK')){
            errors.postcode = 'Check the Post Code please';
        }
*/
        if(!validator.isAlpha(form.education.replace(' ', ''))){
            errors.push('Please enter the level of you education');
        }
        if(form.password.length <= PASSWORD_LENGTH ){
            errors.push('The password is too short');
        }
        if(!validator.equals(form.password, form.confpassword)){
            errors.push('The password does not match with the confirmation password');
        }


        if(errors.length > 0){
            reject(errors);
        }else{
            messages.push('Success, please login');
            fulfill(form);
        }

    })
};
/*
exports.customer = function(body){
    return new Promise(function(fulfill,reject){
        errors   = [];
        messages = [];
        if(form.firstname.length > NAME_LENGTH.max || form.firstname.length < NAME_LENGTH.min){
            errors.push('The First name must be between 2 and 15 characters');
        }
        if(!validator.isAlpha(form.firstname.replace(' ', ''))){
            errors.push('Please enter a valid First name');
        }

        if(form.lastname.length > NAME_LENGTH.max || form.lastname.length < NAME_LENGTH.min){
            errors.push('The Last name must be between 2 and 15 characters');
        }

        if(!validator.isAlpha(form.lastname.replace(' ', ''))){
            errors.push('Please enter a valid Last name');
        }

        if(validator.isEmpty(form.email) && !validator.isEmail(form.email)){
            errors.push('Check the email please');
        }

        if((validator.isLength(form.phonenumber) < PHONE_LENGTH) && !validator.isNumeric(form.phonenumber)){
            errors.push('Enter please UK phone number');
        }
        /*

         if(!validator.isPostalCode(form.postcode, 'UK')){
         errors.postcode = 'Check the Post Code please';
         }
         */
/*
        if(form.password.length <= PASSWORD_LENGTH ){
            errors.push('The password is too short');
        }
        if(!validator.equals(form.password, form.confpassword)){
            errors.push('The password does not match with the confirmation password');
        }


        if(errors.length > 0){
            reject(errors);
        }else{
            messages.push('Success, please login');
            fulfill(form);
        }

    })
};
*/
function findAge(data){
    var dayToday = moment().format("YYYY");
    var dateOfBirth = moment(data).format("YYYY");
    return dayToday - dateOfBirth;
}



/*

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

/*
* fulfilled - The action relating to the promise succeeded
 rejected - The action relating to the promise failed
 pending - Hasn't fulfilled or rejected yet
 settled - Has fulfilled or rejected
 The spec also uses the term thenable to describe an object that is promise-like,
 in that it has a then method. This term reminds me of ex-England Football Manager Terry Venables
 so I'll be using it as little as possible.

 <ul class="message">
 <% if(typeof errors !== 'undefined' && typeof errors.summary !== 'undefined') { %>
 <li>
 <p class="error-text" style="color:#f14943"> <%= errors.summary%> </p>
 </li>
 <%}%>

 <% if(typeof message !== 'undefined' && typeof message.summary !== 'undefined') {
 for(var j = 0; j < message.length; j++) { %>
 <li>
 <% if(message[j]) {%>
 <p class="info-text" style="color:darkseagreen"><%= message[j] %></p>
 <%}%>
 </li>
 <%}
 }%>
 </ul>
* */

/*
})
};
exports.customer = function(body){
    return new Promise(function(fulfill,reject){
        fulfill(body);
    })
};

function firstnameValidation(form) {
    if(!validator.isAlpha(form.replace(' ', ''))){
        errors.firstname = 'Please enter a valid first name';
        isValid = false;
    }
    if(form.length > NAME_LENGTH.max || form.length < NAME_LENGTH.min){
        errors.firstname = 'The first name must be between 2 and 15 characters';
        isValid = false;
    }
}

function lastnameValidation(form) {
    if (!validator.isAlpha(form.replace(' ', ''))) {
        errors.lastname = 'Please enter a valid last name';
        isValid = false;
    }
    if (form.length > NAME_LENGTH.max || form.length < NAME_LENGTH.min) {
        errors.lastname = 'The last name must be between 2 and 15 characters';
        isValid = false;
    }
}

function positionValidation(form) {
    if(validator.isEmpty(form)){
        errors.position = 'Your position must be declared';
        isValid = false;
    }
}

function  emailValidation(form) {
    console.log(form);
    if(validator.isEmpty(form) && !validator.isEmail(form)){
        errors.email = 'Check the email please';
        isValid = false;
    }
}

function  phonelValidation(form) {
    console.log(form);
    if(!validator.isInt(form)){
        errors.phonenumber = 'Enter all numbers please';
        isValid = false;
    }
    if(form.length < PHONE_LENGTH){
        errors.phonenumber = 'Enter please UK phone number';
        isValid = false;
    }
}
function postcodeValidation(form) {
    console.log(form);
    if(!validator.isPostalCode(form.postcode, 'UK')){
        errors.postcode = 'Check the Post Code please';
        isValid = false;
    }
}
function passwordValidation(form){
    console.log(form);
    if(validator.matches(form.password, form.confpassword)){
        if(form.password.length < PASSWORD_LENGTH){
            errors.password = 'The password should be longer eight digits';
            isValid = false;
        }else{
            errors = 'The password does not match the confirmation password';
            isValid = false;
        }
    }
}

 function dobValidation(form) {
 var d = moment.dayOfYear(form);
 console.log(d);
 if((moment(moment(form).format('YYYY'),'YYYY').fromNow() < MIN_AGE).ismin) {
 console.log( moment(moment(form).format('YYYY'), 'YYYY').fromNow());
 errors.dob = 'You are too yang';
 isValid = false;
 }
 }



 function  insuranceValidation(form) {
 if(moment(moment(form).format('YYYY'),'YYYY').fromNow()){
 errors.insurance = 'Enter please a valid insurance card';
 isValid = false;
 }
 }
 */




