import React from 'react';
import '../App.sass';

class History extends React.Component {

  createHistoryItems() {
    return this.props.track_history.map((track, i) => {
      if (this.props.liked_tracks.includes(track.id)) {
        return <HistoryItem track={track} id={i} key={i} is_liked={true}/>
      } else {
        return <HistoryItem track={track} id={i} key={i} is_liked={false}/>
      }


    }).reverse()
  }

  render() {
    // if (this.props.history_showing) {
    if(this.props.track_history.length !== 0) {
      return (
        <div className={'card'}>
          <div className={'card-content'}>
            {this.createHistoryItems()}
          </div>
        </div>
      )
    } else {
      return (
        <div className={'card'}>
          <div className={'card-content'}>
            <div className={'media-content'}>
              <p className={'tilte is-6'}>No songs in history yet!</p>
            </div>
          </div>
        </div>
      )
    }
  }
}

function HistoryItem(props) {
  return (
    <article className={'media'}>
      <ItemImage track={props.track} is_liked={props.is_liked}/>
      <ItemContent track={props.track} is_liked={props.is_liked}/>
    </article>
  )
}

function ItemImage(props) {
  if (props.is_liked) {
    return (
      <figure className={'media-left image is-64x64'}>
        <img src={props.track.album.images[0].url}></img>
      </figure>
    )
  } else {
    return (
      <figure className={'media-left image is-64x64 is-greyed-out'}>
        <img src={props.track.album.images[0].url}></img>
      </figure>
    )
  }
}

function ItemContent(props) {
  if (props.is_liked) {
    return (
      <div className={'media-content'}>
        <p className={'title is-6'}>{props.track.name}</p>
        <p className={'subtitle is-6'}>{props.track.artists[0].name}</p>
      </div>
    )
  } else {
    return (
      <div className={'media-content'}>
        <del><p className={'title is-6'}>{props.track.name}</p></del>
        <del><p className={'subtitle is-6'}>{props.track.artists[0].name}</p></del>
      </div>
    )
  }
}


export default History;
