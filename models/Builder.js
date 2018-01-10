/** created by tkasa 19/12/2017. ...*/
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');

var BuilderSchema = new mongoose.Schema({
    title: {type:String},
    firstname: {type:String, require: true},
    lastname:{type: String, require: true},
    position:{type: String, require: true},
    dob: {type: Date, require: true},
    email: {type: String, trim: true, require: true},
    phonenumber: {type: String, required: true, length: 11},
    ncards:{type: String},
    education: {title: String},
    insurance: {type: Date, require: true},
    address: {type: String, require: true},
    postcode:{type: String, require: true},
    password: {type: String, require: true},
    confpassword: {type: String, require: true},
    updated: {
        type: Date,
        default: Date.now
    }
});


BuilderSchema.pre('save', function (next) {
    if(!this.isModified('password'))return next();
    this.password = this.encryptPassword(this.password);
    next();
});

BuilderSchema.pre('save', function (next) {
    var self = this;
    Builder.find({email : self.email}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            console.log('user exists: ', self.email);
            next(new Error("User exists!"));
        }
    });
}) ;

BuilderSchema.methods = {
    authenticate:function (plaintextPassword) {
        return bcrypt.compareSync(plaintextPassword, text.password);
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
/*
//generating a hash
BuilderSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//checking if password is valid
BuilderSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

BuilderSchema.plugin(uniqueValidator);
*/
var Builder = module.exports = mongoose.model('Builder', BuilderSchema);

/*
var Builder = mongoose.model;





BuilderSchema.pre('save', function (next) {
    var self = this;
    Builder.find({email : self.email}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            console.log('user exists: ', self.email);
            next(new Error("User exists!"));
        }
    });
}) ;
 */