import React, { Component } from 'react';

const BitcoinAmount = ({ amount }) => {
  return (
    <div id="ba-main">
      <div id="ba-title">Amount (BTC)</div>
      <div id="ba-value">{amount}</div>
    </div>
  );
};

export default BitcoinAmount;
