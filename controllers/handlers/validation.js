var express = require('express');
var validator = require('validator');
var moment = require('moment');
var cryptPassword = require('password-hash-and-salt');
var async = require('async');
var Promise = require('promise'); // fulfill, reject
var locale = require('locale');
var Builder = require('../../models/Builder');
var Customer = require('../../models/Customer');

var errors;
var messages;
const MIN_AGE = 18;
const NAME_LENGTH = {min: 2, max: 15};
const PHONE_LENGTH = 10;
const PASSWORD_LENGTH = 8;

exports.builder = function(form){
    return new Promise(function(fulfill, reject){
        var age = findAge(form.dob);
            errors   = [];
            messages = [];

        //check email availability
        let checkEmail = new Promise(function(fulfill,reject){
            if(form && form.email && validator.isEmail(form.email)){
                Builder.findOne({'email' : form.email},function(err,builder){
                    if(builder){
                        errors.push('• The email address is not available');
                        fulfill();
                    }else{
                        fulfill();
                    }
                })
            }else{
                errors.push('• The email format is incorrect');
                fulfill();
            }
        });

        if(validator.isEmpty(form.title)){
            errors.push('• Your title is empty');
        }
         if(form.firstname.length > NAME_LENGTH.max || form.firstname.length < NAME_LENGTH.min){
            errors.push('• The First name must be between 2 and 15 characters');
        }
         if(!validator.isAlpha(form.firstname.replace(' ', ''))){
            errors.push('• Please enter a valid First name');
        }

         if(form.lastname.length > NAME_LENGTH.max || form.lastname.length < NAME_LENGTH.min){
            errors.push('• The Last name must be between 2 and 15 characters');
        }

        if(!validator.isAlpha(form.lastname.replace(' ', ''))){
            errors.push('• Please enter a valid Last name');
        }

        if(validator.isEmpty(form.position)){
            errors.push('• Your position must be declared');
        }

        if(age < MIN_AGE){
         // if(moment(moment(form.dob).format("YYYY"),"YYYY").fromNow() < MIN_AGE) {
           errors.push('• You are too yang');
        }

        if(validator.isEmpty(form.email) && !validator.isEmail(form.email)){
            errors.push('• Check the email please');
        }

        if((validator.isLength(form.phonenumber) < PHONE_LENGTH) && !validator.isNumeric(form.phonenumber)){
            errors.push('• Enter please UK phone number');
        }
        /*

        if(!validator.isPostalCode(form.postcode, 'UK')){
            errors.postcode = '• Check the Post Code please';
        }
*/
        if(!validator.isAlpha(form.education.replace(' ', ''))){
            errors.push('• Please enter the level of you education');
        }
        if(form.password.length <= PASSWORD_LENGTH ){
            errors.push('• The password is too short');
        }
        if(!validator.equals(form.password, form.confpassword)){
            errors.push('• The password does not match with the confirmation password');
        }

        checkEmail.then(function(result){
            if(errors.length > 0){
                reject(errors);
            }else{
                messages.push('Success, please login');
                fulfill(form);
            }
        });

    });
};

exports.customer = function(form){
    return new Promise(function(fulfill,reject){
        errors   = [];
        messages = [];
        let checkEmail = new Promise(function(fulfill,reject){
            if(form && form.email && validator.isEmail(form.email)){
                Customer.findOne({'email' : form.email},function(err,builder){
                    if(builder){
                        errors.push('• The email address is not available');
                        fulfill();
                    }else{
                        fulfill();
                    }
                })
            }else{
                errors.push('• The email format is incorrect');
                fulfill();
            }
        });
        if(validator.isEmpty(form.title)){
            errors.push('• Your title is empty');
        }
        if(form.firstname.length > NAME_LENGTH.max || form.firstname.length < NAME_LENGTH.min){
            errors.push('• The First name must be between 2 and 15 characters');
        }
        if(!validator.isAlpha(form.firstname.replace(' ', ''))){
            errors.push('• Please enter a valid First name');
        }

        if(form.lastname.length > NAME_LENGTH.max || form.lastname.length < NAME_LENGTH.min){
            errors.push('• The Last name must be between 2 and 15 characters');
        }

        if(!validator.isAlpha(form.lastname.replace(' ', ''))){
            errors.push('• Please enter a valid Last name');
        }

        if(validator.isEmpty(form.email) && !validator.isEmail(form.email)){
            errors.push('• Check the email please');
        }

        if((validator.isLength(form.phonenumber) < PHONE_LENGTH) && !validator.isNumeric(form.phonenumber)){
            errors.push('• Enter please UK phone number');
        }
        /*

         if(!validator.isPostalCode(form.postcode, 'UK')){
         errors.postcode = 'Check the Post Code please';
         }
         */

        if(form.password.length <= PASSWORD_LENGTH ){
            errors.push('• The password is too short');
        }
        if(!validator.equals(form.password, form.confpassword)){
            errors.push('• The password does not match with the confirmation password');
        }

        checkEmail.then(function(result) {
            if (errors.length > 0) {
                reject(errors);
            } else {
                messages.push('Success, please login');
                fulfill(form);
            }
        })
    });
};

function findAge(data){
    var dayToday = moment().format("YYYY");
    var dateOfBirth = moment(data).format("YYYY");
    return dayToday - dateOfBirth;
}



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

