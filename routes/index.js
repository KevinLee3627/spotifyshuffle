var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('*', function(req, res, next) {
  console.log(req.query);
  if (process.env.MODE === 'PROD') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }
});

module.exports = router;
