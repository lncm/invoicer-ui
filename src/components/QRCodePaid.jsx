import React, { Component } from 'react';
import tick from '../assets/images/tick.png';

const QRCodePaid = () => {

  return (
    <div id="qr-main">
      <img src={tick} alt="Invoice Paid" style={{ width: '583px', height: '583px', maxHeight: '583px' }} />
    </div>
  );

}

export default QRCodePaid;
