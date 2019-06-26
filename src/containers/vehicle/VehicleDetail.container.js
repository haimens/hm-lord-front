import React, { Component } from "react";
import { VehicleCard } from "../../components/shared";

import VehicleDetailCard from "./vehicleDetail.component/VehicleDetail.card";
import AddingDriverModal from "./vehicleDetail.component/AddingDriver.modal";
export default class VehicleDetail extends Component {
  state = {
    showAddingDriverModal: false
  };
  handleShowAddingVehicleModal = () => {
    this.setState(state => ({ showAddingDriverModal: !state.showAddingDriverModal }));
  };
  render() {
    const { showAddingDriverModal } = this.state;
    return (
      <main>
        {showAddingDriverModal && <AddingDriverModal onClose={this.handleShowAddingDriverModal} />}
        <section className="mb-4">
          <div className="mb-4">
            <h3 className="font-weight-bold mr-3">Vehicle Detail</h3>
          </div>
          <div>
            <VehicleDetailCard />
          </div>
        </section>
        <section className="mb-4">
          <div className="mb-4 d-flex">
            <h3 className="font-weight-bold mr-3">Driver List</h3>
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
      </main>
    );
  }
}
