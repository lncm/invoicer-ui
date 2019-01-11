import React, { Component } from 'react';
import { FocusStyleManager, AnchorButton, NumericInput, Switch } from '@blueprintjs/core';
import Logo from './Logo';
import HomeButton from './HomeButton';

FocusStyleManager.onlyShowFocusOnTabs();

export default class EnterAmount extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleBitcoinQRCodeChange = this.handleBitcoinQRCodeChange.bind(this);
    this.handleLightningQRCodeChange = this.handleLightningQRCodeChange.bind(this);
  }

  handleValueChange(valueAsNumber) {
    this.props.onAmountChange(valueAsNumber);
  }


  handleBitcoinQRCodeChange() {
    this.props.onBitcoinQRCodeChange();
  }

  handleLightningQRCodeChange() {
    this.props.onLightningQRCodeChange();
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
            <AnchorButton disabled={(!(this.props.fiatAmount > 0)) || (!this.props.bitcoinQRCode && !this.props.lightningQRCode)} large intent="primary" rightIcon="arrow-right" text="Generate Bill" onClick={this.props.onAmountConfirm.bind(this)} />
          </div>
          <div id="ea-qrcodetype">
            <Switch large inputRef="foo" inline labelElement="Bitcoin" checked={this.props.bitcoinQRCode} onChange={this.handleBitcoinQRCodeChange} />
            <Switch large inline labelElement="Lightning" checked={this.props.lightningQRCode} onChange={this.handleLightningQRCodeChange} />
          </div>
        </div>

        <HomeButton />
      </div>
    );
  }
}
