require('dotenv').config();
const express = require('express');
const router = express.Router();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioHelper = require('../twilio/helpers');



router.post('/accept', (req, res) => {
	res.send(twilioHelper.helloWithOrder());
})

router.post('/eta', (req, res) => {
	const digit = req.body.Digits;

  return res.send(twilioHelper.respondToConfirmation(digit));
})

router.post('/notify', (req, res) => {
	res.send(twilioHelper.goodbyeWithOrder());
})

router.post('/orders')

// GET `/voice` 
router.post('/voice', (req, res) => {
	client.calls.create({
  url: 'https://foodfast.fwd.wf/ivr/accept',
  to: process.env.TEST_NUMBER,
  from: process.env.TWILIO_NUMBER,
	}).then((call) => {
		process.stdout.write(call.sid);
		res.status('201').send(call);
	}).catch((err) => console.log(err));
});



module.exports = router;