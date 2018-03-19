/** created by tkasa 19/12/2017. ...*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var BuilderSchema = new Schema({
    title: {type:String},
    firstname: {type:String, require: true},
    lastname:{type: String, require: true},
    position:{type: String, require: true},
    dob: {type: Date, require: true},
    email: {type: String, trim: true, require: true},
    phonenumber: {type: String, required: true, length: 11},
    ncards:{type: String},
    education: {title: String},
    insurance: {type: String, require: true},
    address: {type: String, require: true},
    postcode:{type: String, require: true},
    password: {type: String, require: true},
    updated: {
        type: Date,
        default: Date.now
    },
    role:{
            type: String,
            default: "builder"
        },
    file:{
        type: Schema.Types.ObjectId,
        ref: 'GFS'
    },

    review:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }

    ]

});

//this middleware is encrypt the passwprd before the save it in the database
BuilderSchema.pre('save', function (next) {
    if(!this.isModified('password'))return next();
    this.password = this.encryptPassword(this.password);
    next();
});

BuilderSchema.methods = {  //this method checks a user's password(on a login attempt) with bcrypt
    authenticate:function (plaintextPassword, compareBcrypt) {
        return bcrypt.compareSync(plaintextPassword, this.password, function(err, isMatch){
            if(err){
                return compareBcrypt(err);
            }
            compareBcrypt(null, isMatch);
        });
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


var Builder =  module.exports = mongoose.model('Builder', BuilderSchema);

