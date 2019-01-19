import React, { Component } from 'react';
import { Cell, Column, Table, TableLoadingOption, TruncatedFormat } from '@blueprintjs/table';
import { Switch } from '@blueprintjs/core';
import Logo from './Logo';
import HomeButton from './HomeButton';
import { getHistory } from '../api';

const FORMAT_OPTIONS = {
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  month: 'short',
  second: '2-digit',
  year: 'numeric',
};

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = { allHistory: '', onlyPaidHistory: '', history: '', onlyPaid: true };
    this.cellRendererStatus = this.cellRendererStatus.bind(this);
    this.cellRendererDescription = this.cellRendererDescription.bind(this);
    this.cellRendererBitcoinAmount = this.cellRendererBitcoinAmount.bind(this);
    this.cellRendererDate = this.cellRendererDate.bind(this);
    this.cellRenderPaidWith = this.cellRenderPaidWith.bind(this);
    this.handleOnlyPaidChange = this.handleOnlyPaidChange.bind(this);
  }

  componentDidMount() {
    this.refreshTransactionHistory();
  }

  getRowLength() {
    if (this.state.history === '') {
      return 1;
    }

    return this.state.history.length;
  }

  getLoadingOptions() {
    const loadingOptions = [];
    if (this.state.history === '') {
      loadingOptions.push(TableLoadingOption.CELLS);
      loadingOptions.push(TableLoadingOption.ROW_HEADERS);
    }

    return loadingOptions;
  }

  async refreshTransactionHistory() {
    const histJson = await getHistory();
    if ('history' in histJson) {
      const allHistory = histJson.history;
      const onlyPaidHistory = [];
      for (let i = 0; i < allHistory.length; i += 1) {
        const row = allHistory[i];
        if (row.is_paid) {
          onlyPaidHistory.push(row);
        }
      }

      this.setState((prevState) => {
        return {
          allHistory,
          onlyPaidHistory,
          history: prevState.onlyPaid ? onlyPaidHistory : allHistory,
        };
      });
    }
  }

  handleOnlyPaidChange() {
    this.setState((prevState) => {
      return {
        onlyPaid: !prevState.onlyPaid,
        history: !prevState.onlyPaid ? prevState.onlyPaidHistory : prevState.allHistory,
      };
    });
  }

  cellRendererStatus(rowIndex) {
    let state = '';
    if (this.state.history !== '') {
      const row = this.state.history[rowIndex];
      if (row.is_paid) {
        state = 'Paid';
      } else if (row.is_expired) {
        state = 'Expired';
      } else {
        state = 'Unpaid';
      }
    }
    return <Cell>{state}</Cell>;
  }

  cellRendererDescription(rowIndex) {
    let description = '';
    if (this.state.history !== '') {
      const row = this.state.history[rowIndex];
      ({ description } = row);
    }
    return <Cell>{description}</Cell>;
  }

  cellRendererBitcoinAmount(rowIndex) {
    let amount = '';
    if (this.state.history !== '') {
      const satAmount = this.state.history[rowIndex].amount;
      if (satAmount) {
        amount = (satAmount / 100000000).toFixed(8);
      }
    }
    return <Cell>{amount}</Cell>;
  }

  cellRendererDate(rowIndex) {
    if (this.state.history !== '') {
      const paidAt = this.state.history[rowIndex].created_at;
      if (paidAt) {
        const paidDate = new Date(paidAt * 1e3);
        const formattedPaidDate = paidDate.toLocaleString('en-US', FORMAT_OPTIONS);
        return <Cell><TruncatedFormat>{formattedPaidDate}</TruncatedFormat></Cell>;
      }
    }
    return <Cell />;
  }

  cellRenderPaidWith(rowIndex) {
    let paidWith = '';
    if (this.state.history !== '') {
      const row = this.state.history[rowIndex];
      if (row.ln_paid) {
        if (row.btc_paid) {
          paidWith = 'Bitcoin And Lightning';
        } else {
          paidWith = 'Lightning';
        }
      } else if (row.btc_paid) {
        paidWith = 'Bitcoin';
      } else {
        paidWith = 'Not Paid';
      }
    }
    return <Cell>{paidWith}</Cell>;
  }

  render() {
    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="vt-title">
          Transactions
        </div>

        <div id="vt-switch">
          <Switch checked={this.state.onlyPaid} label="Only Paid Transactions" onChange={this.handleOnlyPaidChange} />
        </div>

        <div id="vt-table">
          <Table
            numRows={this.getRowLength()}
            loadingOptions={this.getLoadingOptions()}
            columnWidths={[106, 180, 180, 220, 180]}
          >
            <Column name="Status" cellRenderer={this.cellRendererStatus} />
            <Column name="Description" cellRenderer={this.cellRendererDescription} />
            <Column name="Bitcoin Amount" cellRenderer={this.cellRendererBitcoinAmount} />
            <Column name="Created Date" cellRenderer={this.cellRendererDate} />
            <Column name="Paid With" cellRenderer={this.cellRenderPaidWith} />
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewTransactions;
