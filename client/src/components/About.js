import React from 'react';
import '../App.sass';

class About extends React.Component {
  componentDidMount() {
    console.log(this.props.location);
  }
  render() {
    return (
      <section className={'container has-background-primary'}>
        <h1 className={'title is-2'}>About</h1>
      </section>
    )
  }
}

export default About;
