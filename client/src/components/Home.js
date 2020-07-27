import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Track from './Track.js'
import axios from 'axios';
import '../App.sass';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: null,
      audio_progress: 0,
      current_track: null,
      recommendations: []
    }
    this.initAudio = this.initAudio.bind(this);
    this.trackAudioProgress = this.trackAudioProgress.bind(this);
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
                .catch( err => err)
  }

  initAudio(track) {
    if (track.preview_url) {//Some tracks do not provide a preview_url!
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
    let audio_length = this.state.audio_obj.duration/1;
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


  render() {
    return(
      <section className={'section'}>
        <Track
          image_url={this.state.image_url}
          current_track={this.state.current_track}
          audio_progress={this.state.audio_progress}
        />
        <div className={'level is-mobile'}>
          <div className={'level-item'}>
            <button className={'button'}>
              <FontAwesomeIcon icon={'fas', 'plus-square'} />
              <span> Add</span>
            </button>
          </div>
          <div className={'level-item'}>
            <button className={'button'}>
              <FontAwesomeIcon icon={'far', 'forward'} />
              <span> Skip</span>
            </button>
          </div>
        </div>
      </section>
    )
  }
}



export default Home;
