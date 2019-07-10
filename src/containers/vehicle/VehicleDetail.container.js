import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { DriverCard, Header, ListHeader, ListView } from "../../components/shared";
import VehicleDetailCard from "./vehicleDetail.component/VehicleDetail.card";
import AddingDriverModal from "../../components/shared/AddingDriver.modal";
import {
  findCarDetailInLord,
  findDriverListForACar,
  createCarToADriverInLord,
  updateACarInLord
} from "../../actions/vehicle.action";
import { findDriverListInLord } from "../../actions/driver.action";
import EditVehicle from "./vehicleDetail.component/EditVehicle.modal";
class VehicleDetail extends Component {
  state = {
    showAddingDriverModal: false,
    showEditVehicleModal: false
  };
  handleShowAddingDriverModal = () => {
    this.setState(state => ({ showAddingDriverModal: !state.showAddingDriverModal }));
  };
  handleShowEditingDriverModal = () => {
    this.setState(state => ({ showEditVehicleModal: !state.showEditVehicleModal }));
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
      driver_list_for_a_car
    } = this.props;
    return (
      <main className="container-fluid">
        {showAddingDriverModal && (
          <AddingDriverModal
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
              tabicon={"tabicon_dashboard.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
          <div>
            <VehicleDetailCard
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
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3">
            {driver_list_for_a_car.record_list.map((driver, index) => (
              <DriverCard
                parentProps={{
                  driverName: driver.name,
                  driverImage: driver.driver_img_path,
                  driverPhone: driver.cell,
                  driver_token: driver.token
                }}
                history={history}
              />
            ))}
          </div>
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
            }}
            hideButton={true}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Log History"
            fieldNames={["Date", "Admin", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <LogListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
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
  updateACarInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VehicleDetail));
