import React, { Component } from 'react';
import { Switch } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class QRCodeType extends Component {
  render() {
    return (
      <div id="qt-main">
        <div id="qt-switch">
          <Switch large disabled inline labelElement="Bitcoin" checked={this.props.bitcoinQRCode} />
          <Switch large disabled inline labelElement="Lightning" checked={this.props.lightningQRCode} />
        </div>
      </div>
    );
  }
}

QRCodeType.propTypes = {
  bitcoinQRCode: PropTypes.bool.isRequired,
  lightningQRCode: PropTypes.bool.isRequired,
};

export default withRouter(QRCodeType);
