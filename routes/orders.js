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
	// `create_order` params: (name, cost, status, phone_number, estimated_time)
	Order.create_order( req.body.customerName, req.body.cost, req.body.status, req.body.phone_number, req.body.estimated_time)
		.then( id => {
		  console.log('[^ order # ' + id + ' created ]');
			client.calls.create({
		  	url: 'https://foodfast.fwd.wf/ivr/greeting/' + id ,
		  	to: process.env.TEST_NUMBER,
		  	from: process.env.TWILIO_NUMBER,
			})
			res.status(201).json({message: 'Order created!'});
		}).catch( (err) => {
			res.status(500).json({error: 'Order was not saved'});
		})
	});

router.get('/sms', (req, res) => {
	const estimate_time = req.query.time;
		client.messages.create({
	  body: `Food Bagz is perparing your order. We'll alert you when it's ready! ...(${req.query.time} minutes)`,
	  to: process.env.TEST_NUMBER,
	  from: process.env.TWILIO_NUMBER,
	}).then((msg) => {
		res.status('200').send(msg.sid);
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
});

/* GET show an order . */
router.get('/:id', function(req, res) {
	const order = {}
  res.render('menu', {order});
});


module.exports = router;
