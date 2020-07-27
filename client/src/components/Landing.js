import React from 'react';
import axios from 'axios';

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
      this.setState({auth_token_url: res.data})
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <div className={'hero is-success is-fullheight'}>
        <div className={'hero-body'}>
          <div className={'container has-text-centered'}>
            <h1 className={'title is-1'}>Shuffle</h1>
            <h2 className={'subtitle is-4'}>Quickly discover music? or something</h2>
            <a href={this.state.auth_token_url}
               className={'button is-link is-rounded is-medium'}>
               Login to Spotify
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
