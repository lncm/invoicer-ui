import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import MenuButton from './MenuButton';

import KeyPad from './KeyPad';

export default class EnterAmount extends Component {
  render() {
    return (
      <div>
        <Logo />
        <div id="ea-main">
          <div id="ea-enter-amount">
            <span>Please enter an amount in {this.props.fiatCurrency}</span>
          </div>
          <div id="ea-keypad">
            <KeyPad onSubmit={this.props.onAmountConfirm} />
          </div>
        </div>
        <MenuButton />
      </div>
    );
  }
}

EnterAmount.propTypes = {
  fiatCurrency: PropTypes.string.isRequired,
  onAmountConfirm: PropTypes.func.isRequired,
};
