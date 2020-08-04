import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.sass';

class ActionButtons extends React.Component {

  render() {
    return (
      <div className={'level is-mobile'}>
        <div className={'level-item'}>
          <button
            className={'button'}
            onClick={(e) => this.props.updateTrackLikedStatus(e, true)}
          >
            <FontAwesomeIcon icon={'fas', 'plus-square'} />
            <span className={'ml-1'}>Add</span>
          </button>
        </div>
        <div className={'level-item'}>
          <button
            className={'button'}
            onClick={(e) => this.props.updateTrackLikedStatus(e, false)}
          >
            <FontAwesomeIcon icon={'far', 'forward'} />
            <span className={'ml-1'}>Skip</span>
          </button>
        </div>
        <div className={'level-item is-hidden-desktop'}>
          <button className={'button'} onClick={this.props.toggleHistory}>
            <FontAwesomeIcon icon={'far', 'history'} />
            <span className={'ml-1'}>History</span>
          </button>
        </div>
      </div>
    )
  }
}

export default ActionButtons;
