import React, { Component } from 'react';
import Logo from './Logo';
import HomeButton from './HomeButton';
import { Cell, Column, Table, TableLoadingOption, TruncatedFormat } from "@blueprintjs/table";
import { getHistory } from '../api';

const FORMAT_OPTIONS = {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    second: "2-digit",
    year: "numeric",
};

class ViewTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = { history: '' };
    this.refreshTransactionHistory();

    this.cellRendererStatus = this.cellRendererStatus.bind(this);
    this.cellRendererDescription = this.cellRendererDescription.bind(this);
    this.cellRendererBitcoinAmount = this.cellRendererBitcoinAmount.bind(this);
    this.cellRendererDate = this.cellRendererDate.bind(this);
    this.cellRendererType = this.cellRendererType.bind(this);
  }

  async refreshTransactionHistory() {
    const history = await getHistory();
    this.setState({
      history
    });
  }

  cellRendererStatus(rowIndex) {
    let state = '';
    if (this.state.history != '') {
      const row = this.state.history[rowIndex];
      if (row.is_paid) {
        state = "Paid";
      } else if (row.is_expired) {
        state = "Expired";
      } else {
        state = "Unpaid"
      }
    }
    return <Cell>{state}</Cell>
  };

  cellRendererDescription(rowIndex) {
    let description = '';
    if (this.state.history != '') {
      description = this.state.history[rowIndex].description;
    }
    return <Cell>{description}</Cell>
  };

  cellRendererBitcoinAmount(rowIndex) {
    let amount = '';
    if (this.state.history != '') {
      const satAmount = this.state.history[rowIndex].amount;
      if (satAmount) {
        amount = (satAmount/ 100000000).toFixed(8);
      }
    }
    return <Cell>{amount}</Cell>
  };

  cellRendererDate(rowIndex) {
    if (this.state.history != '') {
      const paidAt = this.state.history[rowIndex].paid_at;
      if (paidAt) {
        const paidDate = new Date(paidAt);
        const formattedPaidDate = paidDate.toLocaleString("en-US", FORMAT_OPTIONS);
        return <Cell><TruncatedFormat>{formattedPaidDate}</TruncatedFormat></Cell>
      }
    }
    return <Cell></Cell>
  };

  cellRendererType(rowIndex) {
    return <Cell>Lightning</Cell>
  };

  getLoadingOptions() {
    const loadingOptions = [];
    if (this.state.history == '') {
      loadingOptions.push(TableLoadingOption.CELLS);
      loadingOptions.push(TableLoadingOption.ROW_HEADERS);
    }

    return loadingOptions;
  }

  getRowLength() {

    if (this.state.history == '') {
      return 1;
    }

    return this.state.history.length;
  }

  render() {

    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="vt-title">
          Transactions
        </div>

        <div id="vt-table">
          <Table numRows={this.getRowLength()} loadingOptions={this.getLoadingOptions()} >
          <Column name="Status" cellRenderer={this.cellRendererStatus}/>
          <Column name="Description" cellRenderer={this.cellRendererDescription}/>
          <Column name="Bitcoin Amount" cellRenderer={this.cellRendererBitcoinAmount}/>
          <Column name="Paid Date" cellRenderer={this.cellRendererDate}/>
          <Column name="Type" cellRenderer={this.cellRendererType}/>
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewTransactions;
