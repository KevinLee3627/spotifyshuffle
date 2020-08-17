import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.sass';

class ActionButtons extends React.Component {

  render() {
    if (!this.props.is_finished) {
      return (
        <div className={'level is-mobile'}>
          <div className={'level-item'}>
            <button
              className={'button'}
              onClick={(e) => {
                this.props.updateTrackStatus(e, true, this.props.current_track);
                this.props.switchCurrentTrack();
              }}
            >
              <FontAwesomeIcon icon={'fas', 'plus-square'} />
              <span className={'ml-1'}>Add</span>
            </button>
          </div>

          <div className={'level-item'}>
            <button
              className={'button'}
              onClick={(e) => {
                this.props.updateTrackStatus(e, false, this.props.current_track);
                this.props.switchCurrentTrack();
              }}
            >
              <FontAwesomeIcon icon={'far', 'forward'} />
              <span className={'ml-1'}>Skip</span>
            </button>
          </div>
        </div>
      )
    } else { return null; }
  }
}

export default ActionButtons;
