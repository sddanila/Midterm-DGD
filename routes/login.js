"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.send("Get LOgin Page");
  });

  router.post("/", (req, res) => {
    res.send("Post to login page");
  });

  return router;
};
