import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

const QRCodeView = ({ address, amount, bolt11, singleMethod }) => {
  let uri = `bitcoin:${address}?amount=${amount}&lightning=${bolt11}`;

  if (singleMethod == "bitcoin") {
    uri = `bitcoin:${address}?amount=${amount}`;
  } else if (singleMethod == "ln") {
    uri = `lightning:${bolt11}`;
  }

  return (
    <div id="qr-main">
      <QRCode value={uri} renderAs="svg" style={{ width: '503px', height: '503px', maxHeight: '503px' }} />
    </div>
  );
};

QRCodeView.propTypes = {
  address: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  bolt11: PropTypes.string.isRequired,
  singleMethod: PropTypes.string,
};

QRCodeView.defaultProps = {
  singleMethod: '',
};

export default QRCodeView;
