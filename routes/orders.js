const express = require('express');
const router = express.Router();

const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);

/* GET menu */
router.get('/', (req, res) => {
  res.render('menu', { title: 'Place your order' });
});

/* POST place order */
router.post('/', (req, res) => {
	const newOrder = { 
		    name: req.body.customerName,
        cost: req.body.cost,
        status: 'pending',
        phone_number: req.body.customerPhone,
        estimated_time: null,
	};
	Order.create_order(newOrder).then( (response) => {
		res.status(201).json();
	}).catch( err => {
		res.status(500).send();
	})
});

/* GET show an order . */
router.get('/:id', function(req, res) {
	const order = {}
  res.render('menu', {order});
});


module.exports = router;
