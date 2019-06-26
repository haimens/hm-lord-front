import React, { Component } from "react";
import DriverDetailCard from "./driverDetail.component/DriverDetail.card";
import GMapFlag from "../../components/shared/GMapFlag";
import { VehicleCard, TripCard, ListView } from "../../components/shared";
import WageListItem from "./driverDetail.component/WageList.item";
import SalaryListItem from "./driverDetail.component/SalaryList.item";
import AddingTripModal from "./driverDetail.component/AddingTrip.modal";
import AddingVehicleModal from "./driverDetail.component/AddingVehicle.modal";
import AddingWageModal from "./driverDetail.component/AddingWage.modal";
import AddingSalaryModal from "./driverDetail.component/AddingSalary.modal";

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
  render() {
    const { showAddingTripModal, showAddingVehicleModal, showAddingWageModal, showAddingSalaryModal } = this.state;
    return (
      <main>
        {showAddingTripModal && <AddingTripModal onClose={this.handleShowAddingTripModal} />}
        {showAddingVehicleModal && <AddingVehicleModal onClose={this.handleShowAddingVehicleModal} />}
        {showAddingWageModal && <AddingWageModal onClose={this.handleShowAddingWageModal} />}
        {showAddingSalaryModal && <AddingSalaryModal onClose={this.handleShowAddingSalaryModal} />}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Driver Detail</h3>
          </div>
          <div>
            <DriverDetailCard />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold">Last Location Map</h3>
          </div>
          <div style={{ height: "248px" }}>
            <GMapFlag />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Trip List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingTripModal}
            />
          </div>
          <div className="row">
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
        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Vehicle List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingVehicleModal}
            />
          </div>
          <div className="row">
            <VehicleCard
              parentProps={{
                vehicleId: "1000016",
                vehicleName: "Lebron James",
                vehicleImage: "unnamed.jpg",
                vehiclePhone: "6266266266"
              }}
              deleteButton={true}
            />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Wage List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingWageModal}
            />
          </div>
          <div>
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
          </div>
        </section>

        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Salary List</h3>
            <i
              className="fas fa-plus hm-bg-green rounded-circle text-white p-2 hm-pointer-cursor"
              onClick={this.handleShowAddingSalaryModal}
            />
          </div>
          <div>
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
          </div>
        </section>
      </main>
    );
  }
}
export default DriverDetail;
