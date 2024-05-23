var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('QandAPofDB', { title: 'Quantity and Average Price of Densified Biomass Over Time' });
});

module.exports = router;
