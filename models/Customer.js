/**
 * Created by tkasa on 12/12/2017.
 */
var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    title: {
        value:String
    },
    firstname: {type:String,required: true},
    lastname:{type: String,required: true},
    dob: {type: Date},
    emai: {type: String, trim: true},
    phonenumber: {type: String,required: true, length: 11},
    address: {
                state:{type: String},
                city:{type: String},
                postcode:{type:Number, require: true}
             },
    password: {type: String, required:true},
    confpassword: {type: String, required:true},
    updated: {
        type: Date,
        default: Date.now
    }
});

 module.exports = mongoose.model('Customer', CustomerSchema);
