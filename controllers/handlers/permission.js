/**
 * Created by tkasa on 19/02/2018.
 */
var owner = require('../models/Authorization');
exports.permit = function (req, res, next, allowed){
    const isAllowed = role;
    if(allowed.indexOf(role) > -1){
        if(req.user && isAllowed(req.user.role))
            next();
        else{
            res.status(403);
        }
    }
};






