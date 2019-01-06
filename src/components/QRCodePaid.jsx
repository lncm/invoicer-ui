import React, { Component } from 'react';
import tick from '../assets/images/tick.png';

const QRCodePaid = () => {

  return (
    <div id="qr-main">
      <img src={tick} alt="Invoice Paid" style={{ width: '503px', height: '503px', maxHeight: '503px' }} />
    </div>
  );

}

export default QRCodePaid;
