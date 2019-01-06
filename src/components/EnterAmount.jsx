import React, { Component } from 'react';
import { FocusStyleManager, AnchorButton, NumericInput } from '@blueprintjs/core';
import Logo from './Logo'
import HomeButton from './HomeButton'

FocusStyleManager.onlyShowFocusOnTabs();

export default class EnterAmount extends Component {

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(valueAsNumber) {
    this.props.onAmountChange(valueAsNumber);
  }

  render() {
    return (
      <div>

        <Logo />
        <div id="ea-main">
            <div id="ea-enter-amount"><span>Please enter an amount</span></div>
            <div id="ea-number-input">
              <NumericInput style={{width: "100px"}} min="0" intent="primary" majorStepSize="10" selectAllOnFocus="true" large={true} value={this.props.fiatAmount} onValueChange={this.handleValueChange}/>
            </div>
            <div id="ea-fiat-currency">{this.props.fiatCurrency}</div>
            <div id="ea-go-button">
              <AnchorButton disabled={!(this.props.fiatAmount > 0)} large={true} intent="primary" rightIcon="arrow-right" text="Go" onClick={this.props.onAmountConfirm.bind(this)}>
              </AnchorButton>
            </div>
        </div>

        <HomeButton />
      </div>
    );
  }
}
