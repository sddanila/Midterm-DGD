"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

/* Log In HTTP requests
---------------------------------------------
*/

//Get Log IN Page
  router.get("/", (req, res) => {
    res.send("Get LOgin Page");
  });

//Post From Form on Log in page
  router.post("/", (req, res) => {
    res.send("Post to login page");
  });

  return router;
};
