
const express = require('express');
const router = express.Router();
// Twilio =========================
const twilioHelper = require('../twilio/helpers');
// DATABASE ======================
const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const Order = require('../lib/order')(knex);
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
	Order.find_by_id(id)
	// TODO :: update the order with an `estimated_time`
		.then( order => res.send(twilioHelper.goodbyeWithOrder(order)) )
		.catch( err => console.log('/notify error: ', err))
	//
})

// GET `/voice` 
// router.post('/voice', (req, res) => {
	// if ( !req.params.Digits ) {
	// 	client.calls.create({
	//   url: 'https://foodfast.fwd.wf/ivr/accept',
	//   to: process.env.TEST_NUMBER,
	//   from: process.env.TWILIO_NUMBER,
	// 	}).then((call) => {
	// 		process.stdout.write(call.sid);
	// 		res.status(200).send();
	// 	}).catch((err) => console.log(err));
	// } else {
	// 	res.redirect('/orders');
	// }
// }

router.post('/sms', (req, res) => {

});


module.exports = router;