var express = require('express');
var router = express.Router();
const axios = require('axios');
const queryString = require('query-string');

router.get('/login', (req, res, next) => {
  console.log('CALL TO API:LOGIN RECEIVED');
  console.log(req.originalUrl);
  let base = 'https://accounts.spotify.com/authorize?';
  let redirect_uri = (process.env.MODE === 'PROD') ? process.env.redirectURI : 'http://localhost:3000/callback';
  console.log('Redirect uri: ' + redirect_uri);
  let params = {
    client_id: process.env.clientID,
    response_type: 'code',
    redirect_uri: redirect_uri,
    scope: 'user-read-private'
  }
  console.log(base+queryString.stringify(params));
  res.send(base+queryString.stringify(params))
  // axios({
  //   method: 'get',
  //   url: base,
  //   params: params
  // }).then (res => {
  //   console.log('Login response received:');
  //   console.log(res.data);
  // })
})


//THIS SHOULD BE LAST BECAUSE IT IS THE LEAST SPECIFIC
//IT SEEMS REQUESTS 'CASCADE' DOWN AND STOP AT THE FIRST ONE
router.get('/*', function(req, res, next) {
  // console.log('api requested');
  console.log(req.originalUrl);
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
