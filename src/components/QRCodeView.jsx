import React, { Component } from 'react';

import QRCode from 'qrcode.react';

const QRCodeView = ({ invoice }) => {
  // <QRCode value={uri} renderAs="svg" style={{ width: '583px', height: '583px', maxHeight: '583px' }} />

  const uri = `lightning:${invoice}`;

  return (
    <div id="qr-main">
    // <QRCode value={uri} renderAs="svg" style={{ width: '503px', height: '503px', maxHeight: '503px' }} />
    </div>
  );
}

export default QRCodeView;
