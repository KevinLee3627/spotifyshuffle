import React from 'react';
import axios from 'axios';
import '../App.sass';

class Landing extends React.Component {
  componentDidMount() {
    console.log('CAlling getData()');
    this.getData();
  }

  getData() {
    console.log('Inside getData()');
    axios({
      method: 'post',
      url: '/api',
    }).then( res => {
      console.log('AXIOS REQUEST MADE.');
      console.log(res.data);
    }).catch( err => console.log(err))
    // fetch('/api')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({resultData: data})
    //     console.log(this.state);
    //   })
  }
  render() {
    return (
      <section className={'hero has-background-light'}>
        <div className={'hero-body'}>
          <h1 className={'title is-1'}>Shuffle</h1>
          <p className={'subtitle'}>Lorem ipsum qqqsuhhhhhh whatever</p>
          <button className={'button is-link'}>Log in with Spotify</button>
        </div>
      </section>
    )
  }
}

export default Landing;
