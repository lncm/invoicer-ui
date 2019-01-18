import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NextBillButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onNewAmount();
  }

  render() {
    return (
      <div id="nb-main">
        <div id="nb-button">
          <AnchorButton large intent="primary" icon="arrow-right" text="Next" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

NextBillButton.propTypes = {
  onNewAmount: PropTypes.func.isRequired,
};

export default withRouter(NextBillButton);
