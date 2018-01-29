/**
 * Created by tkasa on 13/12/2017.
 */

let roles ={
    admin: ['read', 'write', 'post','upload'],
    builder: ['read', 'write', 'upload'],
    customer:['read','write', 'post'],
    guest:['read']
};
exports.can = function(role, action){
    return roles[role].indexOf(action) !== -1 ? true : false;
};