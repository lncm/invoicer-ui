import React, { Component } from 'react';

export default class KeyPadButtons extends Component {
  shouldComponentUpdate() {
    return false;
  }
  renderButton(value, { content, className = '' } = {}) {
    const { onKeyPress } = this.props;
    return (
      <div
        role="button"
        className={`keypad-button ${className}`}
        onClick={() => onKeyPress(value)}
      >
        {content || value}
      </div>
    );
  }
  render() {
    return (
      <div className="keypad-buttons">
        {this.renderButton('7')}
        {this.renderButton('8')}
        {this.renderButton('9')}
        {this.renderButton('clear', { content: 'Clear', className: 'clear'})}
        {this.renderButton('4')}
        {this.renderButton('5')}
        {this.renderButton('6')}
        {this.renderButton('delete', { content: 'Delete', className: 'delete'})}
        {this.renderButton('1')}
        {this.renderButton('2')}
        {this.renderButton('3')}
        {this.renderButton('0')}
        {this.renderButton('00')}
        {this.renderButton('.')}
        {this.renderButton('enter', { content: 'OK', className: 'enter' })}
      </div>
    );
  }
}
