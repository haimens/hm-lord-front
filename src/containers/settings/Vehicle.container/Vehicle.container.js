import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import VehicleListItem from "./Vehicle.component/VehicleList.item";
class Vehicle extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {
    console.log(keywords);
  };
  handleAddingWage = () => {
    this.setState(state => ({ showAddWage: !state.showAddWage }));
  };
  render() {
    const { history } = this.props;
    return (
      <main className="container-fluid">
        <section className="mb-4">
          <Header
            title="Settings"
            subTitle="Vehicle"
            tabicon={"tabicon_dashboard.svg"}
            clickTitle={"Vehicle Type"}
            buttonWidth={"110px"}
          />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Vehicle",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Vehicle Type"
            }}
            buttonWidth={"110px"}
          />
          <ListView
            totalCount={30}
            title="Vehicle"
            fieldNames={["Created On", "Name", "Amount", "Delete"]}
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
)(withRouter(Vehicle));
