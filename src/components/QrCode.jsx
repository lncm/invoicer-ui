import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

export default class QrCode extends Component {
  static propTypes = {
    invoice: PropTypes.string.isRequired,
  }
  render() {
    const { invoice } = this.props;
    const uri = `lightning:${invoice}`;
    return (
      <div>
        <div className="info">Scan the QR code to make a lightning payment:</div>
        <a href={uri}>
          <QRCode value={uri} renderAs="svg" style={{ width: '100%', height: 'auto' }} />
        </a>
      </div>
    );
  }
}
