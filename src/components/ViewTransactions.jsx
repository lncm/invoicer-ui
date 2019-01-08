import React, { Component } from 'react';
import Logo from './Logo';
import HomeButton from './HomeButton';
import { Cell, Column, Table, TableLoadingOption, TruncatedFormat } from "@blueprintjs/table";
import { getHistory } from '../api';

class ViewTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = { history: '' };
    this.refreshTransactionHistory();
  }

  async refreshTransactionHistory() {
    console.log("refreshTransactionHistory");

    const history = await getHistory();
    this.setState({
      history
    });
  }

  // TODO remove mock data and populate cells with data from the invoicer api

  cellRendererStatus(rowIndex) {
    return <Cell>Paid</Cell>
  };

  cellRendererDescription(rowIndex) {
    return <Cell>Payment of 1,234 THB to Food 4 Thought</Cell>
  };

  cellRendererBitcoinAmount(rowIndex) {
    return <Cell>0.12345678</Cell>
  };

  cellRendererDate(rowIndex) {
    return <Cell>Paid 1/1/2019</Cell>
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

  render() {

    return (
      <div>
        <Logo />
        <HomeButton />

        <div id="vt-title">
          Transactions
        </div>

        <div id="vt-table">
          <Table numRows={10} loadingOptions={this.getLoadingOptions()} >
          <Column name="Status" cellRenderer={this.cellRendererStatus}/>
          <Column name="Description" cellRenderer={this.cellRendererDescription}/>
          <Column name="Bitcoin Amount" cellRenderer={this.cellRendererBitcoinAmount}/>
          <Column name="Date" cellRenderer={this.cellRendererDate}/>
          <Column name="Type" cellRenderer={this.cellRendererType}/>
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewTransactions;
