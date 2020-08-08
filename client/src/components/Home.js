import React from 'react';
// import cloneDeep from 'lodash/cloneDeep';
// import NavBar from './NavBar.js';
import Track from './Track.js';
import ActionButtons from './ActionButtons';
// import InstructionModal from './InstructionModal';
import History from './History';
import axios from 'axios';
import '../App.sass';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track_history: [],
      track_statuses: [],
      liked_tracks: [],
      history_showing: true
    }
    this.trackAudioProgress = this.trackAudioProgress.bind(this);
    this.switchCurrentTrack = this.switchCurrentTrack.bind(this);
    // this.toggleHistory = this.toggleHistory.bind(this);
    this.updateTrackStatus = this.updateTrackStatus.bind(this);
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
        current_track: data.slice(0, 1)[0]
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
    let new_current_track = new_recs.length > 1 ? this.state.recs[1] : null;
    this.setState({
        recs: new_recs,
        current_track: new_current_track
    }, () => {
      if (this.state.current_track != null) {
        console.log(`Switching track to ${new_current_track.name}`);
        this.initTrack(this.state.current_track);
      } else {
        alert('no songs left to play');
      }
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
  /*---------------LIKED TRACKS---------------*/
  /*------------------------------------------*/
  // updateTrackStatus(e, bool, track) {
  //   console.log('asdfasdf');
  //   this.setState(old_state => {
  //     let track_data = {track_id: track.id, liked: bool}
  //     return {tracks_liked_status: old_state.tracks_liked_status.concat( [track_data] )}
  //   }, () => {this.playNextTrack()} )
  // }

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

  render() {
    return(
      <section className={'section'}>
        <div className={'columns'}>
          <div className={'column is-4'}>
            <audio src={this.state.audio_url}></audio>
            <Track
              current_track={this.state.current_track}
              audio_progress={this.state.audio_progress}
            />
            <ActionButtons
              switchCurrentTrack={this.switchCurrentTrack}
              toggleHistory={this.toggleHistory}
              updateTrackStatus={this.updateTrackStatus}
              current_track={this.state.current_track}
            />
          </div>

          <div className={'column is-8'}>
            <History
              // tracks_liked_status={this.state.tracks_liked_status}
              track_history={this.state.track_history}
              liked_tracks={this.state.liked_tracks}
              // history_showing={this.state.history_showing}
            />
          </div>

        </div>
      </section>
    )
  }
}

export default Home;
