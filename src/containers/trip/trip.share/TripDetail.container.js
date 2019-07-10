import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ListHeader, ListView, Header } from "../../../components/shared";
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
  DriverInfoModal,
  VehicleInfoModal
} from "./TripDetail.component";
import { findTripDetailInLord } from "../../../actions/trip.action";
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

  async componentDidMount() {
    const { match, findTripDetailInLord } = this.props;
    const { trip_token } = match.params;
    findTripDetailInLord(trip_token);
    console.log(match);
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
  }
  render() {
    const { history } = this.props;
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
    return (
      <main className="container-fluid">
        {showBasicInfoModal && basic_info && <BasicInfoModal onClose={() => this.handleInfoModal("basic")} />}
        {showCustomerInfoModal && customer_info && (
          <CustomerInfoModal onClose={() => this.handleInfoModal("customer")} />
        )}
        {showDriverInfoModal && driver_info && <DriverInfoModal onClose={() => this.handleInfoModal("driver")} />}
        {showVehicleInfoModal && vehicle_info && <VehicleInfoModal onClose={() => this.handleInfoModal("vehicle")} />}
        {showAlertInfoModal && alert_info && <AlertInfoModal onClose={() => this.handleInfoModal("alert")} />}

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
                <BasicInfo handleDetailButtonClicked={this.handleInfoModal} showButton={basic_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <CustomerInfo handleDetailButtonClicked={this.handleInfoModal} showButton={customer_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <DriverInfo handleDetailButtonClicked={this.handleInfoModal} showButton={driver_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <VehicleInfo handleDetailButtonClicked={this.handleInfoModal} showButton={vehicle_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <AlertInfo handleDetailButtonClicked={this.handleInfoModal} showButton={alert_info} />
              </div>
              <div className="col-lg-6 col-12 mb-4">
                <TimeStaps showButton={time_stamps} />
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
  return {};
};
const mapDispatchToProps = { findTripDetailInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TripDetailContainer));
