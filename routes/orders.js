var express = require('express');
var router = express.Router();

/* GET menu */
router.get('/', function(req, res) {
  res.render('menu', { title: 'Place your order' });
});

/* POST place order */
router.post('/', function(req, res) {
	const order = {}
	// save order and show 
  res.redirect('show', {order});
});

/* GET show an order . */
router.get('/:id', function(req, res) {
	const order = {}
  res.render('menu', {order});
});


module.exports = router;
