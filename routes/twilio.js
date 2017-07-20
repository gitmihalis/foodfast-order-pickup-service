var express = require('express');
var router = express.Router();
// Download the Node helper library from twilio.com/docs/node/install
// These identifiers are your accountSid and authToken from
// https://www.twilio.com/console
const accountSid = 'AC04f2db8d143a2048cb7ad18b46aa296f';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);
/* GET home page. */
router.get('/voice', function(req, res, next) {
	client.calls.create({
	  url: 'https://demo.twilio.com/welcome/voice/',
	  to: '+16043691499',
	  from: '+16046703850',
	})
	.then((call) => call.sid )
});

module.exports = router;
