import React, { Component } from 'react';

import { newInvoice, newDonation, awaitStatus, getPrice } from '../api';

import EnterAmount from './EnterAmount';
import FiatAmount from './FiatAmount';
import ExchangeRate from './ExchangeRate';
import BitcoinAmount from './BitcoinAmount';
import QRCodePending from './QRCodePending';
import QRCodeView from './QRCodeView';
import QRCodePaid from './QRCodePaid';
import StatusMessage from './StatusMessage';
import Logo from './Logo';

const paymentEnum = {
    REQUESTING_AMOUNT: 0,
    FINDING_EXCHANGE_RATE: 1,
    GENERATING_INVOICE: 2,
    REQUESTING_PAYMENT: 3,
    PAID: 4,
    INVOICE_EXPIRED: 5
}

class PaymentController extends Component {

  // TODO implement try, catch and display errors messages

  constructor(props) {
    super(props);
    this.state = { fiatAmount: '', exchangeRate: '', bitcoinAmount: '', code: '', paymentStatus : paymentEnum.REQUESTING_AMOUNT }
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleAmountConfirm = this.handleAmountConfirm.bind(this);
  }

  handleAmountChange(fiatAmount) {
    this.setState({ fiatAmount });
  }

  handleAmountConfirm() {
    this.setState({
      paymentStatus: paymentEnum.FINDING_EXCHANGE_RATE
    });
    this.findExchangeRate();
  }

  async findExchangeRate() {
    const price = await getPrice();
    const exchangeRate = price['THB'];

    this.setState((state) => {
      return {
        exchangeRate,
        bitcoinAmount: (this.state.fiatAmount / exchangeRate).toFixed(8),
        paymentStatus: paymentEnum.GENERATING_INVOICE
      }}, this.generateInvoice );
  }

  async generateInvoice() {
    const description = "Payment of " + this.state.fiatAmount + " THB to Food 4 Thought";
    const code = await newInvoice(this.state.bitcoinAmount * 100000000, description);
    this.setState({
      code,
      paymentStatus: paymentEnum.REQUESTING_PAYMENT
    }, this.checkInvoiceStatus);
  }

  async checkInvoiceStatus() {
    const status = await awaitStatus(this.state.code.hash);
    if (status === 'paid') {
      this.setState({
        paymentStatus: paymentEnum.PAID
      });
    } else {
      this.setState({
        paymentStatus: paymentEnum.INVOICE_EXPIRED
      });
    }
  }

  render() {

    switch(this.state.paymentStatus) {
      case paymentEnum.REQUESTING_AMOUNT:
        return (
          <div>
            <EnterAmount fiatAmount={this.state.fiatAmount} fiatCurrency="THB" onAmountChange={this.handleAmountChange} onAmountConfirm={this.handleAmountConfirm}/>
          </div>
        );
      case paymentEnum.FINDING_EXCHANGE_RATE:
        return (
          <div>
            <Logo/>
            <FiatAmount amount={this.state.fiatAmount}/>
            <QRCodePending/>
            <StatusMessage message="Preparing Bill" displaySpinner={true}/>
          </div>
        );
      case paymentEnum.GENERATING_INVOICE:
        return (
          <div>
            <Logo/>
            <FiatAmount amount={this.state.fiatAmount}/>
            <ExchangeRate rate={this.state.exchangeRate}/>
            <BitcoinAmount amount={this.state.bitcoinAmount}/>
            <QRCodePending/>
            <StatusMessage message="Generating Bill" displaySpinner={true}/>
          </div>
        );
      case paymentEnum.REQUESTING_PAYMENT:
        return (
          <div>
            <Logo/>
            <FiatAmount amount={this.state.fiatAmount}/>
            <ExchangeRate rate={this.state.exchangeRate}/>
            <BitcoinAmount amount={this.state.bitcoinAmount}/>
            <QRCodeView invoice={this.state.code.invoice}/>
            <StatusMessage message="Please Pay Bill" displaySpinner={true}/>
          </div>
        );
      case paymentEnum.PAID:
        return (
          <div>
            <Logo/>
            <FiatAmount amount={this.state.fiatAmount}/>
            <ExchangeRate rate={this.state.exchangeRate}/>
            <BitcoinAmount amount={this.state.bitcoinAmount}/>
            <QRCodePaid/>
            <StatusMessage message="Payment Received" displaySpinner={false}/>
            </div>
          );
      case paymentEnum.INVOICE_EXPIRED:
        return (
          <div>
            <Logo/>
            <FiatAmount amount={this.state.fiatAmount}/>
            <ExchangeRate rate={this.state.exchangeRate}/>
            <BitcoinAmount amount={this.state.bitcoinAmount}/>
            <QRCodeView invoice={this.state.code.invoice}/>
            <StatusMessage message="Expired.  Try Again"/>
          </div>
        );
    }
  }
};

export default PaymentController;
