"use strict";

const express = require('express');
const router  = express.Router();

/*
Contains all the Routes for any Post or Get to the Resources
-------------------------------------------------------------------------------
*/


module.exports = (knex) => {

  function getAllResources() {
    return knex.select('*').from("resources").join("categories",{'categories.id': 'resources.category_id'})
    .then(result => {
      return result;
      knex.destroy(() => {
        console.log('Closed Connection'); });
        })
    .catch(err => {
      console.log('Err: ' + err);
      });

  }

  function getCertianResources(searchParam) {
     return knex.select('*').from("resources").join("categories",{'categories.id': 'resources.category_id'})
                    .where('resources.title','LIKE', '%'+searchParam+'%').orWhere('resources.description', 'LIKE', '%'+searchParam+'%')
                    .orWhere('categories.name','LIKE','%'+searchParam+'%')
    .then(result => {
      return result;
      knex.destroy(() => {
        console.log('Closed Connection'); });
        })
    .catch(err => {
      console.log('Err: ' + err);
      });

  }

  router.get("/", (req, res) => {
    console.log('Getting request');
    console.log(req.query);
    if (!req.query.parameter) {
      getAllResources().then(result => {
      res.send(result);
      });
    } else {
        getCertianResources(req.query.parameter).then(result => {
          console.log(result);
          res.send(result);
      });
    }

    });


  router.get("/:resource_id", (req, res) => {
    res.send("Single unique Resource Page for " + req.params.resource_id);
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
