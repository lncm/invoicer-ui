import React, { Component } from 'react';
import { AnchorButton, ButtonGroup } from '@blueprintjs/core';

export default class KeyPadButtons extends Component {
  shouldComponentUpdate() {
    return false;
  }

  renderButton(value, { content, className = '', intent } = {}) {
    const { onKeyPress } = this.props;
    return (
      <div className={`keypad-button ${className}`}>
        <ButtonGroup fill vertical>
          <AnchorButton
            large
            text={content || value}
            onClick={() => onKeyPress(value)}
            fill
            intent={intent}
          />
        </ButtonGroup>
      </div>
    );
  }
  render() {
    return (
      <div className="keypad-buttons">
        {this.renderButton('7')}
        {this.renderButton('8')}
        {this.renderButton('9')}
        {this.renderButton('clear', { content: 'Clear', intent: 'danger' })}
        {this.renderButton('4')}
        {this.renderButton('5')}
        {this.renderButton('6')}
        {this.renderButton('delete', { content: 'Delete', intent: 'warning' })}
        {this.renderButton('1')}
        {this.renderButton('2')}
        {this.renderButton('3')}
        {this.renderButton('0')}
        {this.renderButton('00')}
        {this.renderButton('.')}
        {this.renderButton('enter', { content: 'OK', className: 'enter', intent: 'success' }) }
      </div>
    );
  }
}
