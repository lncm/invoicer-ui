import React from 'react';
import { Spinner } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const StatusMessage = ({ message, displaySpinner }) => {
  return (
    <div id="sm-main">
      <div id="sm-message">{message}</div>
      {displaySpinner && <div id="sm-spinner"><Spinner size={100} /></div>}
    </div>
  );
};

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  displaySpinner: PropTypes.bool.isRequired,
};

export default StatusMessage;
