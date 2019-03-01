"use strict";

const express = require('express');
const router  = express.Router();

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
    dbUtils.findEmail(info.email, (err, result) => {
      const user = result[0];
      if (user.email) return res.status(403).send('Your email already exists!');
      if (err || info.email === '' || info.password === '' || info.username === '') return res.status(403).send('Something went wrong. Please fill out all the fields.');
      dbUtils.createUser(info.username, info.email, info.password);
      res.redirect('/');
    }); 
  });

  router.get("/:user_id", (req, res) => {
    if(dbUtils.isLoggedIn(req.session.user_id)){
      let userId = req.session.user_id;
      dbUtils.findUserById(userId, (err, result) => {
        if(err) console.error(err);
        let username = result[0].username;
        let email = result[0].email;
        let password = result[0].password;
        let templateVars = {
          user_id: userId,
          username: username,
          email: email,
          password: password
        };
        res.render('user_show', templateVars);
      })
    } else {
      res.redirect('/login');
    }
  });

  router.get("/:user_id/edit", (req, res) => {
    if(dbUtils.isLoggedIn(req.session.user_id)){
      let userId = req.session.user_id;
      dbUtils.findUserById(userId, (err, result) => {
        if(err) console.error(err);
        let username = result[0].username;
        let email = result[0].email;
        let password = result[0].password;
        let templateVars = {
          user_id: userId,
          username: username,
          email: email,
          password: password
        };
        res.render('user_update', templateVars);
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
        let username = result[0].username;
        let email = result[0].email;
        let password = result[0].password;
        if (username !== '' && username !== req.body.username){
          dbUtils.updateUsername(username);
        }
        if (email !== '' && email !== req.body.email){
          dbUtils.updateEmail(email);
        }
        if (req.body.oldPassword !== '' && req.body.newPassword !== '' && req.body.newPassword2 !== '' && req.body.oldPassword === password && req.body.newPassword === req.body.newPassword2){
          dbUtils.updatePassword(req.body.newPassword);
        } else {
          res.status(403).send('The passwords don\'t match. Please make sure to input your old password, your new password and confirm your new password.')
        }
        res.redirect(`/${userId}`)
      });
    } else {
      res.redirect('/login');
    }
  });
  return router;
};
