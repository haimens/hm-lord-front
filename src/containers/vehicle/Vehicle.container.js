import React, { Component } from "react";
import VehicleCard from "../../components/shared/VehicleCard.component";
import Pagination from "../../components/shared/Pagination";
import VehicleCreation from "./vehicle.component/VehicleCreation.modal";
class Vehicle extends Component {
  state = {
    showVehicleCreationModal: false
  };
  handlePageChange = start => {
    console.log(start);
  };
  handleVehicleCreation = () => {
    this.setState(state => ({ showVehicleCreationModal: !state.showVehicleCreationModal }));
  };
  render() {
    const { showVehicleCreationModal } = this.state;
    return (
      <main>
        {showVehicleCreationModal && <VehicleCreation onClose={this.handleVehicleCreation} />}
        <section>
          <div className="mb-4 d-flex justify-content-between">
            <h3 className="font-weight-bold">Vehicle</h3>
            <button className="btn hm-bg-green text-white" onClick={this.handleVehicleCreation}>
              <span>
                <i className="fas fa-plus mr-2" />
              </span>
              Driver
            </button>
          </div>
          <div className="row">
            <VehicleCard
              parentProps={{
                vehicleId: "1000016",
                vehicleName: "Lebron James",
                vehicleImage: "unnamed.jpg",
                vehiclePhone: "6266266266"
              }}
            />
          </div>
        </section>
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default Vehicle;
