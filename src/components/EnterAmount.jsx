import React, { Component } from 'react';
import { FocusStyleManager, AnchorButton, NumericInput } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import Logo from './Logo';
import MenuButton from './MenuButton';

FocusStyleManager.onlyShowFocusOnTabs();

export default class EnterAmount extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleAmountConfigm = this.handleAmountConfigm.bind(this);
  }

  handleValueChange(valueAsNumber) {
    this.props.onAmountChange(valueAsNumber);
  }

  handleAmountConfigm() {
    this.props.onAmountConfirm();
  }

  render() {
    return (
      <div>

        <Logo />
        <div id="ea-main">
          <div id="ea-enter-amount"><span>Please enter an amount</span></div>
          <div id="ea-number-input">
            <NumericInput style={{ width: '100px' }} min="0" intent="primary" majorStepSize="10" selectAllOnFocus="true" large value={this.props.fiatAmount} onValueChange={this.handleValueChange} />
          </div>
          <div id="ea-fiat-currency">{this.props.fiatCurrency}</div>
          <div id="ea-go-button">
            <AnchorButton disabled={(!(this.props.fiatAmount > 0))} large intent="primary" icon="arrow-right" text="Generate Bill" onClick={this.handleAmountConfigm} />
          </div>
        </div>

        <MenuButton />
      </div>
    );
  }
}

EnterAmount.propTypes = {
  fiatCurrency: PropTypes.string.isRequired,
  fiatAmount: PropTypes.number.isRequired,
  onAmountConfirm: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
};
