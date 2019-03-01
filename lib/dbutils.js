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
    knex('users').insert({username: `${username}`, email: `${email}`, password: `${password}`})
    .then( function (result) {
        console.log(result, 'Success');
    })
};

dbUtils.isLoggedIn = function(cookie){
    if(!cookie){
        return false
    }
    return true;
};

dbUtils.updateUsername = function(userId, username){
    knex('users').update({'username': `${username}`})
    .where('id', userId)
    .then( function (result) {
        console.log(result, 'Success');
    })
};

dbUtils.updateEmail = function(userId, email){
    knex('users').update({'email': `${email}`})
    .where('id', userId)
    .then( function (result) {
        console.log(result, 'Success');
    })
};

dbUtils.updatePassword = function(userId, passwordx){
    knex('users').update({'password': `${password}`})
    .where('id', userId)
    .then( function (result) {
        console.log(result, 'Success');
    })
};



module.exports = dbUtils;