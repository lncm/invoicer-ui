import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class BackButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onBack();
  }

  render() {
    return (
      <div id="cb-main">
        <div id="cb-button">
          <AnchorButton large intent="primary" icon="arrow-left" text="Back" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

BackButton.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default withRouter(BackButton);
