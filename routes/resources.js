"use strict";

const express = require('express');
const router  = express.Router();

/*
Contains all the Routes for any Post or Get to the Resources
-------------------------------------------------------------------------------
*/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.send("Resource Page");
  });

  router.get("/:resource_id", (req, res) => {
    res.render('resource_show');
  });

  router.get("/:resource_id/edit", (req,res) => {
    res.render('resource_update');
  });

  router.post("/:resource_id/edit", (req, res) => {
    res.send("Made a post request to change ", req.params.resource_id);
  });

  router.post("/:resource_id/delete", (req, res) => {
    res.send("Made a post to delete " + req.params.resource_id);
  });

  router.post("/:resource_id/comment", (req, res) => {
    res.send("Made a comment post request to the post " + req.params.resource_id);
  });

  router.post("/:resource_id/like", (req, res) => {
    res.send("Made a like to post " + req.params.resource_id);
  });

  router.post("/:resource_id/rating", (req, res) => {
    res.send("Made a rating to post " + req.params.resource_id);
  });

  return router;
};
