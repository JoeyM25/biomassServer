var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('priceByRegion', { title: 'Price by Region' });
});

module.exports = router;
