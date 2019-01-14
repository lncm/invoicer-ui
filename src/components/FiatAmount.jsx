import React from 'react';
import PropTypes from 'prop-types';

const FiatAmount = ({ amount }) => {
  return (
    <div id="fa-main">
      <div id="fa-title">Amount (THB)</div>
      <div id="fa-value">{amount}</div>
    </div>
  );
};

FiatAmount.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default FiatAmount;
