'use strict';
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbUtils = {};


dbUtils.findEmail = function(passedEmail, cb){
    console.log("this is the passed email", passedEmail);
    knex('users')
        .where ('email', passedEmail)
        .asCallback(cb)
};

dbUtils.checkPassword = function(passedEmail, passedPassword, cb){
    knex.select('email').from('users')
        .where ('email', '=', passedEmail)
        .where ('password', passedPassword)
        .asCallback(cb)
};

dbUtils.getUsername = function(passedEmail){
    return knex.select('username').from('users')
        .where('email', '=', passedEmail)

}
module.exports = dbUtils;