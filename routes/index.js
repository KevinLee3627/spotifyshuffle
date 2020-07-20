var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(__dirname);
  // res.sendFile(path.join(__dirname, '/../build', 'index.html'));
  res.render('index', { title: 'Express' });
});

module.exports = router;
