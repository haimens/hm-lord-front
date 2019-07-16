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
import { findWageListInDriver, createWageInDriver, findSumWageInDriver } from "../../actions/wage.action";
import { findSalaryListInDriver, createSalaryInDriver, findSumSalaryInDriver } from "../../actions/salary.action";

import "./DriverDetail.container.css";
class DriverDetail extends Component {
  state = {
    showAddingTripModal: false,
    showAddingVehicleModal: false,
    showAddingWageModal: false,
    showAddingSalaryModal: false,
    showUpdatingDriverModal: false,
    showMap: false,
    available: 0
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

  handlePageChange = type => start => {
    const { match, findWageListInDriver, findSalaryListInDriver } = this.props;
    const { driver_token } = match.params;
    if (type === "wage") {
      findWageListInDriver(driver_token, { start });
    }
    if (type === "salary") {
      findSalaryListInDriver(driver_token, { start });
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
      findCarListForADriver,
      findVehicleListInLord,
      findTripListInDriver,
      findActiveTripListInDriver,
      findWageListInDriver,
      findSalaryListInDriver,
      findSumWageInDriver,
      findSumSalaryInDriver
    } = this.props;
    const { driver_token } = match.params;
    await Promise.all([
      findDriverDetailInLord(driver_token),
      findCarListForADriver(driver_token),
      findVehicleListInLord(),
      findTripListInDriver(driver_token),
      findActiveTripListInDriver(driver_token),
      findWageListInDriver(driver_token),
      findSalaryListInDriver(driver_token),
      findSumWageInDriver(driver_token),
      findSumSalaryInDriver(driver_token)
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
      trip_list_in_driver,
      wage_list_in_driver,
      salary_list_in_driver,
      createWageInDriver,
      createSalaryInDriver,
      wage_sum_list_in_driver,
      salary_sum_list_in_driver
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
        {showAddingWageModal && (
          <AddingWageModal
            driver_name={driver_detail_in_lord.basic_info.name}
            driver_token={driver_token}
            createWageInDriver={createWageInDriver}
            onClose={this.handleShowAddingWageModal}
          />
        )}
        {showAddingSalaryModal && (
          <AddingSalaryModal
            driver_name={driver_detail_in_lord.basic_info.name}
            sum={wage_sum_list_in_driver.sum - salary_sum_list_in_driver.sum}
            driver_token={driver_token}
            createSalaryInDriver={createSalaryInDriver}
            onClose={this.handleShowAddingSalaryModal}
          />
        )}
        <section className="mb-4">
          <div className="mb-4">
            <Header
              title="Driver"
              subTitle="Driver Detail"
              toLocation={"/driver"}
              tabicon={"icon_driver_white.svg"}
              clickTitle={"Driver"}
              history={history}
              buttonWidth={"88px"}
            />
          </div>
          <div>
            <DriverDetailCard
              sum={wage_sum_list_in_driver.sum - salary_sum_list_in_driver.sum}
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
            showSearch={true}
          />
          <div className="container-fluid">
            <div className="row triplist-scroll p-1">
              {trip_list_in_driver.record_list.map((trip, index) => (
                <TripCard
                  parentProps={{
                    tripCustomer: trip.customer_name,
                    tripPickUp: trip.pickup_time,
                    tripFrom: trip.from_addr_str,
                    tripTo: trip.to_addr_str,
                    tripStatus: trip.status_str,
                    trip_token: trip.trip_token
                  }}
                  history={history}
                  key={index}
                  hideDriver={true}
                />
              ))}
            </div>
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
          <div className="container-fluid">
            <div className="row p-1">
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
          </div>
        </section>
        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Transaction List",
              clickFunction: this.handleShowAddingWageModal,
              clickTitle: "Wage"
            }}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={wage_list_in_driver.count}
            title="Transaction List"
            fieldNames={["Created On", "Amount", "Type", "Note"]}
            hideHeader={true}
            onPageChange={this.handlePageChange("wage")}
          >
            {wage_list_in_driver.record_list.map((wage, index) => (
              <WageListItem parentProps={wage} key={index} />
            ))}
          </ListView>
        </section>

        <section className="mb-4">
          <ListHeader
            parentProps={{
              title: "Earning List",
              clickFunction: this.handleShowAddingSalaryModal,
              clickTitle: "Salary"
            }}
            buttonWidth={"88px"}
          />
          <ListView
            totalCount={salary_list_in_driver.count}
            title="Earning List"
            fieldNames={["Created On", "Updated On", "Amount"]}
            hideHeader={true}
            onPageChange={this.handlePageChange("salary")}
          >
            {salary_list_in_driver.record_list.map((salary, index) => (
              <SalaryListItem parentProps={salary} key={index} />
            ))}
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
    trip_list_in_driver: state.tripReducer.trip_list_in_driver,
    wage_list_in_driver: state.wageReducer.wage_list_in_driver,
    wage_sum_list_in_driver: state.wageReducer.wage_sum_list_in_driver,
    salary_list_in_driver: state.salaryReducer.salary_list_in_driver,
    salary_sum_list_in_driver: state.salaryReducer.salary_sum_list_in_driver
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
  findActiveTripListInDriver,
  findWageListInDriver,
  findSalaryListInDriver,
  createWageInDriver,
  createSalaryInDriver,
  findSumWageInDriver,
  findSumSalaryInDriver
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriverDetail));
