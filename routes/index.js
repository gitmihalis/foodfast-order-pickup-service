const express = require('express');
const router = express.Router();

const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const Item = require('../lib/item')(knex);
const Table = require('../lib/table')(knex);
const Order = require('../lib/order')(knex);
const OrderItems = require('../lib/order_items')(knex);

const fs = require("fs");
const request = require("request");

//-------------PAGES----------------------


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Foodfast' });
});

/* GET welcome page. */
router.get('/welcome', function(req, res) {
  res.render('welcome', {title: 'welcome'});
})


router.get('/load', function(req, res, next){
  Table.find_all('items')
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/loadOrders', function(req, res, next){
  Order.find_by_status('pending')
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/loadItems', function(req, res, next){
  OrderItems.find_by_order_id(parseInt(req.query.id))
  .then((table) => {
    res.json(table);
  })
  .catch((err) => {
    console.log(err);
  });
});

/* POST add menu item. */
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

/* GET manager page. */
router.get("/users/manager", (req, res) => {
  if (req.session.user_id) {
    res.status(200);
    res.render("manager")
  } else {
    res.redirect("/users/login");
  }
  return;
});

/* GET add to menu page. */
router.get("/users/add", (req, res) => {
  res.status(200);
  res.render("add");
});


module.exports = router;
