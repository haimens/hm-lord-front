import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListHeader, ListView, Header, AddingVehicleModal, AddingDriverModal } from "../../../components/shared";
import {
  BasicInfo,
  CustomerInfo,
  DriverInfo,
  VehicleInfo,
  AlertInfo,
  TimeStaps,
  BasicInfoModal,
  AlertInfoModal,
  CustomerInfoModal
} from "./TripDetail.component";
import { findVehicleListInLord } from "../../../actions/vehicle.action";
import { findTripDetailInLord, createAnAlertForATrip, updateTripOperationInfo } from "../../../actions/trip.action";
import { findCarListForADriver, findDriverListInLord } from "../../../actions/driver.action";
class TripDetailContainer extends Component {
  state = {
    basic_info: false,
    customer_info: false,
    driver_info: false,
    vehicle_info: false,
    alert_info: false,
    time_stamps: false,
    currentPosition: "",
    title: "",
    showBasicInfoModal: false,
    showCustomerInfoModal: false,
    showDriverInfoModal: false,
    showVehicleInfoModal: false,
    showAlertInfoModal: false
  };

  handleInfoModal = type => {
    if (type === "basic") {
      this.setState(state => ({ showBasicInfoModal: !state.showBasicInfoModal }));
    }
    if (type === "customer") {
      this.setState(state => ({ showCustomerInfoModal: !state.showCustomerInfoModal }));
    }
    if (type === "driver") {
      this.setState(state => ({ showDriverInfoModal: !state.showDriverInfoModal }));
    }
    if (type === "vehicle") {
      this.setState(state => ({ showVehicleInfoModal: !state.showVehicleInfoModal }));
    }
    if (type === "alert") {
      this.setState(state => ({ showAlertInfoModal: !state.showAlertInfoModal }));
    }
  };
  handleUpdatingVehicle = car_token => {
    console.log(car_token);
    const {
      match: {
        params: { trip_token }
      },
      updateTripOperationInfo
    } = this.props;
    updateTripOperationInfo(trip_token, { car_token });
  };

  handleUpdatingDriver = driver_token => {
    const {
      match: {
        params: { trip_token }
      },
      updateTripOperationInfo
    } = this.props;
    updateTripOperationInfo(trip_token, { driver_token });
  };

  async componentDidMount() {
    const {
      match,
      findTripDetailInLord,
      findVehicleListInLord,
      findCarListForADriver,
      findDriverListInLord
    } = this.props;
    const { trip_token } = match.params;
    await Promise.all([findTripDetailInLord(trip_token), findVehicleListInLord(), findDriverListInLord()]);
    const currentPosition = match.path.split("/")[2];
    if (currentPosition === "ongoing") {
      this.setState({ currentPosition, title: "Ongoing", customer_info: true });
    }
    if (currentPosition === "upcoming") {
      this.setState({
        currentPosition,
        title: "Upcoming",
        basic_info: true,
        customer_info: true,
        driver_info: true,
        vehicle_info: true,
        alert_info: true
      });
    }
    if (currentPosition === "finished") {
      this.setState({ currentPosition, title: "Recent Finished", customer_info: true });
    }
    if (this.props.trip_detail_in_lord.driver_info.driver_token !== "") {
      findCarListForADriver(this.props.trip_detail_in_lord.driver_info.driver_token);
    }
  }
  render() {
    const {
      match,
      history,
      trip_detail_in_lord,
      createAnAlertForATrip,
      vehicle_list_in_lord,
      car_list_for_a_driver,
      driver_list_in_lord
    } = this.props;
    const { trip_token } = match.params;

    const {
      currentPosition,
      title,
      basic_info,
      customer_info,
      driver_info,
      vehicle_info,
      alert_info,
      time_stamps,
      showBasicInfoModal,
      showCustomerInfoModal,
      showDriverInfoModal,
      showVehicleInfoModal,
      showAlertInfoModal
    } = this.state;
    console.log(trip_detail_in_lord.driver_info.driver_token);
    return (
      <main className="container-fluid">
        {showBasicInfoModal && basic_info && <BasicInfoModal onClose={() => this.handleInfoModal("basic")} />}
        {showCustomerInfoModal && customer_info && (
          <CustomerInfoModal onClose={() => this.handleInfoModal("customer")} />
        )}
        {showDriverInfoModal && driver_info && (
          <AddingDriverModal
            handleDriverBeenClicked={this.handleUpdatingDriver}
            driver_list_in_lord={driver_list_in_lord}
            onClose={() => this.handleInfoModal("driver")}
          />
        )}
        {showVehicleInfoModal && vehicle_info && (
          <AddingVehicleModal
            handleCarBeenClicked={this.handleUpdatingVehicle}
            vehicle_list_in_lord={vehicle_list_in_lord}
            car_list_for_a_driver={car_list_for_a_driver}
            onClose={() => this.handleInfoModal("vehicle")}
          />
        )}
        {showAlertInfoModal && alert_info && (
          <AlertInfoModal
            trip_token={trip_token}
            createAnAlertForATrip={createAnAlertForATrip}
            onClose={() => this.handleInfoModal("alert")}
          />
        )}

        <section className="mb-4">
          <div>
            <Header
              title="Trip"
              subTitle={title}
              thirdTitle={"Trip Detail"}
              toLocation={`/trip/${currentPosition}`}
              toSubLocation={`/trip/${currentPosition}`}
              tabicon={"tabicon_dashboard.svg"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
        </section>
        <section className="mb-4">
          <div className="bg-white rounded-custom shadow-sm">
            <div className="row" style={{ padding: "40px" }}>
              <div className="col-lg-6 col-12 mb-4">
                <BasicInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showButton={basic_info}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showButton={customer_info}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <DriverInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showButton={driver_info}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <VehicleInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showButton={vehicle_info}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AlertInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showButton={alert_info}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <TimeStaps trip_detail_in_lord={trip_detail_in_lord} showButton={time_stamps} />
              </div>
            </div>
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
    trip_detail_in_lord: state.tripReducer.trip_detail_in_lord,
    driver_list_in_lord: state.driverReducer.driver_list_in_lord,
    vehicle_list_in_lord: state.vehicleReducer.vehicle_list_in_lord,
    car_list_for_a_driver: state.driverReducer.car_list_for_a_driver
  };
};
const mapDispatchToProps = {
  findVehicleListInLord,
  findTripDetailInLord,
  createAnAlertForATrip,
  findCarListForADriver,
  updateTripOperationInfo,
  findDriverListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetailContainer));
