import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.handleHomeClicked = this.handleHomeClicked.bind(this);
  }

  handleHomeClicked() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="hb-main">
        <div id="hb-button">
          <AnchorButton large intent="primary" rightIcon="home" text="Home" onClick={this.handleHomeClicked} />
        </div>
      </div>
    );
  }
}

export default withRouter(HomeButton);
