'use strict';
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbUtils = {};


dbUtils.findEmail = function(passedEmail, cb){
    knex('users')
        .where ('email', passedEmail)
        .asCallback(cb)
};

dbUtils.findUserById = function(userId, cb){
    knex('users')
        .where ('id', userId)
        .asCallback(cb)
};

dbUtils.createUser = function(username, email, password){
    knex('users').insert({username: username, email: email, password: password})
};

dbUtils.isLoggedIn = function(cookie){
    if(!cookie){
        return false
    }
    return true;
};

dbUtils.updateUsername = function(username){
    knex('users').update({username: username});
};

dbUtils.updateEmail = function(email = null){
    knex('users').update({email: email});
};

dbUtils.updatePassword = function(password = null){
    knex('users').update({password: password});
};



module.exports = dbUtils;