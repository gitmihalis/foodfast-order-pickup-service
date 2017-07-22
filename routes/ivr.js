
const express = require('express');
const router = express.Router();
const twilioHelper = require('../twilio/helpers');



router.post('/accept', (req, res) => {
	console.log('[/accept]:: ', req.body.Digits)
	// database helper ==> saves order to databse
	res.send(twilioHelper.helloWithOrder());
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


module.exports = router;