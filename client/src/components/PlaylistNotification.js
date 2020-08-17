import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.sass';

class PlaylistNotification extends React.Component {
  render() {
    if (this.props.playlist_created) {
      return (
        <div className={'notification is-primary'}>
          <button className={'delete'}></button>
          <p>Playlist created! Check it out at LINK</p>
        </div>
      )
    } else { return null; }
  }
}

export default PlaylistNotification;
