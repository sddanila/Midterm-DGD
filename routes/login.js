'use strict';

const express = require('express');
const router  = express.Router();
const knex = require('knex')({
  client: 'pg',
  connection: {
      host : '127.0.0.1',
      user : 'labber',
      password : 'labber',
      database : 'midterm'
  }
});

module.exports = (knex) => {
const dbUtils = require('../lib/dbutils.js')(knex)
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
    if(!dbUtils.findEmail(info.email)){
      res.status(403).send('Email not found!');
    } else if (!dbUtils.checkPassword(info.password)){
      res.status(403).send('Wrong password!')
    } else {
      req.session.username = dbUtils.getUsername(info.email);
      res.redirect('/');
    }

  });

  return router;
};

