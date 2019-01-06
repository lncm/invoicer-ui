import React, { Component } from 'react';
import { Switch } from '@blueprintjs/core';
import { withRouter } from "react-router-dom";

class QRCodeType extends Component {

  render() {
    return (
      <div id="qt-main">
        <div id="qt-switch">
          <Switch large={true} inline={true} labelElement={"Bitcoin"} defaultChecked={true} />
          <Switch large={true} inline={true} labelElement={"Lightning"} defaultChecked={true} />
        </div>
      </div>
    );
  }
}

export default withRouter(QRCodeType);
