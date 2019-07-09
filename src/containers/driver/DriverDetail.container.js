import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DriverDetailCard from "./driverDetail.component/DriverDetail.card";
import GMapFlag from "../../components/shared/GMapFlag";
import { VehicleCard, TripCard, ListView, ListHeader, Header } from "../../components/shared";
import WageListItem from "./driverDetail.component/WageList.item";
import SalaryListItem from "./driverDetail.component/SalaryList.item";
import AddingTripModal from "./driverDetail.component/AddingTrip.modal";
import AddingVehicleModal from "./driverDetail.component/AddingVehicle.modal";
import AddingWageModal from "./driverDetail.component/AddingWage.modal";
import AddingSalaryModal from "./driverDetail.component/AddingSalary.modal";

import { findDriverDetailInLord } from "../../actions/driver.action";
class DriverDetail extends Component {
  state = {
    showAddingTripModal: false,
    showAddingVehicleModal: false,
    showAddingWageModal: false,
    showAddingSalaryModal: false
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
  componentDidMount() {
    const { match, findDriverDetailInLord } = this.props;
    const { driver_token } = match.params;
    findDriverDetailInLord(driver_token);
  }
  render() {
    const { showAddingTripModal, showAddingVehicleModal, showAddingWageModal, showAddingSalaryModal } = this.state;
    const { history } = this.props;
    return (
      <main>
        {showAddingTripModal && <AddingTripModal onClose={this.handleShowAddingTripModal} />}
        {showAddingVehicleModal && <AddingVehicleModal onClose={this.handleShowAddingVehicleModal} />}
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
            <DriverDetailCard />
          </div>
        </section>

        <section className="mb-4 bg-white rounded-custom shadow-sm">
          <ListHeader
            parentProps={{ title: "Driver Map", clickFunction: this.handleAddCompanyModal, clickTitle: "Refresh" }}
            hideShadow={true}
            hideButton={true}
          />
          <div className="row p-3">
            <TripCard
              parentProps={{
                tripId: 100015,
                tripDriver: "Kobe",
                tripCustomer: "Lebron",
                tripPickUp: "16/26 23",
                tripFrom: "321 s",
                tripTo: "123 s"
              }}
            />
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
            <VehicleCard
              parentProps={{
                vehicleId: "1000016",
                vehicleName: "Lebron James",
                vehicleImage: "unnamed.jpg",
                vehiclePhone: "6266266266"
              }}
              showButton={true}
              deleteButton={true}
            />
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
    driver_detail_in_lord: state.driverReducer.driver_detail_in_lord
  };
};
const mapDispatchToProps = { findDriverDetailInLord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DriverDetail));
