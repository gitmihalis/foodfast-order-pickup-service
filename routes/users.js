const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const flash = require('connect-flash');

const knex = require('knex') (require('../database/knexfile').development);
const User = require('../lib/client')(knex);

// const app = express();
// app.use(flash());

router.post('/register', (req, res) => {
  console.log('req body > ', req.body);
  if (!req.body.email || !req.body.password) {
    // If the registration form was submitted without a value for email or
    // password, then set an error message and redirect.
    // req.flash('errors', 'email and password are required'); ***********
    res.redirect('/');
    // IMPORTANT: always return after sending a response, whether it's a
    // redirect, render, send, end, json, or whatever.
    return;
  }
  User.create_client(req.body.email, req.body.password, req.body.name)
  .then(() => {
    console.log('then*************')
    // This callback will be called after the promise returned by the last
    // call to .then has resolved. That happens after the user is inserted
    // into the database.
    // req.flash('info', 'account successfully created');++++++++++++++
    res.redirect('/manager');
  }).catch((err) => {
    console.log('err*************')
    // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    // req.flash('errors', err.message); ++++++++++++++++++++
    res.redirect('/');
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
  .then((user) => {
    // If email and password match, we assign the id to the session
    req.session.user_id = user.id;
    res.redirect('/manager');
  }).catch((err) => {
    // In the event that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/users');
  });
});

router.get("/login", (req, res) => {
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("login");
});

router.get("/register", (req, res) => {
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("register");
});


module.exports = router;
