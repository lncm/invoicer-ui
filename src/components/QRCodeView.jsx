import React, { Component } from 'react';

import QRCode from 'qrcode.react';

const QRCodeView = ({ invoice }) => {

  const uri = `lightning:${invoice}`;

  return (
    <div id="qr-main">
          <QRCode value={uri} renderAs="svg" style={{ width: '583px', height: '583px', maxHeight: '583px' }} />
    </div>
  );
}

export default QRCodeView;
