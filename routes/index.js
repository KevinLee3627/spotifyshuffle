var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/*', function(req, res, next) {
  console.log('index gotten');
  console.log(__dirname);
  if (process.env.MODE === 'PROD') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    // res.render('index', { title: 'Express' });
  } else {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }
});

module.exports = router;
