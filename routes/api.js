var express = require('express');
var router = express.Router();
const axios = require('axios');
const queryString = require('query-string');


let redirect_uri = (process.env.MODE === 'PROD') ? process.env.redirectURI : 'http://localhost:3000/callback';

/*-----GETTING AUTH CODE-----*/

router.get('/login', (req, res, next) => {
  console.log('CALL TO API:LOGIN RECEIVED');
  const base = 'https://accounts.spotify.com/authorize?';

  let params = {
    client_id: process.env.clientID,
    response_type: 'code',
    redirect_uri: redirect_uri,
    scope: 'user-read-private'
  }
  res.send(base+queryString.stringify(params))
})



/*-----GETTING ACCESS TOKEN-----*/

router.post('/getToken', (req, res, next) => {
  console.log('CALL TO API:GETTOKEN RECEIVED');
  const base = 'https://accounts.spotify.com/api/token';
  const to_encode = `${process.env.clientID}:${process.env.clientSecret}`;
  const encoded_auth = Buffer.from(to_encode).toString('base64');

  let headers = {
    Authorization: `Basic ${encoded_auth}`
  }

  let params = {
    grant_type: 'authorization_code',
    code: req.body.auth_code,
    redirect_uri: redirect_uri
  }

  axios({
    method: 'post',
    params: params,
    headers: headers,
    url: base
  }).then(response => {
    console.log(response.data);
    req.session.access_token = response.data.access_token;
    res.json(true);

    // getProfileData(response.data.access_token)
    //   .then(data => {
    //     console.log(data);
    //     res.json(data)
    //   })
  }).catch(err => {
    console.log(err);
    res.json(false)
  })

})

function getProfileData(token) {
  return axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
  })
}

/*
████████ ███████ ███████ ████████ ██ ███    ██  ██████
   ██    ██      ██         ██    ██ ████   ██ ██
   ██    █████   ███████    ██    ██ ██ ██  ██ ██   ███
   ██    ██           ██    ██    ██ ██  ██ ██ ██    ██
   ██    ███████ ███████    ██    ██ ██   ████  ██████
*/

async function searchItems(token) {
  return axios.get('https://api.spotify.com/v1/search', {
    headers: {Authorization: `Bearer ${token}`},
    params: {
      q: 'faye webster',
      type: 'track',
      limit: 5
    }
  }).then(res => res.data)
    .catch(err => console.log(err))
}

router.get('/test', async (req, res, next) => {
  try {
    let itemData = await searchItems(req.session.access_token);
    console.log(itemData);
    res.send(itemData);
  } catch (error) {
    return next(error);
  }
})

//THIS SHOULD BE LAST BECAUSE IT IS THE LEAST SPECIFIC
//IT SEEMS REQUESTS 'CASCADE' DOWN AND STOP AT THE FIRST ONE
router.get('/*', function(req, res, next) {
  console.log(req.session.access_token);
});



module.exports = router;
