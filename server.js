"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const cookieSession = require('cookie-session');

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt      = require('bcrypt');

// Seperated Routes for each Resource
const userRoutes = require("./routes/user");
const resourceRoutes = require("./routes/resources");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const dbUtils = require('./lib/dbutils.js');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  // keys: [/* secret keys */],
  secret: 'Expecto patronum',
  resave: false,
  saveUninitialized: true,
  // Cookie Options
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours 
}))

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/user", userRoutes(knex));
app.use("/resources", resourceRoutes(knex));
app.use("/login", loginRoutes(knex));
app.use("/logout", logoutRoutes(knex));

// Home page
app.get("/", (req, res) => {
  if (!req.session.user_id){
    res.render('index', {
      user_id: 0,
    });
  } else {
    const userId = req.session.user_id;
    dbUtils.findUserById(userId, (err, result) => {
      if(err) console.error(err);
      let username = result[0].username;
      let email = result[0].email;
      let password = result[0].password;
      res.render('index', {
        user_id: userId,
        username: username,
        email: email,
        password: password
      });
    })  
  }
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
