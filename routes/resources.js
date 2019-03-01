"use strict";

const express = require('express');
const router  = express.Router();

/*
Contains all the Routes for any Post or Get to the Resources
-------------------------------------------------------------------------------
*/


module.exports = (knex) => {

  function getAllResources(parameters) {
    let query = knex.select('resources.id',
                            'resources.title',
                            'resources.description',
                            'resources.category_id',
                            'categories.picture_url')
                            .avg('ratings.ratings')
                            .count('likes.resource_id')
                    .from("resources")
                      .join("categories",{'categories.id': 'resources.category_id'})
                      .rightJoin("ratings",{'ratings.resource_id' : 'resources.id'})
                      .rightJoin("likes", {'likes.resource_id' : 'resources.id'})
                      .groupBy("resources.id", 'categories.picture_url');
    if (parameters.parameter) {
      const searchParam = parameters.parameter;
      query = query.where('resources.title','LIKE', '%'+searchParam+'%').orWhere('resources.description', 'LIKE', '%'+searchParam+'%')
                    .orWhere('categories.name','LIKE','%'+searchParam+'%');
      console.log(query.toString());
    } else if (parameters.category) {
      const category = parameters.category;
      query = query.where('categories.name','LIKE','%'+category+'%');
      console.log(query.toString());
    }
    return query.then(result => {
      return result;
      knex.destroy(() => {
        console.log('Closed Connection'); });
        })
    .catch(err => {
      console.log('Err: ' + err);
      });
  }

  router.get("/", (req, res) => {
      getAllResources(req.query).then(result => {
      res.send(result);
        });
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

  router.get("/:resource_id/rating" , (req, res) => {
    const resource = req.params.resource_id;
    knex('ratings').sum('ratings').count('ratings').where('resource_id','=',`${resource}`)
      .then(result => {
        console.log('I am in the server waiting' +result);
        res.send(result);
        knex.destroy(() => {
          console.log('Closed Connection'); });
          })
      .catch(err => {
        console.log('Err: ' + err);
        });
  });

  router.post("/:resource_id/rating", (req, res) => {
    res.send("Made a rating to post " + req.params.resource_id);
  });

  return router;
};
