import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing.js';
import About from './components/About.js';
import './App.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: {}
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({resultData: data})
        console.log(this.state);
      })
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </div>
    );
  }

}

export default App;
