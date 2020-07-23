import React from 'react';
import '../App.sass';

class Landing extends React.Component {
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
