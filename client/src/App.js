import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing.js';
import About from './components/About.js';
import Login from './components/Login.js'
import LoginRedirect from './components/LoginRedirect.js'

import axios from 'axios';
import './App.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: {}
    }
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/loginredirect'>
            <LoginRedirect />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path ='/callback'>
            <div>call back page</div>
          </Route>
          {/*Should be last b/c of low specificity; will catch all requests*/}
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </div>
    );
  }

}

export default App;
