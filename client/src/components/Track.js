import React from 'react';
import '../App.sass';

function Track(props) {
  if(props.current_track) {
    return (
    <div className={'box'}>
        <figure className={'image'}>
          <img src={props.image_url}></img>
        </figure>
        <div className={'container my-3'}>
          <progress
            className={'progress is-small is-dark'}
            value={props.audio_progress}
            max={'100'}>
          </progress>
        </div>
        <div className={'container'}>
          <p className={'title is-4'}>{props.current_track.name}</p>
          <p className={'subtitle is-6'}>{props.current_track.artists[0].name}</p>
        </div>
      </div>
    )
  } else {return null}

}

export default Track;
