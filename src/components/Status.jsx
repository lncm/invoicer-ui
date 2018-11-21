import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Status extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
  }
  render() {
    const { status } = this.props;
    if (status === 'paid') {
      return <div className="info green">Thanks! <br /> We received your donation.</div>;
    }
    return <div className="info red">Sorry! <br /> The invoice expired. <br /> Please try again.</div>;
  }
}
