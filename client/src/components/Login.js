import React from 'react';
import axios from 'axios';
import '../App.sass';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
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
      console.log(window.location);
      this.setState({get_perms: res.data})
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
