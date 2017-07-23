require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);
const Item = require('../lib/item')(knex);
const OrderItem = require('../lib/order_items')(knex);

const basicAuth = require('express-basic-auth');

const staticUserAuth = basicAuth({
    users: {
        'Admin': 'secret1234'
    },
    challenge: true
})

// -------- ROUTES ------------
router.get('/', staticUserAuth, (req, res) => {

  res.status(200);
  res.render("manager", {title: 'Orders list'});
});

/* POST Place a new order to be confirmed by the client */
router.post('/', (req, res) => {
	// * 
	console.log('request body is : ', req.body);
	const itemQuants = req.body['quantities[]'];
	const itemNames = req.body['names[]'];
	// `create_order params are are follows[ name, cost, status, phone_number, estimated_time ] 
	Order.create_order( req.body.customerName, req.body.cost, 'pending', req.body.customerPhone, null )
		.then( rows => {
			// console.log('items: ', items)
			itemNames.forEach(function( str, i, itemNames ) {
				console.log('inside forEach, itemQuants is', itemQuants);
				Item.find_by_name(str)
					.then( item => {
						// console.log('item.id = ', item.id, typeof item.id);
						// console.log('id = ', rows[0], typeof rows[0] );
						// console.log('item quants = ', itemQuants[i], typeof itemQuants[i]);
						// console.log('item_price = ', item.item_price, typeof item.item_price);
						OrderItem.create_orderitems(rows[0], Number(item.id), Number(itemQuants[i]), Number(item.item_price) )
							.then( () => {})
							.catch( (err) => console.log('error creating orderitems', err))
					})
					.catch((err) => console.error(err));
			});
			console.log('Order items saved');
		})
		.then( id => {

		  console.log('[^ order # ' + id + ' created ]');
			client.calls.create({
		  	url: 'https://foodfast.fwd.wf/ivr/greeting/' + id ,
		  	to: process.env.TEST_NUMBER,
		  	from: process.env.TWILIO_NUMBER,
			})
			res.status(201).json({"message": 'Order' + id + 'created'});
		}).catch( (err) => {
			res.status(500).json({error: 'Oops, order was not accepted.'});
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


module.exports = router;
