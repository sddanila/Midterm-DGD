'use strict';

const dbUtils = {};

dbUtils.findEmail = function(passedEmail){
    knex.select('email').from('users')
        .where (email = passedEmail)
        .asCallback(function (err){
        if (err) return console.log(err);
        })
};

dbUtils.checkPassword = function(passedEmail, passedPassword){
    knex.select('email').from('users')
        .where ('email', '=', `${passedEmail}`)
        .asCallback(function (err, rows){
        if (err) return console.log(err);
        if (rows.password = passedPassword){
            return true;
        }
    })
};

dbUtils.getUsername = function(passedEmail){
    return knex.select('username').from('users')
        .where('email', '=', `${passedEmail}`)

}

module.exports = dbUtils;