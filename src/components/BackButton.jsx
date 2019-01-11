import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
  render() {
    return (
      <div id="cb-main">
        <div id="cb-button">
          <AnchorButton large intent="primary" rightIcon="arrow-left" text="Back" onClick={this.props.onBack.bind(this)} />
        </div>
      </div>
    );
  }
}

export default withRouter(BackButton);
