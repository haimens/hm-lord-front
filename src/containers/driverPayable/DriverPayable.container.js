import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import DriverPayableListItem from "./driverPayable.component/DriverPayableList.item";
class DriverPayable extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {};
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };
  render() {
    const { history } = this.props;
    return (
      <main className="container-fluid">
        <section className="mb-4">
          <Header
            title="Driver"
            subTitle="Driver Payable"
            tabicon={"icon_payable_white.svg"}
            clickTitle={"Driver"}
            buttonWidth={"88px"}
          />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Driver Payable",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            hideButton={true}
          />
          <ListView
            totalCount={30}
            title="Wage List"
            fieldNames={["Created On", "Amount", "Type", "Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <WageListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriverPayable));
