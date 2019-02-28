"use strict";

const express = require('express');
const router  = express.Router();

/*
All Routes For Registering and Ivndividual User Pages
--------------------------------------------------------------
*/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('register');
  });

  router.post("/", (req, res) => {
    let info = req.body;
    res.send("Got you regestration Post"+ info.password + info.email);
  });

  router.get("/:username", (req, res) => {
    res.render('user_show');
  });

  router.get("/:username/edit", (req, res) => {
    res.render('user_update');
  });

  router.post("/:username/edit", (req, res) => {
    res.send("Sent post request to edit user " + req.params.username);
  });

  return router;
};
