import React from 'react';
import axios from 'axios';
import '../App.sass';

class Login extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    axios({
      method: 'post',
      url: '/api/login',
    }).then( res => {
      console.log('LOGIN.JS - AXIOS REQUEST MADE.');
      console.log(res.data);
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <section className={'hero has-background-light'}>
          <h1 className={'title is-1'}>LOGIN</h1>
          <p className={'subtitle'}>Lorem ipsum qqqsuhhhhhh whatever</p>
      </section>
    )
  }
}

export default Login;
