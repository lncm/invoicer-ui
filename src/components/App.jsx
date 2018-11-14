import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';

import Donate from './Donate';
import Invoice from './Invoice';

export default () => {
  return (
    <Router>
      <div>
        <div id="nav">
          <ul>
            <li><Link to="/">Donte</Link></li>
            <li><Link to="invoice">Invoice</Link></li>
          </ul>
        </div>
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
            LN Invoicer
              <br />
              <small>Lightning Network Chiang Mai</small>
            </h1>
            <h2 style={{ color: 'red' }}>Warning: This is a demo, do not use significant value</h2>
          </div>
          <div className="content">
            <Route exact path="/" component={Donate} />
            <Route path="/invoice" component={Invoice} />
          </div>
        </div>
      </div>
    </Router>
  );
};
