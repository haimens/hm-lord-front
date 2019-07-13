import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, VehicleCard, Pagination } from "../../components/shared";
import VehicleAdding from "./vehicle.component/VehicleAdding.modal";
import { findVehicleListInLord, createAVehicleInLord } from "../../actions/vehicle.action";
class Vehicle extends Component {
  state = {
    showVehicleCreationModal: false
  };
  handlePageChange = start => {};
  handleAddingVehicle = () => {
    this.setState(state => ({ showVehicleCreationModal: !state.showVehicleCreationModal }));
  };
  componentDidMount() {
    this.props.findVehicleListInLord();
  }

  render() {
    const { showVehicleCreationModal } = this.state;
    const { history, vehicle_list_in_lord, createAVehicleInLord } = this.props;
    return (
      <main>
        {showVehicleCreationModal && (
          <VehicleAdding createAVehicleInLord={createAVehicleInLord} onClose={this.handleAddingVehicle} />
        )}
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Vehicle"
              tabicon={"icon_vehicle_white.svg"}
              showButton={true}
              clickFunction={this.handleAddingVehicle}
              clickTitle={"Vehicle"}
              buttonWidth={"88px"}
            />
          </div>
          <div className="row">
            {vehicle_list_in_lord.record_list.map((vehicle, index) => (
              <VehicleCard
                parentProps={{
                  vehicleId: vehicle.plate_num,
                  vehicleName: vehicle.identifier,
                  vehicleImage: vehicle.img_path,
                  vehicleToken: vehicle.car_token,
                  isActive: vehicle.status
                }}
                key={index}
                history={history}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    vehicle_list_in_lord: state.vehicleReducer.vehicle_list_in_lord
  };
};
const mapDispatchToProps = { findVehicleListInLord, createAVehicleInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Vehicle));
