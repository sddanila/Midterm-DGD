"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

//Post to Log out from multiple Pages
  router.post("/", (req, res) => {
    res.send("Post to logout page");
  });

  return router;
};
