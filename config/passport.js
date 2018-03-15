// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
//var User_admin = require('../model/user_admin');
var User_user = require('../model/user');

// expose this function to our app using module.exports
module.exports = function (passport) {
    //**********ADMIN section
    //**********ADMIN section
    //**********ADMIN section
    //**********ADMIN section
    //**********ADMIN section
    //**********ADMIN section


    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        
        User_user.findById(id, function (err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-signup-admin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {
            
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User_user.findOne({ 'admin.email' : email }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);
                
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That user is already taken.'));
                } else {
                    
                    // if there is no user with that email
                    // create the user
                    var newUser_admin = new User_user();
                    
                    // set the user's local credentials
                    newUser_admin.admin.email = email;
                    newUser_admin.admin.password = newUser_admin.generateHash(password);
                    
                    console.log(">>admin singed up"+ email);
                    // save the user
                    newUser_admin.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser_admin);
                    });
                }

            });

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-login-admin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form
        
       
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        User_user.findOne({ 'admin.email' : email }, function (err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            
        
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No username found -admin.')); // req.flash is the way to set flashdata using connect-flash
            
            
            // if the user is found but the password is wrong
            if (!user.validPasswordadmin(password))
                return done(null, false, req.flash('loginMessage', ' Wrong password -admin.')); // create the loginMessage and save it to session as flashdata
           
            console.log(">>admin logged in : " + email);
            // all is well, return successful user
            return done(null, user);
        });

    }));

    //**********USER section
    //**********USER section
    //**********USER section
    //**********USER section
    //**********USER section
    //**********USER section
    //**********USER section
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    // used to serialize the user for the session
   
    
    
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-signup-user', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
      
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {
            
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User_user.findOne({ 'local.email' : email }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);
                
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That user is already taken.'));
                } else {
                    
                    // if there is no user with that email
                    // create the user
                    var newUser = new User_user();
                    
                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.rawpassword = password;
                    newUser.local.password = newUser.generateHash(password);
                 
                    newUser.local.company_name = req.body.company_name;
                    newUser.local.detail = req.body.detail;
                    // save the user
                    
                    console.log(">>sign up user :"+ email);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        console.log("newuser save");
                        return done(null, newUser);
                    });
                }

            });

        });

    }));
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-login-user', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User_user.findOne({ 'local.email' : email }, function (err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No username found.')); // req.flash is the way to set flashdata using connect-flash
            
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata
            
            // all is well, return successful user
            console.log("User logged in : " + email);
            return done(null, user);
        });

    }));
};
