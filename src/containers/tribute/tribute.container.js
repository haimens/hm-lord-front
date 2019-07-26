import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import { findTributeListInLord } from "../../actions/tribute.action";
import TributeListItem from "./tribute.component/TributeList.item";
class Tribute extends Component {
  state = {
    showAddWage: false
  };
  handlePageChange = start => {
    this.props.findInvoiceListInLord({ start });
  };

  componentDidMount() {
    this.props.findInvoiceListInLord();
  }
  render() {
    const { tribute_list_in_lord } = this.props;
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
            totalCount={tribute_list_in_lord.count}
            title="Invoice List"
            fieldNames={["Created On", "Company Name", "Invoice Number", "Amount", "Status"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {tribute_list_in_lord.record_list.map((payable, index) => (
              <TributeListItem parentProps={payable} key={index} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return { tribute_list_in_lord: state.tributeReducer.tribute_list_in_lord };
};
const mapDispatchToProps = { findTributeListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Tribute));
