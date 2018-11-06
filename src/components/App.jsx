import React from 'react';
import logo from '../assets/images/logo.png';

import Invoicer from './Invoicer';

export default () => {
  return (
    <div id="layout-container">
      <div id="main-header">
        <a
          href="https://lncm.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="LNCM" className="logo" />
        </a>
        <h1>
          LN Donation
          <br />
          <small>Lightning Network Chiang Mai</small>
        </h1>
      </div>
      <div className="content">
        <Invoicer />
      </div>
    </div>
  );
};
