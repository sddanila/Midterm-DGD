'use strict';

const express = require('express');
const router  = express.Router();


module.exports = () => {

//Post to Log out from multiple Pages
  router.get('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};
