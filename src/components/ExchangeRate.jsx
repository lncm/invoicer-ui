import React, { Component } from 'react';

const ExchangeRate = ({ rate }) => {

  return (
    <div id="er-main">
      <div id="er-title">Exchange Rate</div>
      <div id="er-value">{rate}</div>
    </div>
  );
}

export default ExchangeRate;
