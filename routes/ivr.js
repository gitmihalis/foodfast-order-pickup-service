
const express = require('express');
const router = express.Router();
// Twilio =========================
const twilioHelper = require('../twilio/helpers');
// DATABASE ======================
const settings = require("../database/settings");
const knex = require('knex')(settings).development);
const Order = require('../lib/order')(knex);
// ROUTES ===============

router.post('/greeting', (req, res) => {
		// retrieve the order from database
	Order.
		// pass the order info to twilio
	console.log('[ from /greeting]:: ', req.body.Digits)
	res.send(twilioHelper.orderNotification());
})

router.post('/gather', (req, res) => {
	const digit = req.body.Digits;

	console.log('[/gather](confirmation):: ', digit);
  res.send(twilioHelper.respondToConfirmation(digit));
})

router.post('/notify', (req, res) => {
	const digit = req.body.Digits;
	console.log('[/notify]:: ', req.body.Digits)
	// database helper ==> sets prep time
	res.send(twilioHelper.goodbyeWithOrder(digit));
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