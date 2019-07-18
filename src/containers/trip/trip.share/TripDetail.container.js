import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  ListHeader,
  ListView,
  Header,
  AddingVehicleModal,
  AddingDriverModal,
  LogItem,
  AddingNote
} from "../../../components/shared";
import {
  BasicInfo,
  CustomerInfo,
  DriverInfo,
  VehicleInfo,
  AlertInfo,
  BasicInfoModal,
  AlertInfoModal,
  CustomerInfoModal,
  AlertEditModal,
  AddonService
} from "./TripDetail.component";
import { findTripNoteListInLord, createTripNoteListInLord } from "../../../actions/note.action";
import { findVehicleListInLord } from "../../../actions/vehicle.action";
import {
  findTripDetailInLord,
  createAnAlertForATrip,
  updateTripOperationInfo,
  updateTripBasicInfo
} from "../../../actions/trip.action";
import { findCarListForADriver, findDriverListInLord } from "../../../actions/driver.action";
import { editAlertInfoInTrip } from "../../../actions/alert.action";
import { convertUTCtoLocal } from "../../../actions/utilities.action";
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
    showTimeStampInfoModal: false,
    alert_token: "",
    alert_type: "",
    showEditAlertModal: "",
    showAddingLogInCustomer: ""
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

  handleEditAlert = (alert_type, alert_token) => {
    this.setState({ showEditAlertModal: true, alert_type: alert_type, alert_token, alert_token });
  };

  handleCloseEditAlert = () => {
    this.setState({ showEditAlertModal: false });
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
  handleAddingLog = () => {
    this.setState(state => ({ showAddingLogInCustomer: !state.showAddingLogInCustomer }));
  };
  async componentDidMount() {
    const {
      match,
      findTripDetailInLord,
      findVehicleListInLord,
      findCarListForADriver,
      findDriverListInLord,
      findTripNoteListInLord,
      findAddonInTrip
    } = this.props;
    const { trip_token } = match.params;
    await Promise.all([
      findTripDetailInLord(trip_token),
      findTripNoteListInLord(trip_token),
      findVehicleListInLord(),
      findDriverListInLord()
    ]);
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
    if (this.props.trip_detail_in_lord.driver_info.driver_token) {
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
      updateTripBasicInfo,
      editAlertInfoInTrip,
      note_list_for_trip,
      createTripNoteListInLord
    } = this.props;
    const { trip_token } = match.params;

    const {
      currentPosition,
      title,
      showEditButton,
      showBasicInfoModal,
      showCustomerInfoModal,
      showDriverInfoModal,
      showVehicleInfoModal,
      showAlertInfoModal,
      showAddingLogInCustomer,
      alert_token,
      alert_type,
      showEditAlertModal
    } = this.state;
    return (
      <main className="container-fluid">
        {showAddingLogInCustomer && (
          <AddingNote
            type={2}
            token={trip_token}
            createANote={createTripNoteListInLord}
            onClose={this.handleAddingLog}
          />
        )}
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
        {/* {showTimeStampInfoModal && (
          <TimeStampsModal
            trip_token={trip_token}
            updateTripBasicInfo={updateTripBasicInfo}
            onClose={() => this.handleInfoModal("stamps")}
          />
        )} */}
        {showEditAlertModal && (
          <AlertEditModal
            trip_token={trip_token}
            alert_list={trip_detail_in_lord.alert_list}
            editAlertInfoInTrip={editAlertInfoInTrip}
            alert_token={alert_token}
            alert_type={alert_type}
            onClose={this.handleCloseEditAlert}
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
              tabicon={"icon_trip_white.svg"}
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
                  showEditButton={false}
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
                  handleEditButton={this.handleEditAlert}
                  trip_detail_in_lord={trip_detail_in_lord}
                  handleDetailButtonClicked={this.handleInfoModal}
                  showEditButton={showEditButton}
                />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AddonService
                  hideDelete={true}
                  addon_list={trip_detail_in_lord.addon_list}
                  handleDetailButtonClicked={this.handleInfoModal}
                  trip_detail_in_lord={trip_detail_in_lord}
                  showEditButton={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Timeline"
            }}
            hideButton={true}
            buttonWidth={"70px"}
          />
          <div className="container-fluid bg-white rounded-custom-bottom shadowsm">
            <div className="d-flex justify-content-between p-5">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={`${process.env.PUBLIC_URL}/img/start.svg`}
                  alt="timeline"
                  style={{ height: "41px", width: "51px" }}
                />
                <div className="text-secondary-color hm-text-14 font-weight-500 mt-3">Driver Start Trip</div>
                <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                  {convertUTCtoLocal(trip_detail_in_lord.basic_info.start_time, "HH:mm a")}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={`${process.env.PUBLIC_URL}/img/pickup.svg`}
                  alt="timeline"
                  style={{ height: "41px", width: "51px" }}
                />
                <div className="text-secondary-color hm-text-14 font-weight-500 mt-3">
                  Driver Arrival Pickup Location
                </div>
                <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                  {convertUTCtoLocal(trip_detail_in_lord.basic_info.eta_time, "HH:mm a")}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={`${process.env.PUBLIC_URL}/img/ongoing.svg`}
                  alt="timeline"
                  style={{ height: "41px", width: "51px" }}
                />
                <div className="text-secondary-color hm-text-14 font-weight-500 mt-3">Customer On Board</div>
                <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                  {convertUTCtoLocal(trip_detail_in_lord.basic_info.cob_time, "HH:mm a")}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={`${process.env.PUBLIC_URL}/img/finish.svg`}
                  alt="timeline"
                  style={{ height: "41px", width: "51px" }}
                />
                <div className="text-secondary-color hm-text-14 font-weight-500 mt-3">Customer Arrival Destination</div>
                <div className="text-modal-color hm-text-14 font-weight-500 mt-2">
                  {convertUTCtoLocal(trip_detail_in_lord.basic_info.arrive_time, "HH:mm a")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Log History",
              clickFunction: this.handleAddingLog,
              clickTitle: "Log"
            }}
            buttonWidth={"70px"}
          />
          <ListView
            totalCount={30}
            title="Log History"
            fieldNames={["Created ON", "Log Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {note_list_for_trip.record_list.map((note, index) => (
              <LogItem parentProps={note} key={index} />
            ))}
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
    car_list_for_a_driver: state.driverReducer.car_list_for_a_driver,
    note_list_for_trip: state.noteReducer.note_list_for_trip,
    trip_add_on_list: state.tripReducer.trip_add_on_list
  };
};
const mapDispatchToProps = {
  findVehicleListInLord,
  findTripDetailInLord,
  createAnAlertForATrip,
  findCarListForADriver,
  updateTripOperationInfo,
  findDriverListInLord,
  updateTripBasicInfo,
  editAlertInfoInTrip,
  findTripNoteListInLord,
  createTripNoteListInLord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetailContainer));
