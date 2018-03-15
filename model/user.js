var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema_user3 = mongoose.Schema({
    
    local            : {
        email        : {type:String, default: ''},
        password     : {type:String, default: ''},
        rawpassword     : {type:String, default: ''},
        company_name : {type:String, default: ''},
        detail : {type:String, default: ''}
    }, 
    admin           : {
        email        : {type:String, default: ''},
        password     : {type:String, default: ''}
    }

});

// methods ======================
// generating a hash
userSchema_user3.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema_user3.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// checking if password is valid
userSchema_user3.methods.validPasswordadmin = function (password) {
    return bcrypt.compareSync(password, this.admin.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User_user5', userSchema_user3);