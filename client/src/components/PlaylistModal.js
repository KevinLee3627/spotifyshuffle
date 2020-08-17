import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.sass';


class PlaylistModal extends React.Component {

  createPlaylistItems() {

  }

  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <p>A playlist will be created with the following songs:</p>

        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}

function PlaylistItem(props) {
  return (
    <article className={'media'}>
      <figure className={'media-left image is-32x32'}>
        <img src={props.track.album.images[0].url}></img>
      </figure>
      <div className={'media-content'}>
        <p className={'title is-6'}>{props.track.name}</p>
        <p className={'subtitle is-6'}>{props.track.artists[0]}</p>
      </div>
    </article>
  )
}

export default PlaylistModal;
