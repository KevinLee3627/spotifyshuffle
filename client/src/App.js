import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: {}
    }
  }

  componentDidMount() {
    alert('hi!')
    this.getData();
  }

  getData() {
    fetch('http://localhost:3000/api/')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({resultData: data})
        console.log(this.state);
      })
  }

  render() {

    return (
      <div className="App">
        React app - getting data from express server!
      </div>
    );
  }

}

export default App;
