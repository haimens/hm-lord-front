import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../components/shared";
import { findDriverPayableListInLord } from "../../actions/driver.action";
import DriverPayableListItem from "./driverPayable.component/DriverPayableList.item";
class DriverPayable extends Component {
  state = {
    showAddWage: false
  };
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };

  handlePageChange = start => {
    this.props.findDriverPayableListInLord({ start });
  };
  handlePayableItemClick = driver_token => {
    this.props.history.push(`driver/detail/${driver_token}`);
  };
  componentDidMount() {
    this.props.findDriverPayableListInLord();
  }
  render() {
    const { driver_payable_list_in_lord } = this.props;
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
            totalCount={driver_payable_list_in_lord.count}
            title="Driver Payable"
            fieldNames={["Driver IMG", "Driver Name", "amount", "Driver Detail"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {driver_payable_list_in_lord.record_list.map((payable, index) => (
              <DriverPayableListItem
                parentProps={payable}
                key={index}
                handlePayableItemClicked={this.handlePayableItemClick}
              />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return { driver_payable_list_in_lord: state.driverReducer.driver_payable_list_in_lord };
};
const mapDispatchToProps = { findDriverPayableListInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriverPayable));
