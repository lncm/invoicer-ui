import React, { Component } from 'react';

import { newInvoice, awaitStatus, getPrice } from '../api';

import EnterAmount from './EnterAmount';
import FiatAmount from './FiatAmount';
import ExchangeRate from './ExchangeRate';
import BitcoinAmount from './BitcoinAmount';
import QRCodePending from './QRCodePending';
import QRCodeView from './QRCodeView';
import QRCodeType from './QRCodeType';
import QRCodePaid from './QRCodePaid';
import StatusMessage from './StatusMessage';
import Logo from './Logo';
import BackButton from './BackButton';
import NextBillButton from './NextBillButton';

const paymentEnum = {
  REQUESTING_AMOUNT: 0,
  FINDING_EXCHANGE_RATE: 1,
  GENERATING_INVOICE: 2,
  REQUESTING_PAYMENT: 3,
  PAID: 4,
  INVOICE_EXPIRED: 5,
  LIGHTNING_EXPIRED: 6,
};

class PaymentController extends Component {
  // TODO implement try, catch and display errors messages

  constructor(props) {
    super(props);
    this.state = { fiatAmount: '', exchangeRate: '', bitcoinAmount: '', invoice: '', qrCodeType: 'both', paymentStatus: paymentEnum.REQUESTING_AMOUNT };
    // this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleAmountConfirm = this.handleAmountConfirm.bind(this);
    this.handleNewAmount = this.handleNewAmount.bind(this);
    this.handleQRCodeTypeChange = this.handleQRCodeTypeChange.bind(this);
  }

  setInvoice(invoice) {
    this.setState({
      invoice,
      paymentStatus: paymentEnum.REQUESTING_PAYMENT,
    }, this.checkInvoiceStatus);
  }

  handleQRCodeTypeChange(qrCodeType) {
    this.setState({
      qrCodeType,
    });
  }

  handleNewAmount() {
    this.setState({
      paymentStatus: paymentEnum.REQUESTING_AMOUNT,
      qrCodeType: 'both',
    });
  }

  handleAmountConfirm(fiatAmount) {
    this.setState({
      fiatAmount,
      paymentStatus: paymentEnum.FINDING_EXCHANGE_RATE,
    });
    this.findExchangeRate();
  }

  async findExchangeRate() {
    const price = await getPrice();
    const exchangeRate = price.THB;

    this.setState((prevState) => {
      return {
        exchangeRate,
        bitcoinAmount: (prevState.fiatAmount / exchangeRate).toFixed(8),
        paymentStatus: paymentEnum.GENERATING_INVOICE,
      };
    }, this.generateInvoice);
  }

  async generateInvoice() {
    const description = `Payment of ${this.state.fiatAmount} THB to LNCM`;
    const invoice = await newInvoice(this.state.bitcoinAmount * 1e8, description);
    this.setInvoice(invoice);
  }

  async checkInvoiceStatus() {
    // Check for both LN & BTC statuses
    let status = await awaitStatus(this.state.invoice.hash, this.state.invoice.address);
    if (!('error' in status)) {
      // TODO: check what error happened
      this.setState({
        paymentStatus: paymentEnum.PAID,
      });

      return;
    }

    this.setState({
      paymentStatus: paymentEnum.LIGHTNING_EXPIRED,
      qrCodeType: 'bitcoin',
    });

    // LN invoice expired - check for Bitcoin only
    status = await awaitStatus(null, this.state.invoice.address);
    if ('error' in status) {
      // TODO: check what error happened
      this.setState({
        paymentStatus: paymentEnum.INVOICE_EXPIRED,
      });
      return;
    }

    this.setState({
      paymentStatus: paymentEnum.PAID,
    });
  }

  render() {
    switch (this.state.paymentStatus) {
      case paymentEnum.REQUESTING_AMOUNT:
        return (
          <div>
            <EnterAmount fiatAmount={this.state.fiatAmount} fiatCurrency="THB" onAmountConfirm={this.handleAmountConfirm} onBitcoinQRCodeChange={this.handleBitcoinQRCodeChange} onLightningQRCodeChange={this.handleLightningQRCodeChange} />
          </div>
        );
      case paymentEnum.FINDING_EXCHANGE_RATE:
        return (
          <div>
            <Logo />
            <BackButton onBack={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <QRCodeType
              qrCodeType={this.state.qrCodeType}
              onQrCodeTypeChange={this.handleQRCodeTypeChange}
            />
            <QRCodePending />
            <StatusMessage message="Preparing Bill" displaySpinner />
          </div>
        );
      case paymentEnum.GENERATING_INVOICE:
        return (
          <div>
            <Logo />
            <BackButton onBack={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <ExchangeRate rate={this.state.exchangeRate} />
            <BitcoinAmount amount={this.state.bitcoinAmount} />
            <QRCodeType
              qrCodeType={this.state.qrCodeType}
              onQrCodeTypeChange={this.handleQRCodeTypeChange}
            />
            <QRCodePending />
            <StatusMessage message="Generating Bill" displaySpinner />
          </div>
        );
      case paymentEnum.REQUESTING_PAYMENT:
        var displayedMessage = "Please scan QR or send to the following invoice";
        console.log(displayedMessage);
        return (
          <div>
            <Logo />
            <BackButton onBack={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <ExchangeRate rate={this.state.exchangeRate} />
            <BitcoinAmount amount={this.state.bitcoinAmount} />
            <QRCodeType
              qrCodeType={this.state.qrCodeType}
              onQrCodeTypeChange={this.handleQRCodeTypeChange}
            />
            <QRCodeView
              address={this.state.invoice.address}
              amount={this.state.bitcoinAmount}
              bolt11={this.state.invoice.bolt11}
              qrCodeType={this.state.qrCodeType}
            />
            <StatusMessage message={displayedMessage} displaySpinner />
          </div>
        );
      case paymentEnum.PAID:
        return (
          <div>
            <Logo />
            <NextBillButton onNewAmount={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <ExchangeRate rate={this.state.exchangeRate} />
            <BitcoinAmount amount={this.state.bitcoinAmount} />
            <QRCodePaid />
            <StatusMessage message="Payment Received" displaySpinner={false} />
          </div>
        );
      case paymentEnum.LIGHTNING_EXPIRED:
        return (
          <div>
            <Logo />
            <NextBillButton onNewAmount={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <ExchangeRate rate={this.state.exchangeRate} />
            <BitcoinAmount amount={this.state.bitcoinAmount} />
            <QRCodeView
              address={this.state.invoice.address}
              amount={this.state.bitcoinAmount}
              bolt11={this.state.invoice.bolt11}
              qrCodeType={this.state.qrCodeType}
            />
            <StatusMessage message="LN expired.  Waiting for Bitcoin only." displaySpinner />
          </div>
        );
      case paymentEnum.INVOICE_EXPIRED:
        return (
          <div>
            <Logo />
            <NextBillButton onNewAmount={this.handleNewAmount} />
            <FiatAmount amount={this.state.fiatAmount} />
            <ExchangeRate rate={this.state.exchangeRate} />
            <BitcoinAmount amount={this.state.bitcoinAmount} />
            <StatusMessage message="Expired.  Try Again" displaySpinner />
          </div>
        );
      default:
        // TODO handle exceptions
        return '';
    }
  }
}

export default PaymentController;
