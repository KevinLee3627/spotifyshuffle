var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('*', function(req, res, next) {
  console.log('GETTING INDEX!');
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = router;
