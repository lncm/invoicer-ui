import React, { Component } from 'react';
import Logo from './Logo';
import HomeButton from './HomeButton';

class ViewTransactions extends Component {

  render() {
    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="vt-title">
          Transactions
        </div>
      </div>
    );
  }
}

export default ViewTransactions;
