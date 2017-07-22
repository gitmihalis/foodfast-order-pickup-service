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
	// Build the order object
	const newOrder = { 
		    name: req.body.customerName,
        cost: req.body.cost,
        status: 'pending',
        phone_number: req.body.customerPhone,
        estimated_time: null,
	};

	Order.create_order(newOrder)
		.then( (response) => {
		// TODO - make phone call to client
			client.calls.create({
		  	url: 'https://foodfast.fwd.wf/ivr/greeting',
		  	to: process.env.TEST_NUMBER,
		  	from: process.env.TWILIO_NUMBER,
			})
			.catch( (err) => {
				res.status(500).json({error: 'Order was not saved'});
			})
		})
});

router.post('/pickup', (req, res) => {
	// authenticate user... 
	client.messages.create({
	  body: '🤡 Your Order @ Food-Bagz is ready for pickp 🍩',
	  to: process.env.TEST_NUMBER,
	  from: process.env.TWILIO_NUMBER,
	}).then((msg) => {
		process.stdout.write(msg.sid);
		res.status(200).json({});
		// res.status('201').send(call);
	}).catch((err) => console.log(err));
})

router.post('/', (req, res) => {
	client.messages.create({
	  body: ' 🤡 Your Order @ Food-Bagz is ready for pickp 🍩',
	  to: process.env.TEST_NUMBER,
	  from: process.env.TWILIO_NUMBER,
	}).then((msg) => {
		process.stdout.write(msg.sid);
		res.status(200).send();
		// res.status('201').send(call);
	}).catch((err) => console.log(err));
}

/* GET show an order . */
router.get('/:id', function(req, res) {
	const order = {}
  res.render('menu', {order});
});


module.exports = router;
