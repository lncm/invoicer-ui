import React, { Component } from 'react';
import { Menu, MenuItem, Popover, AnchorButton, Position } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.handleViewTransactionsClicked = this.handleViewTransactionsClicked.bind(this);
    this.handleSettingsClicked = this.handleSettingsClicked.bind(this);
    this.handleAboutClicked = this.handleAboutClicked.bind(this);
    this.handleHelpClicked = this.handleHelpClicked.bind(this);
  }

  handleViewTransactionsClicked() {
    this.props.history.push('/viewTransactions');
  }

  handleSettingsClicked() {
    this.props.history.push('/settings');
  }

  handleAboutClicked() {
    this.props.history.push('/about');
  }

  handleHelpClicked() {
    this.props.history.push('/help');
  }

  render() {
    const menu = (
      <Menu large>
        <MenuItem icon="list" text="View Transaction History" onClick={this.handleViewTransactionsClicked} />
        <MenuItem icon="settings" text="Settings" onClick={this.handleSettingsClicked} />
        <MenuItem icon="compressed" text="About" onClick={this.handleAboutClicked} />
        <MenuItem icon="help" text="Help" onClick={this.handleHelpClicked} />
      </Menu>
    );

    return (
      <div id="cb-main">
        <div id="cb-button">
          <Popover content={menu} position={Position.RIGHT_TOP}>
            <AnchorButton icon="cog" text="Menu" large intent="primary" />
          </Popover>
        </div>
      </div>
    );
  }
}

MenuButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(MenuButton);
