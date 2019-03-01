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

// dbUtils.authenticate = function(passedEmail, passedPassword, cb){
//     knex.select('email password username').from('users')
//         .where ('email', '=', passedEmail)
//         .then(function (result) {
//             console.log("RESULTS", result);
//             const user = result[0];
//             if (
//                 !user ||
//                 !use
//             )
//                 return (null)
//             cb(null, result[0].username)
//         })
//         .catch(function(err) {
//             return cb(err)
//         })
// };

module.exports = dbUtils;