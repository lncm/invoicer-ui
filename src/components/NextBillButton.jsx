import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { withRouter } from "react-router-dom";

class NextBillButton extends Component {

  render() {
    return (
      <div id="nb-main">
        <div id="nb-button">
          <AnchorButton large={true} intent="primary" rightIcon="arrow-right" text="Next Bill" onClick={this.props.onNewAmount.bind(this)}>
          </AnchorButton>
        </div>
      </div>
    );
  }
}

export default withRouter(NextBillButton);
