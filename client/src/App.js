import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Landing from './components/Landing.js';
import About from './components/About.js';
import Callback from './components/Callback.js';
import Content from './components/Content.js';

import './App.sass';

function RouteSwitch(props) {
  return (
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path ='/callback'>
        <Callback />
      </Route>
      <Route path='/content'>
        <Content />
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
