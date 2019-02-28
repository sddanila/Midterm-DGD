'use strict';

const express = require('express');
const router  = express.Router();
// const session     = require('cookie-session');

module.exports = (knex) => {
const dbUtils = require('../lib/dbutils.js');

/* Log In HTTP requests
---------------------------------------------
*/

//Get Log IN Page
  router.get("/", (req, res) => {
    res.render('login');
  });

//Post From Form on Log in page
  router.post("/", (req, res) => {
    console.log(req.body.email);
    let info = req.body;
    dbUtils.findEmail(info.email, (err, email) => {
      console.log(email[0].email);
      if (!email[0].email) return res.status(403).send('Email not found!');
      console.log(info.password);
      dbUtils.checkPassword(info.email, info.password, (err, isAuthorized) => {
        console.log(isAuthorized);
        if (err || !isAuthorized) return res.status(403).send('Wrong password!');
        req.session.username = dbUtils.getUsername(info.email);
        res.redirect('/');
      })
    });
  });
  return router;
};