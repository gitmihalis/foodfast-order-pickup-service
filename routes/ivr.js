
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

	Order.find_by_id(req.params.order_id)
		.then( order => {
			console.log('find by order, returned: ', order)
			res.send(twilioHelper.orderNotification(order));
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
	const order = Order.update_order(
		id, // order to update
		['status', 'estimated_time'], // keys 
		['preparing', digit] // values
	);
	order.then().catch()
	console.log('update returns ', order)
	// update returns  Promise { <pending> }
	// twilioHelper.goodbyeWithOrder(order.id);
})


module.exports = router;