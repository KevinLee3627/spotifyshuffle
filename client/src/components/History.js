import React from 'react';
import '../App.sass';

// class HistoryItem extends React.Component {
//   render() {
//     return (
//       <article className={'media'}>
//         <HistoryItemImage track_data={this.props.track_data} is_liked={this.props.is_liked} />
//         <HistoryItemContent track_data={this.props.track_data} is_liked={this.props.is_liked}/>
//       </article>
//     )
//   }
// }
//
// function HistoryItemImage(props) {
//   let figure;
//   if (!props.is_liked) {
//     figure = <figure className={'media-left image is-64x64'}>
//                 <img src={props.track_data.album.images[0].url}></img>
//               </figure>
//   } else {
//     figure = <figure className={'media-left image is-64x64'}>
//                 <img src={props.track_data.album.images[0].url}></img>
//               </figure>
//   }
//   return figure;
// }
//
// function HistoryItemContent(props) {
//   let content;
//   if (props.is_liked === false) {
//     content = <div className={'media-content'}>
//                 <p className={'title is-6'}><del>{props.track_data.name}</del></p>
//                 <p className={'subtitle is-6'}><del>{props.track_data.artists[0].name}</del></p>
//               </div>
//   } else if (props.is_liked || props.is_liked == null){
//     content = <div className={'media-content'}>
//                 <p className={'title is-6'}>{props.track_data.name}</p>
//                 <p className={'subtitle is-6'}>{props.track_data.artists[0].name}</p>
//               </div>
//   } else {
//     content = <div>NO IS LIKED IN PROPS</div>
//   }
//   return content;
// }
//
// class OldHistory extends React.Component {
//   createHistoryItems() {
//     let tracks = this.props.track_history.map((track, i) => {
//       let track_liked_status = this.props.tracks_liked_status.filter(track_data => {
//         return track_data.track_id === track.id;
//       })
//       return (
//         <HistoryItem
//           track_data={track}
//           key={i}
//           id={i}
//           is_liked={track_liked_status.length}
//         />
//       )
//     }).reverse()
//     return tracks;
//   }
//
//   render() {
//
//     if (this.props.history_showing) {
//       return (
//           <div className={'card'}>
//             <div className={'card-content'}>
//               {this.createHistoryItems()}
//             </div>
//           </div>
//       )
//     } else {return null}
//
//   }
//
// }


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
