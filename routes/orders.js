require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);
const Item = require('../lib/item')(knex);
const OrderItem = require('../lib/order_items')(knex);

// -------- ROUTES ------------
router.get('/' ,(req, res) => {

  res.status(200);
  res.render("manager", {title: 'Orders list'});
});

/* POST Place a new order to be confirmed by the client */
router.post('/', (req, res) => {
	// * 
	console.log('request body is : ', req.body);
	let itemQuants = req.body['quantities[]'];
	let itemNames = req.body['names[]'];
	let orderID  = null;
	console.log('itemnames is a ', typeof itemNames)
	itemNames = ( typeof itemNames === 'string' ) ? [itemNames] : itemNames;
	itemQuants = ( typeof itemQuants === 'string' ) ? [itemQuants] : itemQuants;
		console.log('itemnames is a ', typeof itemNames)
	// `create_order params are are follows[ name, cost, status, phone_number, estimated_time ] 
	Order.create_order( req.body.customerName, req.body.cost, 'pending', req.body.customerPhone, null )
		.then( rows => {
			orderID = rows[0];
			// console.log('items: ', items)
			itemNames.forEach(function( str, i, itemNames ) {
				console.log('inside forEach, itemQuants is', itemQuants);
				Item.find_by_name(str)
					.then( item => {
						OrderItem.create_orderitems(orderID, Number(item.id), Number(itemQuants[i]), Number(item.item_price) )
							.then( () => {})
							.catch( (err) => console.log('error creating orderitems', err))
					})
					.catch((err) => console.error(err));
			});
			console.log('Order items saved');
		})
		.then( () => {

		  console.log('[^ order # ' + orderID + ' created ]');
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

router.put('/:id', (req, res) => {
	// if user is user 
	Order.update_order(req.params.id, ['status'], ['completed'])
		.then( (result) => res.status(200).json({"result": result}))
		.catch( (err) => res.status(500).json({"error": "edit resource failed"}));
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


module.exports = router;
