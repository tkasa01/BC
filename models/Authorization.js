/**
 * Created by tkasa on 13/12/2017.
 */

let roles ={
    admin: ['read', 'write', 'post','upload'],
    builder: ['read', 'write', 'upload'],
    customer:['read','write', 'post'],
    guest:['read']
};

exports.permit = function(role, action){
    return roles[role].indexOf(action) !== -1;
   // return roles[role].indexOf(action) !== -1 ? true : false;
};

exports.roleAuthor = function(roles){
    return function(req, res, next){
        const user = req.user;
        User.findById(user._id, function(err, user){
            if(err){
                res.status(422).json({error: 'No user was found.'});
                return next(err);
            }
            if(user.role == role){
                return next();
            }
            res.status(401).json({error: 'You are not allowed to view this'});
            return next('Unauthorized');
        })
    }
};