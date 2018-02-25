/**
 * Created by tkasa on 12/12/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var CustomerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {type:String},
    firstname: {type:String,required: true},
    lastname:{type: String,required: true},
    dob: {type: Date},
    email: {type: String, required: true, trim: true},
    phonenumber: {type: String,required: true, length: 11},
    address: {
                state:{type: String},
                city:{type: String},
                postcode:{type:Number, require: true}
             },
    password: {type: String, required:true},
    updated: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        default: "customer"
    },
    review:{type: Schema.Types.ObjectId, ref: 'Review'}
/*
    builder: {
        type: Schema.Types.ObjectId,
        ref: 'Builder'
    },

*/
});

CustomerSchema.pre('save', function (next) {
    if(!this.isModified('password'))return next();
    this.password = this.encryptPassword(this.password);
    next();
});

CustomerSchema.methods = {
    authenticate:function (plaintextPassword) {
        return bcrypt.compareSync(plaintextPassword, this.password);
    },
    encryptPassword: function(plaintextPassword){
        if(!plaintextPassword){
            return ''
        }else {
            var salt = bcrypt.genSaltSync(8);
            return bcrypt.hashSync(plaintextPassword, salt);
        }
    }
};

var Customer = module.exports = mongoose.model('Customer', CustomerSchema);

