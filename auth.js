var jwt = require('jsonwebtoken');
var config = require('./config/config');

// set user info from request
exports.signToken = function(user){
    var jwtData = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role:user.role
    };
    return jwt.sign(
        {user: jwtData},
        config.secret
    );
};

exports.checkAuth = function(token){
    return new Promise(function(fulfill,reject){
       // console.log(token);
        jwt.verify(token, config.secret, function (err, user) {
            if(err)
                reject(err);
            fulfill(user);
        })
    })

};

