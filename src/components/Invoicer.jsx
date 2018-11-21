/* eslint-disable no-console */
import React, { Component } from 'react';

import { newInvoice, newDonation, awaitStatus, getPrice } from '../api';

import QrCode from './QrCode';
import Status from './Status';
import Spinner from './Spinner';

const errorMessage = 'Oops, something went wrong!';
const defaultState = {
  loading: true,
  code: null,
  error: null,
  status: null,
  price: null,
  currencyAmount: 'Amount',
  clearDisabled: false,
  btcPrice: '0.00000000',
  currency: 'THB',
};

export default class Invoicer extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.generateInvoice = this.generateInvoice.bind(this);
  }

  componentDidMount() {
    this.generateInvoice();
  }

  async generateInvoice() {
    this.setState({
      loading: true,
      status: null,
    });
    const sats = this.state.btcPrice * 100000000;
    try {
      if (this.state.clearDisabled) {
        // amount specified, pass it in api call
        this.setState({
          price: await getPrice(),
          code: await newInvoice(sats),
          loading: false,
        });
      } else {
        // no amount specified, free-form payment
        this.setState({
          price: await getPrice(),
          code: await newDonation(),
          loading: false,
        });
      }
      this.checkInvoiceStatus();
    } catch (e) {
      console.log(e);
      this.setState({
        error: errorMessage,
        loading: false,
      });
    }
  }

  async checkInvoiceStatus() {
    const { code: { hash } } = this.state;
    try {
      const status = await awaitStatus(hash);
      // do nothing if there's a new invoice already created
      if (hash === this.state.code.hash) {
        this.setState({ status });
      }
    } catch (e) {
      if (hash === this.state.code.hash) {
        console.log(e);
        this.setState({ error: errorMessage });
      }
    }
  }

  calcFX(currency, amount) {
    if (this.state.clearDisabled) {
      const price = amount / this.state.price[currency];
      const btcPrice = price.toFixed(8);
      this.setState({
        btcPrice,
      });
    }
  }

  updateCurrencyAmount(evt) {
    this.setState({
      currencyAmount: evt.target.value,
    });
    this.calcFX(this.state.currency, evt.target.value);
  }

  clearCurrencyAmount() {
    // only clear it on the first click
    if (this.state.clearDisabled) {
      return;
    }
    this.setState({
      currencyAmount: '',
      clearDisabled: true,
    });
  }

  changeCurrency(currency) {
    this.setState({
      currency,
    });
    this.calcFX(currency, this.state.currencyAmount);
  }

  renderInvoice() {
    const { price, code, loading, error, status } = this.state;
    if (error) {
      return <div className="info red">{error}</div>;
    }
    if (loading) {
      return <Spinner />;
    }
    if (status) {
      return <Status status={status} />;
    }
    return <QrCode invoice={code.invoice} price={price} />;
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {this.renderInvoice()}
        <button type="button" onClick={() => this.changeCurrency('USD')}>Dollar</button>
        <button type="button" onClick={() => this.changeCurrency('EUR')}>Euro</button>
        <button type="button" onClick={() => this.changeCurrency('THB')}>Baht</button>
        <span>Amount in BTC: {this.state.btcPrice}</span>
        {
          <div>
            <input
              value={this.state.currencyAmount}
              onClick={this.clearCurrencyAmount.bind(this)}
              onChange={evt => this.updateCurrencyAmount(evt)}
            />
            <span>{this.state.currency}</span>
          </div>
        }
        {!loading && (
          <button type="button" onClick={this.generateInvoice}>
            Create bill
          </button>
        )}
      </div>
    );
  }
}
