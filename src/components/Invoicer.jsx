/* eslint-disable no-console */
import React, { Component } from 'react';

import { newInvoice, awaitStatus } from '../api';

import QrCode from './QrCode';
import Status from './Status';
import Spinner from './Spinner';

const errorMessage = 'Oops, something went wrong!';
const defaultState = { loading: true, code: null, error: null, status: null };

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
    this.setState(defaultState);
    try {
      this.setState({ code: await newInvoice(), loading: false });
      this.checkInvoiceStatus();
    } catch (e) {
      console.log(e);
      this.setState({ error: errorMessage, loading: false });
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
  renderInvoice() {
    const { code, loading, error, status } = this.state;
    if (error) {
      return <div className="info red">{error}</div>;
    }
    if (loading) {
      return <Spinner />;
    }
    if (status) {
      return <Status status={status} />;
    }
    return <QrCode invoice={code.invoice} />;
  }
  render() {
    const { loading } = this.state;
    return (
      <div>
        {this.renderInvoice()}
        {!loading && <button type="button" onClick={this.generateInvoice}>Generate New Invoice</button>}
      </div>
    );
  }
}
