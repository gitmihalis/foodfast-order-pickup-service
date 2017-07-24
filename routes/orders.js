require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);
const Item = require('../lib/item')(knex);
const OrderItem = require('../lib/order_items')(knex);

// -------- ROUTES ------------

/* POST Place a new order to be confirmed by the client */
router.post('/', (req, res) => {
	let itemQuants = req.body['quantities[]'];
	let itemNames = req.body['names[]'];
	// Set the order id when the order is created &
  // persist `orderID` through to `Order.create_order_items`
	let orderID  = null;
	itemNames = ( typeof itemNames === 'string' ) ? [itemNames] : itemNames;
	itemQuants = ( typeof itemQuants === 'string' ) ? [itemQuants] : itemQuants;
	Order.create_order( req.body.customerName, req.body.cost, 'pending', req.body.customerPhone, null ) // Returns an id <integer>
		.then( rows => {
			orderID = rows[0];
			itemNames.forEach(function( str, i, itemNames ) {
				Item.find_by_name(str)
					.then( item => {
						OrderItem.create_orderitems( orderID, Number(item.id), Number(itemQuants[i]), Number(item.item_price) )
							.catch( (err) => console.log('! error creating orderitems ! ', err))
					})
					.catch((err) => console.error('! could not find item ! ', err));
			});
		})
		.then( () => {
		  console.log('[^ order (id:' + orderID + ') created ]');
		  // Initiate the iteractive voice API
			client.calls.create({
		  	url: 'https://foodfast.fwd.wf/ivr/greeting/' + orderID ,
		  	to: process.env.TEST_NUMBER,
		  	from: process.env.TWILIO_NUMBER,
			})
			res.status(201).json({"message": 'Order' + orderID + 'created'});
		}).catch( (err) => {
			res.status(500).json({error: 'Oops, order was not accepted.'});
		})
});

// 
router.put('/:id', (req, res) => {
	// Alert customer to pickup item.
	// TODO:: Route to order.phoneNumber
		const estimate_time = req.query.time;
		client.messages.create({
	  	body: `Your order is ready for pickup!`,
	  	to: process.env.TEST_NUMBER,
	  	from: process.env.TWILIO_NUMBER,
	}).then((msg) => {
		res.status('200').send(msg.sid);
	}).catch((err) => console.log('Error, sending pickup notice', err));
	Order.update_order(req.params.id, ['status'], ['completed'])
		.then( (result) => res.status(200).json({"result": result}))
		.catch( (err) => res.status(500).json({"error": "edit resource failed"}));
});

router.get('/sms', (req, res) => {
	// App should use query params, like this to 
	// persist order information...
	const estimate_time = req.query.time;
		client.messages.create({
	  	body: `Food Bagz is perparing your order. We'll alert you when it's ready! ...(${req.query.time} minutes)`,
	  	to: process.env.TEST_NUMBER,
	  	from: process.env.TWILIO_NUMBER,
	}).then((msg) => {
		res.status('200').send(msg.sid);
	}).catch((err) => {
		res.status(500).send({
			error: err,
			message: 'Estimated time SMS failed to send'
		})
	});
})


module.exports = router;
