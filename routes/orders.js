require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);

/* GET menu */
router.get('/', (req, res) => {
  res.render('menu', { title: 'Place your order' });
});

/* POST Place a new order to be confirmed by the client */
router.post('/', (req, res) => {
	const newOrder = { 
		    name: req.body.customerName,
        cost: req.body.cost,
        status: 'pending',
        phone_number: req.body.customerPhone,
        estimated_time: null,
	};

	Order.create_order(newOrder)
		.then( (response) => {
		// initiate call to twillio...
			client.calls.create({
		  	url: 'https://foodfast.fwd.wf/ivr/accept',
		  	to: process.env.TEST_NUMBER,
		  	from: process.env.TWILIO_NUMBER,
			})
			.catch( (err) => {
				res.status(500).json({error: 'Order was not saved'});
			})
		})
});

/* GET show an order . */
router.get('/:id', function(req, res) {
	const order = {}
  res.render('menu', {order});
});


module.exports = router;
