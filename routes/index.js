const express = require('express');
const router = express.Router();

//const settings = require("../database/settings");
//const knex = require('knex') (require('../database/knexfile').development);

//const Client = require('./client')(knex);


//-------------PAGES----------------------


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res){
  if (!req.body['quantities[]'][1]){
    let name = req.body['names[]'];
    let quantity = parseInt(req.body['quantities[]']);
    console.log(name, quantity);
  } else{
    for (let value in req.body['quantities[]']){
      let name = req.body['names[]'][value];
      let quantity = parseInt(req.body['quantities[]'][value]);
      console.log(name, quantity);
    }
  }
  let payMethod = req.body.payMethod;
  let customer = req.body.customerName;
  let phone = req.body.customerPhone;
  console.log(payMethod, customer, phone);
});

router.post('/complete', function(req, res){
  let status = req.body.status;
  console.log(status);
});

router.get("/manager", (req, res) => {
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("manager");
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

router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
  .then((user) => {
    // If email and password match, we assign the id to the session
    req.session.user_id = user.id;
    res.redirect('/');
  }).catch((err) => {
    // In the event that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/manager');
  });
});


router.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    // If the registration form was submitted without a value for email or
    // password, then set an error message and redirect.
    req.flash('errors', 'email and password are required');
    res.redirect('/');
    // IMPORTANT: always return after sending a response, whether it's a
    // redirect, render, send, end, json, or whatever.
    return;
  }
  User.add(req.body.email, req.body.password)
  .then(() => {
    // This callback will be called after the promise returned by the last
    // call to .then has resolved. That happens after the user is inserted
    // into the database.
    req.flash('info', 'account successfully created');
    res.redirect('/');
  }).catch((err) => {
    // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/');
  });
});



module.exports = router;
