import React from 'react';
// import cloneDeep from 'lodash/cloneDeep';
// import NavBar from './NavBar.js';
import Track from './Track.js';
import ActionButtons from './ActionButtons';
import PlaylistNotification from './PlaylistNotification';
import History from './History';
import FinishButtons from './FinishButtons';
import axios from 'axios';
import '../App.sass';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track_history: [],
      liked_tracks: [],
      history_showing: true,
      is_finished: false,
      playlist_created: false,
    }
    this.trackAudioProgress = this.trackAudioProgress.bind(this);
    this.switchCurrentTrack = this.switchCurrentTrack.bind(this);
    // this.toggleHistory = this.toggleHistory.bind(this);
    this.updateTrackStatus = this.updateTrackStatus.bind(this);
    this.continueListening = this.continueListening.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.showPlaylistNotification = this.showPlaylistNotification.bind(this);
  }

  async componentDidMount() {
    console.log('Home component mounted. Calling function');
    this.getRecommendationsFromServer([], 20, 10);
  }

  getRecommendationsFromServer(data, limit, desired) {
    data = this.filterRecommendations(data);
    if (data.length < desired) {
      axios.get(`/api/getRecommendations/?limit=${limit}`)
                      .then( res => {
                        let total_data = data.concat(res.data);
                        total_data = this.filterRecommendations(total_data)
                        this.getRecommendationsFromServer(total_data, limit, desired)
                      })
                      .catch( err => err.data)
    } else {
      this.setState({
        recs: data.slice(0, desired),
        current_track: data[0]
      }, () => {
        console.log('Initial state set. Now playing first song. Next line logs current state.');
        console.log(this.state);
        this.initialAudioSetup();
      })
    }
  }

  filterRecommendations(recs) {
    return recs.filter(rec => rec.preview_url != null)
  }


  /*------------------------------------------*/
  /*-------------------AUDIO------------------*/
  /*------------------------------------------*/
  initialAudioSetup() {
    //Create Audio element, set preload attribute
    let audio = new Audio();
    audio.preload = 'metadata';
    this.setState({ audio_obj: audio }, () => {
      //After Audio element is set to state, initiate first track
      this.initTrack(this.state.current_track)
    })
  }

  initTrack(track) {
    //Update audio object in state to the src of the current track
    let new_audio_obj = this.state.audio_obj;
    new_audio_obj.src = this.state.current_track.preview_url;
    new_audio_obj.load();
    //When metadata is loaded (needed for trackAudioProgress),
    //start playing track
    new_audio_obj.onloadedmetadata = () => {
      this.setState({ audio_obj: new_audio_obj}, () => {
        this.playTrack();
      })
    }
  }

  playTrack() {
    this.state.audio_obj.play();
    this.trackAudioProgress();
  }

  trackAudioProgress() {
    //Calculate percent progress
    let audio_length = this.state.audio_obj.duration/3;
    let current_time = this.state.audio_obj.currentTime;
    let percent_progress = current_time/audio_length;

    //Set percent progress in state
    this.setState({ audio_progress: percent_progress*100 }, () => {
      if (percent_progress < 1) {
        window.requestAnimationFrame(this.trackAudioProgress);
      } else if (percent_progress >= 1) {
        console.log(`Song ${this.state.current_track.name} done playing.`);
        this.switchCurrentTrack();
      }
    })
  }

  switchCurrentTrack() {
    //Pause currently playing audio
    this.state.audio_obj.pause();

    //Add current track to history
    this.addToHistory(this.state.current_track);

    //Check if current track was liked
    //if yes, do nothing - if no, updateTrackStatus(false)
    if (!this.checkIfLiked(this.state.current_track)) {
      console.log(`${this.state.current_track.name} is not liked. updating status to liked=false`);
      this.updateTrackStatus({}, false);
    }

    //Update state w/ next track as new current track,
    //remove previously playing track from recs array
    let new_recs = this.state.recs.slice(1);
    console.log(new_recs);
    let new_current_track = new_recs.length >= 1 ? this.state.recs[1] : null;
    this.setState({
        recs: new_recs,
        current_track: new_current_track
    }, () => {
      if (this.state.current_track != null) {
        console.log(`Switching track to ${new_current_track.name}`);
        this.initTrack(this.state.current_track);
      } else {
        console.log('Audio flow complete!');
        this.toggleAudioFlowStatus();
        // this.continueListening();
      }
    })
  }

  toggleAudioFlowStatus() {
    this.setState(prev_state => {
      return {is_finished: !prev_state.is_finished}
    })
  }

  /*------------------------------------------*/
  /*-----------------HISTORY------------------*/
  /*------------------------------------------*/
  addToHistory(track) {
    this.setState(old_state => {
      return {track_history: old_state.track_history.concat([track])}
    })
  }

  toggleHistory() {
    this.setState(old_state => {
      return {history_showing: !old_state.history_showing}
    })
  }

  /*------------------------------------------*/
  /*---------------TRACK STATUS---------------*/
  /*------------------------------------------*/
  updateTrackStatus(e, is_liked) {
    console.log(this.state.current_track.name+':::'+is_liked);
    if (is_liked) {
      this.setState(prev_state => {
        return {
          liked_tracks: prev_state.liked_tracks.concat(this.state.current_track.id)
        }
      })
    }
  }

  checkIfLiked(track) {
    console.log(`Checking if ${track.name} is liked.`);
    return this.state.liked_tracks.includes(track.id);
  }

  /*------------------------------------------*/
  /*--------------KEEP LISTENING--------------*/
  /*------------------------------------------*/

  continueListening() {
    this.toggleAudioFlowStatus();
    this.getRecommendationsFromServer([], 20, 10);
  }

  /*------------------------------------------*/
  /*--------------CREATE PLAYLIST-------------*/
  /*------------------------------------------*/

  showPlaylistNotification() {
    console.log('Showing notif');
    this.setState({playlist_created: true})
  }

  createPlaylist() {
    //1. Create playlist
    //2. Add tracks to playlist
    //3. Get all liked tracks
    //4. Get link to play
    //5. Add link to notification
    let data = {liked_tracks: this.state.liked_tracks}
    let liked_tracks_data = this.state.track_history.filter(track => {
      return this.state.liked_tracks.includes(track.id)
    })
    let post_data = {liked_tracks: liked_tracks_data}
    console.log(liked_tracks_data);
    axios.post('/api/createPlaylist', post_data)
         .then(res => {
           this.showPlaylistNotification();
         }).catch(err => console.log(err));

    // this.showPlaylistNotification();
  }

  render() {
    return(
      <section className={'section'}>
        <div className={'columns'}>
          <div className={'column is-4'}>
            <Track
              current_track={this.state.current_track}
              audio_progress={this.state.audio_progress}
            />
            <ActionButtons
              switchCurrentTrack={this.switchCurrentTrack}
              toggleHistory={this.toggleHistory}
              updateTrackStatus={this.updateTrackStatus}
              current_track={this.state.current_track}
              is_finished={this.state.is_finished}
            />
            <FinishButtons
              is_finished={this.state.is_finished}
              continueListening={this.continueListening}
              createPlaylist={this.createPlaylist}
            />
            <PlaylistNotification
              playlist_created={this.state.playlist_created}
            />
          </div>

          <div className={'column is-8'}>
            <History
              track_history={this.state.track_history}
              liked_tracks={this.state.liked_tracks}
            />
          </div>

        </div>
      </section>
    )
  }
}

export default Home;
