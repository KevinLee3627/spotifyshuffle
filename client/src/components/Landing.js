import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.sass';

class Landing extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // this.getData();
    }, 2000)

  }

  getData() {
    axios({
      method: 'get',
      url: '/api',
    }).then( res => {
      console.log('LANDING.JS - AXIOS REQUEST MADE.');
      console.log(res.data);
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <section className={'hero has-background-light'}>
        <div className={'hero-body'}>
          <h1 className={'title is-1'}>Shuffle</h1>
          <p className={'subtitle'}>Lorem ipsum qqqsuhhhhhh whatever</p>
          <button className={'button is-link'}>Log in with Spotify</button>
          <Link to='/about'>About</Link>
          <Link to='/login'>Login</Link>
        </div>
      </section>
    )
  }
}

export default Landing;
