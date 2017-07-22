const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.helloWithOrder = function newOrder() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/gather',
    numDigits: '1',
    method: 'POST',
  });

  gather.say('order made, press 1 to confirm, 2 to dismiss');
  // redirectNewOrder();
  return voiceResponse.toString();
};

// Parses the client input to take the next step
exports.respondToConfirmation = function menu(digit) {
  const optionActions = {
    '1': queryPreptime,
    '2': dismissOrder,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : goodbyeWithOrder();
}

exports.goodbyeWithOrder = function goodbye() {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('Alerting the customer. goodbye');
  voiceResponse.hangup();
  return voiceResponse.toString();
}


// There functions are used when responding to confirmation
// 1. Dismiss the Order and end the call
function dismissOrder() {
  const voiceResponse = new VoiceResponse();

  voiceResponse.say('Order dismissed.');
  voiceResponse.say('Fare thee well');

  voiceResponse.hangup();

  return voiceResponse.toString();
}

// 2. Accept the order and gather the prep time
function queryPreptime() {
  const voiceResponse = new VoiceResponse();
  const gather = voiceResponse.gather({
  action: '/ivr/notify',
  numDigits: '3',
  method: 'POST',
  finishOnKey: '#'
  });

  gather.say('how many minutes?');
  return voiceResponse.toString();
}

// 3. Restart the order confirmations logic
function redirectNewOrder() {
  const voiceResponse = new VoiceResponse();
  voiceResponse.redirect('/ivr');
  return voiceResponse.toString();
}