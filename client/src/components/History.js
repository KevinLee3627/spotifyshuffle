import React from 'react';
import '../App.sass';

class HistoryItem extends React.Component {
  render() {
    return (
      <article className={'media'}>
        <HistoryItemImage track_data={this.props.track_data} is_liked={this.props.is_liked} />
        <HistoryItemContent track_data={this.props.track_data} is_liked={this.props.is_liked}/>
      </article>
    )
  }
}

function HistoryItemImage(props) {
  let figure;
  if (!props.is_liked) {
    figure = <figure className={'media-left image is-64x64'}>
                <img src={props.track_data.album.images[0].url}></img>
              </figure>
  } else {
    figure = <figure className={'media-left image is-64x64'}>
                <img src={props.track_data.album.images[0].url}></img>
              </figure>
  }
  return figure;
}

function HistoryItemContent(props) {
  let content;
  if (props.is_liked === false) {
    content = <div className={'media-content'}>
                <p className={'title is-6'}><del>{props.track_data.name}</del></p>
                <p className={'subtitle is-6'}><del>{props.track_data.artists[0].name}</del></p>
              </div>
  } else if (props.is_liked || props.is_liked == null){
    content = <div className={'media-content'}>
                <p className={'title is-6'}>{props.track_data.name}</p>
                <p className={'subtitle is-6'}>{props.track_data.artists[0].name}</p>
              </div>
  } else {
    content = <div>NO IS LIKED IN PROPS</div>
  }
  return content;
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
