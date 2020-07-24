var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.post('/*', function(req, res, next) {
  console.log('api requested');

  const spotify_base = 'https://api.spotify.com/v1/search/';
  let data = req.body.data;
  let params = `?q=kingston&type=track&limit=5`;

  let spotify_token = req.app.locals.spotify_token;
  let headers = {
      Authorization: `Bearer ${spotify_token}`
  }

  axios.get(spotify_base+params, {
      headers: headers,
  }).then( spotify_res => {
      console.log(spotify_res.data);
      res.json(spotify_res.data) //Sends data to client
  }).catch( err => {
      console.log(err);
  }).finally( () => {
      console.log('Request complete!');
  })
});



module.exports = router;
