import React from 'react';
import axios from 'axios';
import '../App.sass';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imageURL: null}
  }
  componentDidMount() {
    console.log('Home component mounted. Calling function');
    this.test();
  }

  test() {
    axios.get('/api/test')
      .then(res => {
        let tracks = res.data.tracks.items;
        console.log(tracks);
        let image = tracks[0].album.images[1];
        this.setState({imageURL: image.url})
      })
      .catch(err => console.log(err))
  }

  render() {
    return(
      <section className={'section'}>
        <div className={'container'}>
          <article className={'media'}>
            <div className={'media-content'}>
            <figure className={'image is-128x128'}>
              <img src={this.state.imageURL}></img>
            </figure>
            </div>
          </article>
        </div>
      </section>
    )
  }
}



export default Home;
