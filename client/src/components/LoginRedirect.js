import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.sass';

class LoginRedirect extends React.Component {
  componentDidMount() {
    console.log('LoginRedirect mounted');
    // this.getData();
  }

  getData() {
    axios({
      method: 'post',
      url: '/api',
    }).then( res => {
      console.log('LoginRedirect.JS - AXIOS REQUEST MADE.');
      console.log(res.data);
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <section className={'hero has-background-light'}>
          <h1 className={'title is-1'}>Redirected!</h1>
          <p className={'subtitle'}>Lorem ipsum qqqsuhhhhhh whatever</p>
      </section>
    )
  }
}

export default LoginRedirect;
