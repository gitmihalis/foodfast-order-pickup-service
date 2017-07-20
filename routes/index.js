var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res){
  if (!req.body['quantities[]'][1]){
    let name = req.body['names[]'];
    let quantity = parseInt(req.body['quantities[]']);
    console.log(name, quantity);
  } else{
    for (let value in req.body['quantities[]']){
      let name = req.body['names[]'][value];
      let quantity = parseInt(req.body['quantities[]'][value]);
      console.log(name, quantity);
    }
  }
  let payMethod = req.body.payMethod;
  let customer = req.body.customerName;
  console.log(payMethod, customer)
});



module.exports = router;
