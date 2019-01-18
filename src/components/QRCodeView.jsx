import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

const QRCodeView = ({ bolt11 }) => {
  // TODO support lightning, bitcoint and bitoin + lightning QR codes.
  const uri = `lightning:${bolt11}`;

  return (
    <div id="qr-main">
      <QRCode value={uri} renderAs="svg" style={{ width: '503px', height: '503px', maxHeight: '503px' }} />
    </div>
  );
};

QRCodeView.propTypes = {
  bolt11: PropTypes.string.isRequired,
};

export default QRCodeView;
