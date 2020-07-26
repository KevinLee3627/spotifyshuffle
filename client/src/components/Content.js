import React from 'react';
import { Redirect } from "react-router-dom";
import '../App.sass';


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    console.log(this.props);
  }


  render() {
    if (this.props.is_authenticated) {
      return(<div>You are logged into spotify</div>)
    } else {
      return(<div> you are not logged in</div>)
    }
  }
}



export default Content;
