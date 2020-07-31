import React from 'react';

import cloneDeep from 'lodash/cloneDeep';

import NavBar from './NavBar.js';
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
      image_url: null,
      audio_obj: null,
      audio_progress: 0,
      current_track: null,
      recommendations: [],
      track_history: [],
      history_showing: false
    }
    this.initAudio = this.initAudio.bind(this);
    this.trackAudioProgress = this.trackAudioProgress.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
    this.updateTrackLikedStatus = this.updateTrackLikedStatus.bind(this);
  }

  async componentDidMount() {
    console.log('Home component mounted. Calling function');
    let recommendations = await this.getRecommendationsFromServer();
    console.log(recommendations);
    this.setState({
      recommendations: recommendations,
      current_track: recommendations[0]
    }, () => {
      this.initAudio(this.state.recommendations[0]);
    })

  }

  async getRecommendationsFromServer() {
    return axios.get('/api/getRecommendations')
                .then( res => res.data)
                .catch( err => err.data)
  }

  /*------------------------------------------*/
  /*-------------------AUDIO------------------*/
  /*------------------------------------------*/

  initAudio(track) {
    if (track.preview_url) {//Some tracks do not provide a preview_url!
      this.addToHistory(track);
      let image = track.album.images[0];
      let audio = new Audio(track.preview_url);
      audio.preload = 'metadata';
      audio.onloadedmetadata = () => {
        this.setState({
          image_url: image.url,
          audio_obj: audio,
          audio_progress: 0
        }, () => {
          this.state.audio_obj.play();
          this.trackAudioProgress();
        })
      }
    } else {this.playNextTrack()}
  }

  trackAudioProgress() {
    let audio_length = this.state.audio_obj.duration/6;
    let current_time = this.state.audio_obj.currentTime;
    let percent_progress = current_time/audio_length;
    this.setState({ audio_progress: percent_progress*100 }, () => {
      if (percent_progress < 1) {
        window.requestAnimationFrame(this.trackAudioProgress);
      } else if (percent_progress >= 1) {
        console.log('Song done playing.');
        this.state.audio_obj.pause();
        this.playNextTrack();
      }
    })
  }

  playNextTrack() {
    console.log('Playing next track!');
    this.setState(old_state => {
      this.state.audio_obj.pause();
      return {
        current_track: old_state.recommendations[1],
        recommendations: old_state.recommendations.slice(1)
      }
    }, () => {
      if (this.state.recommendations.length > 0) {
        this.initAudio(this.state.recommendations[0])
      } else {
        console.log('No songs to recommend!');
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
    console.log('history showing: ');
    console.log(this.state.history_showing);
    this.setState(old_state => {
      return {history_showing: !old_state.history_showing}
    })
  }

  /*------------------------------------------*/
  /*---------------LIKED TRACKS---------------*/
  /*------------------------------------------*/
  updateTrackLikedStatus(e, bool) {
    this.setState(old_state => {
      let updated_current_track = cloneDeep(old_state.current_track);
      updated_current_track.is_liked = bool;
      let updated_history = old_state.track_history.map( track => {
        return (track.id === updated_current_track.id) ? updated_current_track : track
      })
      return {track_history:  updated_history}
    }, () => {this.playNextTrack()})
  }



  render() {
    return(
      <section className={'section'}>
        <NavBar />
        <Track
          image_url={this.state.image_url}
          current_track={this.state.current_track}
          audio_progress={this.state.audio_progress}
        />
        <ActionButtons
          toggleHistory={this.toggleHistory}
          updateTrackLikedStatus={this.updateTrackLikedStatus}
          current_track={this.state.current_track}
        />
        <History
          track_history={this.state.track_history}
          history_showing={this.state.history_showing}
        />
      </section>
    )
  }
}



export default Home;
