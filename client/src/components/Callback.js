import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import '../App.sass';
import 'bulma-pageloader';


class Callback extends React.Component {
  componentDidMount() {
    let auth_code = window.location.search.replace('?code=', '');
    axios({
      method: 'post',
      url: '/api/getToken',
      data: {
        auth_code: auth_code
      }
    }).then(res => {
      console.log(res.data);
      const is_authenticated = res.data;
      
      this.setState({is_authenticated: is_authenticated})
    }).catch(err => console.log(err))
  }


  render() {
      if(this.state && this.state.is_authenticated) {
        return <Redirect to='/home'/>
      } else if(this.state && !this.state.is_authenticated) {
        return <Redirect to='/'/>
      } else {
        return <div className={'pageloader is-active is-warning'}></div>
      }
  }
}



export default Callback;
