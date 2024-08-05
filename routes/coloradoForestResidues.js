var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('Forest_Residues.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('CSV Read')
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  let Counties = []
  let TDT = []
  let States = []
  for(let i = 0; i < results.length; i++){
    Counties.push(results[i].County);
    TDT.push(results[i]["Thousand Dry Tonnes/Yr"]);
    States.push(results[i].State);
  }
// Fill with state name
  res.render('coloradoForestResidues', { title: 'Forest Residues', Counties: Counties,  TDT: TDT, States: States});
});

module.exports = router;
