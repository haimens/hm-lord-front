import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import { findInvoiceListInLord } from "../../actions/invoice.action";
import InvoiceListItem from "./invoice.component/InvoiceList.item";
class Invoice extends Component {
  state = {
    showAddWage: false
  };
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };

  handlePageChange = start => {
    this.props.findInvoiceListInLord({ start });
  };
  handlePayableItemClick = driver_token => {
    this.props.history.push(`driver/detail/${driver_token}`);
  };
  componentDidMount() {
    this.props.findInvoiceListInLord();
  }
  render() {
    const { invoice_list_in_lord } = this.props;
    return (
      <main className="container-fluid">
        <section className="mb-4">
          <Header title="Invoice" tabicon={"icon_invoice.svg"} clickTitle={"Driver"} buttonWidth={"88px"} />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Invoice List",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            hideButton={true}
          />
          <ListView
            totalCount={invoice_list_in_lord.count}
            title="Invoice List"
            fieldNames={["Created On", "Company Name", "Invoice Number", "Amount", "Status"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {invoice_list_in_lord.record_list.map((payable, index) => (
              <InvoiceListItem parentProps={payable} key={index} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return { invoice_list_in_lord: state.invoiceReducer.invoice_list_in_lord };
};
const mapDispatchToProps = { findInvoiceListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invoice));
