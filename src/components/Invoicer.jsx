import React, { Component } from 'react';

import { newInvoice, awaitStatus } from '../api';

import QrCode from './QrCode';
import Status from './Status';
import Spinner from './Spinner';

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
      this.setState({ error: e });
    }
  }
  async checkInvoiceStatus() {
    const { code: { hash } } = this.state;
    try {
      this.setState({ status: await awaitStatus(hash) });
    } catch (e) {
      this.setState({ error: e });
    }
  }
  renderInvoice() {
    const { code, loading, error, status } = this.state;
    if (error) {
      return <div className="info red">{JSON.stringify(error)}</div>;
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
