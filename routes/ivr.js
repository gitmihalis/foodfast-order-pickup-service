
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

router.post('/greeting/:order_id', (req, res) => {
		// retrieve the order from database
	const id = req.params.order_id;
	const order = Order.find_by_id(id);
	const orderItems = OrderItems.find_by_id(id);
	Promise.all([order, orderItems])
		.then( result => {
			console.log('find by order, returned: ', result )
			res.send(twilioHelper.orderNotification(result));
		})
		.catch( () => res.status(404).json({msg: 'order not found'}))
})

router.post('/gather/:order_id', (req, res) => {
	const digit = req.body.Digits;
	const orderID = req.params.order_id;
  res.send(twilioHelper.respondToConfirmation(digit, orderID));
})

router.post('/notify/:order_id', (req, res) => {
	const digit = req.body.Digits;
	const id = req.params.order_id;
	knex('orders').where({id: id})
    .update({
    	status: 'preparing',
    	estimated_time: digit
    }).then( () => {
    	res.status(200).send(twilioHelper.goodbyeWithOrder(digit, id))	
    }).catch((err) => {
    	console.log('[^ Error updating order ',err)
    })
})


module.exports = router;