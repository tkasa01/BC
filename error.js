/**
 * Created by tkasa on 06/01/2018.
 */
module.exports = function () {
   return function (err, req,res, next) {
        console.log(err.message);
        res.status(500);
       // next();
    }

};
