import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

export default class QrCode extends Component {
  static propTypes = {
    invoice: PropTypes.string.isRequired,
  }
  render() {
    const { invoice, price } = this.props;
    const uri = `lightning:${invoice}`;
    return (
      <div>
        <div className="info">Scan the QR code to make a lightning payment:</div>
        <span className="price">Current price per BTC: {price.THB} THB, {price.USD} USD, {price.EUR} EUR</span>
        <a href={uri}>
          <QRCode value={uri} renderAs="svg" style={{ width: '100%', height: 'auto', maxHeight: '50vh' }} />
        </a>
      </div>
    );
  }
}
