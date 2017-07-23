const express = require('express');
const router = express.Router();

const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const Item = require('../lib/item')(knex);
const Table = require('../lib/table')(knex);
const Order = require('../lib/order')(knex);
const OrderItems = require('../lib/orderitems')(knex);

const fs = require("fs");
const request = require("request");

//const knex = require('knex') (require('../database/knexfile').development);

//const Client = require('./client')(knex);


//-------------PAGES----------------------


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Foodfast' });
});

router.get('/welcome', function(req, res) {
  res.render('welcome', {title: 'welcome'});
})

router.get('/testtwo', function(req, res, next){
  Table.find_all('items')
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/testthree', function(req, res, next){
  Order.find_by_status('pending')
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/testfour', function(req, res, next){
  OrderItems.find_by_id(parseInt(req.query.id))
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.post('/test', function(req, res){
  if (!req.body['quantities[]'][1]){
    let name = req.body['names[]'];
    let quantity = parseInt(req.body['quantities[]']);
    console.log(name, quantity);
  } else {
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

router.post('/add', function(req, res){
  res.status(200);
  let name = req.body.name;
  let description = req.body.description;
  let item_price = parseFloat(req.body.price);
  let discount = null;
  let picture_file = req.body.url;
  let quantity = 10;
  Item.create_item(name, description, item_price, discount, picture_file, quantity)
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });
  res.redirect("/");
});


router.post('/complete', function(req, res){
  let status = req.body.status;
  console.log(status);
});
<<<<<<< HEAD

router.get("/users/manager", (req, res) => {
=======
// NOTES: We already have an orders endpoint @ `/orders`
router.get("/manager", (req, res) => {
>>>>>>> f8017eef1ae62b9516d941f52982b08f48f70638
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("manager");
});

router.get("/users/add", (req, res) => {
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("add");
});


module.exports = router;
