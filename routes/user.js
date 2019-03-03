"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt      = require('bcrypt');

/*
All Routes For Registering and Ivndividual User Pages
--------------------------------------------------------------
*/

module.exports = (knex) => {
  const dbUtils = require('../lib/dbutils.js');

  router.get("/", (req, res) => {
        res.render('register');
  });

  router.post("/", (req, res) => {
    let info = req.body;
    let password = bcrypt.hashSync(info.password, 10);
    dbUtils.createUser(info.username, info.email, password);
      res.redirect('/');
  });

  router.get("/:user_id", (req, res) => {
    let templateVars = {};
    templateVars.user_id = req.session.user_id;
    if(dbUtils.isLoggedIn(req.session.user_id)){
      let userId = req.session.user_id;
      dbUtils.getUserCreatedResources(userId, (err, result) => {
        if (err) throw err;
        templateVars.userResources = result;
      });
      dbUtils.findLikedResources(userId, (err, result) => {
        if(err) console.error(err);
        templateVars.user_id = req.session.user_id;
        templateVars.resources = result;
        res.render('user_show', templateVars);
      });
    } else {
      res.redirect('/login');
    }
  });

  router.get("/:user_id/data", (req, res) => {
    console.log('Server got the request');
    let query = knex.select('resources.id',
                            'resources.title',
                            'resources.description',
                            'resources.category_id',
                            'categories.picture_url')
                    .from("resources")
                    .join("categories",{'categories.id': 'resources.category_id'})
                    .where('resources.user_id', '=', req.params.user_id);
    return query.then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('Err: ' + err);
      });
  });

  router.get("/:user_id/edit", (req, res) => {
    if(dbUtils.isLoggedIn(req.session.user_id)){
      let userId = req.session.user_id;
      dbUtils.findUserById(userId, (err, result) => {
        if(err) console.error(err);
        let username = result[0].username;
        let email = result[0].email;
        let password = result[0].password;
        res.render('user_update', {
          user_id: userId,
          username: username,
          email: email,
          password: password
        });
      })
    } else {
      res.redirect('/login');
    }
  });

  router.post("/:user_id/edit", (req, res) => {
    if(dbUtils.isLoggedIn(req.session.user_id)){
      let userId = req.session.user_id;
      dbUtils.findUserById(userId, (err, result) => {
        if(err) console.error(err);
        let newUsername = req.body.username;
        let newEmail = req.body.email;
        let newPassword = req.body.newPassword;
        let username = result[0].username;
        let email = result[0].email;
        let password = result[0].password;
        if (newUsername.length !== 0 && username !== newUsername){
          dbUtils.updateUsername(userId, newUsername);
        } else if (newEmail.length !== 0 && email !== newEmail){
          dbUtils.updateEmail(userId, newEmail);
        } else if (req.body.oldPassword.length !== 0 && newPassword.length !== 0 && req.body.newPassword2.length !== 0 && bcrypt.compareSync(req.body.oldPassword, password) && req.body.newPassword === req.body.newPassword2){
          let newHashedPassword = bcrypt.hashSync(req.body.newPassword, 10)
          dbUtils.updatePassword(userId, newHashedPassword);
        } else {
          res.status(403).send('The passwords don\'t match. Please make sure to input your old password, your new password and confirm your new password.')
        }
        res.redirect(`/user/${userId}`)
      });
    } else {
      res.redirect('/login');
    }
  });
  return router;
};
