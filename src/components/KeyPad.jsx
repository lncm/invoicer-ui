import React, { Component } from 'react';

import '../assets/scss/keypad.scss';
import KeyPadButtons from './KeyPadButtons';

export default class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(value) {
    const { text } = this.state;
    const { onSubmit } = this.props;
    if (value === 'enter' && text.length > 0) {
      onSubmit(parseFloat(text));
      return this.setState({ text: '' });
    }
    if (value === 'clear') {
      return this.setState({ text: '' });
    }
    if (value === 'delete') {
      return this.setState({ text: text.slice(0, -1) });
    }
    // ignore invalid input
    if (
      (text.length > 15)
      || (value.indexOf('0') === 0 && text === '')
      || (value === '.' && (text === '' || text.indexOf('.') > -1))
    ) {
      return null;
    }
    return this.setState({ text: text + value });
  }
  render() {
    const { text } = this.state;
    return (
      <div className="keypad">
        <div className="keypad-display">{text || ' '}</div>
        <KeyPadButtons onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}
