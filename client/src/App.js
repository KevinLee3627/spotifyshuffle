import React from 'react';
import { Switch, Route } from "react-router-dom";

import Landing from './components/Landing.js';
import About from './components/About.js';
import Callback from './components/Callback.js';
import Home from './components/Home.js';

import './App.sass';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)


function RouteSwitch(props) {
  return (
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path ='/callback'>
        <Callback />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      {/*Should be last b/c of low specificity; will catch all requests*/}
      <Route path='/'>
        <Landing />
      </Route>
    </Switch>
  )
}

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <RouteSwitch />
      </div>
    );
  }
}

export default App;
