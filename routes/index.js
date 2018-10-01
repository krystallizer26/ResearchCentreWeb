var User = require('../model/user');



const request = require('request');
const querystring = require('querystring');
const bot_gathering = require('./bot_gathering');

module.exports = function (app, passport) {


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {

        console.log(".hostname = " + JSON.stringify(req.hostname)+ "/research_directory");
        
        console.log("test research_directory ");
        res.sendfile('public/general_2/index.html');
    });

    // app.get('/', function (req, res) {
    //     console.log("index");
    //     res.sendfile('public/general_2/index.html'); // load the index.ejs file
    // });

    function get_each_researcher(name_ary,leng){
        
                                let  count = leng;
                                count--;
                                console.log("------------ count  =  "+count)
        
                                if(count == -1)
                                {
                                    return null
                                }
                                else
                                {
        
                                                  
                        let str = name_ary[count].researcherName_EN;
                        let buf_str = str.split(/\s+/g);
        
                        let firstname = buf_str[0];
                        let lastname = buf_str[1];
                                        if(firstname && lastname ){
                    
                                                bot_gathering.bot_gathering({
                                                    _id:name_ary[count]._id,
                                                    firstname:firstname,
                                                    lastname:lastname
                                
                                                } ,function(){
                                
                                                    
                                                    get_each_researcher(name_ary,count);
                                            
                                
                                            });
                    
                                        }
                                        else{
                                            get_each_researcher(name_ary,count);

                                        }
                                }
        
                     
               
        
                    
        
                      
        
                  
        
                      
                 
                    }

    app.get('/bot', function (req, res) {
        console.log(" /getAllResearcherName");

        
        
        
    var form = {
                }
            var formData = querystring.stringify(form);
            var contentLength = formData.length;
            request({
              header : {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            },
              uri: 'http://localhost:2000/api/getAllResearcherName/',
              form: formData,
              method: 'POST'
            }, function (err, res2, body) {
              //it works!
              if(err){
                  console.log("[ERROR] getAllResearcherName = "+err);
                  res.send("error")
              }
              else{

                
               
                body = JSON.parse(body)
                if(body.code != '999999')
                {
                    res.send(JSON.stringify(body));

                }
                else{

                    res.send("success")
               
                console.log('data in getAllResearcherName  = '+body)

                get_each_researcher(body.data,body.data.length)
         
              }
            }
            });

            
    });

    

     app.get('/research_centre', function (req, res) {
         console.log("template 2 ");
         res.sendfile('public/general/index.html'); // load the index.ejs file
     });


    app.get('/mkpro', function (req, res) {
        res.sendfile('public/docs/documentation.html'); // load the index.ejs file
    });


    app.get('/user_page', isLoggedInuser, function (req, res) {

        console.log("index " + req.user.local);
        console.log("index " + req.user.local.email);
        res.render('../public/user.ejs', { Quser: req.user.local});

       // res.sendfile('./public/user.html');

    });


    app.get('/admin', isLoggedInadmin, function (req, res) {
        //res.render('index', { title: 'Express' });

        res.sendfile('public/admin/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // =====================================
    // LOGIN ===============================
    // =====================================


     app.get('/query_user_all', function (req, res) {



        User.find(function (err, user_all) {
            if (err)
                res.send(err)
           // console.log("> " + user_all.local);
          //  console.log("> " + user_all);
            res.json(user_all);
        });

    })    ;

    // show the login form
    app.get('/admin', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login_admin.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/investor', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login_user.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login_user', passport.authenticate('local-login-user', {
        successRedirect : '/user_page', // redirect to the secure profile section
        failureRedirect : '/investor', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

    }));
    app.post('/login_admin', passport.authenticate('local-login-admin', {

        successRedirect : '/admin_page', // redirect to the secure profile section
        failureRedirect : '/admin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

    }));

 /*   app.post('/login_admin', function (req, res) {
        console.log("come");
        // render the page and pass in any flash data if it exists
        res.render('signup_admin.ejs', { message: req.flash('signupMessage') });
    });
    */

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
  // process the signup form
    // process the signup form ADMIN**


    app.get('/signup_admin', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup_admin.ejs', { message: req.flash('signupMessage') });
    });


    app.post('/signup_admin', passport.authenticate('local-signup-admin', {
        successRedirect : '/admin_page', // redirect to the secure profile section
        failureRedirect : '/signup_admin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));





    // process the signup form USER**
    app.post('/signup_user', passport.authenticate('local-signup-user', {
        successRedirect : '/query_user_all', // redirect to the secure profile section
        failureRedirect : '/admin_page', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
   /* app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });*/

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout_user', function (req, res) {
        req.logout();
        res.redirect('/investor');
    });
};


function isLoggedInuser(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/investor');
}
function isLoggedInadmin(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/admin');
}
