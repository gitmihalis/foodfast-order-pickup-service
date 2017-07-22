const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.orderNotification = function orderNotification(order) {
  const voiceResponse = new VoiceResponse();
  const gather = voiceResponse.gather({
    action: '/ivr/gather/' + order.id,
    numDigits: '1',
    method: 'POST',
  });

  gather.say(`Order ${order.id} from ${order.phone_number}`);
  // TODO :: gather.say(`Order of ${order.items}`);
  gather.say("Press 1 to confirm");
  gather.say("To dismiss, press 2 or hangup now.")
  // redirectNewOrder();
  return voiceResponse.toString();
};

// Parses the client input to take the next step
exports.respondToConfirmation = function menu(digit, id) {
  const orderID = id;
  const optionActions = {
    '1': getEstimatedTime,
    '2': dismissOrder,
  };
  return (optionActions[digit])
    ? optionActions[digit](orderID)
    : loopOrder(id);
}

// There functions are used when responding to confirmation
// 1. Dismiss the Order and end the call
function dismissOrder(id) {
  const voiceResponse = new VoiceResponse();
  // TODO :: Delete order from database!
  voiceResponse.say(`Order ${id} dismissed.`);
  voiceResponse.say('Bye bye Food Bagz');

  voiceResponse.hangup();

  return voiceResponse.toString();
}

// 2. Accept the order and gather the prep time
function getEstimatedTime(id) {
  const voiceResponse = new VoiceResponse();
  const gather = voiceResponse.gather({
  action: '/ivr/notify/' + id,
  numDigits: '2',
  method: 'POST',
  finishOnKey: '#'
  });

  gather.say('About how many minutes until that order ready?');

  return voiceResponse.toString();
}

exports.goodbyeWithOrder = function (order) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('Thanks, remember to let us know when the order is ready.');
  voiceResponse.hangup();
  console.log('voice response: ', voiceResponse)
  return voiceResponse.toString();
}




// 3. Restart the order confirmations logic
function loopOrder(id) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.redirect('/ivr/greeting/' + id );
  return voiceResponse.toString();
}