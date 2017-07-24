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
router.get('/', (req, res) =>  {
  res.status(200);
  res.render('index', { title: 'Foodfast' });
});

router.get('/welcome', (req, res) =>  {
  res.status(200);
  res.render('welcome', {title: 'welcome'});
})

router.get('/testtwo', (req, res) => {
  Table.find_all('items')
  .then((table) => {
    res.status(200);
    res.json(table);
  })
  .catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.get('/testthree', (req, res) => {
  Order.find_by_status('preparing')
  .then((table) => {
    res.status(200);
    res.json(table);
  })
  .catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.get('/testfour', (req, res) => {
  OrderItems.find_by_order_id(parseInt(req.query.id))
  .then((table) => {
    res.status(200);
    res.json(table);
  })
  .catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.post('/test', (req, res) => {
  res.status(200);
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

router.post('/add', (req, res) => {
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

router.post('/complete', (req, res) => {
  let status = req.body.status;
  console.log(status);
  res.status(200).send();
});

router.get("/users/manager", (req, res) => {
  if (req.session.user_id) {
    res.status(200);
    res.render("manager")
  } else {
    res.redirect("/users/login");
  }
  return;
});

router.get("/users/add", (req, res) => {
  res.status(200);
  res.render("add");
});

module.exports = router;
