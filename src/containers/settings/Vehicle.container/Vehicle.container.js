import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import VehicleListItem from "./Vehicle.component/VehicleList.item";
import VehicleAdding from "./Vehicle.component/VehicleAdding.modal";
class Vehicle extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {
    console.log(keywords);
  };
  handleAddingVehicle = () => {
    this.setState(state => ({ showAddVehicle: !state.showAddVehicle }));
  };
  render() {
    const { history } = this.props;
    const { showAddVehicle } = this.state;
    return (
      <main className="container-fluid">
        {showAddVehicle && <VehicleAdding onClose={this.handleAddingVehicle} />}
        <section className="mb-4">
          <Header
            title="Settings"
            subTitle="Vehicle"
            tabicon={"icon_settings_white.svg"}
            clickTitle={"Vehicle Type"}
            buttonWidth={"110px"}
          />
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Vehicle",
              clickFunction: this.handleAddingVehicle,
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
