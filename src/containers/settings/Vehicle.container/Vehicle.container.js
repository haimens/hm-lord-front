import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListView, Header, ListHeader } from "../../../components/shared";
import VehicleListItem from "./Vehicle.component/VehicleList.item";
import VehicleAdding from "./Vehicle.component/VehicleAdding.modal";
import { findVehicleTypeListInLord, createACarTypeInLord, updateACarTypeInLord } from "../../../actions/vehicle.action";

class Vehicle extends Component {
  state = {
    showAddWage: false
  };
  handleWageSearch = keywords => {};
  handleAddingVehicle = () => {
    this.setState(state => ({ showAddVehicle: !state.showAddVehicle }));
  };
  handleCarTypeBeenClicked = car_type_token => {
    this.props.updateACarTypeInLord(car_type_token, { status: 0 });
  };
  componentDidMount() {
    this.props.findVehicleTypeListInLord();
  }
  render() {
    const { history, createACarTypeInLord, vehicle_type_list_in_lord } = this.props;
    const { showAddVehicle } = this.state;
    return (
      <main className="container-fluid">
        {showAddVehicle && (
          <VehicleAdding createACarTypeInLord={createACarTypeInLord} onClose={this.handleAddingVehicle} />
        )}
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
            fieldNames={["Vehicle Img", "Name", "price prefix", "Max Capacity", "Delete"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {vehicle_type_list_in_lord.record_list.map((type, index) => (
              <VehicleListItem parentProps={type} key={index} onClick={this.handleCarTypeBeenClicked} />
            ))}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    vehicle_type_list_in_lord: state.vehicleReducer.vehicle_type_list_in_lord
  };
};
const mapDispatchToProps = { findVehicleTypeListInLord, createACarTypeInLord, updateACarTypeInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Vehicle));
