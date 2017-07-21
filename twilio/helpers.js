const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.helloWithOrder = function newOrder() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/eta',
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
    : redirectNewOrder();
}

exports.goodbyeWithOrder = function goodbye() {
  const voiceResponse = new VoiceResponse();

  voiceResponse.say('Alerting the customer. goodbye');
  return voiceResponse.toString();
}

// get the preperation time
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

function dismissOrder() {
  const voiceResponse = new VoiceResponse();

  voiceResponse.say('Order dismissed.');
  voiceResponse.say('Fare thee well');

  voiceResponse.hangup();

  return voiceResponse.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectNewOrder() {
  const voiceResponse = new VoiceResponse();
  voiceResponse.redirect('/ivr');
  return voiceResponse.toString();
}