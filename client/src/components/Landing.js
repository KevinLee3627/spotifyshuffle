import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.sass';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getData();

  }

  getData() {
    axios({
      method: 'get',
      url: '/api/login',
    }).then( res => {
      console.log('LANDING.JS - AXIOS REQUEST MADE.');
      console.log(res.data);
      this.setState({auth_token_url: res.data})
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <section className={'hero is-success is-fullheight'}>
        <div className={'hero-head'}>

        </div>
        <div className={'hero-body'}>
          <h1 className={'title is-1 is-centered'}>Shuffle</h1>
          <p className={'subtitle'}>Lorem ipsum qqqsuhhhhhh whatever</p>
          <a href={this.state.auth_token_url}>Login to Spotify</a>
        </div>
      </section>
    )
  }
}

export default Landing;
