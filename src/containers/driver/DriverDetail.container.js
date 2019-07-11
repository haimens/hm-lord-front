import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DriverDetailCard from "./driverDetail.component/DriverDetail.card";
import GMapFlag from "../../components/shared/GMapFlag";
import { VehicleCard, TripCard, ListView, ListHeader, Header } from "../../components/shared";
import WageListItem from "./driverDetail.component/WageList.item";
import SalaryListItem from "./driverDetail.component/SalaryList.item";
import AddingTripModal from "./driverDetail.component/AddingTrip.modal";
import AddingVehicleModal from "../../components/shared/AddingVehicle.modal";
import AddingWageModal from "./driverDetail.component/AddingWage.modal";
import AddingSalaryModal from "./driverDetail.component/AddingSalary.modal";
import UpdatingDriverModal from "./driverDetail.component/UpdatingDriverInfo.modal";
import {
  findDriverDetailInLord,
  findDriverLocationListInLord,
  findCarListForADriver,
  updateADriverInLord,
  createDriverToACarInLord,
  updateACarForADriver
} from "../../actions/driver.action";
import { findTripListInDriver, findActiveTripListInDriver } from "../../actions/trip.action";
import { findVehicleListInLord } from "../../actions/vehicle.action";
import "./DriverDetail.container.css";
class DriverDetail extends Component {
  state = {
    showAddingTripModal: false,
    showAddingVehicleModal: false,
    showAddingWageModal: false,
    showAddingSalaryModal: false,
    showUpdatingDriverModal: false,
    showMap: false
  };
  handleShowAddingTripModal = () => {
    this.setState(state => ({ showAddingTripModal: !state.showAddingTripModal }));
  };
  handleShowAddingVehicleModal = () => {
    this.setState(state => ({ showAddingVehicleModal: !state.showAddingVehicleModal }));
  };
  handleShowAddingWageModal = () => {
    this.setState(state => ({ showAddingWageModal: !state.showAddingWageModal }));
  };
  handleShowAddingSalaryModal = () => {
    this.setState(state => ({ showAddingSalaryModal: !state.showAddingSalaryModal }));
  };
  handleShowUpdatingDriverModal = () => {
    this.setState(state => ({ showUpdatingDriverModal: !state.showUpdatingDriverModal }));
  };
  handleDetailButtonClicked = type => {
    if (type === "basic") {
      this.handleShowUpdatingDriverModal();
    }
  };
  handleCreateDriverToACarInLord = car_token => {
    const { match, createDriverToACarInLord } = this.props;
    const { driver_token } = match.params;
    createDriverToACarInLord(driver_token, { car_token });
  };
  async componentDidMount() {
    const {
      match,
      findDriverDetailInLord,
      findDriverLocationListInLord,
      findCarListForADriver,
      findVehicleListInLord,
      findTripListInDriver,
      findActiveTripListInDriver
    } = this.props;
    const { driver_token } = match.params;
    await Promise.all([
      findDriverDetailInLord(driver_token),
      findCarListForADriver(driver_token),
      findVehicleListInLord(),
      findTripListInDriver(driver_token),
      findActiveTripListInDriver(driver_token)
    ]);
    if (this.props.driver_detail_in_lord.location_info) {
      if (
        this.props.driver_detail_in_lord.location_info.lat !== 0 ||
        this.props.driver_detail_in_lord.location_info.lng !== 0
      ) {
        await this.setState({ showMap: true });
      }
    }
  }
  render() {
    const {
      showAddingTripModal,
      showAddingVehicleModal,
      showAddingWageModal,
      showAddingSalaryModal,
      showUpdatingDriverModal,
      showMap
    } = this.state;
    const {
      history,
      match: {
        params: { driver_token }
      },
      driver_detail_in_lord,
      updateADriverInLord,
      vehicle_list_in_lord,
      car_list_for_a_driver,
      updateACarForADriver,
      trip_list_in_driver
    } = this.props;
    return (
      <main className="container-fluid">
        {showUpdatingDriverModal && (
          <UpdatingDriverModal
            driver_token={driver_token}
            updateADriverInLord={updateADriverInLord}
            driver_detail={driver_detail_in_lord.basic_info}
            onClose={this.handleShowUpdatingDriverModal}
          />
        )}
        {showAddingTripModal && <AddingTripModal onClose={this.handleShowAddingTripModal} />}
        {showAddingVehicleModal && (
          <AddingVehicleModal
            driver_token={driver_token}
            handleCarBeenClicked={this.handleCreateDriverToACarInLord}
            vehicle_list_in_lord={vehicle_list_in_lord}
            onClose={this.handleShowAddingVehicleModal}
          />
        )}
        {showAddingWageModal && <AddingWageModal onClose={this.handleShowAddingWageModal} />}
        {showAddingSalaryModal && <AddingSalaryModal onClose={this.handleShowAddingSalaryModal} />}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Driver"
              subTitle="Driver Detail"
              toLocation={"/driver"}
              tabicon={"tabicon_dashboard.svg"}
              clickTitle={"Driver"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
          <div>
            <DriverDetailCard
              handleDetailButtonClicked={this.handleDetailButtonClicked}
              driver_detail_in_lord={driver_detail_in_lord}
              showMap={showMap}
            />
          </div>
        </section>

        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Trip List",
              clickFunction: this.handleAddCompanyModal,
              clickTitle: "Refresh"
            }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="row p-3 triplist-scroll">
            {trip_list_in_driver.record_list.map((trip, index) => (
              <TripCard
                parentProps={{
                  tripCustomer: trip.customer_name,
                  tripPickUp: trip.pickup_time,
                  tripFrom: trip.from_addr_str,
                  tripTo: trip.to_addr_str,
                  tripStatus: trip.status_str
                }}
                hideDriver={true}
              />
            ))}
          </div>
        </section>
        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{
              title: "Related Vehicle List",
              clickFunction: this.handleShowAddingVehicleModal,
              clickTitle: "Vehicle"
            }}
            hideShadow={true}
            buttonWidth={"88px"}
          />
          <div className="row p-3">
            {car_list_for_a_driver.record_list.map((car, index) => (
              <VehicleCard
                parentProps={{
                  vehicleId: car.plate_num,
                  vehicleName: car.identifier,
                  vehicleImage: car.img_path,
                  driver_car_token: car.driver_car_token
                }}
                driver_token={driver_token}
                updateACarForADriver={updateACarForADriver}
                key={index}
                showButton={true}
                deleteButton={true}
              />
            ))}
          </div>
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Wage List",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Wage List"
            fieldNames={["Created On", "Amount", "Type", "Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <WageListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Salary List",
              clickFunction: this.handleShowAddingSalaryModal,
              clickTitle: "Salary"
            }}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={30}
            title="Salary List"
            fieldNames={["Created On", "Amount", "Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange}
          >
            {/* {punch_list_in_puri.record_list.map((punch, index) => (
              <SalaryListItem parentProps={punch} key={index} onClick={this.handlePunchItemClick} />
            ))} */}
          </ListView>
        </section>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    driver_detail_in_lord: state.driverReducer.driver_detail_in_lord,
    vehicle_list_in_lord: state.vehicleReducer.vehicle_list_in_lord,
    car_list_for_a_driver: state.driverReducer.car_list_for_a_driver,
    trip_list_in_driver: state.tripReducer.trip_list_in_driver
  };
};
const mapDispatchToProps = {
  findDriverDetailInLord,
  findDriverLocationListInLord,
  findCarListForADriver,
  updateADriverInLord,
  findVehicleListInLord,
  createDriverToACarInLord,
  updateACarForADriver,
  findTripListInDriver,
  findActiveTripListInDriver
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriverDetail));
