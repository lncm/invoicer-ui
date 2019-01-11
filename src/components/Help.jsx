import React, { Component } from 'react';
import Logo from './Logo';
import HomeButton from './HomeButton';

class About extends Component {
  render() {
    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="hp-title">
          Help
        </div>
      </div>
    );
  }
}

export default About;
