
const express = require('express');
const router = express.Router();
// Twilio =========================
const twilioHelper = require('../twilio/helpers');
// DATABASE ======================
const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);
const OrderItems = require('../lib/order_items')(knex);


// ROUTES ===============

// TODO :: =================================================== 
// query strings are a pereferable way to persist the order id
// ===========================================================
router.post('/greeting/:order_id', (req, res) => {
	const id = req.params.order_id;
	const order = Order.find_by_id(id);  
	const orderItems = OrderItems.find_by_order_id(id);
	Promise.all([order, orderItems])
		.then( result => {
			// `result` is an array with an order object, and orderItems object.
			res.send(twilioHelper.orderNotification(result));
		})
		.catch( (err) => res.status(404).json( { 
			msg: 'order not found',
			error: err 
		} ))
});

router.post('/gather/:order_id', (req, res) => {
	// Twilio sets user input into a key called Digits and hits 
	// this enpoint as soon as it collects a single digit # ( 1 or 2 )
	const orderStatus = req.body.Digits;
	const orderID = req.params.order_id;
	if (orderStatus == 2) {
		// Order is dismissed by client, so update status
		Order.update_order(orderID, ['status'], ['rejected']);
		res.send( twilioHelper.dismissOrder(orderID))
	} else {
		// Order has been accepted by client, get more info
	  res.send( twilioHelper.getEstimatedTime(orderID));
	}
})

router.post('/notify/:order_id', (req, res) => {
	// Digits is key Twilio used to send user's input
	const digit = req.body.Digits;
	const id = req.params.order_id;
	knex('orders').where({id: id})
    .update({
    	status: 'preparing',
    	estimated_time: digit
    }).then( () => {
    	res.status(200).send(twilioHelper.goodbyeWithOrder(digit, id))	
    }).catch((err) => {
    	res.status(500).json()({
    		error: err,
    		message: '! Order could not be updated !'
    	})
    })
});



module.exports = router;