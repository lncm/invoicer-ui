import React from 'react';
import PropTypes from 'prop-types';

const BitcoinAmount = ({ amount }) => {
  return (
    <div id="ba-main">
      <div id="ba-title">Amount (BTC)</div>
      <div id="ba-value">{amount}</div>
    </div>
  );
};

BitcoinAmount.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default BitcoinAmount;
