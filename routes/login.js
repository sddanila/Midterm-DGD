'use strict';

const express = require('express');
const router  = express.Router();
const bcrypt      = require('bcrypt');


module.exports = (knex) => {
const dbUtils = require('../lib/dbutils.js');

/* Log In HTTP requests
---------------------------------------------
*/

//Get Log IN Page
  router.get("/", (req, res) => {
    if (!req.session.user_id){
      res.render('login', {
        user_id: 0,
      });
    } else {
      const userId = req.session.user_id;
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
        console.log(templateVars);
        res.render('login', {
          user_id: userId,
          username: username,
          email: email,
          password: password
        });
      })  
    }
  });

//Post From Form on Log in page
  router.post("/", (req, res) => {
    let info = req.body;
    dbUtils.findEmail(info.email, (err, result) => {
      const password = info.password;
      if (err || !Array.isArray(result)) return res.status(403).send('Something went wrong!');
      const user = result[0];
      if (!user || !user.email) return res.status(403).send('Email not found!');
      if (!bcrypt.compareSync(password, user.password)) return res.status(403).send('Incorrect password!');
      req.session.user_id = user.id;
      res.redirect('/');
    });
  });
  return router;
};