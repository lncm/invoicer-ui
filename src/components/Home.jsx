import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import Logo from './Logo';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePayBillClicked = this.handlePayBillClicked.bind(this);
    this.handleViewTransactionsClicked = this.handleViewTransactionsClicked.bind(this);
    this.handleSettingsClicked = this.handleSettingsClicked.bind(this);
    this.handleAboutClicked = this.handleAboutClicked.bind(this);
    this.handleHelpClicked = this.handleHelpClicked.bind(this);
  }

  handlePayBillClicked() {
    this.props.history.push('/payBill');
  }

  handleViewTransactionsClicked() {
    this.props.history.push('/viewTransactions');
  }

  handleSettingsClicked() {
    this.props.history.push('/settings');
  }

  handleAboutClicked() {
    this.props.history.push('/about');
  }

  handleHelpClicked() {
    this.props.history.push('/help');
  }

  render() {
    return (
      <div>
        <Logo />

        <div id="ho-buttons">

          <div id="ho-pay-bill">
            <AnchorButton large intent="primary" rightIcon="arrow-right" text="Pay Bill" onClick={this.handlePayBillClicked} />
          </div>

          <div id="ho-view-transactions">
            <AnchorButton large intent="primary" rightIcon="list" text="View Transaction History" onClick={this.handleViewTransactionsClicked} />
          </div>

          <div id="ho-settings">
            <AnchorButton large intent="primary" rightIcon="settings" text="Settings" onClick={this.handleSettingsClicked} />
          </div>

          <div id="ho-about">
            <AnchorButton large intent="primary" rightIcon="compressed" text="About" onClick={this.handleAboutClicked} />
          </div>

          <div id="ho-help">
            <AnchorButton large intent="primary" rightIcon="help" text="Help" onClick={this.handleHelpClicked} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
