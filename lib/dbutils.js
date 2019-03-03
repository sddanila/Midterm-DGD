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

dbUtils.findResourceById = function(resourceId, cb){
    knex.select('resources.id',
                'resources.title',
                'resources.description',
                'resources.category_id',
                'categories.picture_url')
                .avg('ratings.ratings')
                .count('likes.resource_id')
            .from('resources')
            .join('categories', {'categories.id': 'resources.category_id'})
            .leftJoin('ratings', {'ratings.resource_id': 'resources.id'})
            .leftJoin('likes', {'likes.resource_id': 'resources.id'})
            .groupBy('resources.id', 'categories.picture_url')
            .having('resources.id', '=', resourceId)
            .asCallback(cb);
};

dbUtils.findLikedResources = function(userId, cb){
    knex.select('resources.id',
    'resources.title',
    'resources.description',
    'resources.category_id',
    'categories.picture_url')
    .avg('ratings.ratings')
    .count('likes.resource_id')
    .from('resources')
    .join('categories', {'categories.id': 'resources.category_id'})
    .leftJoin('ratings', {'ratings.resource_id': 'resources.id'})
    .leftJoin('likes', {'likes.resource_id': 'resources.id'})
    .groupBy('resources.id', 'categories.picture_url')
    .having('resources.user_id', '=', userId)
    .asCallback(cb);
}

dbUtils.findLikedResources2 = function(resourceId, cb){
    knex('resources')
    .where('id', resourceId)
    .asCallback(cb);
}

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

dbUtils.updatePassword = function(userId, password){
    knex('users').update({'password': `${password}`})
    .where('id', userId)
    .then( function (result) {
        console.log(result, 'Success');
    })
};




module.exports = dbUtils;