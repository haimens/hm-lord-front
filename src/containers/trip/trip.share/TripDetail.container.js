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
  CustomerInfoModal,
  TimeStampsModal
} from "./TripDetail.component";
import { findVehicleListInLord } from "../../../actions/vehicle.action";
import {
  findTripDetailInLord,
  createAnAlertForATrip,
  updateTripOperationInfo,
  updateTripBasicInfo
} from "../../../actions/trip.action";
import { findCarListForADriver, findDriverListInLord } from "../../../actions/driver.action";
class TripDetailContainer extends Component {
  state = {
    showEditButton: false,
    currentPosition: "",
    title: "",
    showBasicInfoModal: false,
    showCustomerInfoModal: false,
    showDriverInfoModal: false,
    showVehicleInfoModal: false,
    showAlertInfoModal: false,
    showTimeStampInfoModal: false
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
    if (type === "stamps") {
      this.setState(state => ({ showTimeStampInfoModal: !state.showTimeStampInfoModal }));
    }
  };
  handleUpdatingVehicle = car_token => {
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
      this.setState({ currentPosition, title: "Ongoing", showEditButton: true });
    }
    if (currentPosition === "upcoming") {
      this.setState({
        currentPosition,
        title: "Upcoming",
        showEditButton: true
      });
    }
    if (currentPosition === "finished") {
      this.setState({ currentPosition, title: "Recent Finished" });
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
      driver_list_in_lord,
      updateTripBasicInfo
    } = this.props;
    const { trip_token } = match.params;

    const {
      currentPosition,
      title,
      showEditButton,
      time_stamps,
      showBasicInfoModal,
      showCustomerInfoModal,
      showDriverInfoModal,
      showVehicleInfoModal,
      showAlertInfoModal,
      showTimeStampInfoModal
    } = this.state;
    return (
      <main className="container-fluid">
        {showBasicInfoModal && <BasicInfoModal onClose={() => this.handleInfoModal("basic")} />}
        {showCustomerInfoModal && <CustomerInfoModal onClose={() => this.handleInfoModal("customer")} />}
        {showDriverInfoModal && (
          <AddingDriverModal
            handleDriverBeenClicked={this.handleUpdatingDriver}
            driver_list_in_lord={driver_list_in_lord}
            onClose={() => this.handleInfoModal("driver")}
          />
        )}
        {showVehicleInfoModal && (
          <AddingVehicleModal
            handleCarBeenClicked={this.handleUpdatingVehicle}
            vehicle_list_in_lord={vehicle_list_in_lord}
            car_list_for_a_driver={car_list_for_a_driver}
            onClose={() => this.handleInfoModal("vehicle")}
          />
        )}
        {showAlertInfoModal && (
          <AlertInfoModal
            trip_token={trip_token}
            pickup_time={trip_detail_in_lord.basic_info.pickup_time}
            createAnAlertForATrip={createAnAlertForATrip}
            onClose={() => this.handleInfoModal("alert")}
          />
        )}
        {showTimeStampInfoModal && (
          <TimeStampsModal
            trip_token={trip_token}
            updateTripBasicInfo={updateTripBasicInfo}
            onClose={() => this.handleInfoModal("stamps")}
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
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <DriverInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <VehicleInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AlertInfo
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <TimeStaps
                  handleDetailButtonClicked={this.handleInfoModal}
                  trip_detail_in_lord={trip_detail_in_lord}
                  showEditButton={showEditButton}
                />
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
  findDriverListInLord,
  updateTripBasicInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetailContainer));
