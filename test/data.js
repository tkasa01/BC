/**
 * Created by tkasa on 23/03/2018.
 */
var validation = require('../controllers/handlers/validation');
var builderControllers = require('../controllers/buildersControllers');
var customerControllers = require('../controllers/customersControllers');
var postControllers = require('../controllers/postControllers');
var loginControllers = require('../controllers/login');

var userAccount = {
    user1: {
        title: 'Mr',
        firstname: 'BuilderName',
        lastname: 'BuilderLastname',
        position: 'painter',
        dob: '13/08/1980',
        email: 'builder@gmail.com',
        phonenumber: '07984552354',
        role: 'builder',
        ncards: '4 cards',
        education: 'college',
        insurance: 'yes',
        address: '21 High road, Leyton',
        postcode: 'e3 4er',
        password: '1111111111'
    },

    user2:{
        title: 'Mrs',
        firstname:'CustomerName',
        lastname: 'CustometLastname',
        dob: '25/08/1983',
        email: 'customer@gmail.com',
        phonenumber: '12345678909',
        role:'customer',
        ncards:'4 cards',
        education: 'college',
        insurance: 'yes',
        address: '21 Oveton Drive, Wanstead',
        postcode:'e11 4brg',
        password: '1111111111'
    }
};


var builderAccount = {
    builder: {
        title: 'Mr',
        firstname: 'BuilderName',
        lastname: 'BuilderLastname',
        position: 'painter',
        dob: '13/08/1980',
        email: 'builder@gmail.com',
        phonenumber: '07984552354',
        role: 'builder',
        ncards: '4 cards',
        education: 'college',
        insurance: 'yes',
        address: '21 High road, Leyton',
        postcode: 'e3 4er',
        password: '1111111111'
    }
};
var customerAccount = {
    customer:{
        title: 'Mrs',
        firstname:'CustomerName',
        lastname: 'CustometLastname',
        dob: '25/08/1983',
        email: 'customer@gmail.com',
        phonenumber: '12345678909',
        role:'customer',
        ncards:'4 cards',
        education: 'college',
        insurance: 'yes',
        address: '21 Oveton Drive, Wanstead',
        postcode:'e11 4brg',
        password: '1111111111'
    }
};

exports.registration = function(form){
    return new Promise(function(fullfill, reject){
        validation.builder(form).then(function(form) {
                builderControllers.save(form).then(function (builderAccount) {
                    fullfill(true);
                }, function (err) {
                    reject(err)
                });
            },function (err) {
            reject(err);
            });
        validation.customer(form).then(function(form){
            customerControllers.save(form).then(function (customerAccount){
                fullfill(true);
            }, function (err) {
                reject(err)
            })
        },function (err) {
            reject(err);
        });
    });
};
exports.userAccount = userAccount;
exports.customerAccount = customerAccount;
exports.builderAccount = builderAccount;
