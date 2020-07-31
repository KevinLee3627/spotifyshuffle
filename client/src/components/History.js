import React from 'react';
import '../App.sass';

class HistoryItem extends React.Component {
  render() {
    return (
      <article className={'media'}>
        <figure className={'media-left image is-64x64'}>
          <img src={this.props.track_data.album.images[0].url}></img>
        </figure>
        <div className={'media-content'}>
          <p className={'title is-6'}>{this.props.track_data.name}</p>
          <p className={'subtitle is-6'}>{this.props.track_data.artists[0].name}</p>
          {this.props.is_liked ? <p>added</p> : <p>Not added</p>}
        </div>
      </article>
    )
  }
}

class History extends React.Component {

  createHistoryItems() {
    let tracks = this.props.track_history.map((track, i) => {
      return (
        <HistoryItem
          track_data={track}
          key={i}
          id={i}
          is_liked={track.is_liked}
        />
      )
    }).reverse()
    return tracks;
  }

  render() {

    if (this.props.history_showing) {
      return (
        <div className={'card'}>
          <div className={'card-content'}>
            {this.createHistoryItems()}
          </div>
        </div>
      )
    } else {return null}

  }

}

export default History;
