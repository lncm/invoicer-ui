import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

const QRCodeView = ({ invoice }) => {
  const uri = `lightning:${invoice}`;

  return (
    <div id="qr-main">
      <QRCode value={uri} renderAs="svg" style={{ width: '503px', height: '503px', maxHeight: '503px' }} />
    </div>
  );
};

QRCodeView.propTypes = {
  invoice: PropTypes.number.isRequired,
};

export default QRCodeView;
