import React, { Component } from 'react';
import Logo from './Logo';
import HomeButton from './HomeButton';

class Settings extends Component {
  render() {
    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="se-title">
          Settings
        </div>
      </div>
    );
  }
}

export default Settings;
