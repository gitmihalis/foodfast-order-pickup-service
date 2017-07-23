const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.orderNotification = function orderNotification(orderArr) {
  const voiceResponse = new VoiceResponse();
  const order = orderArr[0];
  const items = orderArr[1] || 'none' ;
  const gather = voiceResponse.gather({
    action: '/ivr/gather/' + order.id,
    numDigits: '1',
    method: 'POST',
  });

  gather.say(`Order ${order.id} from ${order.phone_number}`);
  // items.forEach( (item, index => {
  //   gather.say(item.name);
  //   gather.say(item.quantity);
  // })
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

  gather.say('About how many minutes until that order is ready?');

  return voiceResponse.toString();
}

exports.goodbyeWithOrder = function (minutes, id) {
  client.messages.create({
    body: `Food Bagz is perparing your order. We'll alert you when it's ready! ...(${minutes} minutes)`,
    to: process.env.TEST_NUMBER,
    from: process.env.TWILIO_NUMBER,
  })
  .then((msg) => msg.sid)
  .catch((err) => console.log(err));

  const voiceResponse = new VoiceResponse();
  voiceResponse.say('Thanks, remember to let us know when the order is ready.');
  voiceResponse.hangup();
  console.log('voice response: ', voiceResponse)
  return voiceResponse.toString();
}

function apologize() {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('Sorry, something went wrong.')
  voiceResponse.say('Check on this order in your food fast app');
  voiceResponse.hangup();
  return voiceResponse.toString();
}



// 3. Restart the order confirmations logic
function loopOrder(id) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.redirect('/ivr/greeting/' + id );
  return voiceResponse.toString();
}