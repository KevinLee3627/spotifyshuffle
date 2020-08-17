import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.sass';

class FinishButtons extends React.Component {
  render() {
    if (this.props.is_finished) {
      return (
        <div className={'level is-mobile'}>
          <div className={'level-item'}>
            <button
              className={'button'}
              onClick={e => {this.props.continueListening()}}
            >
              <span>Keep Listening</span>
            </button>
          </div>
          <div className={'level-item'}>
            <button
              className={'button'}
              onClick={e => {this.props.createPlaylist()}}
            >
              <span>Create Playlist</span>
            </button>
          </div>
        </div>
      )
    } else { return null; }
  }
}

export default FinishButtons;
