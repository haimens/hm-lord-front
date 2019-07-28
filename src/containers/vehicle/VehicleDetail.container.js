import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DriverCard, Header, ListHeader } from "../../components/shared";
import VehicleDetailCard from "./vehicleDetail.component/VehicleDetail.card";
import AddingDriverModal from "../../components/shared/AddingDriver.modal";
import {
  findCarDetailInLord,
  findDriverListForACar,
  createCarToADriverInLord,
  updateACarInLord,
  updateADriverForACar
} from "../../actions/vehicle.action";
import { findDriverListInLord } from "../../actions/driver.action";
import EditVehicle from "./vehicleDetail.component/EditVehicle.modal";
import alertify from "alertifyjs";
class VehicleDetail extends Component {
  state = {
    showAddingDriverModal: false,
    showEditVehicleModal: false
  };
  handleDeleteDriver = driver_car_token => {
    const { car_token } = this.props.match.params;
    this.props.updateADriverForACar(car_token, driver_car_token, { status: 0 });
  };
  handleShowAddingDriverModal = () => {
    this.setState(state => ({ showAddingDriverModal: !state.showAddingDriverModal }));
  };
  handleShowEditingDriverModal = () => {
    this.setState(state => ({ showEditVehicleModal: !state.showEditVehicleModal }));
  };

  handleDeleteButtonClicked = () => {
    alertify.confirm(
      "Are You Sure to Delete This Vehicle?",
      () => {
        const { car_token } = this.props.match.params;
        this.props.updateACarInLord(car_token, { status: 0 });
        this.props.history.push("/vehicle");
      },
      function() {
        alertify.error("Cancel");
      }
    );
  };
  handleCreateCarToADriverInLord = driver_token => {
    const {
      match: {
        params: { car_token }
      },
      createCarToADriverInLord
    } = this.props;
    createCarToADriverInLord(car_token, { driver_token });
  };
  handleSearchDriverInVehicle = keywords => {
    this.props.findDriverListInLord({ keywords });
  };
  componentDidMount() {
    const { match, findCarDetailInLord, findDriverListForACar, findDriverListInLord } = this.props;
    const { car_token } = match.params;
    Promise.all([findCarDetailInLord(car_token), findDriverListForACar(car_token), findDriverListInLord()]);
  }
  render() {
    const { showAddingDriverModal, showEditVehicleModal } = this.state;
    const {
      history,
      vehicle_detail_in_lord,
      match: {
        params: { car_token }
      },
      driver_list_in_lord,
      updateACarInLord,
      driver_list_for_a_car,
      findDriverListInLord
    } = this.props;
    return (
      <main className="container-fluid">
        {showAddingDriverModal && (
          <AddingDriverModal
            findDriverListInLord={findDriverListInLord}
            onSubmit={this.handleSearchDriverInVehicle}
            car_token={car_token}
            handleDriverBeenClicked={this.handleCreateCarToADriverInLord}
            driver_list_in_lord={driver_list_in_lord}
            onClose={this.handleShowAddingDriverModal}
          />
        )}
        {showEditVehicleModal && (
          <EditVehicle
            car_token={car_token}
            updateACarInLord={updateACarInLord}
            vehicle_detail_in_lord={vehicle_detail_in_lord}
            onClose={this.handleShowEditingDriverModal}
          />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Vehicle"
              subTitle="Vehicle Detail"
              toLocation={"/vehicle"}
              tabicon={"icon_vehicle_white.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
          <div>
            <VehicleDetailCard
              handleDeleteButtonClicked={this.handleDeleteButtonClicked}
              handleDetailButtonClicked={this.handleShowEditingDriverModal}
              vehicle_detail_in_lord={vehicle_detail_in_lord}
            />
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Driver List",
              clickFunction: this.handleShowAddingDriverModal,
              clickTitle: "Driver"
            }}
            deleteButton={true}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="container-fluid">
            <div className="row p-1">
              {driver_list_for_a_car.record_list.map((driver, index) => (
                <DriverCard
                  parentProps={{
                    driverName: driver.name,
                    driverImage: driver.driver_img_path,
                    driverPhone: driver.cell,
                    driver_token: driver.driver_token,
                    driver_car_token: driver.driver_car_token
                  }}
                  handleDeleteDriver={this.handleDeleteDriver}
                  history={history}
                  key={index}
                  deleteButton={true}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicle_detail_in_lord: state.vehicleReducer.vehicle_detail_in_lord,
    driver_list_in_lord: state.driverReducer.driver_list_in_lord,
    driver_list_for_a_car: state.vehicleReducer.driver_list_for_a_car
  };
};
const mapDispatchToProps = {
  findCarDetailInLord,
  findDriverListForACar,
  findDriverListInLord,
  createCarToADriverInLord,
  updateACarInLord,
  updateADriverForACar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));
