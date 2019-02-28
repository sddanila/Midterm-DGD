"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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
    res.send("Post to login page" + info.email + info.password);
  });

  return router;
};
