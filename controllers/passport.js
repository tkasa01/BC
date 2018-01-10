/**
 * Created by tkasa on 25/12/2017.
 */

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Builder            = require('/models/Builder');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(builder, done) {
        done(null, builder.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Builder.findById(id, function(err, builder) {
            done(err, builder);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            buildernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Builder.findOne({ 'local.email' :  email }, function(err, builder) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (builder) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newBuilder            = new Builder();

                        // set the user's local credentials
                        newBuilder.local.email    = email;
                        newBuilder.local.password = newBuilder.generateHash(password);

                        // save the user
                        newBuilder.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newBuilder);
                        });
                    }

                });

            });

        }));

};
