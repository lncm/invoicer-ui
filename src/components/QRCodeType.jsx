import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '@blueprintjs/core';
import { editableQrCodeType } from '../config';

class QRCodeType extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.props.onQrCodeTypeChange(event.target.value);
  }

  render() {
    if ((`${editableQrCodeType}`) !== 'true') {
      return null;
    }

    return (
      <div id="qt-main">
        <div id="qt-radio">
          <RadioGroup
            inline
            onChange={this.handleValueChange}
            selectedValue={this.props.qrCodeType}
          >
            <Radio label="Bitcoin" value="bitcoin" />
            <Radio label="Lightning" value="lightning" />
            <Radio label="Both" value="both" />
          </RadioGroup>
        </div>
      </div>
    );
  }
}

QRCodeType.propTypes = {
  qrCodeType: PropTypes.string.isRequired,
  onQrCodeTypeChange: PropTypes.func.isRequired,
};

export default withRouter(QRCodeType);
