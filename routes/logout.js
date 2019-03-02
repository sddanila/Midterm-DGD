'use strict';

const express = require('express');
const router  = express.Router();
const dbUtils = require('../lib/dbutils.js');


module.exports = () => {

//Post to Log out from multiple Pages
  router.get('/', (req, res) => {
    req.session.user_id = 0;
    req.session = null;
    res.redirect('/');
  });
  return router;
};
