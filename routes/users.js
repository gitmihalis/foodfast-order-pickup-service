const express = require('express');
const router = express.Router();

const knex = require('knex') (require('../database/knexfile').development);
const User = require('../lib/client')(knex);

router.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    // If the registration form was submitted without a value for email or
    // password, then set an error message and redirect.
    templateVars = {
      message: 'Email and password are required',
      login: 'Login',
      register: 'Register'
    }
    res.render('error', templateVars);
    return;
  }
  User.create_client(req.body.email, req.body.password, req.body.name)
  .then(() => {
    // This callback will be called after the promise returned by the last
    // call to .then has resolved. That happens after the user is inserted
    // into the database.
    res.redirect('/users/login');

  }).catch((err) => {
      // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    templateVars = {
      message: 'Email has already been used',
      login: 'Login',
      register: 'Register'
    }
    res.render('error', templateVars);
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
  .then((user) => {
    // If email and password match, we assign the id to the session
    req.session.user_id = user.id;
    res.redirect('/users/manager');
  }).catch((err) => {
    // In the event that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    templateVars = {
      message: 'Email and password do not match',
      login: 'Login',
      register: 'Register'
    }
    res.render('error', templateVars);
  });
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('login');
});

router.get("/login", (req, res) => {
  if (req.session.user_id) {
    res.status(200);
    res.redirect("/users/manager")
  } else {
    res.render("login");
  }
  return;
});

router.get("/register", (req, res) => {
  if (req.session.user_id) {
    res.status(200);
    res.redirect("/users/manager")
  } else {
    res.render("register");
  }
  return;
});


module.exports = router;
