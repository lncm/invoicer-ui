import React, { Component } from 'react';

const FiatAmount = ({ amount }) => {
  return (
    <div id="fa-main">
      <div id="fa-title">Amount (THB)</div>
      <div id="fa-value">{amount}</div>
    </div>
  );
};

export default FiatAmount;
