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


module.exports = dbUtils;