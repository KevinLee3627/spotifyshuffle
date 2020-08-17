var express = require('express');
var router = express.Router();
const axios = require('axios');
const queryString = require('query-string');


let redirect_uri = (process.env.MODE === 'PROD') ? process.env.redirectURI : 'http://localhost:3000/callback';

/*
 █████  ██    ██ ████████ ██   ██      ██████  ██████  ██████  ███████
██   ██ ██    ██    ██    ██   ██     ██      ██    ██ ██   ██ ██
███████ ██    ██    ██    ███████     ██      ██    ██ ██   ██ █████
██   ██ ██    ██    ██    ██   ██     ██      ██    ██ ██   ██ ██
██   ██  ██████     ██    ██   ██      ██████  ██████  ██████  ███████
*/

router.get('/login', (req, res, next) => {
  console.log('CALL TO API:LOGIN RECEIVED');
  const base = 'https://accounts.spotify.com/authorize?';
  let scopes = 'user-read-private user-top-read playlist-modify-public playlist-modify-private'
  let params = {
    client_id: process.env.clientID,
    response_type: 'code',
    redirect_uri: redirect_uri,
    scope: scopes
  }
  res.send(base+queryString.stringify(params))
})


/*
 █████   ██████  ██████ ███████ ███████ ███████     ████████  ██████  ██   ██ ███████ ███    ██
██   ██ ██      ██      ██      ██      ██             ██    ██    ██ ██  ██  ██      ████   ██
███████ ██      ██      █████   ███████ ███████        ██    ██    ██ █████   █████   ██ ██  ██
██   ██ ██      ██      ██           ██      ██        ██    ██    ██ ██  ██  ██      ██  ██ ██
██   ██  ██████  ██████ ███████ ███████ ███████        ██     ██████  ██   ██ ███████ ██   ████
*/

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
    console.log('Logging response data from post request to spotify for accesss token');
    console.log(response.data);
    req.session.access_token = response.data.access_token;
    req.session.test = 'test string';
    res.json(true);

  }).catch(err => {
    console.log(err);
    res.json(false)
  })

})


/*
████████  ██████  ██████      ████████ ██████   █████   ██████ ██   ██ ███████
   ██    ██    ██ ██   ██        ██    ██   ██ ██   ██ ██      ██  ██  ██
   ██    ██    ██ ██████         ██    ██████  ███████ ██      █████   ███████
   ██    ██    ██ ██             ██    ██   ██ ██   ██ ██      ██  ██       ██
   ██     ██████  ██             ██    ██   ██ ██   ██  ██████ ██   ██ ███████
*/

async function getUserTopTracks(token) {
  return axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: {Authorization: `Bearer ${token}`},
    params: {
      limit: 5,
      time_range: 'long_term' //change this later maybe?
    }
  }).then(res => res.data)
    .catch(err => console.log(err))
}

/*
██████  ███████  ██████  ██████  ███    ███ ███    ███ ███████ ███    ██ ██████   █████  ████████ ██  ██████  ███    ██ ███████
██   ██ ██      ██      ██    ██ ████  ████ ████  ████ ██      ████   ██ ██   ██ ██   ██    ██    ██ ██    ██ ████   ██ ██
██████  █████   ██      ██    ██ ██ ████ ██ ██ ████ ██ █████   ██ ██  ██ ██   ██ ███████    ██    ██ ██    ██ ██ ██  ██ ███████
██   ██ ██      ██      ██    ██ ██  ██  ██ ██  ██  ██ ██      ██  ██ ██ ██   ██ ██   ██    ██    ██ ██    ██ ██  ██ ██      ██
██   ██ ███████  ██████  ██████  ██      ██ ██      ██ ███████ ██   ████ ██████  ██   ██    ██    ██  ██████  ██   ████ ███████
*/

async function getRecommendations(token, seed_tracks, limit) {
  let seed_track_ids = seed_tracks.map(track => track.id);
  console.log(seed_track_ids);
  return axios.get('https://api.spotify.com/v1/recommendations', {
    headers: {Authorization: `Bearer ${token}`},
    params: {
      seed_tracks: seed_track_ids.join(','),
      limit: limit
    }
  }).then(res => res.data)
    .catch(err => console.log(err))
}

router.get('/getRecommendations', async (req, res, next) => {
  console.log('CALL TO API:getRecommendations RECEIVED');
  console.log(`Limit: ${req.query.limit}`);
  const limit = req.query.limit;
  try {
    let seed_tracks = await getUserTopTracks(req.session.access_token);
    // console.log(seed_tracks.items);
    let recommendations = await getRecommendations(req.session.access_token, seed_tracks.items, limit);
    // console.log(recommendations.tracks);
    res.send(recommendations.tracks);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
})

/*
██████  ██       █████  ██    ██ ██      ██ ███████ ████████ ███████
██   ██ ██      ██   ██  ██  ██  ██      ██ ██         ██    ██
██████  ██      ███████   ████   ██      ██ ███████    ██    ███████
██      ██      ██   ██    ██    ██      ██      ██    ██         ██
██      ███████ ██   ██    ██    ███████ ██ ███████    ██    ███████
*/

async function getUserId(token) {
  console.log('getting user info');
  return axios.get('https://api.spotify.com/v1/me', {
    headers: {Authorization: `Bearer ${token}`}
  }).then(res => res.data)
    .catch(err => console.log(err))
}

async function createPlaylist(token, name, desc) {
  console.log('Creating playlist');
  let user_obj = await getUserId(token);
  let user_id = user_obj.id;
  console.log(user_obj);
  let headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  let data = {
    name: name,
    description: desc,
    public: false
  }
  return axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`,
    data, { headers: headers })
    .then(res => res.data)
    .catch(err => console.log(err))
}

function addTracksToPlaylist(token, playlist_id, tracks) {
  console.log('Adding tracks to playlist');
  let uris = tracks.map(track => track.uri);
  let data = { uris: uris }
  let headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    data, {headers: headers})
    .then(res => res.data)
    .catch(err => console.log(err))
}

router.post('/createPlaylist', async (req, res, next) => {
  console.log('CALL TO API:createPlaylist RECEIVED');
  console.log(req.body);
  let liked_tracks = req.body.liked_tracks;
  let playlist_data = await createPlaylist(req.session.access_token, 'Test playlist', 'created by API');
  console.log(playlist_data.id);
  addTracksToPlaylist(req.session.access_token, playlist_data.id, liked_tracks);
})

//THIS SHOULD BE LAST BECAUSE IT IS THE LEAST SPECIFIC
//IT SEEMS REQUESTS 'CASCADE' DOWN AND STOP AT THE FIRST ONE
router.get('/*', function(req, res, next) {
  console.log(req.session.access_token);
});



module.exports = router;
