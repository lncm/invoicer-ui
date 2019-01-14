import React from 'react';
import PropTypes from 'prop-types';

const ExchangeRate = ({ rate }) => {
  return (
    <div id="er-main">
      <div id="er-title">Exchange Rate</div>
      <div id="er-value">{rate}</div>
    </div>
  );
};

ExchangeRate.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default ExchangeRate;
