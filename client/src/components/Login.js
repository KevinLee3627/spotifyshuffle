import React from 'react';
import axios from 'axios';
import '../App.sass';

class Login extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    axios({
      method: 'get',
      url: '/api/login',
    }).then( res => {
      console.log('LOGIN.JS - AXIOS REQUEST MADE.');
      console.log(res.data);
      window.location.href = res.data;

    }).catch( err => console.log(err))
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Login;
