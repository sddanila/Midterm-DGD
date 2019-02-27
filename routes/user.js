"use strict";

const express = require('express');
const router  = express.Router();

/*
All Routes For Registering and Ivndividual User Pages
--------------------------------------------------------------
*/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.send("Visiting Regestration Page");
  });

  router.get("/:username", (req, res) => {
    res.send("On user Page of " + req.params.username);
  });

  router.get("/:username/edit", (req, res) => {
    res.send("On edit page of " + req.params.username);
  });

  router.post("/:username/edit", (req, res) => {
    res.send("Sent post request to edit user " + req.params.username);
  });

  return router;
};
