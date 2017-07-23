const express = require('express');
const router = express.Router();

const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const Item = require('../lib/item')(knex);
const Table = require('../lib/table')(knex);

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

router.post('/complete', function(req, res){
  let status = req.body.status;
  console.log(status);
});
// NOTES: We already have an orders endpoint @ `/orders`
router.get("/users/manager", (req, res) => {
  //let templateVars = { user: users[req.session.user_id] };
  res.status(200);
  res.render("manager");
});


module.exports = router;
