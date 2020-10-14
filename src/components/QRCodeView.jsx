import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import LNInvoiceWindow from './LNInvoiceWindow';

const QRCodeView = ({ address, amount, bolt11, qrCodeType }) => {
  let uri = `bitcoin:${address}?amount=${amount}&lightning=${bolt11}`;
  if (qrCodeType === 'bitcoin') {
    uri = `bitcoin:${address}?amount=${amount}`;
  } else if (qrCodeType === 'lightning') {
    uri = `lightning:${bolt11}`;
  }

  function clickTest() {
    //document.write(bolt11);
    console.log("copying bolt11 to clipboard")
    document.getElementById("bolt11value").value = bolt11;
    console.log(document.getElementById("bolt11value").value);
    //document.execCommand("copy");
  }

  return (
    <div id="qr-main">
      <div id="bolt11value" style={{ hidden: true }}></div>
      <div>
      <QRCode value={uri} onClick={clickTest} renderAs="svg" style={{ width: '320px', height: '430px', maxHeight: '420px' }} />
      </div>
      <div>
      <LNInvoiceWindow bolt11={bolt11} />
      </div>
    </div>
  );
};

QRCodeView.propTypes = {
  address: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  bolt11: PropTypes.string.isRequired,
  qrCodeType: PropTypes.string.isRequired,
};


export default QRCodeView;
