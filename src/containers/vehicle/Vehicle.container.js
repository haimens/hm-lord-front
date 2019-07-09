import React, { Component } from "react";
import { Header } from "../../components/shared";
import VehicleCard from "../../components/shared/VehicleCard.component";
import Pagination from "../../components/shared/Pagination";
import VehicleAdding from "./vehicle.component/VehicleAdding.modal";
class Vehicle extends Component {
  state = {
    showVehicleCreationModal: false
  };
  handlePageChange = start => {
    console.log(start);
  };
  handleAddingVehicle = () => {
    this.setState(state => ({ showVehicleCreationModal: !state.showVehicleCreationModal }));
  };
  render() {
    const { showVehicleCreationModal } = this.state;
    return (
      <main>
        {showVehicleCreationModal && <VehicleAdding onClose={this.handleAddingVehicle} />}
        <section className="container-fluid">
          <div className="mb-4">
            <Header
              title="Vehicle"
              tabicon={"tabicon_dashboard.svg"}
              showButton={true}
              clickFunction={this.handleAddingVehicle}
              clickTitle={"Vehicle"}
              buttonWidth={"88px"}
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
            />
          </div>
        </section>
        <Pagination onPageChange={this.handlePageChange} />
      </main>
    );
  }
}
export default Vehicle;
