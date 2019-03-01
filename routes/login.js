'use strict';

const express = require('express');
const router  = express.Router();

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
    let info = req.body;
    dbUtils.findEmail(info.email, (err, result) => {
      if (err || !Array.isArray(result)) return res.status(403).send('Something went wrong!');
      const user = result[0];
      if (!user || !user.email) return res.status(403).send('Email not found!');
      if (user.password !== info.password) return res.status(403).send('Incorrect password!');
    
      req.session.username = user.username;
      res.redirect('/');
    });
  });
  return router;
};